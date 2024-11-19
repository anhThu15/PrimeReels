"use client";

import Link from "next/link";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function AddAdmin() {
    const router = useRouter();
    const [avatarUrl, setAvatarUrl] = useState('../../images/default-user.png');

    // Setup formik và yup để bắt lỗi form
    const formik = useFormik({
        initialValues: {
            user_name: '',
            email: '',
            password: '',
            gender: '',
            avatar: avatarUrl, 
            role: 100 
        },
        validationSchema: Yup.object({
            user_name: Yup.string().required('Tên người dùng là bắt buộc'),
            email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
            password: Yup.string().required("Mật khẩu là bắt buộc"),
            gender: Yup.string().required('Giới tính là bắt buộc'),
            avatar: Yup.string().required('URL hình ảnh là bắt buộc'),
        }),
        onSubmit: async (values) => {
            console.log("Submitting values:", values);
            try {
                const token = Cookies.get('token');
                const res = await fetch(`http://127.0.0.1:8000/api/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });
                if (res.ok) {
                    alert('Tạo tài khoản quản trị viên thành công!');
                    toast.success('Tạo tài khoản quản trị viên thành công!')
                    router.push('/administration/accountAdmin');
                } else {
                    console.error('Lỗi khi tạo tài khoản:', res.status);
                    toast.error('Tạo tài khoản không thành công!');
                }
            } catch (error) {
                console.error('Lỗi khi tạo tài khoản:', error);
            }
        },
    });

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/administration/account">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Tạo mới quản trị viên</h3>
            </div>
            <form className="p-4 shadow mt-2 rounded" onSubmit={formik.handleSubmit}>
                <button className="btn btn-primary mb-3" type="submit">Thêm</button>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="user_name" className="form-label">Tên người quản trị viên</label>
                            <input
                                type="text"
                                className={`form-control rounded ${formik.touched.user_name && formik.errors.user_name ? 'is-invalid' : ''}`}
                                id="user_name"
                                name="user_name"
                                value={formik.values.user_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Nhập tên người dùng"
                            />
                            {formik.touched.user_name && formik.errors.user_name ? (
                                <div className="invalid-feedback">{formik.errors.user_name}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control rounded ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Nhập email đăng nhập"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className={`form-control rounded ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Nhập mật khẩu"
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Giới tính</label>
                            <div className="d-flex mt-2">
                                <div className="form-check me-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="genderMale"
                                        value="nam"
                                        checked={formik.values.gender === 'nam'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <label className="form-check-label" htmlFor="genderMale">Nam</label>
                                </div>
                                <div className="form-check me-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="genderFemale"
                                        value="nu"
                                        checked={formik.values.gender === 'nu'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <label className="form-check-label" htmlFor="genderFemale">Nữ</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="genderOther"
                                        value="khac"
                                        checked={formik.values.gender === 'khac'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <label className="form-check-label" htmlFor="genderOther">Khác</label>
                                </div>
                            </div>
                            {formik.touched.gender && formik.errors.gender ? (
                                <div className="invalid-feedback d-block">{formik.errors.gender}</div>
                            ) : null}
                        </div>
                        {/* Vai trò được gán trực tiếp là 100, không cần input cho vai trò */}
                        <input type="hidden" name="role" value={formik.values.role} />
                    </div>

                    <div className="col-md-4">
                        <h2>Avatar</h2>
                        <div className="text-center">
                            <img
                                src={formik.values.avatar}
                                alt="Avatar"
                                style={{ width: "100%", objectFit: "cover", height: "100%" }}
                                className="rounded mb-3"
                            />
                            <input
                                type="text"
                                className={`form-control rounded mb-3 ${formik.touched.avatar && formik.errors.avatar ? 'is-invalid' : ''}`}
                                placeholder="Nhập URL hình ảnh"
                                value={formik.values.avatar}
                                name="avatar"
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    setAvatarUrl(e.target.value); 
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.avatar && formik.errors.avatar ? (
                                <div className="invalid-feedback">{formik.errors.avatar}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
