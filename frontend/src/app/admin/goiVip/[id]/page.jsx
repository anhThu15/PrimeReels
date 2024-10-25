'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function chitietgoiVip({params}){
  const id = params.id
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [goi, setGoi] = useState(null);

  useEffect(() =>{
    const getGoi = async () => {
       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/packages/${id}`)
                              .then((res) => res.data)
       setGoi(res)
       setValue('title', res.title);
       setValue('duration', res.duration);
       setValue('price', res.price)
      } 
      if(id){
       getGoi();
      }
  },[id, setValue])


  const onUpdate = async (data) =>{
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/packages/${id}`,data,{
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((res) => res.data);
      if (res) {
        alert('thành công ròi đi chữa lãnh hoy ~~~')
        router.push('/admin/goiVip');
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
                <div className=" fw-bold"> 
                  <Link className="btn btn-danger mb-2 me-2" href='/admin/goiVip'><i class="fa-solid fa-chevron-left"></i></Link> 
                  <span className="fs-4 ">Chi Tiết Gói Vip</span> 
                </div>
                <div class="modal-body">
                    <form onSubmit={handleSubmit(onUpdate)}>
                    <div class="mb-3">
                        <label class="form-label">Tên Gói</label>
                          <input type="text" class="form-select" {...register('title', { required: 'Tên Gói là bắt buộc' })} />
                          {errors.title && <div className="text-danger">{errors.title.message}</div>}
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
                        <button type="submit" class="btn btn-primary">Cập Nhật Gói</button>
                    </form>
                </div>
            </div>
        </>
    )
}