"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function DetailVoucherType({ params }) {
    const [voucher, setVoucher] = useState(null);
    const router = useRouter();
    const voucherId = params.id; // Assuming params.id contains the voucher_type_id

    // Fetch voucher details
    const fetchVoucherDetails = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`http://127.0.0.1:8000/api/voucher-types/${voucherId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setVoucher(data);
            } else {
                console.error('Error fetching voucher details:', res.status);
            }
        } catch (error) {
            console.error('Error fetching voucher details:', error);
        }
    };

    useEffect(() => {
        fetchVoucherDetails();
    }, [voucherId]);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: '',
            discount: 0,
            customer_usage_limit: 1,
            discount_type: 'percentage',
            min_spend: 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên voucher không được để trống'),
            discount: Yup.number().min(0, 'Giảm giá phải lớn hơn hoặc bằng 0').required('Số lượng giảm không được để trống'),
            customer_usage_limit: Yup.number().min(0, 'Phải lớn hơn hoặc bằng 0').required('Số lượng người dùng sử dụng không được để trống'),
            discount_type: Yup.string().required('Bắt buộc chọn'),
            min_spend: Yup.number().min(0, 'Phải lớn hơn hoặc bằng 0').required('Bắt buộc phải chọn'),
        }),
        onSubmit: async (values) => {
            try {
                const token = Cookies.get('token');
                const res = await fetch(`http://127.0.0.1:8000/api/voucher-types/${voucherId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });
                if (res.ok) {
                    // alert('Cập nhật thể loại voucher thành công');
                    toast.success('Cập nhật thể loại voucher thành công')
                    router.back();
                } else {
                    console.error('Lỗi khi cập nhật:', res.status);
                    // alert('Lỗi khi cập nhật.');
                    toast.error('Lỗi khi cập nhật.')
                }
            } catch (error) {
                console.error('Lỗi PUT request:', error);
            }
        },
    });

    useEffect(() => {
        if (voucher) {
            formik.setValues({
                name: voucher.name,
                discount: voucher.discount,
                customer_usage_limit: voucher.customer_usage_limit,
                discount_type: voucher.discount_type,
                min_spend: voucher.min_spend,
            });
        }
    }, [voucher]);

    if (!voucher) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid">
            <div className="fw-bold">
                <Link className="btn btn-danger mb-2 me-2" href="/administration/voucherType">
                    <i className="fa-solid fa-chevron-left"></i>
                </Link>
                <span className="fs-4">Chi Tiết Thể Loại Voucher</span>
            </div>
            <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Tên Voucher</label>
                        <input 
                            type="text" 
                            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} 
                            name="name" 
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giảm giá</label>
                        <input 
                            type="number" 
                            className={`form-control ${formik.touched.discount && formik.errors.discount ? 'is-invalid' : ''}`} 
                            name="discount" 
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.discount && formik.errors.discount ? (
                            <div className="text-danger">{formik.errors.discount}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giới hạn lần sử dụng</label>
                        <input 
                            type="number" 
                            className={`form-control ${formik.touched.customer_usage_limit && formik.errors.customer_usage_limit ? 'is-invalid' : ''}`} 
                            name="customer_usage_limit" 
                            value={formik.values.customer_usage_limit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.customer_usage_limit && formik.errors.customer_usage_limit ? (
                            <div className="text-danger">{formik.errors.customer_usage_limit}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Chi tiêu tối thiểu</label>
                        <input 
                            type="number" 
                            className={`form-control ${formik.touched.min_spend && formik.errors.min_spend ? 'is-invalid' : ''}`} 
                            name="min_spend" 
                            value={formik.values.min_spend}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.min_spend && formik.errors.min_spend ? (
                            <div className="text-danger">{formik.errors.min_spend}</div>
                        ) : null}
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
