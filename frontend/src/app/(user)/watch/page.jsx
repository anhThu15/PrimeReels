'use client'
import "../../globals.css";
import ReactPlayer from 'react-player/lazy';
import { React ,useState, useEffect } from 'react'
import SlideShowAnother from "../components/slideshowAnother";
import Comment from "../components/coment";
import SlideShow from "../components/slideshow";


export default function Watch(){
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

    return(
        <>
                <div className="container-fluid bg-black p-0 font-monospace text-white">

                      {/* video phim */}
                      <div className="container font-monospace text-white">
                          {isClient ? <ReactPlayer className="w-100" height={550} style={{marginTop:"-18px"}} url='https://www.youtube.com/watch?v=L9tJjCCZ-z0' controls /> : 'Load...'}
                          <div className="mt-3 d-flex">
                            <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-forward"></i> Tập Tiếp Theo</button>
                            <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-bookmark"></i> Thêm Vào Thư Viện</button>
                            <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-rotate-left"></i> Lịch Sử Xem</button>
                            <button className="me-3 btn btn-outline-light"><i class="fa-solid fa-comment"></i> Bình Luận</button>
                          </div>
                      </div>
                      {/* video phim */}

                      {/* Tập Phim */}
                      <div className="fs-2 mt-5">Danh Sách Tập Phim</div>
                      <SlideShowAnother></SlideShowAnother>
                      {/* Tập Phim */}

                      {/* Card phim */}
                       <div className="row m-0 mt-5" style={{paddingLeft:"110px"}}>
                          <div className="col-3">
                            <img width={250} height={350} src="https://ben.com.vn/tin-tuc/wp-content/uploads/2021/10/hinh-nen-one-piece-8_optimized.jpg" alt="" />
                          </div>
                          <div className="col">
                              <h1 className=" fw-bold text-danger">One Pice</h1>
                              <div className=" row row-cols-4" style={{width:380}}>
                                 <div className="col"><i class="fa-regular fa-star"></i> 5.2</div>
                                 <div className="col"><i class="fa-regular fa-clock"></i> <span className=" text-secondary">20</span>/25</div>
                                 <div className="col"><i class="fa-solid fa-calendar-days"></i> 2024</div>
                                 <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div>
                              </div>
                              <div className="col"> <span className=" text-secondary">Thể Loại: </span>ddasdasd</div>
                              <div className="col"> <span className=" text-secondary">Đạo Diễn: </span>dasdasa</div>
                              <div className="col"> <span className=" text-secondary">Diễn Viên: </span>dasdas</div>
                              <div className="col mt-2">
                                  Phim là câu chuyện hài về thầy trò Đường Tăng khi phải đối diện với kiếp nạn thứ 82 lạ lùng chưa từng có.                                                
                              </div>
                          </div>
                       </div>
                      {/* Card phim */}


                      {/* cmt */}
                      <div className="container mt-5 ">
                          <Comment></Comment>
                      </div>
                      {/* cmt */}

                      {/* Có thể bạn sẽ thích */}
                      <div className="container">
                        <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Có thể bạn sẽ thích</h2>
                        <SlideShow></SlideShow>
                      </div>
                      {/* Có thể bạn sẽ thích */}



                </div>

        </>
    )
}