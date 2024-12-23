"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
export default function TheLoai() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [genreToDelete, setGenreToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [genresPerPage, setGenresPerPage] = useState(10);

  // Fetch genres
  const fetchGenre = async () => {
    try {
      const token = Cookies.get('token');
      const res = await fetch(`/api/genres`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.error('Error fetching genres:', res.status);
        return;
      }
      const newData = await res.json();
      const sortedData = newData.sort((a, b) => b.genre_id - a.genre_id);
      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Handle genre deletion
  const handleDelete = async () => {
    if (!genreToDelete) return;

    try {
      const token = Cookies.get('token');
      const res = await fetch(`/api/genres/${genreToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setData(data.filter((genre) => genre.genre_id !== genreToDelete));
        setFilteredData(filteredData.filter((genre) => genre.genre_id !== genreToDelete));
        console.log('Deleted genre successfully');
        toast.success("Xóa thể loại thành công")
      } else {
        toast.error("Thao tác thất bại hãy kiểm tra lại!")
        console.error('Error deleting genre:', res.status);
      }
    } catch (error) {
      console.error('Error deleting genre:', error);
    }

    setGenreToDelete(null);
  };

  // Set up Formik for adding genres
  const formik = useFormik({
    initialValues: {
      name: '',
      status: 1,
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Genre name is required'),
      status: Yup.number()
        .required('Status is required')
        .oneOf([0, 1], 'Invalid status'),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const token = Cookies.get('token');
        const res = await fetch(`/api/genres`, {
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
          setFilteredData([...filteredData, genre]);
          toast.success("Thêm thể loại thành công");
          formik.resetForm();

          const modalElement = document.getElementById('exampleModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
        } else {
          toast.error("Thao tác thất bại hãy kiểm tra lại!")
          console.error('Error adding genre:', res.status);
        }
      } catch (error) {
        console.error('Error adding genre:', error);
      }
    },
  });

  useEffect(() => {
    fetchGenre();
  }, []);

  useEffect(() => {
    const filtered = data.filter(genre => 
        genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
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

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / genresPerPage);
  const indexOfLastGenre = currentPage * genresPerPage;
  const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
  const currentGenres = filteredData.slice(indexOfFirstGenre, indexOfLastGenre);

  return (
    <div className="container-fluid">
      <div className="row">
        <h2 className="col fw-bold">Thể Loại</h2>
        <div className="col-2">
          <button type="button" className="btn btn-success mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + Thêm Mới
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
            <th scope="col" className="text-center">TRẠNG THÁI</th>
            <th scope="col">MÔ TẢ</th>
            <th scope="col">TÁC VỤ</th>
          </tr>
        </thead>
        <tbody>
          {currentGenres.map((genre,i) => (
            <tr key={genre.genre_id}>
              <th scope="row">{i+1}</th>
              <td>{genre.name}</td>
              <td>
                <div className={`bg-${genre.status ? 'success' : 'danger'} text-white rounded-pill text-center`}>
                  {genre.status ? 'Công Khai' : 'Không Công Khai'}
                </div>
              </td>
              <td>{genre.description}</td>
              <td>
                <Link className="btn btn-secondary" href={`/administration/theLoai/edit/${genre.genre_id}`}>
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

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>

      {/* Modal confirm delete */}
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

      {/* Modal add genre */}
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
