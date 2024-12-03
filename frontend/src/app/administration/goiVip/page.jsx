'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
export default function goiVip() {
  const token = Cookies.get('token');
  const router = useRouter();
  const [gois, setGois] = useState([])
  const [sorts, setSorts] = useState([])
  const [sortOrder, setSortOrder] = useState('0');
  const [filteredSorts, setFilteredSorts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const getGois = async () => {
      const res = await axios.get(`/api/packages`, { revalidate: 3600 }).then((res) => res.data)
      // setGois(res)
      // Sắp xếp mặc định theo ID (mới nhất -> cũ nhất)
      const sortedData = res.sort((a, b) => b.package_id - a.package_id);

      setGois(sortedData);
      setSorts(sortedData); // Lưu danh sách sắp xếp ban đầu
      setFilteredSorts(sortedData); // Lưu danh sách đã sắp xếp vào bộ lọc
    }

    getGois()

  }, [])

  const onSubmit = async (data) => {
    try {
      // const token = localStorage.getItem('token');
      const res = await axios.post(`/api/packages`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((res) => res.data);
      if (res) {
        // alert('thành công ròi đi chữa lãnh hoy ~~~')
        toast.success("Thao tác thành công")
        window.location.reload()
      } else {
        toast.error("Thao tác thất bại hãy kiểm tra lại!")
        // Xử lý hiển thị lỗi
        console.error(result.error);
      }

    } catch (error) {
      console.log(error);
    }

  }

  const hanldeDelete = async (data) => {
    try {
      // const token = localStorage.getItem('token');
      const res = await axios.delete(`/api/packages/${data}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((res) => res.data);
      if (res) {
        // alert('thành công ròi đi chữa lãnh hoy ~~~')
        toast.success("Thao tác thành công")
        window.location.reload()
      } else {
        toast.error("Thao tác thất bại hãy kiểm tra lại!")
        // Xử lý hiển thị lỗi
        console.error(result.error);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleSort = (sortOrder) => {
    let sortedData = [...gois];

    if (sortOrder === 'asc') {
      // Sắp xếp theo giá tăng dần
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'des') {
      // Sắp xếp theo giá giảm dần
      sortedData.sort((a, b) => b.price - a.price);
    } else {
      // Mặc định: Sắp xếp theo ID (mới nhất -> cũ nhất)
      sortedData.sort((a, b) => b.package_id - a.package_id);
    }

    setSorts(sortedData);
    setFilteredSorts(sortedData); // Cập nhật danh sách đã sắp xếp
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
      goi.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSorts(filteredData);
  }, [searchTerm, sorts]); // Cập nhật khi từ khóa hoặc `sorts` thay đổi

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Cập nhật từ khóa tìm kiếm
  };

  return (
    <>
      <div className=" container-fluid">
        <div className="row">
          <h2 className=" col fw-bold">Gói VIP</h2>
          <div className="col-2">
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
              + Thêm Gói VIP
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Tạo Gói Mới</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="mb-3">
                        <label class="form-label">Tên Gói</label>
                        <input type="text" class="form-select" {...register('name', { required: 'Tên Gói là bắt buộc' })} />
                        {errors.name && <div className="text-danger">{errors.name.message}</div>}
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Giá Gói</label>
                        <input type="number" class="form-select" {...register('price', { required: 'Giá Gói là bắt buộc' })} />
                        {errors.price && <div className="text-danger">{errors.price.message}</div>}
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời Gian</label>
                        <input type="number" class="form-select" {...register('duration', { required: 'Thời Gian Gói là bắt buộc' })} />
                        {errors.duration && <div className="text-danger">{errors.duration.message}</div>}
                      </div>
                      <button type="submit" class="btn btn-primary">Tạo Gói</button>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <form class="d-flex" role="search">
              <input class="form-control" type="search" placeholder="Tìm kiếm" aria-label="Search"
                onChange={handleSearch}
                value={searchTerm} />
            </form>
          </div>
          <div className="col">
            <div class="dropdown">
              <div className="mb-3 w-25">
                <select id="sortOrder" className="form-select" onChange={(e) => handleSort(e.target.value)} value={sortOrder}>
                  <option value="0">Mặc định (ID mới nhất)</option>
                  <option value="asc">Giá tăng dần</option>
                  <option value="des">Giá giảm dần</option>
                </select>
              </div>
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
              <th scope="col">TÊN GÓI</th>
              <th scope="col">GIÁ GÓI</th>
              <th scope="col">THỜI GIAN</th>
              <th scope="col">THỜI GIAN TẠO</th>
              <th scope="col">TÁC VỤ</th>
            </tr>
          </thead>
          <tbody>
            {filteredSorts.map((goi, i) => {
              return (
                <>
                  <tr key={goi.package_id}>
                    <th scope="row">{i+1}</th>
                    <td>{goi.name}</td>
                    <td>{goi.price.toLocaleString()}đ</td>
                    <td> {goi.duration} Ngày</td>
                    <td>{goi.created_at}</td>
                    <td>
                      <Link href={`/administration/goiVip/${goi.package_id}`} className="btn btn-secondary">
                        <i class="fa-solid fa-pen"></i>
                      </Link>
                      <button className="btn btn-danger ms-2" onClick={() => hanldeDelete(goi.package_id)}><i class="fa-solid fa-trash"></i></button>
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