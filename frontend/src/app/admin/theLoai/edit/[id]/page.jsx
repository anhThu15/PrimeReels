"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function UpdateGenre({ params }) {
    const router = useRouter();
    const { id } = params; // Lấy genre_id từ params
    const [initialValues, setInitialValues] = useState({
        name: '',
        status: 1,
        description: '',
    });

    const fetchGenreById = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`http://127.0.0.1:8000/api/genres/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error('Lỗi khi lấy thể loại:', res.status);
                return;
            }
            const genreData = await res.json();
            setInitialValues(genreData); // Cập nhật thông tin genre
        } catch (error) {
            console.error('Lỗi khi lấy thể loại:', error);
        }
    };

    useEffect(() => {
        fetchGenreById(); // Fetch dữ liệu khi component được mount
    }, [id]);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Enable reinitialization
        validationSchema: Yup.object({
            name: Yup.string().required('Tên thể loại là bắt buộc'),
            status: Yup.number().required('Trạng thái là bắt buộc').oneOf([0, 1], 'Trạng thái không hợp lệ'),
            description: Yup.string().required("Mô tả là bắt buộc"),
        }),
        onSubmit: async (values) => {
            try {
                const token = Cookies.get('token');
                const res = await fetch(`http://127.0.0.1:8000/api/genres/${id}`, {
                    method: 'PUT', // Sử dụng PUT để cập nhật
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });
                if (res.ok) {
                    router.back();
                    toast.success("Cập nhật thành công")
                    console.log('Cập nhật thành công');
                } else {
                    toast.error("Thao tác thất bại hãy kiểm tra lại!")
                    console.error('Lỗi khi cập nhật thể loại:', res.status);
                }
            } catch (error) {
                console.error('Lỗi khi cập nhật thể loại:', error);
            }
        },
    });

    return (
        <div className="container-fluid">
            <div className="fw-bold"> 
                <Link className="btn btn-danger mb-2 me-2" href='/admin/theLoai'>
                    <i className="fa-solid fa-chevron-left"></i>
                </Link> 
                <span className="fs-4">Chi Tiết Thể Loại</span> 
            </div>
            <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Tên Thể Loại</label>
                        <input 
                            type="text" 
                            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} 
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="invalid-feedback">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Trạng Thái</label>
                        <select 
                            className={`form-select ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`} 
                            {...formik.getFieldProps('status')}
                        >
                            <option value="1">Công Khai</option>
                            <option value="0">Không Công Khai</option>
                        </select>
                        {formik.touched.status && formik.errors.status ? (
                            <div className="invalid-feedback">{formik.errors.status}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mô Tả</label>
                        <textarea 
                            className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`} 
                            {...formik.getFieldProps('description')}
                            rows="3" 
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="invalid-feedback">{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Hủy</button>
                        <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
