import Link from "next/link";
import CardSlide from "./cardslide";
import RatingStars from "./ratingStars";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function Comment( props){
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const id = props.data?.movie_id
    // console.log(id);
    
    const onComment =  async (data) => {
        // console.log(data); 
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/comment`, data, {
                        headers: {
                          'Authorization': `Bearer ${token}`,
                        }
                        }).then((res) => res.data);
                    if (res) {
                      toast.success('Bình Luận Và Đánh Giá Thành Công');
                      window.location.reload()
                    } else {
                      // Xử lý hiển thị lỗi
                      console.error(result.error);
                    }
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <>
          <div className="text-white" >
                {localStorage.getItem("token") ? (
                    <>
                    <p className="ms-3 pt-2">Bình luận tại đây</p>
                    <div className="col mb-3" style={{backgroundColor:"white", height:"1px"}}></div>
                    <div className="row mb-3">
                        <div className="col-2 ps-5">
                            <img className=" rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFHANMR9GiCp0h0TmnItAno7AkgaTJ_ZpZA&s" width={60} height={60} alt="" />
                        </div>
                    <div className="col" style={{marginLeft:"-100px"}}>
                        <form onSubmit={handleSubmit(onComment)} >
                          <select className=" form-select-sm" name="" id=""  
                            {...register('rating', { required: 'Đánh Giá là bắt buộc' })}>
                            <option value={0}>Đánh Giá Bộ Phim</option>
                            <option value={1}>⭐</option>
                            <option value={2}>⭐⭐</option>
                            <option value={3}>⭐⭐⭐</option>
                            <option value={4}>⭐⭐⭐⭐</option>
                            <option value={5}>⭐⭐⭐⭐⭐</option>
                          </select>
                          {errors.rating && <div className="text-danger">{errors.rating.message}</div>}
                          <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Viết Bình Luận ..." rows="3"
                            {...register('content', { required: 'Bình Luận là bắt buộc' })}></textarea>
                            {errors.content && <div className="text-danger">{errors.content.message}</div>}
                          <button type="submit" className=" btn btn-light mt-2" >Gửi</button>
                        </form>
                    </div>
                    </div>
                    </>
                ) : (<></>)}


                
                {/* load bình luận */}
                { props.data?.comments?.map((cmt) => {
                    return(
                        <>
                            <div className="row d-flex flex-wrap rounded-pill bg-dark mt-3" style={{height:"100px"}} >
                                <div className="col-1 mt-3 ps-5">
                                    <img className="rounded-pill" src={cmt.user.avatar} width={60} height={60} alt="" />
                                </div>
                                <div className="col"  >
                                    <div className="fs-4 text-danger fw-bold">{cmt.user.user_name}</div>
                                    <p style={{fontSize:"12px"}}>{cmt.updated_at}</p>
                                    <div>{cmt.content}</div>
                                </div>
                                {/* <div className="col-2 text-warning mt-2"> */}
                                    {/* {cmt.rating} */}
                                    <RatingStars rating={cmt.rating}></RatingStars>
                                    {/* <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i> */}
                                {/* </div> */}
                            </div>
                        </>
                    )
                })}

                {/* load bình luận */}


          </div>
        </>
    )
}