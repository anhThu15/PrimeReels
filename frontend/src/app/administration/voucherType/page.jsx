"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from "react-toastify";
export default function VoucherType() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [voucherToDelete, setVoucherToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('none');

    const fetchVoucherTypes = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/voucher-types`, {
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
            setData(types);
            setFilteredData(types); // Set filtered data initially
        } catch (error) {
            console.error('Error fetching voucher types:', error);
        }
    };

    useEffect(() => {
        fetchVoucherTypes();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            discount: 0,
            customer_usage_limit: 1,
            discount_type: 'percentage',
            min_spend: 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên thể loại voucher không được để trống'),
            discount: Yup.number().min(0, 'Giảm giá phải lớn hơn hoặc bằng 0').required('Số lượng giảm không được để trống'),
            customer_usage_limit: Yup.number().min(0, 'Phải lớn hơn hoặc bằng 0').required('Số lượng người dùng sử dụng không được để trống'),
            discount_type: Yup.string().required('Bắt buộc chọn'),
            min_spend: Yup.number().min(0, 'Phải lớn hơn hoặc bằng 0').required('Bắt buộc phải chọn'),
        }),
        onSubmit: async (values) => {
            try {
                const token = Cookies.get('token');
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/voucher-types`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });
                if (res.ok) {
                    toast.success('Thể loại voucher đã được thêm thành công!');
                    fetchVoucherTypes();  // Refresh the list
                    formik.resetForm();   // Reset the form
                } else {
                    console.error('Lỗi khi thêm thể loại voucher:', res.status);
                    // alert('Lỗi khi thêm thể loại voucher');
                    toast.error(`Lỗi khi thêm: ${errorData.message || 'Vui lòng kiểm tra lại'}`);
                }
            } catch (error) {
                console.error('Lỗi Post request:', error);
            }
        },
    });


    const handleDelete = async (voucherId) => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/voucher-types/${voucherId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.ok) {
                // alert('Thể loại voucher đã được xóa thành công!');
                toast.success('Xóa thể loại voucher đã thành công!');
                fetchVoucherTypes(); // Refresh the list
            } else {
                console.error('Lỗi khi xóa thể loại voucher:', res.status);
                // alert('Lỗi khi xóa thể loại voucher');
                toast.error('Lỗi khi xóa thể loại voucher')
            }
        } catch (error) {
            console.error('Lỗi Delete request:', error);
        }
    };


    useEffect(() => {
        const filtered = data.filter(voucher =>
            voucher.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);


    useEffect(() => {
        let sortedData = [...filteredData];
        if (sortOrder === 'asc') {
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === 'desc') {
            sortedData.sort((a, b) => b.name.localeCompare(a.name));
        }
        setFilteredData(sortedData);
    }, [sortOrder]);

    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className="col fw-bold">Thể Loại Voucher</h2>
                <div className="col-2">
                    <button type="button" className="btn btn-success mt-2" data-bs-toggle="modal" data-bs-target="#addVoucherModal">
                        + Thêm Mới
                    </button>
                </div>
                <div className="row mb-3">
                    <div className="col-2">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Tìm kiếm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sắp xếp
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => setSortOrder('asc')}>A-Z</a></li>
                                <li><a className="dropdown-item" onClick={() => setSortOrder('desc')}>Z-A</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Voucher Modal */}
            <div className="modal fade" id="addVoucherModal" tabIndex="-1" aria-labelledby="addVoucherModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addVoucherModalLabel">Thêm thể loại voucher</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tên Thể Loại Voucher</label>
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
                                    <label className="form-label">Giảm Giá</label>
                                    <input
                                        type="number"
                                        className="form-control"
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
                                    <label className="form-label">Giới Hạn Sử Dụng</label>
                                    <input
                                        type="number"
                                        className="form-control"
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
                                    <label className="form-label">Loại Giảm Giá</label>
                                    <select
                                        className="form-select"
                                        name="discount_type"
                                        value={formik.values.discount_type}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="percentage">Phần trăm</option>
                                        <option value="fixed">Số tiền</option>
                                    </select>
                                    {formik.touched.discount_type && formik.errors.discount_type ? (
                                        <div className="text-danger">{formik.errors.discount_type}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Chi Tiêu Tối Thiểu</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="min_spend"
                                        value={formik.values.min_spend}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.min_spend && formik.errors.min_spend ? (
                                        <div className="text-danger">{formik.errors.min_spend}</div>
                                    ) : null}
                                </div>
                                <button type="submit" className="btn btn-primary">Thêm Thể Loại</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of Add Voucher Modal */}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Voucher Name</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Usage Limit</th>
                        <th scope="col">Min Spend</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((voucher, index) => (
                        <tr key={voucher.voucher_type_id}>
                            <th scope="row">{voucher.voucher_type_id}</th>
                            <td>{voucher.name}</td>
                            <td>{voucher.discount}</td>
                            <td>{voucher.customer_usage_limit}</td>
                            <td>{voucher.min_spend}</td>
                            <td>{new Date(voucher.created_at).toLocaleDateString()}</td>
                            <td>{new Date(voucher.updated_at).toLocaleDateString()}</td>
                            <td>
                                <Link href={`/administration/voucherType/edit/${voucher.voucher_type_id}`} className="btn btn-secondary">
                                    <i className="fa-solid fa-pen"></i>
                                </Link>
                                <button className="btn btn-danger ms-2" onClick={() => {
                                    setVoucherToDelete(voucher.voucher_type_id);
                                    setShowDeleteModal(true);
                                }}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Delete Confirmation Modal */}
            <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} id="deleteVoucherModal" tabIndex="-1" aria-labelledby="deleteVoucherModalLabel" aria-hidden={!showDeleteModal} style={{ display: showDeleteModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteVoucherModalLabel">Xác Nhận Xóa</h5>
                            <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa thể loại voucher này không?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Hủy</button>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                handleDelete(voucherToDelete);
                                setShowDeleteModal(false);
                            }}>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of Delete Confirmation Modal */}
        </div>
    );
}
