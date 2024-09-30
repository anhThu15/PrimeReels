import ListChoie from "@/app/layout/user/listchoie";
import "../../globals.css";
import Link from 'next/link';

export default function Register() {
    return (
        <div class="modal-login modal-register">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>ĐĂNG KÝ</h3>
                    </div>

                    <div class="bor-form">
                        <form class="form-login">
                            <div class="mb-3 form-group">
                                <input type="email"
                                    placeholder="Email"
                                    class="lg-email" />
                            </div>

                            <div class="mb-3 form-group">
                                <input type="password" id="exampleInputPassword1"
                                    placeholder="Mật khẩu"
                                    class="lg-password" />
                            </div>

                            <div class="mb-3 form-group">
                                <input type="password" id="exampleInputPassword1"
                                    placeholder="Nhập lại mật khẩu"
                                    class="lg-password" />
                            </div>

                            <div class="button-submit">
                                <button type="submit" name="submit">Đăng ký</button>
                            </div>

                            <div class="mt-2 text-white text-center">
                                Đã có tài khoản
                                <Link href="/login" className="btn-register">Đăng nhập</Link> ngay!
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}