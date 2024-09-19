import ListChoie from "@/app/layout/user/listchoie";
import "../../globals.css";
import Film from "../components/film";


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
                                    <li class="breadcrumb-item" aria-current="page">Xem Phim</li>
                                  </ol>
                                </nav>
                            </div>
                        </div>
                        {/* breakcum */}

                        {/* Phân Trang */}
                        <nav aria-label="Page navigation example">
                          <ul class="pagination justify-content-center">
                            <li class="page-item disabled">
                              <a class="page-link">Trang 1 của 45</a>
                            </li>
                            <li class="page-item"><a class="page-link activePhantrang" style={{color:"#bfe661"}} href="#">1</a></li>
                            <li class="page-item"><a class="page-link" style={{color:"#bfe661"}} href="#">2</a></li>
                            <li class="page-item"><a class="page-link" style={{color:"#bfe661"}} href="#">3</a></li>
                            <li class="page-item"><a class="page-link" style={{color:"#bfe661"}} href="#">4</a></li>
                            <li class="page-item"><a class="page-link" style={{color:"#bfe661"}} href="#">5</a></li>
                            <li class="page-item">
                              <a class="page-link" href="#" style={{color:"#bfe661"}}>Trang Cuối</a>
                            </li>
                          </ul>
                        </nav>
                        {/* Phân Trang */}

                        <div className=" d-flex flex-wrap pt-3">
                          <Film></Film>
                        </div>


                        {/* Phân Trang */}
                        <nav aria-label="Page navigation example">
                          <ul class="pagination justify-content-center">
                            <li class="page-item disabled">
                              <a class="page-link">Trang 1 của 45</a>
                            </li>
                            <li class="page-item"><a class="page-link activePhantrang" style={{color:"#bfe661"}} href="#">1</a></li>
                            <li class="page-item"><a class="page-link" style={{color:"#bfe661"}} href="#">2</a></li>
                            <li class="page-item"><a class="page-link" style={{color:"#bfe661"}} href="#">3</a></li>
                            <li class="page-item"><a class="page-link" style={{color:"#bfe661"}} href="#">4</a></li>
                            <li class="page-item"><a class="page-link" style={{color:"#bfe661"}} href="#">5</a></li>
                            <li class="page-item">
                              <a class="page-link" href="#" style={{color:"#bfe661"}}>Trang Cuối</a>
                            </li>
                          </ul>
                        </nav>
                        {/* Phân Trang */}


                      </div>


                      <div className=" mt-5 col-4 font-monospace text-white">
                          <ListChoie></ListChoie>
                      </div>



                </div>
             </div>
        </>
    )
}