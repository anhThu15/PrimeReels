import "../../globals.css";



export default function Libary(){
  // const id = params.id

    return(
        <>
             <div className="container-fluid d-flex justify-content-center pt-3" style={{backgroundColor:"#283237", width:"100%",}}>
                <div className="containerVipPro font-monospace bg-nenVipPro row pb-5 h-100" data-bs-theme="dark" >
                        
                        {/* breakcum */}
                        <div className="col font-monospace text-white">
                            <div className="col mt-2">
                                <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                                  <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a className="text-white" href="#">Trang Chủ</a></li>
                                    <li class="breadcrumb-item" aria-current="page">THƯ VIỆN</li>
                                  </ol>
                                </nav>
                            </div>
                        </div>
                        {/* breakcum */}

                        {/* tiêu đề */}
                        <div className="row font-monospace">
                           <div className="col">
                              <div class="ml-title">
                                  <span>Thư Viện Phim</span>
                              </div>
                              <div class="schedule-title-main">
                                  <strong>MẸO SỬ DỤNG:</strong>
                                  Sử dụng chức năng
                                  <strong> Lọc Anime </strong>
                                  trên thanh công cụ để lọc những phim bạn đang cần xem chính xác nhất.
                              </div>
                           </div>
                           <div className="col-2" style={{marginRight:"-50px"}}>
                               <button className="btn btn-light"> <i class="fa-solid fa-up-down"></i> Lọc Phim</button>
                           </div>
                        </div>
                        {/* tiêu đề */}

                          {/* thanh lọc theo chữ  */}
                          <div className="d-flex justify-content-center">
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


                        {/* danh sách thư viện */}
                        <div className=" col font-monospace" style={{marginBottom:"40px"}}>
                          <table class="mt-3 table table-secondary">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Bộ Phim</th>
                                <th scope="col">Tập</th>
                                <th scope="col">Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>
                                    <div className="col">
                                       <img src="https://devo.vn/wp-content/uploads/2023/01/xien-chet-ba-may-gio.jpg" width={100} height={100} alt="" />
                                       <div>Mèo cầm mele</div>
                                    </div>                                  
                                </td>
                                <td>2/10</td>
                                <td>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">1</th>
                                <td>
                                    <div className="col">
                                       <img src="https://devo.vn/wp-content/uploads/2023/01/xien-chet-ba-may-gio.jpg" width={100} height={100} alt="" />
                                       <div>Mèo cầm mele</div>
                                    </div>                                  
                                </td>
                                <td>2/10</td>
                                <td>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">1</th>
                                <td>
                                    <div className="col">
                                       <img src="https://devo.vn/wp-content/uploads/2023/01/xien-chet-ba-may-gio.jpg" width={100} height={100} alt="" />
                                       <div>Mèo cầm mele</div>
                                    </div>                                  
                                </td>
                                <td>2/10</td>
                                <td>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">1</th>
                                <td>
                                    <div className="col">
                                       <img src="https://devo.vn/wp-content/uploads/2023/01/xien-chet-ba-may-gio.jpg" width={100} height={100} alt="" />
                                       <div>Mèo cầm mele</div>
                                    </div>                                  
                                </td>
                                <td>2/10</td>
                                <td>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">1</th>
                                <td>
                                    <div className="col">
                                       <img src="https://devo.vn/wp-content/uploads/2023/01/xien-chet-ba-may-gio.jpg" width={100} height={100} alt="" />
                                       <div>Mèo cầm mele</div>
                                    </div>                                  
                                </td>
                                <td>2/10</td>
                                <td>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-solid fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                    <i class=" text-warning fa-regular fa-star"></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* danh sách thư viện */}


                </div>
             </div>
        </>
    )
}