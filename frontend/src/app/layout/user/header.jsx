'use client'
import { useEffect } from "react";
import "../../../app/globals.css"


export default function HeaderUser(){

  const dangphim = `<div class="text-start font-monospace">
                        <a class="dropdown-item p-2" href="#">Phim Dài Tập </a>
                        <a class="dropdown-item p-2" href="#">Phim Ngắn Tập</a>
                    </div>`
  const topphim = `<div class="d-flex flex-wrap font-monospace">
                        <a class="nav-link p-2 col-6 " href="#">Theo Ngày </a>
                        <a class="nav-link p-2 col-6 " href="#">Theo Tháng</a>
                        <a class="nav-link p-2 col-6 " href="#">Theo Năm</a>
                        <a class="nav-link p-2 col-6 " href="#">Theo Mùa</a>
                        <a class="nav-link p-2 col-6 " href="#">Theo Yêu Thích</a>
                    </div>`
  const theloaiphim = `<div class="d-flex flex-wrap font-monospace">
                        <a class="nav-link p-2 col-6 " href="#">Phim Hài </a>
                        <a class="nav-link p-2 col-6 " href="#">Phim Tình Cảm</a>
                        <a class="nav-link p-2 col-6 " href="#">Phim Kinh Dị</a>
                        <a class="nav-link p-2 col-6 " href="#">Phim 18+</a>
                        <a class="nav-link p-2 col-6 " href="#">Phim Hài </a>
                        <a class="nav-link p-2 col-6 " href="#">Phim Tình Cảm</a>
                        <a class="nav-link p-2 col-6 " href="#">Phim Kinh Dị</a>
                        <a class="nav-link p-2 col-6 " href="#">Phim 18+</a>
                  </div>`

    useEffect(() => {
      // Kích hoạt tooltip sau khi DOM đã tải xong
      if (typeof window !== 'undefined') {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
      }
    }, []);

    return(
        <>
            <nav class="navbar navbar-expand-lg bg-dark " data-bs-theme="dark" >
              <div class="container">
                <img class="navbar-brand me-5" src="/images/Logo-PR-(1).png" width={100}></img>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active me-3  font-monospace" aria-current="page" href="#">TRANG CHỦ</a>
                      <div className="segment mt-2"></div>
                    </li>
                    <li class="nav-item">
                      <button class="nav-link custom-tooltip me-3 font-monospace" data-bs-toggle="tooltip" data-bs-placement="bottom" 
                      data-bs-html="true" data-bs-original-title={dangphim}>
                        DẠNG PHIM <i class="fa-solid fa-caret-down" style={{color: "#bfe661"}}></i>
                      </button>
                    </li>
                    <li class="nav-item dropdown">
                      <button class="nav-link custom-tooltip me-3 font-monospace" data-bs-toggle="tooltip" data-bs-placement="bottom" 
                      data-bs-html="true" data-bs-original-title={topphim}>
                        TOP PHIM <i class="fa-solid fa-caret-down" style={{color: "#bfe661"}}></i>
                      </button>
                    </li>
                    <li class="nav-item">
                      <button class="nav-link custom-tooltip me-3 font-monospace" data-bs-toggle="tooltip" data-bs-placement="bottom" 
                        data-bs-html="true" data-bs-original-title={theloaiphim}>
                          THỂ LOẠI PHIM <i class="fa-solid fa-caret-down" style={{color: "#bfe661"}}></i>
                      </button>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link font-monospace" aria-current="page" href="#">THƯ VIỆN</a>
                    </li>
                  </ul>
                  <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Hôm nay xem gì ?" aria-label="Search"/>
                  </form>
                  <button class="btn btn-danger font-monospace" type="submit">Đăng Nhập</button>
                </div>
              </div>
            </nav>
        </>
    )
}