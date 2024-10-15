import Link from "next/link";

export default function danhMuc(){

    const id = 15;

    return(
        <>
            <div className=" container-fluid">
              <div className="row">
                <h2 className=" col fw-bold">Danh Mục</h2>
                <div className="col-2">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      + Thêm Danh Mục 
                    </button>
                    
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Tạo Mới Danh Mục</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              <form>
                                <div class="mb-3">
                                  <label class="form-label">Tên Danh Mục</label>
                                  <input type="text" class="form-select" />
                                </div>
                                <div class="mb-3">
                                  <label for="exampleInputPassword1" class="form-label">Trạng Thái</label>
                                  <select class="form-select" aria-label="Default select example">
                                    <option selected>Công Khai</option>
                                    <option value="1">Không Công Khai</option>
                                  </select>
                                </div>
                              </form>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
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
                      <th scope="col">TÊN DANH MỤC</th>
                      <th scope="col">SỐ LƯỢNG PHIM</th>
                      <th scope="col" className="text-center">TRẠNG THÁI</th>
                      <th scope="col">THỜI GIAN TẠO</th>
                      <th scope="col">TÁC VỤ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>PrimeReels Kids</td>
                      <td>39</td>
                      <td>
                          <div class=" bg-success text-white rounded-pill text-center">
                            Công Khai
                          </div>
                      </td>
                      <td>01 Th10 2024 vào lúc 12 giờ 21 phút</td>
                      <td>
                        <Link href={`/admin/danhMuc/${id}`} className="btn btn-secondary">
                            <i class="fa-solid fa-pen"></i>
                        </Link>
                        <button className="btn btn-danger ms-2"><i class="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </>
    )
}