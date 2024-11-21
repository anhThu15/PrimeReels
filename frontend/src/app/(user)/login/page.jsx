"use client"
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "../../globals.css";
import Cookies from 'js-cookie';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            // router.push("/");
            window.location.pathname = '/'
        }
    }, [router]);  //kiểm trả xem đã có token chưa => đã có thì không cho vào lại trang login

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            
            document.cookie = `token=${data.token}; path=/; samesite=strict; secure`;
            document.cookie = `user=${JSON.stringify(data.user)}; path=/; samesite=strict; secure`;
            

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            console.log(response)

            if(data.user.email_verification_token != null){
                toast("Bạn chưa xác định email, hãy xác minh để có thể đăng nhập");
            }else{
                // alert("mày đã xác minh rồi")
                toast.success('Đăng nhập thành công!');
                if (data.user.role === 100) {
// <<<<<<< feature_frontEnd
                    // router.push("/administration");
                    window.location.pathname = '/administration'
// =======
                    router.push("/administration");
//  >>>>>>> main
                } else {
                    // router.push("/");
                    window.location.pathname = '/'
                    window.location.reload();
                }
                
            }
        } else {
            toast.error(data.error || 'Email hoặc mật khẩu đã bị sai');
        }
    };

    return (
        <div className="modal-login">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header mb-3">
                        <h3>ĐĂNG NHẬP</h3>
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

                            <div className="mb-5 form-group">
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
                            
                                <div className="button-submit mb-2">
                                    <button type="submit" name="submit" >Đăng nhập</button> 
                                </div>

                                <Link href={`${process.env.NEXT_PUBLIC_API_URL}/login/google`} className="google-login-btn" style={{marginLeft:"170px"}}>
                                    <img src="images/google-icon.png" alt="Login With Google" width={25} />
                                    Google Login
                                </Link>
                            
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
