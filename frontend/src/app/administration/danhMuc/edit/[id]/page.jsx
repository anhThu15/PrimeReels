"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function UpdateMovieType({ params }) {
    const router = useRouter();
    const { id } = params;
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Tên danh mục là bắt buộc"),
        }),
        onSubmit: async (values) => {
            try {
                const token = Cookies.get('token');
                const res = await fetch(`/api/movie-types/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });
                if (res.ok) {
                    console.log('Cập nhật thành công');
                    toast.success("Cập nhật thành công")
                    router.back();
                } else {
                    toast.error("Thao tác thất bại hãy kiểm tra lại!")
                    console.error('Lỗi khi cập nhật thể loại:', res.status);
                }
            } catch (error) {
                toast.error("Thao tác thất bại hãy kiểm tra lại!")
                console.error('Lỗi khi cập nhật thể loại:', error);
            }
        },
    });

    useEffect(() => {
        const fetchMovieType = async () => {
            try {
                const token = Cookies.get('token');
                const res = await fetch(`/api/movie-types/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    formik.setValues({ name: data.movieType.name });
                } else {
                    console.error('Lỗi khi lấy danh mục:', res.status);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieType();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className="container-fluid">
                <div className="fw-bold">
                    <Link className="btn btn-danger mb-2 me-2" href='/administration/danhMuc'>
                        <i className="fa-solid fa-chevron-left"></i>
                    </Link>
                    <span className="fs-4">Chi Tiết Danh Mục</span>
                </div>
                <div className="modal-body">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Tên Danh Mục</label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} 
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
