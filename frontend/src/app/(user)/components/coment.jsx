// import Link from "next/link";
// import CardSlide from "./cardslide";
// import RatingStars from "./ratingStars";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Cookies from 'js-cookie';
// import { useEffect, useState } from "react";

// export default function Comment(props) {

//   const token = Cookies.get('token');
//   const [user, setUser] = useState([])
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm();
//   const [coment, setComent] = useState([])
//   const id = props.data?.movie_id
//   const checkUser = props.data?.comments?.find(comment => comment.user_id === user?.user_id);
//   { checkUser ? (setValue('rating', checkUser?.rating)) : (0) }
//   const [currentPage, setCurrentPage] = useState(1);
//   const [commentPerPage, setCommentPerPage] = useState(3);

//   useEffect(() => {
//     setComent(props.data?.comments)
//   }, [props.data])


//   useEffect(() => {
//     if (token) {
//       axios.get(`/api/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//         .then(res => setUser(res.data.user))
//         .catch(error => {
//           console.error("Error fetching user data:", error);
//         });
//     }
//   }, [token]);

//   const onComment = async (data) => {

//     try {

//       if (!checkUser) {
//         const res = await axios.post(`/api/movies/${id}/comment`, data, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           }
//         }).then((res) => res.data);
//         if (res) {
//           toast.success('Bình Luận Và Đánh Giá Thành Công');
//           const res = await axios.get(`/api/comments/movies/${id}`, { revalidate: 3600 }).then((res) => res.data)
//           setComent(res)

//         } else {

//           console.error(result.error);
//         }
//       } else {

//         const res = await axios.post(`/api/movies/${id}/comment`, data, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           }
//         }).then((res) => res.data);
//         if (res) {
//           toast.success('Bình Luận Và Đánh Giá Thành Công');
//           const res = await axios.get(`/api/comments/movies/${id}`, { revalidate: 3600 }).then((res) => res.data)
//           setComent(res)

//         } else {

//           console.error(result.error);
//         }
//       }
//     } catch (error) {

//       toast.error("Bình Luận Và Đánh Giá Không Thành Công Vui Lòng Thử Lại")
//     }
//   }

//     // Pagination logic
//     const totalPages = Math.ceil(filteredData.length / usersPerPage);
//     const indexOfLastUser = currentPage * commentPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const currentComments = filteredData.slice(indexOfFirstUser, indexOfLastUser);

//   return (
//     <>
//       <div className="text-white">
//         {token ? (
//           <>
//             <h4 className="ms-3 pt-2 text-white">
//               <i className="fa-solid fa-comment-dots"></i> Bình luận tại đây
//             </h4>
//             <hr className="border-light" />
//             <div className="row mb-3 align-items-center">
//               <div className="col-auto d-flex align-items-center">
//                 <img
//                   className="rounded-circle border border-light"
//                   src={user.avatar}
//                   width={60}
//                   height={60}
//                   alt="Avatar"
//                 />
//               </div>
//               <div className="col">
//                 <form onSubmit={handleSubmit(onComment)}>
//                   <label className="form-label fw-bold">Đánh giá bộ phim:</label>
//                   <select
//                     className="form-select form-select-sm mb-2"
//                     {...register('rating', { required: 'Bạn chưa chọn đánh giá!' })}
//                   >
//                     <option value={0}>Chọn số sao</option>
//                     <option value={1}>⭐</option>
//                     <option value={2}>⭐⭐</option>
//                     <option value={3}>⭐⭐⭐</option>
//                     <option value={4}>⭐⭐⭐⭐</option>
//                     <option value={5}>⭐⭐⭐⭐⭐</option>
//                   </select>
//                   {errors.rating && <small className="text-danger">{errors.rating.message}</small>}

//                   <label className="form-label fw-bold">Bình luận của bạn:</label>
//                   <textarea
//                     className="form-control mb-2"
//                     placeholder="Viết bình luận..."
//                     rows="2"
//                     {...register('content', { required: 'Bạn chưa viết nội dung bình luận!' })}
//                   ></textarea>
//                   {errors.content && <small className="text-danger">{errors.content.message}</small>}

//                   <div className="text-end">
//                     <button type="submit" className="btn btn-primary btn-sm mt-2">
//                       <i className="fa-solid fa-paper-plane"></i> Gửi
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </>
//         ) : null}

//         <div className="text-white">
//           <div className="top-comment-nav d-flex justify-content-between align-items-center">
//           <h4 className="text-white mb-4">
//             <i className="fa-solid fa-comments"></i> Các bình luận
//           </h4>
//           <div className="ms-3">
//             <select className="form-select form-select-sm border-0">
//               <option value="newest">Mới nhất</option>
//               <option value="oldest">Cũ nhất</option>
//             </select>
//           </div>
//           </div>
//           {coment?.map((cmt, index) => (
//             <div
//               key={index}
//               className="comment-container row align-items-center text-white p-3 mb-3 "
//             >
//               <div className="col-auto d-flex" >
//                 <img
//                   className="rounded-circle border border-light"
//                   src={cmt.user.avatar}
//                   width={60}
//                   height={60}
//                   alt="Avatar"
//                 />
//               </div>
//               <div className="col">
//                 <div className="fw-bold text-warning">{cmt.user.user_name}</div>
//                 <small className="text-light">
//                   {new Date(cmt.updated_at)?.toLocaleDateString('vi-VN', {
//                     timeZone: 'Asia/Ho_Chi_Minh',
//                   })}
//                 </small>
//                 <p className="mb-0" style={{fontWeight:"350"}}>{cmt.content}</p>
//               </div>
//               <div className="col-auto text-end">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <i
//                     key={i}
//                     className={`fa-star ${i < cmt.rating ? 'fa-solid text-warning' : 'fa-regular text-light'
//                       }`}
//                   ></i>
//                 ))}
//               </div>
//             </div>
//           ))}
//             <nav>
//                 <ul className="pagination justify-content-center">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                         <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
//                     </li>
//                     {[...Array(totalPages)].map((_, index) => (
//                         <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
//                             <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
//                                 {index + 1}
//                             </button>
//                         </li>
//                     ))}
//                     <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                         <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//       </div>

//     </>
//   )
// }

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

export default function Comment(props) {
  const token = Cookies.get('token');
  const [user, setUser] = useState(null);  // Người dùng
  const [comments, setComments] = useState([]);  // Danh sách bình luận gốc
  const [sortedComments, setSortedComments] = useState([]);  // Danh sách bình luận đã sắp xếp
  const [sortOrder, setSortOrder] = useState('newest');  // Mặc định sắp xếp theo 'Mới nhất'
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const movieId = props.data?.movie_id;
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(3); // Số bình luận mỗi trang
  const [userAvatar, setUserAvatar] = useState('/images/userAvatar.png'); // Avatar mặc định
  const [rating, setRating] = useState(0);  // Giá trị rating (số sao)
  const [content, setContent] = useState(""); // State theo dõi nội dung bình luận
  const [isContentEmpty, setIsContentEmpty] = useState(true); // Kiểm tra xem nội dung có rỗng không
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Kiểm tra xem nội dung đã được nhập hay chưa
  useEffect(() => {
    if (content.trim().length > 0) {
      setIsContentEmpty(false); // Nếu có nhập nội dung, nút "Gửi" sẽ thành màu xanh
    } else {
      setIsContentEmpty(true); // Nếu không có nội dung, nút "Gửi" sẽ thành màu xám
    }
  }, [content]);

  useEffect(() => {
    if (user && user.avatar) {
      setUserAvatar(user.avatar); // Cập nhật avatar của người dùng nếu có
    }
  }, [user]);

  // Lấy thông tin người dùng từ API
  useEffect(() => {
    if (token) {
      axios.get(`/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUser(res.data.user))
        .catch(error => console.error("Lỗi khi lấy dữ liệu người dùng:", error));
    }
  }, [token]);

  // Lưu trữ bình luận khi dữ liệu từ props thay đổi
  useEffect(() => {
    setComments(props.data?.comments || []);
  }, [props.data]);

  useEffect(() => {
    if (user && props.data?.comments) {
      const userComment = props.data.comments.find(comment => comment.user_id === user?.user_id);
      if (userComment) {
        setRating(userComment?.rating); // Cập nhật rating cho người dùng nếu có bình luận
      }
    }
  }, [user, props.data]);
  

  // Xử lý khi người dùng chọn sao
  const handleStarClick = (starValue) => {
    setRating(starValue);
    setValue('rating', starValue);  // Cập nhật vào form
  };

  // Xử lý sắp xếp bình luận theo thứ tự "Mới nhất" và "Cũ nhất"
  useEffect(() => {
    const sorted = [...comments];
    sorted.sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime();
      const dateB = new Date(b.updated_at).getTime();
      if (sortOrder === 'newest') {
        return dateB - dateA;  // Sắp xếp mới nhất lên đầu
      } else {
        return dateA - dateB;  // Sắp xếp cũ nhất lên đầu
      }
    });
    setSortedComments(sorted); // Cập nhật danh sách bình luận đã sắp xếp
  }, [comments, sortOrder]);

  // Hàm gửi bình luận
  const onComment = async (data) => {
    try {
      const response = await axios.post(`/api/movies/${movieId}/comment`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data) {
        toast.success('Bình luận và đánh giá thành công!');
        const updatedComments = await axios.get(`/api/comments/movies/${movieId}`);
        setComments(updatedComments.data);
      }
    } catch (error) {
      toast.error("Bình luận và đánh giá không thành công, vui lòng thử lại.");
    }
  };

  // Logic phân trang
  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = sortedComments.slice(indexOfFirstComment, indexOfLastComment);

  return (
    <div className="text-white">
      {token && (
        <>
          <h4 className="ms-3 pt-2 text-white">
            <i className="fa-solid fa-comment-dots"></i> Bình luận tại đây
          </h4>
          <hr className="border-light" />
          <div className="row mb-3 align-items-center">
            <div className="col">
              <form onSubmit={handleSubmit(onComment)}>
                <div className="d-flex">
                  <div className="col-auto pe-2">
                    <label className="form-label fw-bold">Chọn số sao:</label>
                  </div>
                  <div className="col-auto">
                    {/* Hiển thị 5 ngôi sao có thể chọn */}
                    <div className="d-flex">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <i
                          key={starValue}
                          className={`fa-star ${starValue <= rating ? 'fa-solid text-warning' : 'fa-regular text-light'}`}
                          style={{ cursor: 'pointer', fontSize: '20px' }}
                          onClick={() => handleStarClick(starValue)} // Khi click vào sao, cập nhật giá trị sao
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
                {errors.rating && <small className="text-danger">{errors.rating.message}</small>}
                <div className="d-flex align-items-center">
                  <div className="col-auto pe-2">
                    <img
                      className="rounded-circle"
                      src={userAvatar}  // Sử dụng avatar của người dùng hoặc avatar mặc định
                      width={60}
                      height={60}
                      alt="Avatar"
                    />
                  </div>
                  <div className="col">
                    <textarea
                      className="form-control mb-2 "
                      placeholder="Viết bình luận..."
                      rows="3"
                      {...register('content', { required: 'Bạn chưa viết nội dung bình luận!' })}
                    ></textarea>
                    {errors.content && <small className="text-danger">{errors.content.message}</small>}
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary btn-sm mt-2">
                    <i className="fa-solid fa-paper-plane"></i> Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Bình luận phần dưới */}
      <div className="text-white">
        <div className="top-comment-nav d-flex justify-content-between align-items-center">
          <h4 className="text-white mb-4">
            <i className="fa-solid fa-comments"></i> Các bình luận
          </h4>
          <div className="ms-3">
            <select
              className="form-select form-select-sm border-0"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
            </select>
          </div>
        </div>

        {currentComments.map((cmt, index) => (
          <div key={index} className="comment-container row align-items-center text-white p-3 mb-3">
            <div className="col-auto d-flex">
              <img
                className="rounded-circle"
                src={cmt.user.avatar || '/images/userAvatar.png'} // Avatar mặc định nếu không có avatar của người dùng
                width={60}
                height={60}
                alt="Avatar"
              />
            </div>
            <div className="col">
              <div className="fw-bold text-warning">{cmt.user.user_name}</div>
              <small className="text-light">
                {new Date(cmt.updated_at)?.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
              </small>
              <p className="mb-0" style={{ fontWeight: "350" }}>{cmt.content}</p>
            </div>
            <div className="col-auto text-end">
              {/* Hiển thị sao đánh giá của bình luận */}
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={`fa-star ${i < cmt.rating ? 'fa-solid text-warning' : 'fa-regular text-light'}`}></i>
              ))}
            </div>
          </div>
        ))}

        {/* Phân trang */}
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}><i class="fa-solid fa-chevron-left"></i></button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active danger' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}><i class="fa-solid fa-chevron-right"></i></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
