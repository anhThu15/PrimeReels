"use client"
import { useEffect, useState } from "react";
import ListChoie from "@/app/layout/user/listchoie";
import "../../globals.css";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(()=>{
        let token = localStorage.getItem("token");
        if(token){
            router.push("/")
        }
    },[router])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data)

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); 
            toast.success('Đăng nhập thành công!');

            const user = JSON.parse(localStorage.getItem('user'));

            if(user.role === 100) {
                router.push("/admin"); 
            }else {
                router.push("/"); 
            }
            
        } else {
            // setError(data.error || 'Email hoặc mật khẩu đã bị sai');
            toast.error(data.error || 'Email hoặc mật khẩu đã bị sai');
        }
    };

    return (
        <div className="modal-login">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>ĐĂNG NHẬP</h3>
                    </div>
                    <div className="login-by d-flex justify-content-center mb-3">
                        <div className="icon-fb me-2">
                            <a href="#" className="btn btn-primary">
                                <span className="fa fa-facebook"></span> Đăng nhập bằng Facebook
                            </a>
                        </div>
                        <div className="icon-google">
                            <a href="#" className="btn d-flex align-items-center">
                                <img src="images/google-icon.png" alt="Google" className="google-icon" /> Đăng nhập bằng Google
                            </a>
                        </div>
                    </div>

                    <div className="bor-form">
                        <form className="form-login" onSubmit={handleSubmit}>
                            <div className="mb-3 form-group">
                                <input
                                    type="email"
                                    placeholder="Email đăng nhập"
                                    className="lg-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3 form-group">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="lg-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Link href="/forgot-password" className="forgot-password">Quên mật khẩu</Link>
                            </div>

                            {/* {error && <div className="alert alert-danger">{error}</div>} */}

                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label text-white" htmlFor="exampleCheck1">Lưu mật khẩu</label>
                            </div>

                            <div className="button-submit">
                                <button type="submit" name="submit">Đăng nhập</button>
                            </div>

                            <div className="mt-2 text-white text-center">
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
