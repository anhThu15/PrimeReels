
import Link from "next/link"
import "../../../app/globals.css"


export default function HeaderUser(){
    return(
        <>
        {/* <div className=" container-fluid position-absolute"> */}
            <nav class="navbar navbar-expand-lg bg-black" data-bs-theme="dark">
              <div class="container">
                <img class="navbar-brand me-5" src="/images/Logo-PR-(1).png" width={100}></img>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active me-3  font-monospace" aria-current="page" href="/">TRANG CHỦ</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link me-3  font-monospace" aria-current="page" href="/filmSeries" >PHIM BỘ</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link me-3  font-monospace" aria-current="page" href="/oddFilm" >PHIM LẺ</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link me-3  font-monospace" aria-current="page" href="/animeFilm">PHIM HOẠT HÌNH</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link font-monospace" aria-current="page" href="/libary">THƯ VIỆN</a>
                    </li>
                  </ul>

                  <div><i class="fa-solid fa-magnifying-glass me-3 text-white"></i></div>
                  <div className="rounded-pill bg-danger font-monospace text-white me-3" style={{width:"140px",height:"30px"}}>
                     <Link href="/buyPackage" className=" nav-link mt-1 ms-2">MUA GÓI VIP  <i class="fa-regular fa-gem"></i></Link> 
                  </div>
                  <a class=" text-white nav-link font-monospace" aria-current="page" href="/login">ĐĂNG NHẬP</a>
                </div>
              </div>
            </nav>
        {/* </div> */}
        </>
    )
}