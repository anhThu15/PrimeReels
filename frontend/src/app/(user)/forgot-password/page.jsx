"use client"
import "../../globals.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    // useEffect(() => {
    //     if (localStorage.getItem('passwordResetRequested')) {
    //         setIsHidden(true);
    //     }
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        // const data = await response.json();
        if (response.ok) {
            localStorage.setItem('passwordResetRequested', 'true');
            const data = await response.json();
            toast.success(data.message);
        } else if (response.status === 404) {
            toast.error("Email không tồn tại bạn hãy nhập lại.");
        } else {
            const data = await response.json();
            toast.error(data.error || 'Đã xảy ra lỗi!');
        }
    };

    return (
        <div className="modal-login modal-register">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Quên mật khẩu</h3>
                    </div>
                    <p>Điền email gắn với tài khoản của bạn nhận đường dẫn thay đổi mật khẩu</p>
                    <div className="bor-form">
                        <form className="form-login" onSubmit={handleSubmit}>
                            <div className="mb-3 form-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="lg-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="button-submit">
                                <button type="submit">Tiếp tục</button>
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
