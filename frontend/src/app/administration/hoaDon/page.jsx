'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function hoaDon(){
  const token = Cookies.get('token');
  const [hds, setHds] = useState([])
  const [sorts, setSorts] = useState([])
  const [sortOrder, setSortOrder] = useState('0'); 
  const [filteredSorts, setFilteredSorts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  

  // useEffect(() => {
  //   const getHds = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoices`,{ revalidate: 3600 }).then((res) => res.data)
  //       setHds(res)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   getHds()
  // },[])

  const handleSort = async (sortOrder) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, { revalidate: 3600 });
    const data = res.data;

    if (sortOrder === '0') {
      // Mặc định - không sắp xếp
      setSorts(data);
    } else if (sortOrder === 'asc') {
      // Sắp xếp tăng dần
      const sortedData = data.sort((a, b) => a.price - b.price);
      setSorts(sortedData);
    } else if (sortOrder === 'des') {
      // Sắp xếp giảm dần
      const sortedData = data.sort((a, b) => b.price - a.price);
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
    const filteredData = sorts.filter((goi) =>
      goi.invoice_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSorts(filteredData);
  }, [searchTerm, sorts]); // Cập nhật khi từ khóa hoặc `sorts` thay đổi

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm
  };


    return(
        <>
            <div className=" container-fluid">
                <h2 className=" fw-bold">Hóa Đơn Giao Dịch</h2>
                <div className="row">
                    <div className="col-2">
                        <form class="d-flex" role="search">
                            <input class="form-control" type="search" placeholder="Tìm kiếm" aria-label="Search"           
                                  onChange={handleSearch}
                                  value={searchTerm}/>
                        </form>
                    </div>
                    <div className="col">
                              <select id="sortOrder" className="form-select w-25" onChange={handleChange} value={sortOrder}>
                                <option selected value={0}>Lọc Theo Giá </option>
                                <option value="asc">Tăng dần</option>
                                <option value="des">Giảm dần</option>
                              </select>
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
                    {filteredSorts.map((hd, i ) => {
                      return(
                        <>
                          <tr key={hd.invoice_id}>
                            <th scope="row">{i+1}</th>
                            <td>{hd.invoice_code}</td>
                            <td>{hd.total.toLocaleString()}đ</td>
                            <td>{hd?.package?.name}</td>
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
                              <Link href={`/administration/hoaDon/${hd.invoice_id}`} className="btn btn-primary">
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