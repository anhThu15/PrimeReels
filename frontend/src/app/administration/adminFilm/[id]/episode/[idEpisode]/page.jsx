"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
export default function Episode({params}) {
    const token = Cookies.get('token');
    const id = params.id;
    const idEpisode = params.idEpisode
    const router = useRouter()
    const { register: registerForm2, setValue, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 } } = useForm();
    const [episodes, setEpisodes] = useState([])

    useEffect(() =>{
        const getEpisodes = async () => {
           const res = await axios.get(`/api/movies/${id}/episodes/${idEpisode}`)
                                  .then((res) => res.data)
           setEpisodes(res.episode)
           setValue('episode_number', res.episode.episode_number)
           setValue('link', res.episode.video_url);
           setValue('duration', res.episode.duration);
           setValue('status', res.episode.status)
          } 
          if(id && idEpisode){
           getEpisodes();
          }
      },[id,idEpisode, setValue])

    //   console.log(episodes.episode);
      
     //  xử lý tập phim 
     const onUpdateEpisode = async (data) => {
        try {
          console.log(data);
        //   const token = localStorage.getItem('token');

        //   const formData = new FormData(); // Tạo FormData mới

        // // Thêm các trường dữ liệu vào FormData
        // formData.append('episode_number', data.episode_number); 
        // formData.append('duration', data.duration); 
        // formData.append('link', data.link);
        // formData.append('status', data.status); 

        // Gửi yêu cầu POST với FormData
        const res = await axios.put(`/api/movies/${id}/episodes/${episodes.episode_number}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data', // Đảm bảo kiểu nội dung là multipart/form-data
                // "Accept": "application/json"
            }
        }).then((res) => res.data);
            if (res) {
            //   alert('thành công ròi đi chữa lãnh hoy ~~~')
              toast.success("Thao tác thành công!")
              router.push(`/administration/adminFilm/${id}`)
            } else {
              // Xử lý hiển thị lỗi
              toast.error("Thao tác thất bại hãy kiểm tra lại !")
              console.error(result.error);
            }
          
        } catch (error) {
          console.log(error);
        }

        
    }

    
    return(
        <>
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/administration/adminFilm">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Cập Nhập Tập Phim</h3>
            </div>
            <form onSubmit={handleSubmitForm2(onUpdateEpisode)}>
                <div class="mb-3">
                    <label class="form-label">Tên Tập Phim</label>
                    <input type="number" class="form-control rounded" 
                        {...registerForm2('episode_number', { required: 'Tên Tập Phim là bắt buộc' })} />
                        {errorsForm2.episode_number && <div className="text-danger">{errorsForm2.episode_number.message}</div>}
                </div>
                <div class="mb-3">
                    <label class="form-label">Video</label>
                    <input type="text" class="form-control  rounded" 
                        {...registerForm2('link',)} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Khoảng Thời Gian </label>
                    <input type="text" class="form-control  rounded" 
                        {...registerForm2('duration', { required: 'Khoảng Thời Gian Tập Phim là bắt buộc' })} />
                        {errorsForm2.duration && <div className="text-danger">{errorsForm2.duration.message}</div>}
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Trạng Thái</label>
                    <select class="form-select" aria-label="Default select example"
                     {...registerForm2('status', { required: 'Trạng Thái Tập Phim là bắt buộc' })}>
                        <option selected value={1}>Công Khai</option>
                        <option value={0}>Không Công Khai</option>
                    </select>
                    {errorsForm2.status && <div className="text-danger">{errorsForm2.status.message}</div>}
                </div>
                <button type="submit" class="btn btn-primary">Cập Nhập Tập Phim </button>
            </form>

        </div>
        </>
    )



}