'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function chitiethoaDon({params}){
  const [hds, setHds] = useState([])

  useEffect(() => {
    const getHds = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoices/${params.id}`,{ revalidate: 3600 }).then((res) => res.data)
        setHds(res)
      } catch (error) {
        console.log(error);
      }
    }

    getHds()
  },[])

    return(
        <>
            <div className=" container-fluid">
                <div className=" fw-bold"> 
                  <Link className="btn btn-danger mb-2 me-2" href='/administration/hoaDon'><i class="fa-solid fa-chevron-left"></i></Link> 
                  <span className="fs-4 ">Chi Tiết Hóa Đơn Giao Dịch</span> 
                </div>
                <div class="card">
                  <div class="card-body">
                    <h2 class="card-title text-center"> Mã Hóa Đơn: {hds.invoice_code}</h2>
                    <h6 class="card-title text-center"> {hds.created_at}</h6>
                    <div className="row row-cols-2 text-center">
                      <div className="col">
                        <p className="card-text">Họ và Tên: {hds?.user?.user_name}</p>
                        <p className="card-text">Giới Tính : {hds?.user?.gender}</p>
                        <p className="card-text">Email: {hds?.user?.email}</p>
                      </div>
                      <div className="col">
                        <p className="card-text">Phương Thức Thanh Toán: {hds.payment_method}</p>
                        <p className="card-text">Ví Điện Tử: {hds.payment_method}</p>
                        <p className="card-text">Tên Tài Khoản: thudeptry</p>
                      </div>
                    </div>
                      <table class="table table-borderless mt-3">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TÊN</th>
                            <th scope="col">Giá</th>
                            {/* <th scope="col">Thời gian</th> */}
                            <th scope="col">Ngày bắt đầu</th>
                            <th scope="col">Ngày kết thúc</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{hds.invoice_id}</th>
                            <td>{hds?.package?.name}</td>
                            <td>{hds.total?.toLocaleString()}đ</td>
                            {/* <td>1 ngày</td> */}
                            <td>{hds.start_date}</td>
                            <td>{hds.end_date}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colSpan={5}></th>
                            <td className="fw-bold">Thành tiền:{hds.total} </td>
                          </tr>
                          <tr>
                            <th colSpan={5}></th>
                            <td className="fw-bold">Mã Giảm giá: {hds?.voucher?.name} </td>
                          </tr>
                          <tr>
                            <th colSpan={5}></th>
                            <td className="fw-bold">Tổng cộng: {(hds.total * (1 - 0.10)).toLocaleString()}đ </td>
                          </tr>
                        </tfoot>
                      </table>
                  </div>
                </div>
            </div>
        </>
    )
}