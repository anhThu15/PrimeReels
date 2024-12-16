"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
export default function AdminActor() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [actorIdToDelete, setActorIdToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('A-Z');
    const [currentPage, setCurrentPage] = useState(1);
    const actorsPerPage = 10;

    const fetchActors = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`/api/actors`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error('Error fetching actors:', res.status);
                return;
            }
            const newData = await res.json();
            // Sắp xếp mặc định từ mới nhất đến cũ nhất dựa vào actor_id
            const sortedData = newData.sort((a, b) => b.actor_id - a.actor_id);

            setData(sortedData); // Lưu dữ liệu đã sắp xếp
            setFilteredData(sortedData); // Đồng bộ filteredData
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const deleteActor = async () => {
        if (actorIdToDelete === null) return;

        try {
            const token = Cookies.get('token');
            const res = await fetch(`/api/actors/${actorIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error('Error deleting actor:', res.status);
                return;
            }
            const updatedData = data.filter(actor => actor.actor_id !== actorIdToDelete);
            toast.success("Xóa diễn viên thành công!")
            setData(updatedData);
            setFilteredData(updatedData);
            setActorIdToDelete(null);
        } catch (error) {
            console.error('Error deleting actor:', error);
            toast.error("Đã có lỗi xảy ra hãy kiểm tra lại thao tác!")
        }
    };

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterData(term, sortOrder);
    };

    const handleSort = (order) => {
        setSortOrder(order);
        filterData(searchTerm, order);
    };

    const filterData = (search, sort) => {
        let filtered = data.filter(actor =>
            actor.name.toLowerCase().includes(search.toLowerCase())
        );

        // Logic sắp xếp
        if (sort === 'A-Z') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'Z-A') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sort === 'default') {
            filtered.sort((a, b) => b.actor_id - a.actor_id); // Mặc định: mới nhất -> cũ nhất
        }

        setFilteredData(filtered);
        setCurrentPage(1); // Reset về trang đầu tiên khi có thay đổi
    };


    const totalPages = Math.ceil(filteredData.length / actorsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentActors = filteredData.slice((currentPage - 1) * actorsPerPage, currentPage * actorsPerPage);

    useEffect(() => {
        fetchActors();
    }, []);



    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className="col fw-bold">Diễn viên</h2>
                <div className="col-2 mt-2">
                    <Link href="/administration/actor/addActor" className="btn btn-success">
                        + Thêm Mới
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <form className="d-flex" role="search">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Tìm kiếm"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </form>
                </div>
                <div className="col">
                    <div className="dropdown">
                        <button
                            className="btn btn-light dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-filter"></i> Lọc
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => handleSort('A-Z')}>A-Z</a></li>
                            <li><a className="dropdown-item" onClick={() => handleSort('Z-A')}>Z-A</a></li>
                            <li><a className="dropdown-item" onClick={() => handleSort('default')}>Mặc định (Mới nhất)</a></li>
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
                        <th scope="col">TÊN</th>
                        <th scope="col" style={{ width: "20%" }}>TIỂU SỬ</th>
                        <th scope="col">SINH NHẬT</th>
                        <th scope="col">TÁC VỤ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentActors.map((actor, i) => (
                        <tr key={actor.actor_id}>
                            <td>{i + 1}</td>
                            <td>
                                <td>
                                {actor.image_url && (actor.image_url.startsWith('http') || 
                                actor.image_url.endsWith('.jpg') || 
                                actor.image_url.endsWith('.jpeg') || 
                                actor.image_url.endsWith('.png') || 
                                actor.image_url.endsWith('.webp') || 
                                actor.image_url.endsWith('.gif')) ? (
                                <img
                                    src={actor.image_url.startsWith('http') ? actor.image_url : `http://127.0.0.1:8000/storage/${actor.image_url}`}
                                    alt={actor.name}
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    className="rounded"
                                />
                                ) : (
                                <p>{actor.image_url}</p> // Display the URL if not a valid image file
                                )}
                                </td>
                            </td>
                            <td>{actor.name}</td>
                            <td style={{
                                whiteSpace: "nowrap",
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "200px" // Bạn có thể thay đổi giá trị này để đặt giới hạn độ rộng
                            }}>
                                {actor.biography}
                            </td>

                            <td>{new Date(actor.birth_date).toISOString().split("T")[0]}</td>

                            <td>
                                <Link className="btn btn-secondary" href={`/administration/actor/edit/${actor.actor_id}`}>
                                    <i className="fa-solid fa-pen"></i>
                                </Link>
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => setActorIdToDelete(actor.actor_id)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteConfirmModal"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <nav>
                <ul className="pagination" style={{ display: "flex", justifyContent: "center" }}>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>

            {/* Modal xác nhận xóa */}
            <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteConfirmModalLabel">Xác nhận xóa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa diễn viên này không?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-danger" onClick={deleteActor} data-bs-dismiss="modal">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
