import "../../globals.css";
import Link from 'next/link';

export default function ForgotPassword() {
    return (
        <div class="modal-login modal-register">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Quên mật khẩu</h3>
                </div>
                <p>Điền email gắn với tài khoản của bạn  nhận đường dẫn thay đổi mật khẩu</p>
                <div class="bor-form">
                    <form class="form-login">
                        <div class="mb-3 form-group">
                            <input type="email" 
                            placeholder="Email"
                            class="lg-email"/>
                        </div>

                        <div class="button-submit">
                            <button type="submit" name="submit">Tiếp tục</button>
                        </div>

                        <div class="mt-2 text-white text-center">
                            Quay lại
                            <Link href="/login" className="btn-register">Đăng nhập</Link> ngay!
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}