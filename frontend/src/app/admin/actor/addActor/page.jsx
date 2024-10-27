"use client";
import { useState } from "react";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddActor() {
    const router = useRouter();
    const [message, setMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            biography: '',
            birth_date: '',
            image_url: '',
            status: 1 // Trạng thái mặc định
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên diễn viên là bắt buộc'),
            biography: Yup.string().required('Tiểu sử là bắt buộc'),
            birth_date: Yup.string()
                .required('Ngày sinh là bắt buộc')
                .matches(/^\d{4}-\d{2}-\d{2}$/, 'Định dạng ngày không hợp lệ (yyyy-mm-dd)'),
            image_url: Yup.string().url('URL không hợp lệ').required('URL hình ảnh là bắt buộc'),
            status: Yup.number().required('Trạng thái là bắt buộc').oneOf([0, 1], 'Trạng thái không hợp lệ'),
        }),
        onSubmit: async (values) => {
            const token = Cookies.get('token');

            try {
                const response = await fetch('http://127.0.0.1:8000/api/actors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    setMessage('Thêm diễn viên thành công!');
                    router.back();
                } else {
                    const errorData = await response.json();
                    setMessage(`Lỗi: ${errorData.message}`);
                }
            } catch (error) {
                setMessage('Đã xảy ra lỗi, vui lòng thử lại!');
            }
        },
        validateOnChange: false, // Ngăn không để validate khi nhập liệu
    });

    // Xử lý định dạng ngày sinh
    const handleDateChange = (e) => {
        const { value } = e.target;
        const digits = value.replace(/\D/g, '');
        let formattedDate = '';

        if (digits.length > 4) {
            formattedDate += digits.slice(0, 4) + '-';
            if (digits.length > 6) {
                formattedDate += digits.slice(4, 6) + '-';
                formattedDate += digits.slice(6, 8);
            } else {
                formattedDate += digits.slice(4);
            }
        } else {
            formattedDate = digits;
        }

        formik.setFieldValue('birth_date', formattedDate);
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/admin/actor">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Tạo mới diễn viên</h3>
            </div>
            <form className="p-4 shadow mt-2 rounded" onSubmit={formik.handleSubmit}>
                {message && <div className="alert alert-info">{message}</div>}
                <button type="submit" className="btn btn-primary mb-3">Thêm</button>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Tên Diễn Viên</label>
                            <input 
                                type="text" 
                                className={`form-control rounded ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} 
                                id="actorName" 
                                name="name" 
                                placeholder="Nhập tên diễn viên" 
                                {...formik.getFieldProps('name')} 
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorBio" className="form-label">Tiểu Sử</label>
                            <textarea 
                                className={`form-control rounded ${formik.touched.biography && formik.errors.biography ? 'is-invalid' : ''}`} 
                                id="actorBio" 
                                name="biography" 
                                rows="10" 
                                placeholder="Nhập tiểu sử diễn viên" 
                                {...formik.getFieldProps('biography')} 
                            />
                            {formik.touched.biography && formik.errors.biography ? (
                                <div className="invalid-feedback">{formik.errors.biography}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="col-md-4">
                        <h2>Avatar</h2>
                        <div className="text-center mb-3">
                            <img 
                                src={formik.values.image_url || "../../images/default-user.png"} 
                                alt="Avatar" 
                                style={{ width: "100%", objectFit: "cover", height: "100%" }} 
                                className="rounded mb-3" 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image_url" className="form-label">URL Hình Ảnh</label>
                            <input 
                                type="text" 
                                className={`form-control rounded ${formik.touched.image_url && formik.errors.image_url ? 'is-invalid' : ''}`} 
                                id="image_url" 
                                name="image_url" 
                                placeholder="Nhập URL hình ảnh" 
                                {...formik.getFieldProps('image_url')} 
                            />
                            {formik.touched.image_url && formik.errors.image_url ? (
                                <div className="invalid-feedback">{formik.errors.image_url}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="form-label">Ngày Sinh</label>
                            <input 
                                type="text" 
                                className={`form-control rounded ${formik.touched.birth_date && formik.errors.birth_date ? 'is-invalid' : ''}`} 
                                id="birthdate" 
                                name="birth_date" 
                                placeholder="YYYY-MM-DD" 
                                onChange={handleDateChange} 
                                value={formik.values.birth_date} 
                            />
                            {formik.touched.birth_date && formik.errors.birth_date ? (
                                <div className="invalid-feedback">{formik.errors.birth_date}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Trạng Thái</label>
                            <select 
                                className={`form-select rounded ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`} 
                                id="status" 
                                name="status" 
                                {...formik.getFieldProps('status')} 
                            >
                                <option value={1}>Hoạt Động</option>
                                <option value={0}>Ngừng Hoạt Động</option>
                            </select>
                            {formik.touched.status && formik.errors.status ? (
                                <div className="invalid-feedback">{formik.errors.status}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
