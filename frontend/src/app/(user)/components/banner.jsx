import CardSlide from "./cardslide";

export default function Banner(){
    return (
        <>
         <div className="font-monospace pb-3"  data-bs-theme="dark" >
            <div class="card text-bg-dark">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF8EF_WqPW3U94JSMFvxi1p0W1aaLgjdEbCQ&s" class="card-img" alt="..."/>
              <div class="card-img-overlay">
                <h5 class="card-title fs-1">Phim Chú Mèo Hư Đốn </h5>
                <p class="card-text overflow-y-auto">Mô Tả Chi Tiết Phim</p>
                <div className=" row mb-3">
                  <p class="card-text col-5"> <i class="fa-solid fa-clapperboard" style={{color:"#bfe661"}}></i> Thể Loại: .....</p>
                  <p class="card-text col-5"> <i class="fa-solid fa-list" style={{color:"#bfe661"}}></i> Danh Mục: .....</p>
                  <p class="card-text col-5"> <i class="fa-solid fa-star" style={{color:"#bfe661"}}></i> Đánh Giá: .....</p>
                  <p class="card-text col-5"> <i class="fa-solid fa-film" style={{color:"#bfe661"}}></i> Số Tập: .....</p>
                </div>
                <button class="btn btn-danger font-monospace" type="submit"><i class="fa-solid fa-play text-white"></i> Xem Phim </button>
              </div>
            </div>
         </div>
        </>
    )
}