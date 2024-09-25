import ListChoie from "@/app/layout/user/listchoie";
import "../../globals.css";
import Link from 'next/link';

export default function Login() {
    return (
        <div className="container-fluid d-flex justify-content-center pt-3" style={{ backgroundColor: "#283237", width: "100%" }}>
            <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark">


                    <div className=" mt-3 col-sm font-monospace text-white form">
                        <div className="schedule-title-main mb-3">
                            <strong>Lưu ý:</strong>
                            "ĐĂNG NHẬP TÀI KHOẢN GIÚP LƯU LỊCH SỬ XEM VÀ NHẬN THÔNG BÁO ANIME MỚI TỐT NHẤT"
                        </div>

                        <div className="tab-login" id="tab-login">

                            <div className="title">ĐĂNG NHẬP</div>
                            
                            <div className="bor-form mt-3">
                                <form className="form-login">
                                    {/* <p className="sug">Hoặc :</p> */}
                                    <div className="mb-3 form-group">
                                        <input type="email"
                                            placeholder="Email đăng nhập"
                                            className="lg-email" />
                                    </div>

                                    <div className="mb-3 form-group">
                                        <input type="password" 
                                            placeholder="Mật khẩu"
                                            className="lg-password" />
                                        <a href="#" className="forgot-password">Quên mật khẩu?</a>
                                    </div>

                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label text-white" htmlFor="exampleCheck1">Lưu mật khẩu</label>
                                    </div>

                                    <div className="button-submit">
                                        <button type="submit" className="btn btn-primary">Đăng nhập</button>
                                    </div>

                                    <div className="mt-3 text-white">
                                        Chưa có tài khoản?
                                        <Link href="/register" className="btn-register">Đăng ký</Link> ngay!
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
    );
}

