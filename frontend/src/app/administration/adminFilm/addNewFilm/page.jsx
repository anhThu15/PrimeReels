'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
export default function AddNewFilm() {
    const token = Cookies.get('token');
    const [types, setTypes] = useState([])
    const router = useRouter()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const getTypes = async () => {
            const res = await axios.get(`/api/movie-types`).then((res) => res.data)
            setTypes(res)
        }
        getTypes()
    },[])

    const onSubmit = async (data) =>{
        try {
            console.log(data);
            
        //   const token = localStorage.getItem('token');
          const res = await axios.post(`/api/movies`, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }).then((res) => res.data);
            if (res) {
            //   alert('thành công ròi đi chữa lãnh hoy ~~~')
              toast.success("Thêm phim thành công")
              router.push('/administration/adminFilm')
            } else {
              // Xử lý hiển thị lỗi
              toast.error("Thêm thất bại hãy kiểm tra lại thao tác")
              console.error(result.error);
            }
          
        } catch (error) {
          console.log(error);
        }
        
      }


    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/administration/adminFilm">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Tạo Mới Bộ Phim</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow mt-2 rounded">
                <button className="btn btn-primary mb-3">Lưu</button>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Tên Phim</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên bộ phim"
                                {...register('title', { required: 'Tiêu Đề Phim là bắt buộc' })} />
                                {errors.title && <div className="text-danger">{errors.title.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Poster Phim</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập Poster bộ phim"
                                {...register('poster', { required: 'Poster Phim là bắt buộc' })} />
                                {errors.poster && <div className="text-danger">{errors.poster.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Banner Phim</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập banner bộ phim"
                                {...register('banner', { required: 'Banner Phim là bắt buộc' })} />
                                {errors.banner && <div className="text-danger">{errors.banner.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorBio" className="form-label">Mô tả</label>
                            <textarea className="form-control rounded" id="actorBio" rows="10" placeholder="Mô tả bộ phim"
                                {...register('description', { required: 'Mô Tả Phim là bắt buộc' })} />
                                {errors.description && <div className="text-danger">{errors.description.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Đạo diễn</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên đạo diễn bộ phim" 
                                {...register('director', { required: 'Đạo diễn Phim là bắt buộc' })} />
                                {errors.director && <div className="text-danger">{errors.director.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Thời Gian</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập thời lượng của bộ phim" 
                                {...register('duration', { required: 'Thời Gian Phim là bắt buộc' })} />
                                {errors.duration && <div className="text-danger">{errors.duration.message}</div>}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="countryFilm" className="form-label">Quốc Gia</label>
                            <input type="text" className="form-control rounded" id="countryFilm" placeholder="Nhập quốc gia"
                                {...register('country', { required: 'Đất Nước là bắt buộc' })} />
                                {errors.country && <div className="text-danger">{errors.country.message}</div>} 
                        </div>
                        <div className="mb-3">
                            <label htmlFor="countryFilm" className="form-label">Trạng thái</label>
                            <select class="form-select" aria-label="Default select example" 
                            {...register('status', { required: 'Trạng Thái là bắt buộc' })} >
                                <option selected value="1">Công khai</option>
                                <option value="0">Không công khai</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="countryFilm" className="form-label">Loại phim</label>
                            <select class="form-select" aria-label="Default select example"
                            {...register('movie_type_id', { required: 'Trạng Thái là bắt buộc' })}>
                                {types.map((type) => {
                                    return (
                                        <>
                                            <option value={type.movie_type_id}>{type.name}</option>
                                        </>
                                    )
                                })}
                            </select>
                            <input type="hidden" value={Number(1)}{...register('views')} />
                            <input type="hidden" value={Number(1)}{...register('rating')} />
                            <input type="hidden" value={Number(1)}{...register('favorites_count')} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}