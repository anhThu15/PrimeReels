import ListChoie from "@/app/layout/user/listchoie";
import "../../globals.css";
import Link from 'next/link';

export default function Login() {
    return (
        <div class="modal-login">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>ĐĂNG NHẬP</h3>
                    </div>
                    <div class="login-by d-flex justify-content-center mb-3">
                        <div class="icon-fb me-2">
                            <a href="#" class="btn btn-primary">
                                <span class="fa fa-facebook"></span> Đăng nhập bằng Facebook
                            </a>
                        </div>
                        <div class="icon-google">
                            <a href="#" class="btn d-flex align-items-center">
                                <img src="images/google-icon.png" alt="Google" class="google-icon" /> Đăng nhập bằng Google
                            </a>
                        </div>
                    </div>

                    <div class="bor-form">
                        <form class="form-login">
                            <div class="mb-3 form-group">
                                <input type="email"
                                    placeholder="Email đăng nhập"
                                    class="lg-email" />
                            </div>

                            <div class="mb-3 form-group">
                                <input type="password" id="exampleInputPassword1"
                                    placeholder="Mật khẩu"
                                    class="lg-password" />
                                <Link href="/forgot-password" className="forgot-password">Quên mật khẩu</Link>
                            </div>

                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label text-white" for="exampleCheck1">Lưu mật khẩu</label>
                            </div>

                            <div class="button-submit">
                                <button type="submit" name="submit">Đăng nhập</button>
                            </div>

                            <div class="mt-2 text-white text-center">
                                Chưa có tài khoản?
                                <Link href="/register" className="btn-register">Đăng ký</Link> ngay!
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

