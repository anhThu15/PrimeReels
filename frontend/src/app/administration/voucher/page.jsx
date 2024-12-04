"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function Voucher() {
    const [data, setData] = useState([]);
    const [voucherTypes, setVoucherTypes] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [voucherToDelete, setVoucherToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Formik setup for new voucher
    const formik = useFormik({
        initialValues: {
            name: '',
            voucher_type_id: '',
            voucher_quantity: '',
            expired: '',
            enddate: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Tên voucher không được để trống"),
            voucher_type_id: Yup.string().required("Loại voucher không được để trống"),
            voucher_quantity: Yup.number().required("Số lượng không được để trống").positive("Số lượng phải lớn hơn 0").integer("Số lượng phải là số nguyên"),
            expired: Yup.date().required("Ngày hết hạn không được để trống").nullable(),
            enddate: Yup.date().required("Ngày kết thúc không được để trống").nullable()
                .min(Yup.ref('expired'), "Ngày kết thúc phải sau ngày hết hạn"),
        }),
        onSubmit: async (values) => {
            try {
                console.log(values);
                
                const token = Cookies.get('token');
                const res = await fetch(`/api/vouchers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });
                if (res.ok) {
                    // alert('Tạo mới voucher thành công!');
                    toast.success("Tạo mới voucher thành công")
                    fetchVouchers();
                    formik.resetForm(); // Reset form
                    window.location.reload()
                } else {
                    console.error('Lỗi khi tạo mới voucher:', res.status);
                    // alert('Tạo mới voucher không thành công!');
                    toast.error("Tạo mới voucher không thành công!")
                }
            } catch (error) {
                console.error('Lỗi khi gửi yêu cầu tạo mới voucher:', error);
            }
        },
    });

    // Fetch data vouchers
    const fetchVouchers = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`/api/vouchers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error('Lỗi khi lấy danh sách vouchers:', res.status);
                return;
            }
            const newData = await res.json();
            // Sắp xếp theo ID từ mới nhất đến cũ nhất
            const sortedData = newData.sort((a, b) => b.voucher_id - a.voucher_id);

            setData(sortedData);
            setFilteredData(sortedData); // Set filtered data ban đầu
        } catch (error) {
            console.error('Lỗi khi lấy danh sách vouchers:', error);
        }
    };

    // Fetch data voucher types
    const fetchVoucherTypes = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`/api/voucher-types`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error('Lỗi khi lấy danh sách loại voucher:', res.status);
                return;
            }
            const types = await res.json();
            setVoucherTypes(types);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách loại vouchers:', error);
        }
    };

    useEffect(() => {
        fetchVouchers();
        fetchVoucherTypes();
    }, []);

    // useEffect(() => {
    //     const filtered = data.filter(voucher =>
    //         voucher.name.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredData(filtered);
    // }, [searchTerm, data]);

    useEffect(() => {
        let sortedData = [...data];
        if (filteredData.length > 0) {
            if (searchTerm) {
                sortedData = data.filter((voucher) =>
                    voucher.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
        }
        setFilteredData(sortedData);
    }, [data, searchTerm]);

    const handleSort = (order) => {
        const sortedData = [...filteredData];
        if (order === 'asc') {
            // Sắp xếp A-Z
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === 'desc') {
            // Sắp xếp Z-A
            sortedData.sort((a, b) => b.name.localeCompare(a.name));
        } else {
            // Mặc định: sắp xếp theo voucher_id (mới nhất -> cũ nhất)
            sortedData.sort((a, b) => b.voucher_id - a.voucher_id);
        }
        setFilteredData(sortedData);
    };


    const handleDeleteVoucher = async () => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`/api/vouchers/${voucherToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.ok) {
                toast.success("Xóa voucher thành công!");
                fetchVouchers();
            } else {
                console.error('Lỗi khi xóa voucher:', res.status);
                toast.error("Xóa voucher không thành công!");
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu xóa voucher:', error);
        } finally {
            setShowDeleteModal(false);
            setVoucherToDelete(null);
        }
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <h2 className="col fw-bold">Voucher</h2>
                <div className="col-2">
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        + Thêm Mới
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tạo Mới Voucher</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                                name="voucher_quantity"
                                                value={formik.values.voucher_quantity}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.voucher_quantity && formik.errors.voucher_quantity ? (
                                                <div className="text-danger">{formik.errors.voucher_quantity}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Ngày Bắt Đầu</label>
                                            <input
                                                type="date"
                                                className="form-select"
                                                name="expired"
                                                value={formik.values.expired}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.expired && formik.errors.expired ? (
                                                <div className="text-danger">{formik.errors.expired}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Ngày Kết Thúc</label>
                                            <input
                                                type="date"
                                                className="form-select"
                                                name="enddate"
                                                value={formik.values.enddate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.enddate && formik.errors.enddate ? (
                                                <div className="text-danger">{formik.errors.enddate}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Loại Voucher</label>
                                            <select
                                                className="form-select"
                                                name="voucher_type_id"
                                                value={formik.values.voucher_type_id}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="">Chọn loại voucher</option>
                                                {voucherTypes.map(type => (
                                                    <option key={type.voucher_type_id} value={type.voucher_type_id}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {formik.touched.voucher_type_id && formik.errors.voucher_type_id ? (
                                                <div className="text-danger">{formik.errors.voucher_type_id}</div>
                                            ) : null}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Xác Nhận</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <form className="d-flex" role="search" onSubmit={e => e.preventDefault()}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Tìm kiếm"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
                <div className="col">
                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-filter"></i> Lọc
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => handleSort('asc')}>A-Z</a></li>
                            <li><a className="dropdown-item" onClick={() => handleSort('desc')}>Z-A</a></li>
                            <li><a className="dropdown-item" onClick={() => handleSort('default')}>Mặc định (Mới nhất)</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-1">
                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            10
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">20</a></li>
                            <li><a className="dropdown-item" href="#">30</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">TÊN VOUCHER</th>
                        <th scope="col">SỐ LƯỢNG</th>
                        {/* <th scope="col">NGÀY BẮT ĐẦU</th> */}
                        <th scope="col">NGÀY KẾT THÚC</th>
                        <th scope="col">TÁC VỤ</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((voucher, index) => (
                        <tr key={voucher.voucher_id}>
                            <th scope="row">{index + 1}</th>
                            <td>{voucher.name}</td>
                            <td>{voucher.voucher_quantity}</td>
                            {/* <td>{new Date(voucher.expired).toLocaleDateString()}</td> */}
                            <td>{new Date(voucher.enddate).toLocaleDateString()}</td>
                            <td>
                                <Link href={`/administration/voucher/edit/${voucher.voucher_id}`} className="btn btn-secondary">
                                    <i className="fa-solid fa-pen"></i>
                                </Link>
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => {
                                        setVoucherToDelete(voucher.voucher_id);  // Lưu voucher_id vào state
                                        setShowDeleteModal(true);  // Hiển thị modal xác nhận
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#confirmDeleteVoucherModal" // Đảm bảo trigger modal xác nhận
                                >
                                    <i className="fa-solid fa-trash"></i> Xóa
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="confirmDeleteVoucherModal" tabIndex="-1" aria-labelledby="confirmDeleteVoucherModalLabel" aria-hidden="true" data-bs-backdrop="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmDeleteVoucherModalLabel">Xác nhận xóa voucher</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa voucher này?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteVoucher} data-bs-dismiss="modal">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    );
}
