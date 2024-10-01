import Link from "next/link"
import "../../../app/globals.css"

export default function FooterUser(){
    return(
        <>
        <div className="container-fluid pt-3 bg-black font-monospace text-white" data-bs-theme="dark" >
          <div className="row w-100 mt-3">
             <div className="col-3 text-center">
              <div className="w-100">
                <img src="/images/Logo-PR-(1).png" width={130} height={90} alt="" />
              </div>
              <div className="w-100 mt-5">
                <img src="/images/image 24.png" width={150} height={50} alt="" />
              </div>
              <div className="w-100 mt-3">
                <img src="/images/image 25.png" width={150} height={30} alt="" />
              </div>
             </div>
             <div className="col">
                <nav class="navbar navbar-expand-lg w-100">
                  <div class="container-fluid">
                      <a class="nav-link" href="/introduce">Giới Thiệu</a>
                      <Link href="/user-buy-package" class="nav-link">
                        GÓI COMBO
                      </Link>
                      <a class="nav-link" href="#">CHÍNH SÁCH</a>
                      <a class="nav-link" href="#">ĐIỀU KHOẢN</a>
                      <a class="nav-link" href="contact">LIÊN HỆ</a>
                  </div>
                </nav>
                <p className=" bg-white" style={{height:"1px"}}></p>
                <div className=" text-secondary">
                    <p>
                        PrimeReels là một trang web phim trực tuyến cung cấp kho
                        tàng đa dạng các bộ phim và chương trình truyền hình từ nhiều thể loại khác nhau
                    </p>
                    <p>
                        Điện thoại/Fax: 0123.456.789 - Gmail: hotro@primereels.com
                    </p>
                    <p>Địa chỉ: QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh</p>
                    <p>Giấy phép Cung cấp Dịch vụ Phát thanh, Truyền hình trên mạng Internet số 273/GP-BTTTT cấp ngày 08/11/2022</p>
                </div>
             </div>
             <div className="col-3 mt-2"> 
                <div className="col">
                  <img src="/images/right.png"className="responsive-icon-img" alt="" />
                </div>
                <div className="row">
                  <div className="rounded-pill bg-danger font-monospace text-white me-3 col mt-2" style={{height:"40px"}}>
                       <Link href="/contact" className=" nav-link pt-2 ms-4"> <i class="fa-solid fa-phone"></i> Hotline </Link> 
                  </div>
                  <div className="rounded-pill bg-danger font-monospace text-white me-3 col mt-2" style={{height:"40px"}}>
                       <Link href="/contact" className=" nav-link pt-2 ms-4"> <i class="fa-solid fa-comment"></i> Hỗ Trợ </Link> 
                  </div>
                </div>
                <div className="row row-cols-3 mt-3">
                    <div className="col">
                      <img width={70} src="https://png.pngtree.com/png-clipart/20180626/ourmid/pngtree-instagram-icon-instagram-logo-png-image_3584852.png" alt="" />
                    </div>
                    <div className="col">
                      <img width={70} src="https://seeding.vn/wp-content/uploads/2018/10/logo-facebook.png" alt="" />
                    </div>
                    <div className="col">
                      <img width={50} src="https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338431_960_720.png" alt="" />
                    </div>
                </div>
             </div>
          </div>
          <div className="col d-flex justify-content-center mt-5">© Copyright 2024 PrimeReels.TV. All rights reserved.</div>
        </div>
        </>
    )
}   