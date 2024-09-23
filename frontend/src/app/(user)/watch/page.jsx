'use client'
import ListChoie from "@/app/layout/user/listchoie";
import "../../globals.css";
import ReactPlayer from 'react-player/lazy';
import { React ,useState, useEffect } from 'react'
import Comment from "../components/coment";


export default function Watch(){
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

    return(
        <>
             <div className="container-fluid d-flex justify-content-center pt-3" style={{backgroundColor:"#283237", width:"100%"}}>
                <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark" >
                    
                      <div className=" col font-monospace text-white">
                        
                        {/* breakcum */}
                        <div className="col font-monospace text-white">
                            <div className="col mt-2">
                                <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                                  <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a className="text-white" href="#">Trang Chủ</a></li>
                                    <li class="breadcrumb-item" aria-current="page">Xem Phim</li>
                                    <li class="breadcrumb-item" aria-current="page">Phim gì đó</li>
                                  </ol>
                                </nav>
                            </div>
                        </div>
                        {/* breakcum */}


                      {/* video phim */}
                      <div className="col font-monospace text-white">
                          {isClient ? <ReactPlayer className="w-100" style={{marginTop:"-18px"}} url='https://www.youtube.com/watch?v=L9tJjCCZ-z0' controls /> : 'Load...'}
                          <div className="mt-3 d-flex">
                            <button className="me-3 btn btn-btn-outline-light"><i style={{color:"#bfe661"}} class="fa-solid fa-forward"></i> Tập Tiếp Theo</button>
                            <button className="me-3 btn btn-btn-outline-light"><i style={{color:"#bfe661"}} class="fa-solid fa-bookmark"></i> Thêm Vào Thư Viện</button>
                            <button className="me-3 btn btn-btn-outline-light"><i style={{color:"#bfe661"}} class="fa-solid fa-rotate-left"></i> Lịch Sử Xem</button>
                            <button className="me-3 btn btn-btn-outline-light"><i style={{color:"#bfe661"}} class="fa-solid fa-comment"></i> Bình Luận</button>
                          </div>
                      </div>
                      {/* video phim */}


                      {/* load tập phim  */}
                      <div className="card mt-3">
                        <div className="card-body">
                          <p className="card-title">Tập Phim: </p>
                          <div className=" w-100 d-flex flex-wrap">
                              <button className="btn btn-danger me-2 mt-2">01</button>
                              <button className="btn btn-outline-danger me-2 mt-2">02</button>
                              <button className="btn btn-outline-danger me-2 mt-2">03</button>
                              <button className="btn btn-outline-danger me-2 mt-2">04</button>
                              <button className="btn btn-outline-danger me-2 mt-2">05</button>
                              <button className="btn btn-outline-danger me-2 mt-2">06</button>
                              <button className="btn btn-outline-danger me-2 mt-2">07</button>
                              <button className="btn btn-outline-danger me-2 mt-2">08</button>
                              <button className="btn btn-outline-danger me-2 mt-2">09</button>
                              <button className="btn btn-outline-danger me-2 mt-2">10</button>
                              <button className="btn btn-outline-danger me-2 mt-2">11</button>
                              <button className="btn btn-outline-danger me-2 mt-2">12</button>
                              <button className="btn btn-outline-danger me-2 mt-2">13</button>
                              <button className="btn btn-outline-danger me-2 mt-2">14</button>
                              <button className="btn btn-outline-danger me-2 mt-2">15</button>

                          </div>
                        </div>
                      </div>
                      {/* load tập phim  */}


                        {/* cmt */}
                          <div className="col mt-4 font-monospace text-white">
                            <div className="col">
                                <Comment></Comment>
                            </div>
                        </div>
                        {/* cmt */}             


                      </div>


                      <div className=" mt-5 col-4 font-monospace text-white">
                          <ListChoie></ListChoie>
                      </div>



                </div>
             </div>
        </>
    )
}