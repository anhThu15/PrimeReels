import ListChoie from "@/app/layout/user/listchoie";
import "../../globals.css";
export default function Register() {
    return (
        <div className="container-fluid d-flex justify-content-center pt-3" style={{ backgroundColor: "#283237", width: "100%" }}>
            <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark">

                <div className=" mt-3 col font-monospace text-white form">


                    <div className="tab-login" id="tab-register">
                        <div className="title mt-3">ĐĂNG KÝ</div>
                        <div className="lg-mxh d-flex justify-content-between">

                            <div className="google col-md-6">
                                <div id="gSignInWrapper">

                                    <div id="customBtn" className="customGPlusSignIn">
                                        <span className="icon"></span>
                                        <span className="buttonText">Đăng ký với Google</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bor-form mt-3">
                            <form className="form-login">
                                <p className="sug">Hoặc :</p>

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
                                            <img style={{ height: "height: 44px;" }} src="https://animevietsub.uk/ajax/captcha/rand/8470/" height="50" alt="Captcha" id="verify-image" />
                                        </div>
                                    </div>
                                </div>

                                <div className="button-submit">
                                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                                </div>

                                <div className="mt-3 text-white">
                                    Đã có tài khoản?
                                    <a href="#" className="btn-login">Đăng nhập</a>ngay!
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                <div className=" mt-3 col-4 font-monospace text-white">
                    <ListChoie></ListChoie>
                </div>


            </div>
        </div>
    )
}