"use client";
import "../../globals.css";
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Register() {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            user_name: '',
            email: '',
            password: '',
            rePassword: '',
        },
        validationSchema: Yup.object({
            user_name: Yup.string().required('Họ và tên không được để trống'),
            email: Yup.string()
                .matches(/^\S+@\S+\.\S+$/, "Email phải đúng định dạng example@gmail.com")
                .required("Email không được để trống"),
            password: Yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số')
                .required('Mật khẩu là bắt buộc'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
                .required('Vui lòng nhập lại mật khẩu')
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_name: values.user_name,
                        email: values.email,
                        password: values.password,
                        password_confirmation: values.rePassword,
                    }),
                });

                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    toast.success(data.message);
                    router.push("/login");
                } else {
                    toast.error(data.message || 'Đăng ký không thành công');
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        },
    });

    return (
        <div className="modal-login modal-register">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>ĐĂNG KÝ</h3>
                    </div>

                    <div className="bor-form">
                        <form className="form-login" onSubmit={formik.handleSubmit}>
                            <div className="mb-3 form-group">
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="lg-email"
                                    {...formik.getFieldProps('user_name')}
                                />
                                {formik.touched.user_name && formik.errors.user_name ? (
                                    <div className="text-danger">{formik.errors.user_name}</div>
                                ) : null}
                            </div>

                            <div className="mb-3 form-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="lg-email"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-danger">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div className="mb-3 form-group">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="lg-password"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-danger">{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <div className="mb-3 form-group">
                                <input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    className="lg-password"
                                    {...formik.getFieldProps('rePassword')}
                                />
                                {formik.touched.rePassword && formik.errors.rePassword ? (
                                    <div className="text-danger">{formik.errors.rePassword}</div>
                                ) : null}
                            </div>

                            <div className="button-submit">
                                <button type="submit" name="submit">Đăng ký</button>
                            </div>

                            <div className="mt-2 text-white text-center">
                                Đã có tài khoản?
                                <Link href="/login" className="btn-register">Đăng nhập</Link> ngay!
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
