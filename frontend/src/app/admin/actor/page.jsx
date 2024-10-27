"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function AdminActor() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [actorIdToDelete, setActorIdToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('A-Z');

    const fetchActors = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch('http://127.0.0.1:8000/api/actors', {
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
            setData(newData);
            setFilteredData(newData); // Set filtered data initially to all actors
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const deleteActor = async () => {
        if (actorIdToDelete === null) return;

        try {
            const token = Cookies.get('token');
            const res = await fetch(`http://127.0.0.1:8000/api/actors/${actorIdToDelete}`, {
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
            setData(updatedData);
            setFilteredData(updatedData);
            setActorIdToDelete(null);
        } catch (error) {
            console.error('Error deleting actor:', error);
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

        if (sort === 'A-Z') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredData(filtered);
    };

    useEffect(() => {
        fetchActors();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className="col fw-bold">Diễn viên</h2>
                <div className="col-2 mt-2">
                    <Link href="/admin/actor/addActor" className="btn btn-success">
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
                        </ul>
                    </div>
                </div>
                <div className="col-1">
                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            10
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">20</a></li>
                            <li><a className="dropdown-item" href="#">30</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">
                            <input type="checkbox" />
                        </th>
                        <th scope="col">ID</th>
                        <th scope="col">AVATAR</th>
                        <th scope="col">TÊN</th>
                        <th scope="col">TIỂU SỬ</th>
                        <th scope="col">SINH NHẬT</th>
                        <th scope="col">TÁC VỤ</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((actor) => (
                        <tr key={actor.actor_id}>
                            <th scope="row">
                                <input type="checkbox" />
                            </th>
                            <td>{actor.actor_id}</td>
                            <td>
                                <img src={actor.image_url} alt="" style={{ width: "50px", height: "50px", objectFit: "cover" }} className="rounded" />
                            </td>
                            <td>{actor.name}</td>
                            <td style={{ width: "30%" }}>{actor.biography}</td>
                            <td>{actor.birth_date}</td>
                            <td>
                                <Link className="btn btn-secondary" href={`/admin/actor/edit/${actor.actor_id}`}>
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
