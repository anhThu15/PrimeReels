import "../../globals.css";
import Link from 'next/link';
export default function UserBuyPackage() {
    return (
        <div className="container font-monospace">
            <div class="title-back">
                <i class="fa-solid fa-chevron-left"></i> Trở về
            </div>
            <h4 class="mt-3">Đặc quyền VIP</h4>
            <div class="vip-menu">
                <div class="vip-item">
                    <div class="icon-container">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    100.000+ giờ giải trí
                </div>
                <div class="vip-item">
                    <div class="icon-container">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    Không quảng cáo
                </div>
                <div class="vip-item">
                    <div class="icon-container">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    Thuyết minh, lồng tiếng, phụ đề
                </div>
                <div class="vip-item">
                    <div class="icon-container">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    Full HD/4K
                </div>
            </div>
            <div class="row mt-3 package mb-3">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="img">
                                <div class="parkage-title">
                                    <h6>VIP19K</h6>
                                    <p class="price">19.000đ</p>
                                    <p class="text">Không giới hạn phim trong vòng 24h</p>
                                </div>
                            </div>
                            <div class="button-vip">
                                <Link href="/user-payment-package">
                                    <button class="btn btn-danger">Chọn Gói Vip</button>
                                </Link>
                            </div>
                            <div class="content-vip mt-2">
                                <div class="item">
                                    <i class="fa-solid fa-star"></i>
                                    Xem phim thả ga, không lo quảng cáo
                                </div>
                                <div class="item">
                                    <i class="fa-solid fa-star"></i>
                                    24h kể từ khi đăng ký
                                </div>
                                <div class="item">
                                    <i class="fa-solid fa-star"></i>
                                    Chất lượng phim Full HD
                                </div>
                            </div>
                            <hr />
                            <h6>Chương trình ưu đãi</h6>
                            <div class="bx-vnpay d-flex">
                                <div class="icon-vnpay">
                                    <img src="images/icon-vnpay.webp" alt="" />
                                </div>
                                <div class="text-sales">
                                    Giảm 10% khi thanh toán qua VNPAY với mã PRIMEREELS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="img">
                                <div class="parkage-title">
                                    <h6>VIP39K</h6>
                                    <p class="price">39.000đ</p>
                                    <p class="text">Không giới hạn phim trong vòng 1 tháng</p>
                                </div>
                            </div>
                            <div class="button-vip">
                                <Link href="/user-payment-package">
                                    <button class="btn btn-danger">Chọn Gói Vip</button>
                                </Link>
                            </div>
                            <div class="content-vip mt-2">
                                <div class="item">
                                    <i class="fa-solid fa-star"></i>
                                    Xem phim thả ga, không lo quảng cáo
                                </div>
                                <div class="item">
                                    <i class="fa-solid fa-star"></i>
                                    24h kể từ khi đăng ký
                                </div>
                                <div class="item">
                                    <i class="fa-solid fa-star"></i>
                                    Chất lượng phim Full HD
                                </div>
                            </div>
                            <hr />
                            <h6>Chương trình ưu đãi</h6>
                            <div class="bx-vnpay d-flex">
                                <div class="icon-vnpay">
                                    <img src="images/icon-vnpay.webp" alt="" />
                                </div>
                                <div class="text-sales">
                                    Giảm 10% khi thanh toán qua VNPAY với mã PRIMEREELS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="img">
                                <div class="parkage-title">
                                    <h6>VIP299K</h6>
                                    <p class="price">299.000đ</p>
                                    <p class="text">Không giới hạn phim trong vòng 1 năm</p>
                                </div>
                            </div>
                            <div class="button-vip">
                                <Link href="/user-payment-package">
                                    <button class="btn btn-danger">Chọn Gói Vip</button>
                                </Link>
                            </div>
                            <div class="content-vip mt-2">
                                <div class="item">
                                    <i class="fa-solid fa-star"></i>
                                    Xem phim thả ga, không lo quảng cáo
                                </div>
                                <div class="item">
                                    <i class="fa-solid fa-star"></i>
                                    24h kể từ khi đăng ký
                                </div>
                                <div class="item">
                                    <i class="fa-solid fa-star"></i>
                                    Chất lượng phim Full HD
                                </div>
                            </div>
                            <hr />
                            <h6>Chương trình ưu đãi</h6>
                            <div class="bx-vnpay d-flex">
                                <div class="icon-vnpay">
                                    <img src="images/icon-vnpay.webp" alt="" />
                                </div>
                                <div class="text-sales">
                                    Giảm 10% khi thanh toán qua VNPAY với mã PRIMEREELS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}