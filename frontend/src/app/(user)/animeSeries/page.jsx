import "../../globals.css";
import ListChoie from "@/app/layout/user/listchoie";
import Film from "../components/film";
export default function AnimeSeries() {
    return (
        <div className="container-fluid d-flex justify-content-center pt-3" style={{ backgroundColor: "#283237", width: "100%" }}>
            <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark">
                <ol class="breadcrumb mt-2">
                    <li>
                        <a href="#" title="Trang chủ">
                            <i class="fa-solid fa-house"></i>
                            Trang chủ
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span>Danh Sách Anime Bộ(TV-Series) Hay Nhất</span>
                        </a>
                    </li>
                </ol>
                <div class="list-movie-filter SearchMovies p-0">

                    <div class="ml-title">
                        <span>Danh Sách Anime Bộ(TV-Series) Mới Nhất</span>
                        <div class="filter-toogle">
                            <i class="fa-solid fa-sort"></i>
                            Lọc Anime
                        </div>
                    </div>

                    <div class="schedule-title-main">
                        <strong>MẸO SỬ DỤNG:</strong>
                        Sử dụng chức năng
                        <strong>Lọc Anime</strong>
                        trên thanh công cụ để lọc những phim bạn đang cần xem chính xác nhất.
                    </div>
                </div>

                {/* <section>
                    <div class="Top">
                        <div class="wp-pagenavi">
                            <span class="pages">
                                Trang 1 của 134
                            </span>
                            <span class="current" title="1">
                                1
                            </span>
                            <a href="page larger" title="2">2</a>
                            <a href="page larger" title="3">3</a>
                            <a href="page larger" title="4">4</a>
                            <a href="page larger" title="5">5</a>
                            <a href="page larger" title="Trang cuối">Trang cuối</a>
                        </div>
                    </div>
                </section> */}

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

                <div className=" mt-3 col font-monospace text-white">

                    <div className="font-monospace pb-3" data-bs-theme="dark" >
                        <div className=" d-flex flex-wrap">
                            <Film></Film>
                            <Film></Film>
                        </div>
                    </div>

                </div>

                <div className=" mt-3 col-4 font-monospace text-white">
                    <ListChoie></ListChoie>
                </div>

            </div>
        </div>
    )
}