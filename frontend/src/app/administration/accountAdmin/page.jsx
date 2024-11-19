"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function AccountAdmin() {
    const [data, setData] = useState([]);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);

    // Fetch admin user data
    const fetchDataAdmin = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch('http://127.0.0.1:8000/api/users', { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error('Error fetching admin user list:', res.status);
                return;
            }
            const newData = await res.json();
            // Filter users with role 100
            const adminUsers = newData.filter(user => user.role === 100);
            setData(adminUsers);
        } catch (error) {
            console.error('Error fetching admin user list:', error);
        }
    };

    useEffect(() => {
        fetchDataAdmin();
    }, []);

    useEffect(() => {
        const filtered = data.filter(user => {
            const matchesSearch = user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to the first page when the data changes
    }, [searchTerm, data]);

    const totalPages = Math.ceil(filteredData.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className="col fw-bold">Quản Trị Viên</h2>
                <div className="col-2 mt-2">
                    <Link href="/admin/accountAdmin/addAdmin" className="btn btn-success">
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
                <div className="col-1">
                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {usersPerPage}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => setUsersPerPage(20)}>20</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => setUsersPerPage(30)}>30</a></li>
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
                                <div className="rounded text-center mb-2 bg-danger text-white">
                                    Quản trị viên
                                </div>
                            </td>
                            <td>
                                <Link href={`/admin/accountAdmin/edit/${user.user_id}`} className="btn btn-secondary">
                                    <i className="fa-solid fa-pen"></i>
                                </Link>
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
        </div>
    );
}
