"use client";
import { useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "../../globals.css";
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
    const router = useRouter(); 

    useEffect(() => {   
        const token = Cookies.get('token');
        if (token) {
            window.location.pathname = '/';
        }
    }, [router]); 

    // Sử dụng Formik và Yup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không hợp lệ')
                .matches(/@(gmail\.com|example\.com)$/, "Email phải có đuôi @gmail.com hoặc @example.com")
                .required('Vui lòng nhập email'),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch(`/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.status === 200 && data && data.user) {
                    if (data.user.email_verification_token != null) {
                        toast.error("Bạn chưa xác định email, hãy xác minh để có thể đăng nhập");
                    } else {
                        toast.success('Đăng nhập thành công!');
                        document.cookie = `token=${data.token}; path=/; samesite=strict; secure; max-age=3600`;
                        if (data.user.role === 100) {
                            window.location.pathname = '/administration';
                        } else {
                            window.location.pathname = '/';
                            window.location.reload();
                        }
                    }
                } else {
                    toast.error(data.error || 'Email hoặc mật khẩu đã bị sai');
                }
            } catch (error) {
                console.error('Lỗi đăng nhập:', error);
                toast.error('Đã xảy ra lỗi khi kết nối tới máy chủ. Vui lòng kiểm tra lại kết nối mạng của bạn và thử lại.');
            }
        },
    });

    return (
        <div className="modal-login">
            <div className="modal-dialog mt-5">
                <div className="modal-content">
                    <div className="modal-header mb-3">
                        <h3>ĐĂNG NHẬP</h3>
                    </div>
                    <div className="bor-form">
                        <form className="form-login" onSubmit={formik.handleSubmit}>
                            <div className="mb-3 form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email đăng nhập"
                                    className="lg-email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-danger">{formik.errors.email}</p>
                                )}
                            </div>

                            <div className="mb-5 form-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    className="lg-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-danger">{formik.errors.password}</p>
                                )}
                                <Link href="/forgot-password" className="forgot-password">Quên mật khẩu</Link>
                            </div>
                            
                            <div className="button-submit mb-2">
                                <button type="submit" name="submit">Đăng nhập</button> 
                            </div>

                            <div>
                                <p>Hoặc đăng nhập bằng :</p>
                            </div>
                            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/login/google`} style={{ display: "block", textAlign: "center" }} className="mb-3">
                                <img src="images/google-icon.png" alt="Login With Google" width={35} style={{ cursor: "pointer" }} />
                            </Link>

                            <div className="text-white text-center mb-3">
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
