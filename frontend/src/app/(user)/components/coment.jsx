import Link from "next/link";
import CardSlide from "./cardslide";
import RatingStars from "./ratingStars";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

export default function Comment(props) {
  // const userCookie = Cookies.get('user');
  // const user = userCookie ? JSON.parse(userCookie) : null;
  const token = Cookies.get('token');
  const [user, setUser] = useState([])
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [coment, setComent] = useState([])
  const id = props.data?.movie_id
  const checkUser = props.data?.comments?.find(comment => comment.user_id === user?.user_id);
  { checkUser ? (setValue('rating', checkUser?.rating)) : (0) }


  useEffect(() => {
    setComent(props.data?.comments)
  }, [props.data])

  // console.log(coment);
  useEffect(() => {
    if (token) {
      axios.get(`/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => setUser(res.data.user))
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [token]);

  // console.log(user);



  const onComment = async (data) => {
    // console.log(data); 
    try {
      // console.log(checkUser.rating);

      // const token = localStorage.getItem('token');
      if (!checkUser) {
        const res = await axios.post(`/api/movies/${id}/comment`, data, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then((res) => res.data);
        if (res) {
          toast.success('Bình Luận Và Đánh Giá Thành Công');
          const res = await axios.get(`/api/comments/movies/${id}`, { revalidate: 3600 }).then((res) => res.data)
          setComent(res)
          // window.location.reload()
        } else {
          // Xử lý hiển thị lỗi
          console.error(result.error);
        }
      } else {
        // console.log( checkUser.rating);
        const res = await axios.post(`/api/movies/${id}/comment`, data, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then((res) => res.data);
        if (res) {
          toast.success('Bình Luận Và Đánh Giá Thành Công');
          const res = await axios.get(`/api/comments/movies/${id}`, { revalidate: 3600 }).then((res) => res.data)
          setComent(res)
          // console.log(res);
          // window.location.reload()
        } else {
          // Xử lý hiển thị lỗi
          console.error(result.error);
        }
      }
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error("Bình Luận Và Đánh Giá Không Thành Công Vui Lòng Thử Lại")
    }
  }

  return (
    <>
      {/* <div className="text-white" >
                {token ? (
                    <>
                    <p className="ms-3 pt-2">Bình luận tại đây</p>
                    <div className="col mb-3" style={{backgroundColor:"white", height:"1px"}}></div>
                    <div className="row mb-3">
                        <div className="col-2 ps-5">
                            <img className=" rounded-circle" src={user.avatar} width={60} height={60} alt="" />
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
                { coment?.map((cmt) => {
                    return(
                        <>
                            <div className="row d-flex flex-wrap rounded-pill bg-dark mt-3" style={{height:"100px"}} >
                                <div className="col-1 mt-3 ps-5">
                                    <img className="rounded-pill" src={cmt.user.avatar} width={60} height={60} alt="" />
                                </div>
                                <div className="col"  >
                                    <div className="fs-4 text-danger fw-bold">{cmt.user.user_name}</div>
                                    <p style={{fontSize:"12px"}}>{new Date(cmt.updated_at)?.toLocaleDateString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"})}</p>
                                    <div>{cmt.content}</div>
                                </div>
                                    <RatingStars rating={cmt.rating}></RatingStars>

                            </div>
                        </>
                    )
                })}



          </div> */}



      <div className="text-white">
        {token ? (
          <>
            <h4 className="ms-3 pt-2 text-danger">
              <i className="fa-solid fa-comment-dots"></i> Bình luận tại đây
            </h4>
            <hr className="border-light" />
            <div className="row mb-3 align-items-center">
              <div className="col-auto d-flex align-items-center">
                <img
                  className="rounded-circle border border-light"
                  src={user.avatar}
                  width={60}
                  height={60}
                  alt="Avatar"
                />
              </div>
              <div className="col">
                <form onSubmit={handleSubmit(onComment)}>
                  <label className="form-label fw-bold">Đánh giá bộ phim:</label>
                  <select
                    className="form-select form-select-sm mb-2"
                    {...register('rating', { required: 'Bạn chưa chọn đánh giá!' })}
                  >
                    <option value={0}>Chọn số sao</option>
                    <option value={1}>⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={5}>⭐⭐⭐⭐⭐</option>
                  </select>
                  {errors.rating && <small className="text-danger">{errors.rating.message}</small>}

                  <label className="form-label fw-bold">Bình luận của bạn:</label>
                  <textarea
                    className="form-control mb-2"
                    placeholder="Viết bình luận..."
                    rows="2"
                    {...register('content', { required: 'Bạn chưa viết nội dung bình luận!' })}
                  ></textarea>
                  {errors.content && <small className="text-danger">{errors.content.message}</small>}

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary btn-sm mt-2">
                      <i className="fa-solid fa-paper-plane"></i> Gửi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : null}

        <div className="text-white">
          <h4 className="text-danger mb-4">
            <i className="fa-solid fa-comments"></i> Các bình luận
          </h4>
          {coment?.map((cmt, index) => (
            <div
              key={index}
              className="row align-items-center bg-secondary text-white p-3 rounded mb-3"
            >
              <div className="col-auto d-flex">
                <img
                  className="rounded-circle border border-light"
                  src={cmt.user.avatar}
                  width={60}
                  height={60}
                  alt="Avatar"
                />
              </div>
              <div className="col">
                <div className="fw-bold text-warning">{cmt.user.user_name}</div>
                <small className="text-light">
                  {new Date(cmt.updated_at)?.toLocaleDateString('vi-VN', {
                    timeZone: 'Asia/Ho_Chi_Minh',
                  })}
                </small>
                <p className="mb-0">{cmt.content}</p>
              </div>
              <div className="col-auto text-end">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`fa-star ${i < cmt.rating ? 'fa-solid text-warning' : 'fa-regular text-light'
                      }`}
                  ></i>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}