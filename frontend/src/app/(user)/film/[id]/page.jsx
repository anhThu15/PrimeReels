import ListChoie from "@/app/layout/user/listchoie";
import Film from "../../components/film";
import Comment from "../../components/coment";
import Link from "next/link";

export default function film({params}){
  // const id = params.id

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
                                    <li class="breadcrumb-item" aria-current="page">Chi Tiết Phim</li>
                                    <li class="breadcrumb-item active" aria-current="page">Xem Phim One Pice  -  {params.id} </li>
                                  </ol>
                                </nav>
                            </div>
                        </div>
                        {/* breakcum */}

                        {/* banner */}
                        <div className="col font-monospace text-white">
                            <div class="bannerCard ">
                              <img className="bg-black opacity-25" src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpg" width={709} height={320} class="card-img" alt="..."/>
                              <div class="card-img-overlay">
                                  <div className="row"> 
                                    {/* card */}
                                    <div className="col-1 m-5">
                                        <div class="card text-bg-dark me-3" style={{width:"140px"}}>
                                          <div className="bg-black">
                                              <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={200} class="card-img" alt="..."/>
                                          </div>
                                          <div class="card-img-overlay ">
                                            <div className="row">
                                                <div className=" rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px", marginTop:"60px", marginLeft:"40px"}}>
                                                  <i class="fa-solid fa-play fa-2xl text-white mt-4 ms-1"></i>
                                                </div>
                                            </div>
                                          </div>
                                          <div class="play-icon-overlay">
                                            <div className="bg-danger text-center" style={{width:"100%"}}>
                                              <Link href="/watch">Xem Phim</Link> 
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                    {/* card */}


                                    <div className="col m-5">
                                        <h5 class="card-title fw-bold fs-2" style={{color:"#bfe661"}}> One Pice</h5>
                                        <p class="card-text overflow-auto" style={{width:"450px", height:"100px"}}>Mô tả: </p>
                                        <div className="col" style={{backgroundColor:"white", height:"1px"}}></div>
                                        <div className="row mt-2">
                                          <div className="col-3 border-end border-white">
                                            Đánh giá từ người xem <br />
                                            <i class=" text-warning fa-solid fa-star"></i>
                                            <i class=" text-warning fa-solid fa-star"></i>
                                            <i class=" text-warning fa-solid fa-star"></i>
                                            <i class=" text-warning fa-regular fa-star"></i>
                                            <i class=" text-warning fa-regular fa-star"></i>
                                          </div>
                                          <div className="col">
                                            <div className="row">
                                              <div className="col">
                                                <i class="fa-regular fa-clock"></i> 10/??
                                              </div>
                                              <div className="col">
                                                <i class="fa-regular fa-calendar-days"></i> 2024
                                              </div>
                                              <div className="col">
                                                <i class="fa-regular fa-eye"></i> 20000 Lượt Xem 
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                    </div>


                                  </div>
                              </div>
                            </div>
                        </div>
                        {/* banner */}

                        {/* list */}
                        <div className="col font-monospace mt-3" style={{height:240}}>
                          <div className="d-flex">
                                  {/* thông tin phim */}
                                    <p className=" me-3">
                                      <button class=" btn btn-dark fw-bold"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                                          <i class="fa-solid fa-file"></i> Thông tin bộ phim
                                      </button>
                                    </p>
                                  {/* thông tin phim */}

                                  {/* nhân vật phim */}
                                    <p className=" me-3">
                                      <button class=" btn btn-dark fw-bold"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample2" aria-expanded="false" aria-controls="collapseWidthExample2">
                                      <i class="fa-solid fa-person-half-dress"></i> Nhân Vật
                                      </button>
                                    </p>
                                  {/* nhân vật phim */}

                                  {/* hình ảnh phim */}
                                    <p className=" me-3">
                                      <button class=" btn btn-dark fw-bold"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample3" aria-expanded="false" aria-controls="collapseWidthExample3">
                                        <i class="fa-solid fa-image"></i> Hình Ảnh
                                      </button>
                                    </p>
                                  {/* hình ảnh phim */}
                          </div>
                             <div className="col position-absolute">
                                  {/* thông tin phim */}
                                    <div style={{Height: "220px"}}>
                                      <div class="collapse multi-collapse show" id="collapseWidthExample">
                                        <div class="card card-body" style={{width: "710px"}}>
                                           <div className="row row-cols-2">
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Tập Mới:
                                                </div>
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Lịch Chiếu: 
                                                </div>
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Trạng Thái:
                                                </div>
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Thể Loại:
                                                </div>
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Đạo Diễn: 
                                                </div>
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Quốc Gia:
                                                </div>
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Số Người Xem:
                                                </div>
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Thời Lượng:
                                                </div>
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Chất Lượng:
                                                </div>
                                                <div className="col">
                                                  <i class="fa-regular fa-circle-play"></i> Ngôn Ngữ:
                                                </div>
                                           </div>
                                        </div>
                                      </div>
                                    </div>
                                  {/* thông tin phim */}
                             </div>
                             <div className="col position-absolute">
                                  {/* nhân vật phim */}
                                    <div style={{minHeight: "120px"}}>
                                      <div class="collapse multi-collapse" id="collapseWidthExample2">
                                        <div class="card card-body" style={{width: "710px"}}>
                                            <div className=" d-flex flex-wrap">
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>
                                                  <p className="me-5"><i class="fa-solid fa-user"></i> Anh Thư</p>                                               
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                  {/* nhân vật phim */}
                             </div>
                             <div className="col position-absolute">
                                  {/* hình ảnh phim */}
                                    <div style={{minHeight: "120px"}}>
                                      <div class="collapse multi-collapse" id="collapseWidthExample3">
                                        <div class="card card-body" style={{width: "710px"}}>
                                             <img src="https://i1.sndcdn.com/artworks-m9ATljdbyyrlrBXm-rFUoMA-t500x500.png" height={300} class="card-img" alt="..."/>
                                        </div>
                                      </div>
                                    </div>
                                  {/* hình ảnh phim */}
                             </div>
                        </div>
                        {/* list */}

                        {/* cmt */}
                        <div className="col font-monospace text-white">
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