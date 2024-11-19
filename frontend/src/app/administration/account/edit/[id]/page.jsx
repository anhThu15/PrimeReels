"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function UpdateAccount({ params }) {
    const { id } = params; // Get the ID from the params
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            user_name: '',
            email: '',
            gender: '',
            // role: '', 
            avatar: ''
        },
        validationSchema: Yup.object({
            user_name: Yup.string().required('Tên người dùng là bắt buộc'),
            email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
            gender: Yup.string().required('Giới tính là bắt buộc'),
            // role: Yup.string().required('Vai trò là bắt buộc'),
            avatar: Yup.string().required('URL hình ảnh là bắt buộc'), // Make avatar required
        }),
        onSubmit: async (values) => {
            console.log("Submitting values:", values);
            try {
                const token = Cookies.get('token');
                const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });
                if (res.ok) {
                    alert('Cập nhật tài khoản thành công!');
                    toast.success('Cập nhật tài khoản thành công!');
                    router.back();
                } else {
                    console.error('Lỗi khi cập nhật tài khoản:', res.status);
                    toast.error('Cập nhật không thành công!')
                }
            } catch (error) {
                console.error('Lỗi khi cập nhật tài khoản:', error);
            }
        },
    });

    // Fetch account data based on ID
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const token = Cookies.get('token');
                const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    console.error('Error fetching account:', res.status);
                    return;
                }
                const data = await res.json();
                formik.setValues(data); // Set the fetched data to Formik state
            } catch (error) {
                console.error('Error fetching account:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/admin/account">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Cập nhật tài khoản</h3>
            </div>
            <form className="p-4 shadow mt-2 rounded" onSubmit={formik.handleSubmit}>
                <button className="btn btn-primary mt-3" type="submit">Lưu</button>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="user_name" className="form-label">Tên người dùng</label>
                            <input
                                type="text"
                                className={`form-control rounded ${formik.touched.user_name && formik.errors.user_name ? 'is-invalid' : ''}`}
                                id="user_name"
                                name="user_name"
                                value={formik.values.user_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Nguyễn Văn A"
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
                                placeholder="userpr1234@gmail.com"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
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

                        {/* <div className="mb-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="role" className="form-label">Vai trò</label>
                                    <select
                                        name="role"
                                        id="role"
                                        className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="0">Khách hàng</option>
                                        <option value="100">Quản trị</option>
                                    </select>
                                    {formik.touched.role && formik.errors.role ? (
                                        <div className="invalid-feedback">{formik.errors.role}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div> */}
                        
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
                                onChange={formik.handleChange}
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
