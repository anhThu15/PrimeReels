'use client'
import { useEffect, useState } from "react";
import "../../globals.css";
import Link from 'next/link';
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserBuyPackage() {
    const router = useRouter()
    const [packags, setPackages] = useState([])
    const [vouchers, setVouchers] = useState([])

    useEffect(() => {
        const getPackages = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/packages`, { revalidate: 3600 }).then((res) => res.data)
            setPackages(res)
        }

        const getVouchers = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vouchers`, { revalidate: 3600 }).then((res) => res.data)
            setVouchers(res)
        }

        getPackages()
        getVouchers()
    },[])

    const hanldeBack = () => {
        router.back();
    }

    // console.log(packags);
    

    return (
        <div className="container">
            <button onClick={hanldeBack} className=" btn btn title-back mt-2">
                <i className="fa-solid fa-chevron-left"></i> Trở về
            </button>
            <h4 className="mt-3">Đặc quyền VIP</h4>
            <div className="vip-menu">
                <div className="vip-item">
                    <div className="icon-container">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    100.000+ giờ giải trí
                </div>
                <div className="vip-item">
                    <div className="icon-container">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    Không quảng cáo
                </div>
                <div className="vip-item">
                    <div className="icon-container">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    Thuyết minh, lồng tiếng, phụ đề
                </div>
                <div className="vip-item">
                    <div className="icon-container">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    Full HD/4K
                </div>
            </div>
            <div className="row mt-3 package mb-3">
                {packags.map((pk) =>{
                    return(
                        <>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="img">
                                            <div className="parkage-title">
                                                <h6>{pk.name}</h6>
                                                <p className="price">{pk.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                <p className="text">Không giới hạn phim trong vòng {pk.duration} Ngày</p>
                                            </div>
                                        </div>
                                        <div className="button-vip">
                                            <Link href={`/user-buy-package/${pk.package_id }`}>
                                                <button className="btn btn-danger">Chọn Gói Vip</button>
                                            </Link>
                                        </div>
                                        <div className="content-vip mt-2">
                                            <div className="item">
                                                <i className="fa-solid fa-star"></i>
                                                Xem phim thả ga, không lo quảng cáo
                                            </div>
                                            <div className="item">
                                                <i className="fa-solid fa-star"></i>
                                                {pk.duration}h kể từ khi đăng ký
                                            </div>
                                            <div className="item">
                                                <i className="fa-solid fa-star"></i>
                                                Chất lượng phim Full HD
                                            </div>
                                        </div>
                                        <hr />
                                        <h6>Chương trình ưu đãi</h6>
                                            {vouchers.map((vch) => {
                                                return(
                                                    <>
                                                        <div className="bx-vnpay d-flex">
                                                            <div className="icon-vnpay">
                                                                <img src="images/icon-vnpay.webp" alt="" />
                                                            </div>
                                                            <div className="text-sales">
                                                                Giảm {vch?.voucher_type?.discount}% khi thanh toán qua VNPAY với mã {vch.name}
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    );
}