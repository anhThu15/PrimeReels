import "../../globals.css";
import Link from 'next/link';
export default function UserPayMentPackage(){
    return(
        <div className="container font-monospace">
            <div class="title-back mt-2">
                <i class="fa-solid fa-chevron-left"></i> Trở về
            </div>
            <h4 class="mt-3">Chọn phương thức thanh toán</h4>
            <div class="row mt-3 u-pay">
                <div class="col-md-7">
                    <div class="u-pay-note">
                        <div>
                            <i class="fa-solid fa-triangle-exclamation"></i> Chọn phương thức thanh toán phù hợp & Bấm nút Đăng ký gói để hoàn thành đăng ký gói bạn nhé
                        </div>
                        <div>
                            <i class="fa-solid fa-lock"></i> PrimeReels đảm bảo mọi giao dịch đều được bảo mật tuyệt đối
                        </div>
                    </div>

                    <div class="payment-option">
                        <input type="radio" id="momo" name="payment" value="momo"/>
                        <label for="momo">
                            <img src="images/momo.png" alt="Ví MoMo"/>
                            Ví MoMo
                        </label>
                    </div>

                    <div class="payment-option">
                        <input type="radio" id="visa" name="payment" value="visa"/>
                        <label for="momo">
                            <img src="images/mastercard-visa.png" alt="Thanh toán quốc tế"/>
                            Thẻ thanh toán quốc tế (Visa/MasterCard)
                        </label>
                    </div>

                    <div class="payment-option">
                        <input type="radio" id="zalopay" name="payment" value="zalopay"/>
                        <label for="momo">
                            <img src="images/zalopay.webp" alt="ZaloPay"/>
                            Ví điện tử ZaloPay
                        </label>
                    </div>

                    <div class="payment-option">
                        <input type="radio" id="vnpay" name="payment" value="vnpay"/>
                        <label for="momo">
                            <img src="images/icon-vnpay.webp" alt="VNPay"/>
                            Quét mã QR VNPAY
                        </label>
                    </div>

                </div>
                <div class="col-md-4 mb-3">
                    <div class="u-pay-detail">
                        <h3>Thông tin chi tiết</h3>
                        <div class="name">
                            <span>Tài khoản</span>
                            <span>0123456789</span>
                        </div>
                        <div class="divider-detail"></div>
                        <div class="package-detail">
                            <div class="name-package">
                                <span>Tên gói</span>
                                <span>VIP39K</span>
                            </div>
                            <div class="date-package mt-2">
                                <span>Thời gian gói</span>
                                <span>30 ngày</span>
                            </div>
                        </div> 
                        <div class="divider-detail"></div>
                        <div class="detail-date-package">
                            <div class="effective-date">
                                <span>Ngày hiệu lực</span>
                                <span>12/09/2024</span>
                            </div>
                            <div class="package-useto mt-2">
                                <span>Sử dụng đến</span>
                                <span>12/10/2024</span>
                            </div>
                        </div>
                        <div class="divider-detail"></div>
                        <div class="package-price">
                            <div class="price">
                                <span>Trị giá</span>
                                <span>39.000VNĐ</span>
                            </div>
                            <div class="code-sales">
                                <input type="text" placeholder="Nhập mã giảm giá" class="discount-code"/>
                                <button class="btn btn-outline-secondary">Xác nhận</button>
                            </div>
                        </div>
                        <div class="divider-detail"></div>
                        <div class="total-package">
                            <span>Thành tiền</span>
                            <span>39.000VNĐ</span>
                        </div>
                        <div class="button-pay">
                            <Link href="after-payment">
                                <button class="btn btn-danger">Thanh toán</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}