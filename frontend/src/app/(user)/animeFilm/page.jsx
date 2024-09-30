"use client"
import Link from "next/link";
import "../../globals.css";
import SlideShow from "../components/slideshow";
import SlideShowAnother from "../components/slideshowAnother";
import React, { useState } from 'react';

export default function FilmSeries() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilter = () => {
      setIsFilterVisible(!isFilterVisible);
  };
    return (
        <>
            <div className="container-fluid bg-dark p-0 font-monospace text-white">
                <div className=" container-fluid p-0">
                  <div>
                      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                      
                              <div className="font-monospace text-white"  data-bs-theme="dark" >
                                <div className=" position-relative">
                                    <img src="/images/33178 1.png"  style={{height:"100vh"}} alt="..."/>
                                    <div className=" position-absolute " style={{top:180, left:110, width:"100%"}}>
                                         <div className="row">
                                             <div className="col-4">
                                                <h1 className=" fw-bold">Tây Du Ký Tiền Truyện</h1>
                                                <div className=" row row-cols-4" style={{width:400}}>
                                                   <div className="col"><i class="fa-regular fa-star"></i> 5.2</div>
                                                   <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                                                   <div className="col"><i class="fa-solid fa-calendar-days"></i> 2024</div>
                                                   <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div>
                                                </div>
                                                <div className="col mt-2">
                                                    Phim là câu chuyện hài về thầy trò Đường Tăng khi phải đối diện với kiếp nạn thứ 82 lạ lùng chưa từng có.                                                
                                                </div>
                                                <Link href="/film/1" className="btn btn-light rounded-pill mt-3">
                                                    <i class="fa-solid fa-circle-play"></i> Xem Ngay
                                                </Link>
                                             </div>
                                            
                                              <div className="col-1" >
                                              </div>
                                              <div className="col d-flex" >
                                                <div class="dropdown me-2">
                                                  <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Thể Loại
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                  </ul>
                                                </div>
                                                  <div class="dropdown">
                                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                      Quốc Gia
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                      <li><a class="dropdown-item" href="#">Action</a></li>
                                                      <li><a class="dropdown-item" href="#">Another action</a></li>
                                                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                    </ul>
                                                  </div>
                                              </div>
                                         </div>
                            </div>
                                </div>
                              </div>
                      
                          </div>
                          <div class="carousel-item">

                            <div className="font-monospace text-white"  data-bs-theme="dark" >
                                <div className=" position-relative">
                                    <img className="w-100 " src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpg"  style={{height:"100vh"}} alt="..."/>
                                    <div className=" position-absolute " style={{top:180, left:110, width:"100%"}}>
                                         <div className="row">
                                             <div className="col-4">
                                                <h1 className=" fw-bold">Tây Du Ký Tiền Truyện</h1>
                                                <div className=" row row-cols-4" style={{width:400}}>
                                                   <div className="col"><i class="fa-regular fa-star"></i> 5.2</div>
                                                   <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                                                   <div className="col"><i class="fa-solid fa-calendar-days"></i> 2024</div>
                                                   <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div>
                                                </div>
                                                <div className="col mt-2">
                                                    Phim là câu chuyện hài về thầy trò Đường Tăng khi phải đối diện với kiếp nạn thứ 82 lạ lùng chưa từng có.                                                
                                                </div>
                                                <Link href="/film/1" className="btn btn-light rounded-pill mt-3">
                                                    <i class="fa-solid fa-circle-play"></i> Xem Ngay
                                                </Link>
                                             </div>
                                              <div className="col-1" >
                                              </div>
                                              <div className="col d-flex" >
                                                <div class="dropdown me-2">
                                                  <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Thể Loại
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                  </ul>
                                                </div>
                                                  <div class="dropdown">
                                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                      Quốc Gia
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                      <li><a class="dropdown-item" href="#">Action</a></li>
                                                      <li><a class="dropdown-item" href="#">Another action</a></li>
                                                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                    </ul>
                                                  </div>
                                              </div>
                                         </div>
                                    </div>
                                </div>
                              </div>

                      
                          </div>
                          <div class="carousel-item">
                            
                            <div className="font-monospace text-white"  data-bs-theme="dark" >
                                <div className=" position-relative">
                                    <img className="w-100 " src="https://cdn.oneesports.vn/cdn-data/sites/4/2022/05/anime-spy-x-family-1.jpg"  style={{height:"100vh"}} alt="..."/>
                                    <div className=" position-absolute " style={{top:180, left:110, width:"100%"}}>
                                         <div className="row">
                                             <div className="col-4">
                                                <h1 className=" fw-bold">Tây Du Ký Tiền Truyện</h1>
                                                <div className=" row row-cols-4" style={{width:400}}>
                                                   <div className="col"><i class="fa-regular fa-star"></i> 5.2</div>
                                                   <div className="col"><i class="fa-regular fa-clock"></i> 20/25</div>
                                                   <div className="col"><i class="fa-solid fa-calendar-days"></i> 2024</div>
                                                   <div className="bg-danger rounded-pill" style={{width:"40px"}}>HD </div>
                                                </div>
                                                <div className="col mt-2">
                                                    Phim là câu chuyện hài về thầy trò Đường Tăng khi phải đối diện với kiếp nạn thứ 82 lạ lùng chưa từng có.                                                
                                                </div>
                                                <Link href="/film/1" className="btn btn-light rounded-pill mt-3">
                                                    <i class="fa-solid fa-circle-play"></i> Xem Ngay
                                                </Link>
                                             </div>
                                              <div className="col-1" >
                                              </div>
                                              <div className="col d-flex" >
                                                <div class="dropdown me-2">
                                                  <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Thể Loại
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                  </ul>
                                                </div>
                                                  <div class="dropdown">
                                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                      Quốc Gia
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                      <li><a class="dropdown-item" href="#">Action</a></li>
                                                      <li><a class="dropdown-item" href="#">Another action</a></li>
                                                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                    </ul>
                                                  </div>
                                              </div>
                                         </div>
                                    </div>
                                </div>
                              </div>
                      
                          </div>
                        </div>
                        <button class="carousel-control-prev" style={{width:"100px"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" style={{width:"100px"}} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>
                      </div>
                  </div>
                  <div class="ml-title mt-3">
                        <span>Danh Sách Phim Bộ Mới Nhất</span>
                        <div class="filter-toogle" onClick={toggleFilter}>
                            <i class="fa-solid fa-sort"></i>
                            Lọc Anime
                        </div>
                    </div>
                    {isFilterVisible && (
                        <div className="filter">
                            <div className="filter-content row">
                                <div className="col-sm-2 fc-main">
                                    <span className="fc-title">Sắp xếp theo</span>
                                    <ul className="fc-main-list">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-clock-o mr5"></i> Mới nhất
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-sort-alpha-asc"></i> Tên: A-Z
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-sort-alpha-desc"></i> Tên: Z-A
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-eye mr5"></i> Xem nhiều nhất
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-star mr5"></i> Nhiều lượt bình chọn
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-10">
                                    <div className="cs10-top">
                                        <div className="fc-filmtype">
                                            <span className="fc-title">Loại Phim</span>
                                            <ul className="fc-filmtype-list">
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Tất cả
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Phim lẻ
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Phim bộ
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Phim đang chiếu
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Phim sắp chiếu
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="fc-quality">
                                            <span className="fc-title">Mùa</span>
                                            <ul className="fc-filmtype-list">
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Tất cả
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Mùa xuân
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Mùa Hạ
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Mùa Thu
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input name="type" type="radio" /> Mùa Đông
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="fc-genre">
                                            <span className="fc-title">Thể Loại</span>
                                            <ul className="fc-genre-list">
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Hành động
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Kinh Dị
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Hài Hước
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Thám hiểm
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Trường Học
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Âm nhạc
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Tình yêu
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Phép thuật
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Game
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" /> Hoạt hình
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="fc-release">
                                            <span className="fc-title">Năm phát hành</span>
                                            <ul className="fc-release-list">
                                                <li>
                                                    <label>
                                                        <input type="radio" name="type" /> Tất cả
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="radio" name="type" /> 2024
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="radio" name="type" /> 2023
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="radio" name="type" /> 2022
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="radio" name="type" /> 2021
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="radio" name="type" /> 2020
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-btn">
                                    <button className="btn btn-danger">Lọc Phim</button>
                                </div>
                            </div>
                        </div>
                    )}
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa dự án </h2>
                    <SlideShow></SlideShow>
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa dự án </h2>
                    <SlideShow></SlideShow>
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa dự án </h2>
                    <SlideShow></SlideShow>
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa dự án </h2>
                    <SlideShow></SlideShow>
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa dự án </h2>
                    <SlideShowAnother></SlideShowAnother>
                  </div>
                  <div>
                    <h2 className="fw-bold mt-5" style={{marginLeft:"50px"}}>Thảm họa dự án </h2>
                    <SlideShow></SlideShow>
                  </div>
                </div>  
            </div>
        </>
    )
}