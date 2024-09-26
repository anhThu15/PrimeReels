import CardSlide from "./cardslide";

export default function Banner(){
    return (
        <>
         <div className="font-monospace text-white"  data-bs-theme="dark" >
          <div className=" position-relative">
              <img src="/images/33178 1.png"  style={{height:"100vh"}} alt="..."/>
              <div className=" position-absolute " style={{top:180, left:110, width:"600px"}}>
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
                    <div className="btn btn-light rounded-pill mt-3">
                        <i class="fa-solid fa-circle-play"></i> Xem Ngay
                    </div>
              </div>
          </div>
         </div>
        </>
    )
}