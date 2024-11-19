"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function ChitietVoucher({ params }) {
    const [voucher, setVoucher] = useState(null);
    const [voucherTypes, setVoucherTypes] = useState([]);
    const voucherId = params.id;

    const router = useRouter();

    // Fetch voucher details by ID
    const fetchVoucherDetails = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`http://127.0.0.1:8000/api/vouchers/${voucherId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error('Error fetching voucher details:', res.status);
                return;
            }
            const data = await res.json();
            setVoucher(data);
        } catch (error) {
            console.error('Error fetching voucher details:', error);
        }
    };

    // Fetch voucher types
    const fetchVoucherTypes = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch('http://127.0.0.1:8000/api/voucher-types', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error('Error fetching voucher types:', res.status);
                return;
            }
            const types = await res.json();
            setVoucherTypes(types);
        } catch (error) {
            console.error('Error fetching voucher types:', error);
        }
    };

    useEffect(() => {
        fetchVoucherDetails();
        fetchVoucherTypes();
    }, [voucherId]);

    // Handle form submission with Formik
    const formik = useFormik({
        initialValues: {
            name: "",
            quantity: "",  // Changed from discount to quantity
            voucherTypeId: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Tên voucher là bắt buộc"),
            quantity: Yup.number().required("Số lượng là bắt buộc").positive("Số lượng phải lớn hơn 0").integer("Số lượng phải là số nguyên"),
        }),
        onSubmit: async (values) => {
            try {
                const token = Cookies.get('token');
                const res = await fetch(`http://127.0.0.1:8000/api/vouchers/${voucherId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        voucher_id: voucherId,
                        name: values.name,
                        voucher_type_id: values.voucherTypeId,
                        voucher_quantity: values.quantity,  // Updated to use quantity
                    }),
                });

                if (res.ok) {
                    // alert('Cập nhật voucher thành công!');
                    toast.success('Cập nhật voucher thành công!')
                    router.back();
                } else {
                    const errorData = await res.json();
                    console.error('Error updating voucher:', res.status, errorData);
                    // alert('Cập nhật voucher không thành công!');
                    toast.error("Cập nhật voucher thất bại!")
                }
            } catch (error) {
                console.error('Error updating voucher:', error);
            }
        },
    });

    useEffect(() => {
        if (voucher) {
            formik.setValues({
                name: voucher.name,
                quantity: voucher.voucher_quantity || '',  // Set initial quantity
                voucherTypeId: voucher.voucher_type?.voucher_type_id || '',
            });
        }
    }, [voucher]);

    if (!voucher) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid">
            <div className="fw-bold">
                <Link className="btn btn-danger mb-2 me-2" href='/administration/voucher'>
                    <i className="fa-solid fa-chevron-left"></i>
                </Link>
                <span className="fs-4">Chi Tiết Voucher</span>
            </div>
            <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Tên Voucher</label>
                        <input 
                            type="text" 
                            className="form-control" 
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
                        <label className="form-label">Số Lượng Voucher</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="quantity" 
                            value={formik.values.quantity}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                        />
                        {formik.touched.quantity && formik.errors.quantity ? (
                            <div className="text-danger">{formik.errors.quantity}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Loại Voucher</label>
                        <select 
                            className="form-select" 
                            name="voucherTypeId" 
                            value={formik.values.voucherTypeId}
                            onChange={formik.handleChange}
                        >
                            <option value="">Chọn loại voucher</option>
                            {voucherTypes.map(type => (
                                <option key={type.voucher_type_id} value={type.voucher_type_id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
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
