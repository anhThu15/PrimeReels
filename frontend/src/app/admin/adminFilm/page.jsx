import Link from "next/link"
export default function AdminFilm() {
    const id = 15;
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
                    <tr>
                        <th scope="row">
                            <input type="checkbox" />
                        </th>
                        <th scope="row">1</th>
                        <td className="d-flex align-items-center gap-2">
                            <img src="../images/imgFilm.jpg" alt="" style={{ width: "70px", height: "100%", objectFit: "cover" }}/>
                            <div className="d-flex flex-column">
                                <p>Anh Thầy Ngôi Sao</p>
                                <span className="bg-secondary text-white rounded-pill text-center" style={{width:'70px'}}>8 tập</span>
                            </div>
                        </td>
                        <td>Phim bộ</td>
                        <td>2024</td>
                        <td>
                            <div class=" bg-primary text-white rounded text-center mb-2">
                                Hài hước
                            </div>
                            <div class=" bg-primary text-white rounded text-center mb-2">
                                Tâm lý
                            </div>
                            <div class=" bg-primary text-white rounded text-center mb-2">
                                Gia đình
                            </div>
                        </td>
                        <td>
                            <div class="bg-success text-white rounded text-center">
                                Công Khai
                            </div>
                        </td>
                        <td>
                            8.200
                        </td>
                        <td>
                            4.5
                            <i class="fa-solid fa-star mx-3" style={{ color: "gold" }}></i>
                        </td>
                        <td>
                            <Link href={`/admin/adminFilm/${id}`} className="btn btn-secondary">
                                <i class="fa-solid fa-pen"></i>
                            </Link>
                            <button className="btn btn-danger ms-2"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}