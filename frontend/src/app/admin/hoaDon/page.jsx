import Link from "next/link";

export default function hoaDon(){

    const id = 15;

    return(
        <>
            <div className=" container-fluid">
                <h2 className=" fw-bold">Hóa Đơn Giao Dịch</h2>
                <div className="row">
                    <div className="col-2">
                        <form class="d-flex" role="search">
                            <input class="form-control" type="search" placeholder="Tìm kiếm" aria-label="Search"/>
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
                      <th scope="col">ID</th>
                      <th scope="col">MÃ HÓA ĐƠN</th>
                      <th scope="col">SỐ TIỀN</th>
                      <th scope="col">TÊN GÓI</th>
                      <th scope="col">NGƯỜI DÙNG</th>
                      <th scope="col">TRẠNG THÁI</th>
                      <th scope="col">HÌNH THỨC THANH TOÁN</th>
                      <th scope="col">THỜI GIAN TẠO</th>
                      <th scope="col">TÁC VỤ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>pf_kjdheufnch</td>
                      <td>39.000đ</td>
                      <td>@VIP39K</td>
                      <td>Nguyen Vy</td>
                      <td>
                          <div class=" bg-success text-white rounded-pill text-center">
                            Thành Công 
                          </div>
                      </td>
                      <td>Momo</td>
                      <td>01 Th10 2024 vào lúc 12 giờ 21 phút</td>
                      <td>
                        <Link href={`/admin/hoaDon/${id}`} className="btn btn-primary">
                            <i class="fa-solid fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">1</th>
                      <td>pf_kjdheufnch</td>
                      <td>39.000đ</td>
                      <td>@VIP39K</td>
                      <td>Nguyen Vy</td>
                      <td>
                          <div class=" bg-warning text-white rounded-pill text-center">
                            Đang Xử Lý 
                          </div>
                      </td>
                      <td>Momo</td>
                      <td>01 Th10 2024 vào lúc 12 giờ 21 phút</td>
                      <td>
                        <Link href={`/admin/hoaDon/${id}`} className="btn btn-primary">
                            <i class="fa-solid fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">1</th>
                      <td>pf_kjdheufnch</td>
                      <td>39.000đ</td>
                      <td>@VIP39K</td>
                      <td>Nguyen Vy</td>
                      <td>
                          <div class=" bg-success text-white rounded-pill text-center">
                            Thành Công 
                          </div>
                      </td>
                      <td>Momo</td>
                      <td>01 Th10 2024 vào lúc 12 giờ 21 phút</td>
                      <td>
                         <Link href={`/admin/hoaDon/${id}`} className="btn btn-primary">
                            <i class="fa-solid fa-eye"></i>
                         </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </>
    )
}