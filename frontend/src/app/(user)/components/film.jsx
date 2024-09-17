'use client'
import { useEffect } from "react";

export default function Film(){

  const demo = `<div class="text-start font-monospace">
                  <h5 class="card-title fs-4">Phim Chú Mèo Hư Đốn </h5>
                  <p class="card-text overflow-y-auto">Mô Tả Chi Tiết Phim</p>
                  <div className=" row mb-3">
                    <p class="card-text col"> <i class="fa-solid fa-clapperboard" style={{color:"#bfe661"}}></i> Thể Loại: .....</p>
                    <p class="card-text col"> <i class="fa-solid fa-list" style={{color:"#bfe661"}}></i> Danh Mục: .....</p>
                    <p class="card-text col"> <i class="fa-solid fa-star" style={{color:"#bfe661"}}></i> Đánh Giá: .....</p>
                    <p class="card-text col"> <i class="fa-solid fa-film" style={{color:"#bfe661"}}></i> Số Tập: .....</p>
                  </div>
                </div>`

  useEffect(() => {
    // Kích hoạt tooltip sau khi DOM đã tải xong
    if (typeof window !== 'undefined') {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
  }, []);

    return (
        <>
        <div className="mb-3">
          <div class="card text-bg-dark " style={{width:"170px", marginRight:"7.6px"}}>
              <div className="bg-black opacity-75">
                  <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={220} class="card-img" alt="..."/>
              </div>
              <div class="card-img-overlay ">
                <div className="row">
                    <div className="card-title rounded-pill bg-black opacity-75 text-white col me-3" style={{width:"40px", height:"35px"}}>
                      <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                    </div>
                    <div className="card-title rounded-circle bg-danger text-white" style={{width:"47px", height:"47px"}}>
                      <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                    </div>
                </div>
              </div>
              <div class="play-icon-overlay">
                <div className=" rounded-circle bg-black opacity-50 border border-white"data-bs-toggle="tooltip" data-bs-placement="right" 
                      data-bs-html="true" data-bs-original-title={demo} style={{width:"50px", height:"50px"}}>
                  <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                </div>
              </div>
          </div>
          <h5 class="card-title ten fw-bold text-center">One Pice</h5>
          <h5 class="card-body ten text-center fs-6 text-secondary" >Lượt xem:</h5>
        </div>

        <div className="mb-3">
          <div class="card text-bg-dark " style={{width:"170px", marginRight:"7.6px"}}>
              <div className="bg-black opacity-75">
                  <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={220} class="card-img" alt="..."/>
              </div>
              <div class="card-img-overlay ">
                <div className="row">
                    <div className="card-title rounded-pill bg-black opacity-75 text-white col me-3" style={{width:"40px", height:"35px"}}>
                      <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                    </div>
                    <div className="card-title rounded-circle bg-danger text-white" style={{width:"47px", height:"47px"}}>
                      <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                    </div>
                </div>
              </div>
              <div class="play-icon-overlay">
                <div className=" rounded-circle bg-black opacity-50 border border-white"data-bs-toggle="tooltip" data-bs-placement="right" 
                      data-bs-html="true" data-bs-original-title={demo} style={{width:"50px", height:"50px"}}>
                  <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                </div>
              </div>
          </div>
          <h5 class="card-title ten fw-bold text-center">One Pice</h5>
          <h5 class="card-body ten text-center fs-6 text-secondary" >Lượt xem:</h5>
        </div>

        <div className="mb-3">
          <div class="card text-bg-dark " style={{width:"170px", marginRight:"7.6px"}}>
              <div className="bg-black opacity-75">
                  <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={220} class="card-img" alt="..."/>
              </div>
              <div class="card-img-overlay ">
                <div className="row">
                    <div className="card-title rounded-pill bg-black opacity-75 text-white col me-3" style={{width:"40px", height:"35px"}}>
                      <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                    </div>
                    <div className="card-title rounded-circle bg-danger text-white" style={{width:"47px", height:"47px"}}>
                      <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                    </div>
                </div>
              </div>
              <div class="play-icon-overlay">
                <div className=" rounded-circle bg-black opacity-50 border border-white"data-bs-toggle="tooltip" data-bs-placement="right" 
                      data-bs-html="true" data-bs-original-title={demo} style={{width:"50px", height:"50px"}}>
                  <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                </div>
              </div>
          </div>
          <h5 class="card-title ten fw-bold text-center">One Pice</h5>
          <h5 class="card-body ten text-center fs-6 text-secondary" >Lượt xem:</h5>
        </div>

        <div className="mb-3">
          <div class="card text-bg-dark " style={{width:"170px", marginRight:"7.6px"}}>
              <div className="bg-black opacity-75">
                  <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={220} class="card-img" alt="..."/>
              </div>
              <div class="card-img-overlay ">
                <div className="row">
                    <div className="card-title rounded-pill bg-black opacity-75 text-white col me-3" style={{width:"40px", height:"35px"}}>
                      <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                    </div>
                    <div className="card-title rounded-circle bg-danger text-white" style={{width:"47px", height:"47px"}}>
                      <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                    </div>
                </div>
              </div>
              <div class="play-icon-overlay">
                <div className=" rounded-circle bg-black opacity-50 border border-white"data-bs-toggle="tooltip" data-bs-placement="right" 
                      data-bs-html="true" data-bs-original-title={demo} style={{width:"50px", height:"50px"}}>
                  <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                </div>
              </div>
          </div>
          <h5 class="card-title ten fw-bold text-center">One Pice</h5>
          <h5 class="card-body ten text-center fs-6 text-secondary" >Lượt xem:</h5>
        </div>

        <div className="mb-3">
          <div class="card text-bg-dark " style={{width:"170px", marginRight:"7.6px"}}>
              <div className="bg-black opacity-75">
                  <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={220} class="card-img" alt="..."/>
              </div>
              <div class="card-img-overlay ">
                <div className="row">
                    <div className="card-title rounded-pill bg-black opacity-75 text-white col me-3" style={{width:"40px", height:"35px"}}>
                      <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                    </div>
                    <div className="card-title rounded-circle bg-danger text-white" style={{width:"47px", height:"47px"}}>
                      <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                    </div>
                </div>
              </div>
              <div class="play-icon-overlay">
                <div className=" rounded-circle bg-black opacity-50 border border-white"data-bs-toggle="tooltip" data-bs-placement="right" 
                      data-bs-html="true" data-bs-original-title={demo} style={{width:"50px", height:"50px"}}>
                  <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                </div>
              </div>
          </div>
          <h5 class="card-title ten fw-bold text-center">One Pice</h5>
          <h5 class="card-body ten text-center fs-6 text-secondary" >Lượt xem:</h5>
        </div>

        <div className="mb-3">
          <div class="card text-bg-dark " style={{width:"170px", marginRight:"7.6px"}}>
              <div className="bg-black opacity-75">
                  <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={220} class="card-img" alt="..."/>
              </div>
              <div class="card-img-overlay ">
                <div className="row">
                    <div className="card-title rounded-pill bg-black opacity-75 text-white col me-3" style={{width:"40px", height:"35px"}}>
                      <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                    </div>
                    <div className="card-title rounded-circle bg-danger text-white" style={{width:"47px", height:"47px"}}>
                      <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                    </div>
                </div>
              </div>
              <div class="play-icon-overlay">
                <div className=" rounded-circle bg-black opacity-50 border border-white"data-bs-toggle="tooltip" data-bs-placement="right" 
                      data-bs-html="true" data-bs-original-title={demo} style={{width:"50px", height:"50px"}}>
                  <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                </div>
              </div>
          </div>
          <h5 class="card-title ten fw-bold text-center">One Pice</h5>
          <h5 class="card-body ten text-center fs-6 text-secondary" >Lượt xem:</h5>
        </div>

        <div className="mb-3">
          <div class="card text-bg-dark " style={{width:"170px", marginRight:"7.6px"}}>
              <div className="bg-black opacity-75">
                  <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={220} class="card-img" alt="..."/>
              </div>
              <div class="card-img-overlay ">
                <div className="row">
                    <div className="card-title rounded-pill bg-black opacity-75 text-white col me-3" style={{width:"40px", height:"35px"}}>
                      <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                    </div>
                    <div className="card-title rounded-circle bg-danger text-white" style={{width:"47px", height:"47px"}}>
                      <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                    </div>
                </div>
              </div>
              <div class="play-icon-overlay">
                <div className=" rounded-circle bg-black opacity-50 border border-white"data-bs-toggle="tooltip" data-bs-placement="right" 
                      data-bs-html="true" data-bs-original-title={demo} style={{width:"50px", height:"50px"}}>
                  <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                </div>
              </div>
          </div>
          <h5 class="card-title ten fw-bold text-center">One Pice</h5>
          <h5 class="card-body ten text-center fs-6 text-secondary" >Lượt xem:</h5>
        </div>

        <div className="mb-3">
          <div class="card text-bg-dark " style={{width:"170px", marginRight:"7.6px"}}>
              <div className="bg-black opacity-75">
                  <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={220} class="card-img" alt="..."/>
              </div>
              <div class="card-img-overlay ">
                <div className="row">
                    <div className="card-title rounded-pill bg-black opacity-75 text-white col me-3" style={{width:"40px", height:"35px"}}>
                      <p className="text-left text-warning mt-2 fw-bolder" style={{fontSize:"13px"}}><i class="fa-solid fa-star"></i> 4.9</p>
                    </div>
                    <div className="card-title rounded-circle bg-danger text-white" style={{width:"47px", height:"47px"}}>
                      <p className="text-center fw-bolder mt-1" style={{fontSize:"13px"}}>Tập 15</p>
                    </div>
                </div>
              </div>
              <div class="play-icon-overlay">
                <div className=" rounded-circle bg-black opacity-50 border border-white"data-bs-toggle="tooltip" data-bs-placement="right" 
                      data-bs-html="true" data-bs-original-title={demo} style={{width:"50px", height:"50px"}}>
                  <i class="fa-solid fa-play fa-2xl text-white ms-3 mt-4"></i>
                </div>
              </div>
          </div>
          <h5 class="card-title ten fw-bold text-center">One Pice</h5>
          <h5 class="card-body ten text-center fs-6 text-secondary" >Lượt xem:</h5>
        </div>
        </>
    )
}