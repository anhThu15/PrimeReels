import "../../globals.css";
import Link from 'next/link';
export default function UserPayMentPackage(){
    return(
        <div className="container font-monospace">
            <div className="title-back mt-2">
                <i className="fa-solid fa-chevron-left"></i> Trở về
            </div>
            <h4 className="mt-3">Chọn phương thức thanh toán</h4>
            <div className="row mt-3 u-pay">
                <div className="col-md-7">
                    <div className="u-pay-note">
                        <div>
                            <i className="fa-solid fa-triangle-exclamation"></i> Chọn phương thức thanh toán phù hợp & Bấm nút Đăng ký gói để hoàn thành đăng ký gói bạn nhé
                        </div>
                        <div>
                            <i className="fa-solid fa-lock"></i> PrimeReels đảm bảo mọi giao dịch đều được bảo mật tuyệt đối
                        </div>
                    </div>

                    <div className="payment-option">
                        <input type="radio" id="momo" name="payment" value="momo"/>
                        <label for="momo">
                            <img src="images/momo.png" alt="Ví MoMo"/>
                            Ví MoMo
                        </label>
                    </div>

                    <div className="payment-option">
                        <input type="radio" id="visa" name="payment" value="visa"/>
                        <label for="momo">
                            <img src="images/mastercard-visa.png" alt="Thanh toán quốc tế"/>
                            Thẻ thanh toán quốc tế (Visa/MasterCard)
                        </label>
                    </div>

                    <div className="payment-option">
                        <input type="radio" id="zalopay" name="payment" value="zalopay"/>
                        <label for="momo">
                            <img src="images/zalopay.webp" alt="ZaloPay"/>
                            Ví điện tử ZaloPay
                        </label>
                    </div>

                    <div className="payment-option">
                        <input type="radio" id="vnpay" name="payment" value="vnpay"/>
                        <label for="momo">
                            <img src="images/icon-vnpay.webp" alt="VNPay"/>
                            Quét mã QR VNPAY
                        </label>
                    </div>

                </div>
                <div className="col-md-4 mb-3">
                    <div className="u-pay-detail">
                        <h3>Thông tin chi tiết</h3>
                        <div className="name">
                            <span>Tài khoản</span>
                            <span>0123456789</span>
                        </div>
                        <div className="divider-detail"></div>
                        <div className="package-detail">
                            <div className="name-package">
                                <span>Tên gói</span>
                                <span>VIP39K</span>
                            </div>
                            <div className="date-package mt-2">
                                <span>Thời gian gói</span>
                                <span>30 ngày</span>
                            </div>
                        </div> 
                        <div className="divider-detail"></div>
                        <div className="detail-date-package">
                            <div className="effective-date">
                                <span>Ngày hiệu lực</span>
                                <span>12/09/2024</span>
                            </div>
                            <div className="package-useto mt-2">
                                <span>Sử dụng đến</span>
                                <span>12/10/2024</span>
                            </div>
                        </div>
                        <div className="divider-detail"></div>
                        <div className="package-price">
                            <div className="price">
                                <span>Trị giá</span>
                                <span>39.000VNĐ</span>
                            </div>
                            <div className="code-sales">
                                <input type="text" placeholder="Nhập mã giảm giá" className="discount-code"/>
                                <button className="btn btn-outline-secondary">Xác nhận</button>
                            </div>
                        </div>
                        <div className="divider-detail"></div>
                        <div className="total-package">
                            <span>Thành tiền</span>
                            <span>39.000VNĐ</span>
                        </div>
                        <div className="button-pay">
                            <Link href="after-payment">
                                <button className="btn btn-danger">Thanh toán</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}