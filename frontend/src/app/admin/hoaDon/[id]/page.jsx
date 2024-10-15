import Link from "next/link";

export default function chitiethoaDon({params}){
    return(
        <>
            <div className=" container-fluid">
                <div className=" fw-bold"> 
                  <Link className="btn btn-danger mb-2 me-2" href='/admin/hoaDon'><i class="fa-solid fa-chevron-left"></i></Link> 
                  <span className="fs-4 ">Chi Tiết Hóa Đơn Giao Dịch</span> 
                </div>
                <div class="card">
                  <div class="card-body">
                    <h2 class="card-title text-center"> Mã Hóa Đơn: {params.id}</h2>
                    <h6 class="card-title text-center"> Ngày 01 tháng 10 năm 2024</h6>
                    <div className="row row-cols-2 text-center">
                      <div className="col">
                        <p className="card-text">Họ và Tên: Nguyễn Trần Anh Thư </p>
                        <p className="card-text">Số Điện Thoại: 01231798</p>
                        <p className="card-text">Email: thuntaps35657@fpt.edu</p>
                      </div>
                      <div className="col">
                        <p className="card-text">Phương Thức Thanh Toán: Momo</p>
                        <p className="card-text">Ví Điện Tử: momo</p>
                        <p className="card-text">Tên Tài Khoản: thudeptry</p>
                      </div>
                    </div>
                      <table class="table table-borderless mt-3">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TÊN</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Ngày bắt đầu</th>
                            <th scope="col">Ngày kết thúc</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>PrimeReelsVip</td>
                            <td>39.000đ</td>
                            <td>1 ngày</td>
                            <td>01 Th10 2024 </td>
                            <td>02 Th10 2024 </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colSpan={5}></th>
                            <td className="fw-bold">Thành tiền: 9999999 </td>
                          </tr>
                          <tr>
                            <th colSpan={5}></th>
                            <td className="fw-bold">Giảm giá: 9999999 </td>
                          </tr>
                          <tr>
                            <th colSpan={5}></th>
                            <td className="fw-bold">Tổng cộng: 9999999 </td>
                          </tr>
                        </tfoot>
                      </table>
                  </div>
                </div>
            </div>
        </>
    )
}