"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
export default function danhMuc() {
  const [data, setData] = useState([]);
  const [movieTypeDelete, setMovieTypeDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [filteredData, setFilteredData] = useState([]);

  const fetchMovieTypes = async () => {
    try {
      const token = Cookies.get('token');
      const res = await fetch('http://127.0.0.1:8000/api/movie-types', {
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
      setFilteredData(newData); // Initialize filtered data
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thể loại:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      status: 1,
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên danh mục là bắt buộc'),
    }),
    onSubmit: async (values) => {
      try {
        const token = Cookies.get('token');
        const res = await fetch('http://127.0.0.1:8000/api/movie-types', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          const movieType = await res.json();
          setData([...data, movieType]);
          setFilteredData([...filteredData, movieType]); // Update filtered data
          toast.success("Thêm danh mục thành công")
          formik.resetForm();

          const modalElement = document.getElementById('exampleModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
        } else {
          toast.error("Thao tác thất bại hãy kiểm tra lại!")
          console.error('Lỗi khi thêm danh mục:', res.status);
        }
      } catch (error) {
        console.error('Lỗi khi thêm danh mục:', error);
      }
    },
  });

  const handleDelete = async () => {
    if (!movieTypeDelete) return;

    try {
      const token = Cookies.get('token');
      const res = await fetch(`http://127.0.0.1:8000/api/movie-types/${movieTypeDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setData(data.filter((movieType) => movieType.movie_type_id !== movieTypeDelete));
        setFilteredData(filteredData.filter((movieType) => movieType.movie_type_id !== movieTypeDelete)); // Update filtered data
        console.log('Xóa thể loại thành công');
        toast.success("Xóa thể loại thành công")
      } else {
        toast.error("Thao tác thất bại!")
        console.error('Lỗi khi xóa thể loại:', res.status);
      }
    } catch (error) {
      console.error('Lỗi khi xóa thể loại:', error);
    }

    setMovieTypeDelete(null);
  };

  useEffect(() => {
    fetchMovieTypes();
  }, []);


  useEffect(() => {
    const filtered = data.filter((movieType) =>
      movieType.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'des') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(filtered);
  }, [searchTerm, sortOrder, data]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h2 className="col fw-bold">Danh Mục</h2>
          <div className="col-2">
            <button type="button" className="btn btn-success mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              + Thêm Mới
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tạo Mới Danh Mục</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Tên Danh Mục</label>
                        <input
                          type="text"
                          className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                          {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="invalid-feedback">{formik.errors.name}</div>
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
        </div>
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
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-filter"></i> Lọc
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => setSortOrder('asc')}>A-Z</a></li>
                <li><a className="dropdown-item" onClick={() => setSortOrder('des')}>Z-A</a></li>
                <li><a className="dropdown-item" onClick={() => setSortOrder('0')}>Mặc định</a></li>
              </ul>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TÊN DANH MỤC</th>
              {/* <th scope="col">SỐ LƯỢNG PHIM</th> */}
              <th scope="col">TÁC VỤ</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((movieType) => (
              <tr key={movieType.movie_type_id}>
                <th scope="row">{movieType.movie_type_id}</th>
                <td>{movieType.name}</td>
                {/* <td>39</td> */}
                <td>
                  <Link href={`/administration/danhMuc/edit/${movieType.movie_type_id}`} className="btn btn-secondary">
                    <i className="fa-solid fa-pen"></i>
                  </Link>
                  <button 
                    className="btn btn-danger ms-2" 
                    onClick={() => setMovieTypeDelete(movieType.movie_type_id)} 
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
        <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmDeleteModalLabel">Xác Nhận Xóa</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Bạn có chắc chắn muốn xóa danh mục này?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Xóa</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
