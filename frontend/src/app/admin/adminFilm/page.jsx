'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminFilm() {
    const router = useRouter();
    const [films, setFilms] = useState([])
    const [sorts, setSorts] = useState([])
    const [sortOrder, setSortOrder] = useState('0');
    const [filteredSorts, setFilteredSorts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); //trang đầu tiên luôn là 1
    const filmsPerPage = 10; //giới hạn 10 bộ phim trên mỗi trang

    useEffect(() => {
        const getFilms = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`, { revalidate: 3600 }).then((res) => res.data)
            setFilms(res)
        }

        getFilms()

    }, [])

    const handleDelete = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${data}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then((res) => res.data);
            if (res) {
                alert('thành công ròi đi chữa lãnh hoy ~~~')
                window.location.reload()
            } else {
                // Xử lý hiển thị lỗi
                console.error(result.error);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleSort = async (sortOrder) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`, { revalidate: 3600 });
        const data = res.data;

        if (sortOrder === '0') {
            // Mặc định - không sắp xếp
            setSorts(data);
        } else if (sortOrder === 'asc') {
            // Sắp xếp tăng dần
            const sortedData = data.sort((a, b) => a.views - b.views);
            setSorts(sortedData);
        } else if (sortOrder === 'des') {
            // Sắp xếp giảm dần
            const sortedData = data.sort((a, b) => b.views - a.views);
            setSorts(sortedData);
        }
    };

    // Gọi hàm `handleSort` khi component được mount
    useEffect(() => {
        handleSort(sortOrder);
    }, []); // Chạy chỉ một lần khi component mount

    // Xử lý khi `onChange` từ người dùng
    const handleChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
        handleSort(value);
    };

    useEffect(() => {
        const filteredData = sorts.filter((phim) =>
            phim.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSorts(filteredData);
    }, [searchTerm, sorts]); // Cập nhật khi từ khóa hoặc `sorts` thay đổi

    const handleSearch = (e) => {
        setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm
    };

    //tính toán
    const indexOfLastFilm = currentPage * filmsPerPage;  //tính phim cuối cùng trong 1 trang, giới hạn là 10
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage; //10 bộ phim trên 1 trang, thì lấy 10 - 10 = 0 ( số 0 trong mảng là điểm bắt đầu)
    const currentFilms = filteredSorts.slice(indexOfFirstFilm, indexOfLastFilm);  //slice dùng để cắt lấy từ số 0 - 9 (tức đủ 10 bộ phim)

    const totalPages = Math.ceil(filteredSorts.length / filmsPerPage); //lấy tổng số phim đang có chia cho page ví dụ có 35/10 = 4 (tức là sẽ có 4 trang, mỗi trang 10 bộ phim)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className=" col fw-bold">Danh Sách Phim</h2>
                <div className="col-2 mt-2">
                    <Link href="/admin/adminFilm/addNewFilm" className="btn btn-success">
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
                            <select id="sortOrder" className="form-select" onChange={handleChange} value={sortOrder}>
                                <option selected value={0}>Lọc Theo Đánh Giá </option>
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
                                {film.status == 1 ? (
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
                                <Link href={`/admin/adminFilm/${film.movie_id}`} className="btn btn-secondary">
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
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

        </div>
    )
}
