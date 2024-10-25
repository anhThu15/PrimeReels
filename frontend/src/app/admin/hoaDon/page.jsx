'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function hoaDon(){
  const [hds, setHds] = useState([])

  useEffect(() => {
    const getHds = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoices`,{ revalidate: 3600 }).then((res) => res.data)
        setHds(res)
      } catch (error) {
        console.log(error);
      }
    }

    getHds()
  },[])

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
                    {hds.map((hd, i ) => {
                      return(
                        <>
                          <tr key={hd.invoice_id}>
                            <th scope="row">{i+1}</th>
                            <td>{hd.invoice_code}</td>
                            <td>{hd.total.toLocaleString()}đ</td>
                            <td>@VIP39K</td>
                            <td>{hd.user.user_name}</td>
                            <td>
                              {hd.status == 'success' ? (
                                <div class=" bg-success text-white rounded-pill text-center">
                                  Thành Công 
                                </div>):(
                                <div class=" bg-warning text-white rounded-pill text-center">
                                  Đang Xử Lý 
                                </div>)}
                            </td>
                            <td>{hd.payment_method}</td>
                            <td>{hd.created_at}</td>
                            <td>
                              <Link href={`/admin/hoaDon/${hd.invoice_id}`} className="btn btn-primary">
                                  <i class="fa-solid fa-eye"></i>
                              </Link>
                            </td>
                          </tr>
                        </>
                      )
                    })}
                  </tbody>
                </table>
            </div>
        </>
    )
}