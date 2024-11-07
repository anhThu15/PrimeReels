"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import "../../globals.css";
import Cookies from 'js-cookie';
export default function ResetPassword() {
    
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.push("/");
        }
    }, [router]);  //kiểm trả xem đã có token chưa => đã có thì không cho vào lại trang này

    useEffect(() => {
        //lấy token và email từ url
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        if (token && email) {
            setToken(token);
            setEmail(email);
        }

        localStorage.removeItem('passwordResetRequested');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token || !email) {
            toast.error("Token hoặc email không hợp lệ.");
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success(data.message);
            router.push('/login'); 
        } else {
            toast.error(data.error || 'Đã xảy ra lỗi!');
        }
    };

    return (
        <div className="modal-login modal-register">
            <ToastContainer />
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Đặt lại mật khẩu</h3>
                    </div>
                    <p>Nhập mật khẩu mới của bạn dưới đây:</p>
                    <div className="bor-form">
                        <form className="form-login" onSubmit={handleSubmit}>
                            <div className="mb-3 form-group">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    className="lg-email"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-group">
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    className="lg-email"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="button-submit">
                                <button type="submit">Xác Nhận</button>
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
    );
}
