"use client"
import "../../globals.css";
import ListChoie from "@/app/layout/user/listchoie";
import Film from "../components/film";
import React, { useState } from 'react';

export default function FilmSeries() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };
    return (
        <div className="container-fluid d-flex justify-content-center pt-3" style={{ backgroundColor: "#283237", width: "100%" }}>
            <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark">
                <ol class="breadcrumb mt-2">
                    <li>
                        <a href="#" title="Trang chủ">
                            <i class="fa-solid fa-house"></i>
                            Trang chủ
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span>Danh Sách Anime Bộ(TV-Series) Hay Nhất</span>
                        </a>
                    </li>
                </ol>
                <div class="list-movie-filter SearchMovies p-0">

                <div class="ml-title">
                        <span>Danh Sách Anime Bộ(TV-Series) Mới Nhất</span>
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

                    <div class="schedule-title-main">
                        <strong>MẸO SỬ DỤNG:</strong>
                        Sử dụng chức năng <strong>Lọc Anime</strong> trên thanh công cụ để lọc những phim bạn đang cần xem chính xác nhất.
                    </div>
                </div>

                {/* <section>
                    <div class="Top">
                        <div class="wp-pagenavi">
                            <span class="pages">
                                Trang 1 của 134
                            </span>
                            <span class="current" title="1">
                                1
                            </span>
                            <a href="page larger" title="2">2</a>
                            <a href="page larger" title="3">3</a>
                            <a href="page larger" title="4">4</a>
                            <a href="page larger" title="5">5</a>
                            <a href="page larger" title="Trang cuối">Trang cuối</a>
                        </div>
                    </div>
                </section> */}

                  {/* thanh lọc theo chữ  */}
                  <div className="text-center">
                            <button className="btn btn-info me-1">A</button>
                            <button className="btn btn-outline-info  me-1">B</button>
                            <button className="btn btn-outline-info  me-1">C</button>
                            <button className="btn btn-outline-info  me-1">D</button>
                            <button className="btn btn-outline-info  me-1">E</button>
                            <button className="btn btn-outline-info  me-1">F</button>
                            <button className="btn btn-outline-info  me-1">G</button>
                            <button className="btn btn-outline-info  me-1">H</button>
                            <button className="btn btn-outline-info  me-1">I</button>
                            <button className="btn btn-outline-info  me-1">J</button>
                            <button className="btn btn-outline-info  me-1">K</button>
                            <button className="btn btn-outline-info  me-1">L</button>
                            <button className="btn btn-outline-info  me-1">M</button>
                            <button className="btn btn-outline-info  me-1">N</button>
                            <button className="btn btn-outline-info  me-1">O</button>
                            <button className="btn btn-outline-info  me-1">P</button>
                            <button className="btn btn-outline-info  me-1">Q</button>
                            <button className="btn btn-outline-info  me-1">R</button>
                            <button className="btn btn-outline-info  me-1">S</button>
                            <button className="btn btn-outline-info  me-1">T</button>
                            <button className="btn btn-outline-info  me-1">U</button>
                            <button className="btn btn-outline-info  me-1">V</button>
                            <button className="btn btn-outline-info  me-1">W</button>
                            <button className="btn btn-outline-info  me-1">X</button>
                            <button className="btn btn-outline-info  me-1">Y</button>
                            <button className="btn btn-outline-info  me-1">Z</button>
                        </div>
                        {/* thanh lọc theo chữ  */}

                <div className=" mt-3 col-sm font-monospace text-white">

                    <div className="font-monospace pb-3" data-bs-theme="dark" >
                        <div className=" d-flex flex-wrap">
                            <Film></Film>
                            <Film></Film>
                        </div>
                    </div>

                </div>

                <div className=" mt-3 col-sm-4 font-monospace text-white">
                    <ListChoie></ListChoie>
                </div>

            </div>
        </div>
    )
}