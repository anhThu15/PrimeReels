import Link from "next/link"

export default function Account(){
    const id = 15;
    return(
        <div className="container-fluid">
            <div className="row">
                <h2 className=" col fw-bold">Tài khoản</h2>
                <div className="col-2 mt-2">
                    <Link href="/admin/account/addAccount" class="btn btn-danger">
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
                        <th scope="col">AVATAR</th>
                        <th scope="col">TÊN NGƯỜI DÙNG</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">GIỚI TÍNH</th>
                        <th scope="col">VAI TRÒ</th>
                        <th scope="col">TRẠNG THÁI</th>
                        <th scope="col">THỜI GIAN TẠO</th>
                        <th scope="col">TÁC VỤ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <input type="checkbox" />
                        </th>
                        <th scope="row">1</th>
                        <td>
                            <img src="../images/avatarActor1.jpg" alt="" style={{width: "40px", height:"40px", objectFit:"cover"}} className="rounded-circle" />
                        </td>
                        <td>Nguyen Park Jimin</td>
                        <td>
                            nguyenjimin@gmail.com 
                        </td>
                        <td>Chưa xác định</td>
                        <td>
                            <div class=" bg-primary text-white rounded text-center mb-2">
                                Khách hàng
                            </div>
                        </td>
                        <td>Trạng thái</td>
                        <td style={{width:"15%"}}>
                            01 Th10 2024 
                            vào lúc 12 giờ 21 phút</td>
                        <td>
                            <Link href={`/admin/account/${id}`} className="btn btn-secondary">
                            <i class="fa-solid fa-pen"></i>
                            </Link>
                            <button className="btn btn-danger ms-2"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <input type="checkbox" />
                        </th>
                        <th scope="row">1</th>
                        <td>
                            <img src="../images/avatarActor1.jpg" alt="" style={{width: "40px", height:"40px", objectFit:"cover"}} className="rounded-circle" />
                        </td>
                        <td>Nguyen Park Jimin</td>
                        <td>
                            nguyenjimin@gmail.com 
                        </td>
                        <td>Chưa xác định</td>
                        <td>
                            <div class=" bg-secondary text-white rounded text-center mb-2">
                                Quản trị
                            </div>
                        </td>
                        <td>Trạng thái</td>
                        <td style={{width:"15%"}}>
                            01 Th10 2024 
                            vào lúc 12 giờ 21 phút</td>
                        <td>
                            <Link href="/admin/accountAdmin" className="btn btn-secondary">
                            <i class="fa-solid fa-pen"></i>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}