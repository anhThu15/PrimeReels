'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminFilm() {
    const router = useRouter();
    const [films, setFilms] = useState([])

    useEffect(() => {
        const getFilms = async () => {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`,{ revalidate: 3600 }).then((res) => res.data)
          setFilms(res)
        }
    
        getFilms()
    
    },[])


    const hanldeDelete = async (data) => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${data}`,{
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

    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className=" col fw-bold">Diễn Sách Phim</h2>
                <div className="col-2 mt-2">
                    <Link href="/admin/adminFilm/addNewFilm" class="btn btn-danger">
                        + Thêm Mới
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <form class="d-flex" role="search">
                        <input class="form-control" type="search" placeholder="Tìm kiếm" aria-label="Search" />
                    </form>
                </div>
                <div className="col">
                    <div class="dropdown">
                        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-filter"></i> Lọc
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">A-Z</a></li>
                            <li><a class="dropdown-item" href="#">Z-A</a></li>
                            <li><a class="dropdown-item" href="#">...</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-1">
                    <div class="dropdown">
                        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            10
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">20</a></li>
                            <li><a class="dropdown-item" href="#">30</a></li>
                            <li><a class="dropdown-item" href="#">...</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">
                            <input type="checkbox" />
                        </th>
                        <th scope="col">ID</th>
                        <th scope="col">PHIM</th>
                        {/* <th scope="col">LOẠI PHIM</th> */}
                        <th scope="col">NĂM PHÁT HÀNH</th>
                        {/* <th scope="col">THỂ LOẠI PHIM</th> */}
                        <th scope="col">TRẠNG THÁI</th>
                        <th scope="col">LƯỢT XEM</th>
                        <th scope="col">RATING</th>
                        <th scope="col">TÁC VỤ</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map((film, i ) => {
                        return(
                            <>
                                <tr key={film.movie_id}>
                                    <th scope="row">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="row">{i+1}</th>
                                    <td className="d-flex align-items-center gap-2">
                                        <img src={film.poster} alt="" style={{ width: "70px", height: "100%", objectFit: "cover" }}/>
                                        <div className="d-flex flex-column">
                                            <p>{film.title}</p>
                                            <span className="bg-secondary text-white rounded-pill text-center" style={{width:'70px'}}>8 tập</span>
                                        </div>
                                    </td>
                                    {/* <td>
                                        {film.movie_type_id}
                                    </td> */}
                                    <td>{film.created_at}</td>
                                    {/* <td>
                                        <div class=" bg-primary text-white rounded text-center mb-2">
                                            Hài hước
                                        </div>
                                        <div class=" bg-primary text-white rounded text-center mb-2">
                                            Tâm lý
                                        </div>
                                        <div class=" bg-primary text-white rounded text-center mb-2">
                                            Gia đình
                                        </div>
                                    </td> */}
                                    <td>
                                        {film.status == 1 ? (<div class="bg-success text-white rounded text-center">
                                            Công Khai
                                        </div>):(<div class="bg-warning text-white rounded text-center">
                                            Không Công Khai
                                        </div>)}
                                        
                                    </td>
                                    <td>
                                        {film.views}
                                    </td>
                                    <td>
                                        {film.rating}
                                        <i class="fa-solid fa-star mx-3" style={{ color: "gold" }}></i>
                                    </td>
                                    <td>
                                        <Link href={`/admin/adminFilm/${film.movie_id}`} className="btn btn-secondary">
                                            <i class="fa-solid fa-pen"></i>
                                        </Link>
                                        <button className="btn btn-danger ms-2" onClick={() => hanldeDelete(film.movie_id)}><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}