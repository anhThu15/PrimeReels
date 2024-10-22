import Link from "next/link"
export default function AdminActor() {
    const id = 15;
    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className=" col fw-bold">Diễn viên</h2>
                <div className="col-2 mt-2">
                    <Link href="/admin/actor/addActor" class="btn btn-danger">
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
                        <th scope="col">TÊN</th>
                        <th scope="col">TIỂU SỬ</th>
                        <th scope="col">SINH NHẬT</th>
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
                            <img src="../images/avatarActor1.jpg" alt="" style={{width: "50px", height:"100%", objectFit:"cover"}} className="rounded-circle" />
                        </td>
                        <td>Victor Dobronravov</td>
                        <td style={{width:"30%"}}>
                            Viktor Dobronravov, sinh ngày 8 tháng 3 năm 1983 tại Taganrog, Nga, là một diễn viên nổi tiếng của Nga, con trai của diễn viên Fyodor Dobronravov.  
                        </td>
                        <td>08/03/1983</td>
                        <td>
                            <Link href={`/admin/actor/${id}`} className="btn btn-secondary">
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