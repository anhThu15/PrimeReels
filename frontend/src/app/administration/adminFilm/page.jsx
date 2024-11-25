'use client';
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
export default function AdminFilm() {
    const token = Cookies.get('token');
    const router = useRouter();
    const [films, setFilms] = useState([]);
    const [sorts, setSorts] = useState([]);
    const [sortOrder, setSortOrder] = useState('0');
    const [filteredSorts, setFilteredSorts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 10;

    useEffect(() => {
        const getFilms = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`, { revalidate: 3600 });
            setFilms(res.data);
            setSorts(res.data);
        }

        getFilms();
    }, []);

    const handleDelete = async (data) => {
        try {
            // const token = localStorage.getItem('token');
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${data}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            // alert('Thành công ròi đi chữa lãnh hoy ~~~');
            toast.success("Xóa phim thành công")
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleSort = (sortOrder) => {
        let sortedData = [...films]; 
        if (sortOrder === 'asc') {
            sortedData.sort((a, b) => a.views - b.views);
        } else if (sortOrder === 'des') {
            sortedData.sort((a, b) => b.views - a.views);
        }
        setSorts(sortedData);
        setCurrentPage(1); 
    };

    useEffect(() => {
        handleSort(sortOrder);
    }, [sortOrder]); 

    useEffect(() => {
        const filteredData = sorts.filter((film) =>
            film.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSorts(filteredData);
    }, [searchTerm, sorts]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = filteredSorts.slice(indexOfFirstFilm, indexOfLastFilm);
    const totalPages = Math.ceil(filteredSorts.length / filmsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className="col fw-bold">Danh Sách Phim</h2>
                <div className="col-2 mt-2">
                    <Link href="/administration/adminFilm/addNewFilm" className="btn btn-success">
                        + Thêm Mới
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <form className="d-flex" role="search">
                        <input className="form-control" type="search" placeholder="Tìm kiếm" aria-label="Search"
                            onChange={handleSearch}
                            value={searchTerm} />
                    </form>
                </div>
                <div className="col">
                    <div className="dropdown">
                        <div className="mb-3 w-25">
                            <select id="sortOrder" className="form-select" onChange={(e) => handleSort(e.target.value)} value={sortOrder}>
                                <option value="0">Lọc Theo Lượt Xem</option>
                                <option value="asc">Tăng dần</option>
                                <option value="des">Giảm dần</option>
                            </select>
                        </div>
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
                        <th scope="col">PHIM</th>
                        <th scope="col">LOẠI PHIM</th>
                        <th scope="col">NĂM PHÁT HÀNH</th>
                        <th scope="col">THỂ LOẠI PHIM</th>
                        <th scope="col">TRẠNG THÁI</th>
                        <th scope="col">LƯỢT XEM</th>
                        <th scope="col">RATING</th>
                        <th scope="col">TÁC VỤ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFilms.map((film, i) => (
                        <tr key={film.movie_id}>
                            <th scope="row">
                                <input type="checkbox" />
                            </th>
                            <th scope="row">{indexOfFirstFilm + i + 1}</th>
                            <td className="d-flex align-items-center gap-2">
                                <img src={film.poster} alt="" style={{ width: "120px", height: "150px", objectFit: "cover" }} />
                                <div className="d-flex flex-column">
                                    <p>{film.title}</p>
                                </div>
                            </td>
                            <td>{film.movie_type.name}</td>
                            <td>{film.created_at}</td>
                            <td>
                                {film.genres.map((g) => (
                                    <div key={g.id} className="bg-primary text-white rounded text-center mb-2">
                                        {g.name}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {film.status === 1 ? (
                                    <div className="bg-success text-white rounded text-center">Công Khai</div>
                                ) : (
                                    <div className="bg-warning text-white rounded text-center">Không Công Khai</div>
                                )}
                            </td>
                            <td>{film.views}</td>
                            <td>
                                {film.rating}
                                <i className="fa-solid fa-star mx-3" style={{ color: "gold" }}></i>
                            </td>
                            <td>
                                <Link href={`/administration/adminFilm/${film.movie_id}`} className="ms-2 btn btn-secondary">
                                    <i className="fa-solid fa-pen"></i>
                                </Link> 
                                <button className="btn btn-danger ms-2" onClick={() => handleDelete(film.movie_id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
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
        </div>
    );
}
