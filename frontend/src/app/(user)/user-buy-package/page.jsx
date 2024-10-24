import "../../globals.css";
import Link from 'next/link';
export default function UserBuyPackage() {
    return (
        <div className="container font-monospace">
            <div className="title-back">
                <i className="fa-solid fa-chevron-left"></i> Trở về
            </div>
            <h4 className="mt-3">Đặc quyền VIP</h4>
            <div className="vip-menu">
                <div className="vip-item">
                    <div className="icon-container">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    100.000+ giờ giải trí
                </div>
                <div className="vip-item">
                    <div className="icon-container">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    Không quảng cáo
                </div>
                <div className="vip-item">
                    <div className="icon-container">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    Thuyết minh, lồng tiếng, phụ đề
                </div>
                <div className="vip-item">
                    <div className="icon-container">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    Full HD/4K
                </div>
            </div>
            <div className="row mt-3 package mb-3">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="img">
                                <div className="parkage-title">
                                    <h6>VIP19K</h6>
                                    <p className="price">19.000đ</p>
                                    <p className="text">Không giới hạn phim trong vòng 24h</p>
                                </div>
                            </div>
                            <div className="button-vip">
                                <Link href="/user-payment-package">
                                    <button className="btn btn-danger">Chọn Gói Vip</button>
                                </Link>
                            </div>
                            <div className="content-vip mt-2">
                                <div className="item">
                                    <i className="fa-solid fa-star"></i>
                                    Xem phim thả ga, không lo quảng cáo
                                </div>
                                <div className="item">
                                    <i className="fa-solid fa-star"></i>
                                    24h kể từ khi đăng ký
                                </div>
                                <div className="item">
                                    <i className="fa-solid fa-star"></i>
                                    Chất lượng phim Full HD
                                </div>
                            </div>
                            <hr />
                            <h6>Chương trình ưu đãi</h6>
                            <div className="bx-vnpay d-flex">
                                <div className="icon-vnpay">
                                    <img src="images/icon-vnpay.webp" alt="" />
                                </div>
                                <div className="text-sales">
                                    Giảm 10% khi thanh toán qua VNPAY với mã PRIMEREELS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="img">
                                <div className="parkage-title">
                                    <h6>VIP39K</h6>
                                    <p className="price">39.000đ</p>
                                    <p className="text">Không giới hạn phim trong vòng 1 tháng</p>
                                </div>
                            </div>
                            <div className="button-vip">
                                <Link href="/user-payment-package">
                                    <button className="btn btn-danger">Chọn Gói Vip</button>
                                </Link>
                            </div>
                            <div className="content-vip mt-2">
                                <div className="item">
                                    <i className="fa-solid fa-star"></i>
                                    Xem phim thả ga, không lo quảng cáo
                                </div>
                                <div className="item">
                                    <i className="fa-solid fa-star"></i>
                                    24h kể từ khi đăng ký
                                </div>
                                <div className="item">
                                    <i className="fa-solid fa-star"></i>
                                    Chất lượng phim Full HD
                                </div>
                            </div>
                            <hr />
                            <h6>Chương trình ưu đãi</h6>
                            <div className="bx-vnpay d-flex">
                                <div className="icon-vnpay">
                                    <img src="images/icon-vnpay.webp" alt="" />
                                </div>
                                <div className="text-sales">
                                    Giảm 10% khi thanh toán qua VNPAY với mã PRIMEREELS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="img">
                                <div className="parkage-title">
                                    <h6>VIP299K</h6>
                                    <p className="price">299.000đ</p>
                                    <p className="text">Không giới hạn phim trong vòng 1 năm</p>
                                </div>
                            </div>
                            <div className="button-vip">
                                <Link href="/user-payment-package">
                                    <button className="btn btn-danger">Chọn Gói Vip</button>
                                </Link>
                            </div>
                            <div className="content-vip mt-2">
                                <div className="item">
                                    <i className="fa-solid fa-star"></i>
                                    Xem phim thả ga, không lo quảng cáo
                                </div>
                                <div className="item">
                                    <i className="fa-solid fa-star"></i>
                                    24h kể từ khi đăng ký
                                </div>
                                <div className="item">
                                    <i className="fa-solid fa-star"></i>
                                    Chất lượng phim Full HD
                                </div>
                            </div>
                            <hr />
                            <h6>Chương trình ưu đãi</h6>
                            <div className="bx-vnpay d-flex">
                                <div className="icon-vnpay">
                                    <img src="images/icon-vnpay.webp" alt="" />
                                </div>
                                <div className="text-sales">
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