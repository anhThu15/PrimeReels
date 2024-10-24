'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function goiVip(){
  const router = useRouter();
  const [gois, setGois] = useState([])
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const getGois = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/packages`,{ revalidate: 3600 }).then((res) => res.data)
      setGois(res)
    }

    getGois()

  },[])

  const onSubmit = async (data) =>{
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/packages`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((res) => res.data);
        if (res) {
          alert('thành công ròi đi chữa lãnh hoy ~~~')
          window.location.reload()
        } else {
          // Xử lý hiển thị lỗi
          console.error(result.error);
        }
      
    } catch (error) {
      console.log(error);
    }
    
  }

  const hanldeDelete = async (data) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/packages/${data}`,data)
                               .then((res)=>res.data)
        if (res) {
          alert('thành công ròi đi chữa lãnh hoy ~~~')
        } else {
          // Xử lý hiển thị lỗi
          console.error(result.error);
        }
      
    } catch (error) {
      console.log(error);
    }
  }

    return(
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
                      <th scope="col">TÊN GÓI</th>
                      <th scope="col">GIÁ GÓI</th>
                      <th scope="col">THỜI GIAN</th>
                      <th scope="col">THỜI GIAN TẠO</th>
                      <th scope="col">TÁC VỤ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gois.map((goi, i) => {
                      return(
                        <>
                          <tr key={goi.package_id}>
                            <th scope="row">{i+1}</th>
                            <td>{goi.name}</td>
                            <td>{goi.price.toLocaleString()}đ</td>
                            <td> {goi.duration} phút</td>
                            <td>{goi.created_at}</td>
                            <td>
                              <Link href={`/admin/goiVip/${goi.package_id}`} className="btn btn-secondary">
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