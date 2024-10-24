import "../../globals.css";
import Link from 'next/link';

export default function ForgotPassword() {
    return (
        <div className="modal-login modal-register">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Quên mật khẩu</h3>
                </div>
                <p>Điền email gắn với tài khoản của bạn  nhận đường dẫn thay đổi mật khẩu</p>
                <div className="bor-form">
                    <form className="form-login">
                        <div className="mb-3 form-group">
                            <input type="email" 
                            placeholder="Email"
                            className="lg-email"/>
                        </div>

                        <div className="button-submit">
                            <button type="submit" name="submit">Tiếp tục</button>
                        </div>

                        <div className="mt-2 text-white text-center">
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