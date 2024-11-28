"use client";
import { useState } from "react";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function AddActor() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [previewImage, setPreviewImage] = useState('../../images/default-user.png'); // Avatar preview
    const [uploadedFile, setUploadedFile] = useState(null); // Tệp tải lên

    const formik = useFormik({
        initialValues: {
            name: '',
            biography: '',
            birth_date: '',
            image_url: '', // Không còn cần dùng, nhưng giữ để xử lý fallback
            status: 1 // Trạng thái mặc định
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên diễn viên là bắt buộc'),
            biography: Yup.string().required('Tiểu sử là bắt buộc'),
            birth_date: Yup.string()
                .required('Ngày sinh là bắt buộc')
                .matches(/^\d{4}-\d{2}-\d{2}$/, 'Định dạng ngày không hợp lệ (yyyy-mm-dd)'),
            status: Yup.number().required('Trạng thái là bắt buộc').oneOf([0, 1], 'Trạng thái không hợp lệ'),
        }),
        onSubmit: async (values) => {
            const token = Cookies.get('token');
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('biography', values.biography);
            formData.append('birth_date', values.birth_date);
            formData.append('status', values.status);
            if (uploadedFile) {
                formData.append('image', uploadedFile); // Thêm tệp ảnh vào FormData
            }

            try {
                const response = await fetch(`/api/actors`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData, // Gửi FormData thay vì JSON
                });

                if (response.ok) {
                    toast.success('Thêm diễn viên thành công!');
                    router.back();
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || "Lỗi khi thêm diễn viên!");
                }
            } catch (error) {
                toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
            }
        },
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file); // Lưu tệp vào state
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result); // Hiển thị ảnh xem trước
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/administration/actor">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Tạo mới diễn viên</h3>
            </div>
            <form className="p-4 shadow mt-2 rounded" onSubmit={formik.handleSubmit} encType="multipart/form-data">
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
                                src={previewImage} 
                                alt="Avatar" 
                                style={{ width: "100%", objectFit: "cover", height: "100%" }} 
                                className="rounded mb-3" 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Tải Lên Hình Ảnh</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                id="image" 
                                name="image" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="form-label">Ngày Sinh</label>
                            <input 
                                type="text" 
                                className={`form-control rounded ${formik.touched.birth_date && formik.errors.birth_date ? 'is-invalid' : ''}`} 
                                id="birthdate" 
                                name="birth_date" 
                                placeholder="YYYY-MM-DD" 
                                onChange={(e) => formik.setFieldValue('birth_date', e.target.value)} 
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
