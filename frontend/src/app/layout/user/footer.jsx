import "../../../app/globals.css"

export default function FooterUser(){
    return(
        <>
        <div className="container-fluid d-flex justify-content-center pt-3" style={{backgroundColor:"#283237"}}>
            <div className="containerVipPro" >
                <nav class="navbar navbar-expand-lg bg-dark " data-bs-theme="dark" >
                  <div class="container">
                    <img class="navbar-brand me-5" src="/images/Logo-PR-(1).png" width={70}></img>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item me-3 font-monospace">
                          <a class="nav-link active" aria-current="page" href="#">XEM PHIM</a>
                          <div className="segment"></div>
                        </li>
                        <li class="nav-item me-3 font-monospace">
                          <a class="nav-link " aria-current="page" href="#">VỀ CHÚNG TÔI</a>
                        </li>
                        <li class="nav-item me-3 font-monospace">
                          <a class="nav-link " aria-current="page" href="#">DISCORD</a>
                        </li>
                        <li class="nav-item me-3 font-monospace">
                          <a class="nav-link " aria-current="page" href="#">LIÊN HỆ</a>
                        </li>
                      </ul>
                      <button type="button" class="btn btn-outline-secondary btn-lg me-2"><i class="fa-brands fa-facebook-f"></i></button>
                      <button type="button" class="btn btn-outline-secondary btn-lg me-2"><i class="fa-brands fa-instagram"></i></button>
                      <button type="button" class="btn btn-outline-secondary btn-lg me-2"><i class="fa-brands fa-youtube"></i></button>
                      <button type="button" class="btn btn-outline-secondary btn-lg me-2"><i class="fa-brands fa-twitter"></i></button>
                      <button type="button" className="btn me-2 btn-lg" style={{backgroundColor:"#bfe661"}}><i class="fa-solid fa-arrow-up" style={{color:"white"}}></i></button>
                    </div>
                  </div>
                </nav>

                <div className="row text-center row-cols-1 p-5" style={{color:"#758792"}}>
                    <div className="col">Liên Hệ Quảng Cáo: ads@primereels.tv</div>
                    <div className="col">© Copyright 2024 PrimeReels.TV. All rights reserved.</div>
                </div>
            </div>
        </div>
        </>
    )
}   