"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Account() {
    const [data, setData] = useState([]);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');

    // Fetch user data excluding admins
    const fetchDataUser = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch('http://127.0.0.1:8000/api/users?role=customer', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error('Error fetching user list:', res.status);
                return;
            }
            const newData = await res.json();
            setData(newData);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    // Delete user by ID
    const handleDeleteUser = async () => {
        if (!userIdToDelete) return;
        try {
            const token = Cookies.get('token');
            const res = await fetch(`http://127.0.0.1:8000/api/users/${userIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.ok) {
                alert('User account deleted successfully!');
                setUserIdToDelete(null);
                fetchDataUser();
            } else {
                console.error('Error deleting account:', res.status);
                alert('Failed to delete account!');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, []);

    useEffect(() => {
        const filtered = data.filter(user => {
            const matchesSearch = user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch; 
        });

        // Sort data based on selection
        const sortedData = [...filtered].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.user_name.localeCompare(b.user_name);
            } else {
                return b.user_name.localeCompare(a.user_name);
            }
        });

        setFilteredData(sortedData);
        setCurrentPage(1); // Reset to first page when the filter changes
    }, [searchTerm, data, sortOrder]);

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className="col fw-bold">Tài khoản</h2>
                <div className="col-2 mt-2">
                    <Link href="/admin/account/addAccount" className="btn btn-success">
                        + Thêm Mới
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Tìm kiếm"
                            aria-label="Search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
                <div className="col-2">
                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sắp xếp
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => setSortOrder('asc')}>Tên (A-Z)</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => setSortOrder('desc')}>Tên (Z-A)</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {/* <th scope="col">
                            <input type="checkbox" />
                        </th> */}
                        <th scope="col">ID</th>
                        <th scope="col">AVATAR</th>
                        <th scope="col">TÊN NGƯỜI DÙNG</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">GIỚI TÍNH</th>
                        <th scope="col">VAI TRÒ</th>
                        <th scope="col">TÁC VỤ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user.user_id}>
                            {/* <th scope="row">
                                <input type="checkbox" />
                            </th> */}
                            <th scope="row">{user.user_id}</th>
                            <td>
                                <img src={user.avatar || "../images/default-avatar.jpg"} alt="" style={{ width: "40px", height: "40px", objectFit: "cover" }} className="rounded-circle" />
                            </td>
                            <td>{user.user_name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender || "Chưa xác định"}</td>
                            <td>
                                <div className="rounded text-center mb-2 bg-primary text-white">
                                    Khách hàng
                                </div>
                            </td>
                            <td>
                                <Link href={`/admin/account/edit/${user.user_id}`} className="btn btn-secondary">
                                    <i className="fa-solid fa-pen"></i>
                                </Link>
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => setUserIdToDelete(user.user_id)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#confirmDeleteModal"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>

            {/* Confirmation Modal */}
            <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmDeleteModalLabel">Xác nhận xóa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa tài khoản này?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteUser} data-bs-dismiss="modal">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
