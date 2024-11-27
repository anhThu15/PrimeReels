'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function hoaDon() {
  const token = Cookies.get('token');
  const [hds, setHds] = useState([])
  const [sorts, setSorts] = useState([])
  const [sortOrder, setSortOrder] = useState('0');
  const [filteredSorts, setFilteredSorts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10; // Số lượng hóa đơn mỗi trang
  // useEffect(() => {
  //   const getHds = async () => {
  //     try {
  //       const res = await axios.get(`/api/invoices`,{ revalidate: 3600 }).then((res) => res.data)
  //       setHds(res)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   getHds()
  // },[])

  // const handleSort = async (sortOrder) => {
  //   const res = await axios.get(`/api/invoices`, { revalidate: 3600 });
  //   const data = res.data;

  //   if (sortOrder === '0') {

  //     setSorts(data);
  //   } else if (sortOrder === 'asc') {

  //     const sortedData = data.sort((a, b) => a.price - b.price);
  //     setSorts(sortedData);
  //   } else if (sortOrder === 'des') {

  //     const sortedData = data.sort((a, b) => b.price - a.price);
  //     setSorts(sortedData);
  //   }
  // };

  const handleSort = async (sortOrder) => {
    const res = await axios.get(`/api/invoices`, { revalidate: 3600 });
    const data = res.data;

    if (sortOrder === '0') {
      // Mặc định - Sắp xếp theo ID mới nhất đến cũ nhất
      const sortedData = data.sort((a, b) => b.invoice_id - a.invoice_id);
      setSorts(sortedData);
    } else if (sortOrder === 'asc') {
      // Sắp xếp tăng dần theo giá
      const sortedData = data.sort((a, b) => a.total - b.total);
      setSorts(sortedData);
    } else if (sortOrder === 'des') {
      // Sắp xếp giảm dần theo giá
      const sortedData = data.sort((a, b) => b.total - a.total);
      setSorts(sortedData);
    }

    setFilteredSorts(data); // Cập nhật danh sách lọc
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

  // Tìm kiếm
  useEffect(() => {
    const filteredData = sorts.filter((hd) =>
      hd.invoice_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSorts(filteredData);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  }, [searchTerm, sorts]);

  // Tính toán phân trang
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;

  // Hóa đơn hiển thị trong trang hiện tại
  const currentInvoices = filteredSorts.slice(indexOfFirstInvoice, indexOfLastInvoice);

  // Tổng số trang
  const totalPages = Math.ceil(filteredSorts.length / invoicesPerPage);

  // Chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  return (
    <>
      <div className=" container-fluid">
        <h2 className=" fw-bold">Hóa Đơn Giao Dịch</h2>
        <div className="row">
          <div className="col-2">
            <form className="d-flex" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Tìm kiếm"
                aria-label="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </form>
          </div>
          <div className="col">
            <select id="sortOrder" className="form-select w-25" onChange={handleChange} value={sortOrder}>
              <option selected value={0}>Mặc Định (Mới Nhất)</option>
              <option value="asc">Tăng dần</option>
              <option value="des">Giảm dần</option>
            </select>
          </div>
          {/* <div className="col-1">
            <div class="dropdown">
              <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                10
              </button>
              <div className="col">
                <select id="sortOrder" className="form-select w-25" onChange={handleChange} value={sortOrder}>
                  <option selected value={0}>Lọc Theo Giá </option>
                  <option value="asc">Tăng dần</option>
                  <option value="des">Giảm dần</option>
                </select>
              </div>
            </div>
          </div> */}
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
          {/* <tbody>
            {filteredSorts.map((hd, i) => {
              return (
                <>
                  <tr key={hd.invoice_id}>
                    <th scope="row">{hd.invoice_id}</th>
                    <td>{hd.invoice_code}</td>
                    <td>{hd.total.toLocaleString()}đ</td>
                    <td>{hd?.package?.name}</td>
                    <td>{hd.user.user_name}</td>
                    <td>
                      {hd.status == 'success' ? (
                        <div class=" bg-success text-white rounded-pill text-center">
                          Thành Công
                        </div>) : (
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
          </tbody> */}
          <tbody>
            {currentInvoices.map((hd, i) => (
              <tr key={hd.invoice_id}>
                <th scope="row">{hd.invoice_id}</th>
                <td>{hd.invoice_code}</td>
                <td>{hd.total.toLocaleString()}đ</td>
                <td>{hd?.package?.name}</td>
                <td>{hd.user.user_name}</td>
                <td>
                  {hd.status === 'success' ? (
                    <div className="bg-success text-white rounded-pill text-center">Thành Công</div>
                  ) : (
                    <div className="bg-warning text-white rounded-pill text-center">Đang Xử Lý</div>
                  )}
                </td>
                <td>{hd.payment_method}</td>
                <td>{new Date(hd.created_at).toLocaleDateString()}</td>
                <td>
                  <Link href={`/administration/hoaDon/${hd.invoice_id}`} className="btn btn-primary">
                    <i className="fa-solid fa-eye"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>

      </div>
    </>
  )
}