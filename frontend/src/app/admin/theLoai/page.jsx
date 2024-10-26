"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from 'js-cookie';

export default function TheLoai() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [genreToDelete, setGenreToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  // Hàm lấy danh sách thể loại
  const fetchGenre = async () => {
    try {
      const token = Cookies.get('token');
      const res = await fetch('http://127.0.0.1:8000/api/genres', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.error('Lỗi khi lấy danh sách thể loại:', res.status);
        return;
      }
      const newData = await res.json();
      setData(newData);
      setFilteredData(newData); // Cập nhật filteredData
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thể loại:', error);
    }
  };

  // Hàm xử lý xóa thể loại
  const handleDelete = async () => {
    if (!genreToDelete) return;

    try {
      const token = Cookies.get('token');
      const res = await fetch(`http://127.0.0.1:8000/api/genres/${genreToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setData(data.filter((genre) => genre.genre_id !== genreToDelete));
        setFilteredData(filteredData.filter((genre) => genre.genre_id !== genreToDelete)); // Cập nhật filteredData
        console.log('Xóa thể loại thành công');
      } else {
        console.error('Lỗi khi xóa thể loại:', res.status);
      }
    } catch (error) {
      console.error('Lỗi khi xóa thể loại:', error);
    }

    setGenreToDelete(null); // Reset lại trạng thái sau khi xóa
  };

  // Thiết lập Formik cho việc thêm thể loại
  const formik = useFormik({
    initialValues: {
      name: '',
      status: 1,
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên thể loại là bắt buộc'),
      status: Yup.number()
        .required('Trạng thái là bắt buộc')
        .oneOf([0, 1], 'Trạng thái không hợp lệ'),
      description: Yup.string().required("Mô tả là bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        const token = Cookies.get('token');
        const res = await fetch('http://127.0.0.1:8000/api/genres', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          const genre = await res.json();
          setData([...data, genre]);
          setFilteredData([...filteredData, genre]); // Cập nhật filteredData
          formik.resetForm(); // Reset form sau khi thêm thành công

          const modalElement = document.getElementById('exampleModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
        } else {
          console.error('Lỗi khi thêm thể loại:', res.status);
        }
      } catch (error) {
        console.error('Lỗi khi thêm thể loại:', error);
      }
    },
  });

  useEffect(() => {
    fetchGenre(); // Lấy dữ liệu khi component được mount
  }, []);

  useEffect(() => {
    const filtered = data.filter(genre => 
      genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  useEffect(() => {
    let sortedData = [...filteredData];
    if (sortOrder === 'asc') {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredData(sortedData);
  }, [sortOrder]);

  return (
    <div className="container-fluid">
      <div className="row">
        <h2 className="col fw-bold">Thể Loại</h2>
        <div className="col-2">
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + Thêm Thể Loại
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <form className="d-flex" role="search" onSubmit={e => e.preventDefault()}>
            <input 
              className="form-control" 
              type="search" 
              placeholder="Tìm kiếm" 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </form>
        </div>
        <div className="col">
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-solid fa-filter"></i> Lọc
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={() => setSortOrder('asc')}>A-Z</a></li>
              <li><a className="dropdown-item" onClick={() => setSortOrder('desc')}>Z-A</a></li>
            </ul>
          </div>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">TÊN THỂ LOẠI</th>
            <th scope="col">SỐ LƯỢNG PHIM</th>
            <th scope="col" className="text-center">TRẠNG THÁI</th>
            <th scope="col">MÔ TẢ</th>
            <th scope="col">TÁC VỤ</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((genre) => (
            <tr key={genre.genre_id}>
              <th scope="row">{genre.genre_id}</th>
              <td>{genre.name}</td>
              <td>39</td>
              <td>
                <div className={`bg-${genre.status ? 'success' : 'danger'} text-white rounded-pill text-center`}>
                  {genre.status ? 'Công Khai' : 'Không Công Khai'}
                </div>
              </td>
              <td>{genre.description}</td>
              <td>
                <Link className="btn btn-secondary" href={`/admin/theLoai/edit/${genre.genre_id}`}>
                  <i className="fa-solid fa-pen"></i>
                </Link>
                <button 
                  className="btn btn-danger ms-2" 
                  onClick={() => setGenreToDelete(genre.genre_id)} 
                  data-bs-toggle="modal" 
                  data-bs-target="#confirmDeleteModal"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal xác nhận xóa */}
      <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmDeleteModalLabel">Xác Nhận Xóa</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Bạn có chắc chắn muốn xóa thể loại này?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Xóa</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal thêm thể loại */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Tạo Mới Thể Loại</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tên Thể Loại</label>
                  <input
                    type="text"
                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label">Trạng Thái</label>
                  <select
                    className={`form-select ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
                    {...formik.getFieldProps('status')}
                  >
                    <option value="1">Công Khai</option>
                    <option value="0">Không Công Khai</option>
                  </select>
                  {formik.touched.status && formik.errors.status ? (
                    <div className="invalid-feedback">{formik.errors.status}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label">Mô Tả</label>
                  <textarea
                    className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                    {...formik.getFieldProps('description')}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="invalid-feedback">{formik.errors.description}</div>
                  ) : null}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                  <button type="submit" className="btn btn-primary">Xác Nhận</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
