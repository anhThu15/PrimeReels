import ListChoie from "@/app/layout/user/listchoie";
import "../../globals.css";
import Link from 'next/link';

export default function Register() {
    return (
        <div className="container-fluid d-flex justify-content-center pt-3" style={{ backgroundColor: "#283237", width: "100%" }}>
            <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark">

                <div className=" mt-3 col-sm font-monospace text-white form">


                    <div className="tab-login" id="tab-register">
                        <div className="title mt-3">ĐĂNG KÝ</div>
                        <div className="bor-form mt-3">
                            <form className="form-login">
                                <div class="mb-3 form-group">
                                    <input type="name"
                                        placeholder="Tài khoản" name="username"
                                        class="lg-name" />
                                </div>

                                <div class="mb-3 form-group">
                                    <input type="email"
                                        placeholder="Email đăng nhập" name="email"
                                        class="lg-email" />
                                </div>

                                <div class="mb-3 form-group">
                                    <input type="password" name="password"
                                        placeholder="Mật khẩu"
                                        class="lg-password" />
                                </div>

                                <div class="mb-3 form-group">
                                    <input type="password" name="repassword"
                                        placeholder="Mật khẩu"
                                        class="lg-password" />
                                </div>


                                <div class="mb-3 form-group">
                                    <input type="captcha" name="repassword" maxLength={8}
                                        placeholder="Mã bảo vệ"
                                        class="lg-capcha" />
                                    <div class="capcha">
                                        <div class="code">
                                            <img style={{ height: "height: 44px;" }} src="https://animevietsub.pub/ajax/captcha/rand/8470/" height="50" alt="Captcha" id="verify-image" />
                                        </div>
                                    </div>
                                </div>

                                <div className="button-submit">
                                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                                </div>

                                <div className="mt-3 text-white">
                                    Đã có tài khoản?
                                    <Link href="/login" className="btn-login">Đăng nhập</Link> ngay!
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                <div className=" mt-3 col-sm-4 font-monospace text-white">
                    <ListChoie></ListChoie>
                </div>


            </div>
        </div>
    )
}