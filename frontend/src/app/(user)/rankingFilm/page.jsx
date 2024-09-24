import "../../globals.css";
import ListChoie from "@/app/layout/user/listchoie";
import Film from "../components/film";
export default function RankingAnime() {
    return (
        <div className="container-fluid d-flex justify-content-center pt-3" style={{ backgroundColor: "#283237", width: "100%" }}>
            <div className="container font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark">
                <ol class="breadcrumb mt-2">
                    <li>
                        <a href="#" title="Trang chủ">
                            <i class="fa-solid fa-house"></i>
                            Trang chủ
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span>Bảng xếp hạng</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span>Ngày</span>
                        </a>
                    </li>
                </ol>

                    <div className="mt-3 col-sm-8 font-monospace text-white">

                        <div class="movie-list-index">
                            <div class="box-top-search">
                                <ul class="search_control_select">
                                    <li>
                                        <a href="#" title="Bảng xếp hạng Anime">Bảng xếp hạng</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Bảng xếp hạng Anime">Ngày</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Bảng xếp hạng Anime">Đánh giá</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Bảng xếp hạng Anime">Tháng</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Bảng xếp hạng Anime">Mùa</a>
                                    </li>
                                    <li>
                                        <a href="#" title="Bảng xếp hạng Anime">Năm</a>
                                    </li>
                                </ul>
                            </div>

                            <h2 class="header-ranking-list">
                                <span class="title-list">Bảng xếp hạng ngày ./../....</span>
                            </h2>
                            <ul class="ranking-movie">
                                <li class="group po-01">
                                    <div class="row-display group">
                                        <span class="txt-rank">01</span>
                                        <div class="e-item">
                                            <a href="#" class="thumb pull-left _trackLink"
                                                title="Arya Bàn Bên Thỉnh Thoảng Lại Trêu Ghẹo Tôi Bằng Tiếng Nga - Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san, Alya Sometimes Hides Her Feelings in Russian, Roshidere, Alya-san, who sits besides me and sometimes murmurs affectionately in Russian., Arya Next Door Sometimes Lapses into Russian">
                                                <img src="https://cdn.animevietsub.pub/data/poster/2024/06/22/animevsub-iZiDk56MIM.jpg"
                                                    alt="" width="45" height="60" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="#" title="Arya Bàn Bên Thỉnh Thoảng Lại Trêu Ghẹo Tôi Bằng Tiếng Nga"
                                                    class="txt-primary _trackLink">
                                                    Arya Bàn Bên Thỉnh Thoảng Lại Trêu Ghẹo Tôi Bằng Tiếng Nga
                                                </a>
                                            </h3>
                                            <div class="inblock ellipsis">
                                                <h4 class="title-sd-item txt-info">
                                                    Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san, Alya Sometimes Hides Her
                                                    Feelings in Russian, Roshidere, Alya-san, who sits besides me and sometimes murmurs
                                                    affectionately in Russian., Arya Next Door Sometimes Lapses into Russian (2024)
                                                </h4>
                                            </div>
                                        </div>
                                        <div class="txt-info rank-score pull-right">
                                            <span class="score fn-number fn-showstats">
                                                Full
                                            </span>
                                        </div>

                                    </div>
                                </li>

                                <li class="group po-02">
                                    <div class="row-display group">
                                        <span class="txt-rank">02</span>
                                        <div class="e-item">
                                            <a href="#" title="Phim One Piece - Đảo Hải Tặc - Vua Hải Tặc" class="thumb2 pull-left2 _trackLink">
                                                <img src="https://cdn.animevietsub.uk/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg" alt="" width="45" height="60" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="#" title="One Piece - Đảo Hải Tặc">One Piece - Đảo Hải Tặc</a>
                                            </h3>
                                            <div class="inblock ellipsis">
                                                <h4 class="title-sd-item txt-info title-small">Vua Hải Tặc (1999)</h4>
                                            </div>
                                        </div>

                                        <div class="txt-info rank-score pull-right">
                                            <span class="score fn-number fn-showstats score2">
                                                Tập 1119
                                            </span>
                                        </div>

                                    </div>
                                </li>

                                <li class="group po-02">
                                    <div class="row-display group">
                                        <span class="txt-rank">03</span>
                                        <div class="e-item">
                                            <a href="#" title="Phim One Piece - Đảo Hải Tặc - Vua Hải Tặc" class="thumb2 pull-left2 _trackLink">
                                                <img src="https://cdn.animevietsub.uk/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg" alt="" width="45" height="60" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="#" title="One Piece - Đảo Hải Tặc">One Piece - Đảo Hải Tặc</a>
                                            </h3>
                                            <div class="inblock ellipsis">
                                                <h4 class="title-sd-item txt-info title-small">Vua Hải Tặc (1999)</h4>
                                            </div>
                                        </div>

                                        <div class="txt-info rank-score pull-right">
                                            <span class="score fn-number fn-showstats score2">
                                                Tập 1119
                                            </span>
                                        </div>

                                    </div>
                                </li>

                                <li class="group po-02">
                                    <div class="row-display group">
                                        <span class="txt-rank">04</span>
                                        <div class="e-item">
                                            <a href="#" title="Phim One Piece - Đảo Hải Tặc - Vua Hải Tặc" class="thumb2 pull-left2 _trackLink">
                                                <img src="https://cdn.animevietsub.uk/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg" alt="" width="45" height="60" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="#" title="One Piece - Đảo Hải Tặc">One Piece - Đảo Hải Tặc</a>
                                            </h3>
                                            <div class="inblock ellipsis">
                                                <h4 class="title-sd-item txt-info title-small">Vua Hải Tặc (1999)</h4>
                                            </div>
                                        </div>

                                        <div class="txt-info rank-score pull-right">
                                            <span class="score fn-number fn-showstats score2">
                                                Tập 1119
                                            </span>
                                        </div>

                                    </div>
                                </li>

                                <li class="group po-02">
                                    <div class="row-display group">
                                        <span class="txt-rank">05</span>
                                        <div class="e-item">
                                            <a href="#" title="Phim One Piece - Đảo Hải Tặc - Vua Hải Tặc" class="thumb2 pull-left2 _trackLink">
                                                <img src="https://cdn.animevietsub.uk/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg" alt="" width="45" height="60" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="#" title="One Piece - Đảo Hải Tặc">One Piece - Đảo Hải Tặc</a>
                                            </h3>
                                            <div class="inblock ellipsis">
                                                <h4 class="title-sd-item txt-info title-small">Vua Hải Tặc (1999)</h4>
                                            </div>
                                        </div>

                                        <div class="txt-info rank-score pull-right">
                                            <span class="score fn-number fn-showstats score2">
                                                Tập 1119
                                            </span>
                                        </div>

                                    </div>
                                </li>

                                <li class="group po-02">
                                    <div class="row-display group">
                                        <span class="txt-rank">06</span>
                                        <div class="e-item">
                                            <a href="#" title="Phim One Piece - Đảo Hải Tặc - Vua Hải Tặc" class="thumb2 pull-left2 _trackLink">
                                                <img src="https://cdn.animevietsub.uk/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg" alt="" width="45" height="60" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="#" title="One Piece - Đảo Hải Tặc">One Piece - Đảo Hải Tặc</a>
                                            </h3>
                                            <div class="inblock ellipsis">
                                                <h4 class="title-sd-item txt-info title-small">Vua Hải Tặc (1999)</h4>
                                            </div>
                                        </div>

                                        <div class="txt-info rank-score pull-right">
                                            <span class="score fn-number fn-showstats score2">
                                                Tập 1119
                                            </span>
                                        </div>

                                    </div>
                                </li>
                                <li class="group po-02">
                                    <div class="row-display group">
                                        <span class="txt-rank">07</span>
                                        <div class="e-item">
                                            <a href="#" title="Phim One Piece - Đảo Hải Tặc - Vua Hải Tặc" class="thumb2 pull-left2 _trackLink">
                                                <img src="https://cdn.animevietsub.uk/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg" alt="" width="45" height="60" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="#" title="One Piece - Đảo Hải Tặc">One Piece - Đảo Hải Tặc</a>
                                            </h3>
                                            <div class="inblock ellipsis">
                                                <h4 class="title-sd-item txt-info title-small">Vua Hải Tặc (1999)</h4>
                                            </div>
                                        </div>

                                        <div class="txt-info rank-score pull-right">
                                            <span class="score fn-number fn-showstats score2">
                                                Tập 1119
                                            </span>
                                        </div>

                                    </div>
                                </li>
                                <li class="group po-02">
                                    <div class="row-display group">
                                        <span class="txt-rank">08</span>
                                        <div class="e-item">
                                            <a href="#" title="Phim One Piece - Đảo Hải Tặc - Vua Hải Tặc" class="thumb2 pull-left2 _trackLink">
                                                <img src="https://cdn.animevietsub.uk/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg" alt="" width="45" height="60" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="#" title="One Piece - Đảo Hải Tặc">One Piece - Đảo Hải Tặc</a>
                                            </h3>
                                            <div class="inblock ellipsis">
                                                <h4 class="title-sd-item txt-info title-small">Vua Hải Tặc (1999)</h4>
                                            </div>
                                        </div>

                                        <div class="txt-info rank-score pull-right">
                                            <span class="score fn-number fn-showstats score2">
                                                Tập 1119
                                            </span>
                                        </div>

                                    </div>
                                </li>
                                <li class="group po-02">
                                    <div class="row-display group">
                                        <span class="txt-rank">09</span>
                                        <div class="e-item">
                                            <a href="#" title="Phim One Piece - Đảo Hải Tặc - Vua Hải Tặc" class="thumb2 pull-left2 _trackLink">
                                                <img src="https://cdn.animevietsub.uk/data/poster/2019/09/27/animevsub-sQCBqYz9ve.jpg" alt="" width="45" height="60" />
                                            </a>
                                            <h3 class="title-item">
                                                <a href="#" title="One Piece - Đảo Hải Tặc">One Piece - Đảo Hải Tặc</a>
                                            </h3>
                                            <div class="inblock ellipsis">
                                                <h4 class="title-sd-item txt-info title-small">Vua Hải Tặc (1999)</h4>
                                            </div>
                                        </div>

                                        <div class="txt-info rank-score pull-right">
                                            <span class="score fn-number fn-showstats score2">
                                                Tập 1119
                                            </span>
                                        </div>

                                    </div>
                                </li>

                            </ul>

                        </div>

                    </div>



                    <div className=" mt-3 col-sm-4 font-monospace text-white">
                        <ListChoie></ListChoie>
                    </div>

            </div>
        </div>
    )
}