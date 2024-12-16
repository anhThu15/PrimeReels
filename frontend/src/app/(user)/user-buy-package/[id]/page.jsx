'use client'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


export default function UserPayMentPackageDetail({params}){
    const id = params.id
    const token = Cookies.get('token');
    const [user, setUser] = useState([])
    // const userCookie = Cookies.get('user');
    // const user = JSON.parse(userCookie);
    const router = useRouter()
    // console.log(user);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [packages , setPackages] = useState([])

    useEffect(() => {
        if (token) {
          axios.get(`/api/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => setUser(res.data.user))
          .catch(error => {
            console.error("Error fetching user data:", error);
          });
        }
      }, [token]);
  
      console.log(user);

    useEffect(() => {
        const getPackages = async () => {
            const res = await axios.get(`/api/packages/${id}`, { revalidate: 3600 }).then((res) => res.data)
            setPackages(res)
            setValue('package_id', res.package_id)
        }
        if(id){
            getPackages()
           }
    },[id, setValue])
    // console.log(packages.package_id);
    
    const handlePayment = async (data) => {
        try {
            // const token = localStorage.getItem('token');
            const res = await axios.post(`/api/package/purchase`,data,{
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            }).then((res) => res.data);
            if (res) {
            //   toast.success('thành công ròi đi chữa lãnh hoy ~~~')
              window.location.href = res.url
            }
            
            }catch (error) {
                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                
                    // Kiểm tra và hiển thị lỗi `voucher_name`
                    if (errorData.voucher_name) {
                      toast.error('Lỗi Giao Dịch Vui Lòng Thử Lại Hoặc Kiểm Tra Voucher');
                    }
                    // Kiểm tra và hiển thị lỗi `message`
                    if (errorData.message) {
                      toast.error(errorData.message);
                    }
                  } else {
                    // Hiển thị lỗi không mong đợi
                    toast.error('An unexpected error occurred');
                  }
          }
    }

    const hanldeBack = () => {
        router.back();
    }

    //  hàm tính ngày
    const today = new Date();
    const DaysLater = new Date(today);
    DaysLater.setDate(today.getDate() + packages.duration);
    
    const DaysLaterString = DaysLater.toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh"
    });
    // console.log(DaysLaterString);
    //  hàm tính ngày

    
    
    
    return(
        <div className="container">
            <button onClick={hanldeBack} className=" btn btn title-back mt-2">
                <i className="fa-solid fa-chevron-left"></i> Trở về
            </button>
            <h4 className="mt-3">Chọn phương thức thanh toán</h4>
            <div className="row mt-3 u-pay">
                <div className="col-md-7">
                    <div className="u-pay-note">
                        <div>
                            <i className="fa-solid fa-triangle-exclamation"></i> Chọn phương thức thanh toán phù hợp & Bấm nút Đăng ký gói để hoàn thành đăng ký gói bạn nhé
                        </div>
                        <div>
                            <i className="fa-solid fa-lock"></i> PrimeReels đảm bảo mọi giao dịch đều được bảo mật tuyệt đối
                        </div>
                    </div>

                    <div className="payment-option">
                        <input type="radio" id="momo" name="payment" value="momo"/>
                        <label for="momo">
                            <img src="/images/momo.png" alt="Ví MoMo"/>
                            Ví MoMo
                        </label>
                    </div>

                    <div className="payment-option">
                        <input type="radio" id="visa" name="payment" value="visa"/>
                        <label for="momo">
                            <img src="/images/mastercard-visa.png" alt="Thanh toán quốc tế"/>
                            Thẻ thanh toán quốc tế (Visa/MasterCard)
                        </label>
                    </div>

                    <div className="payment-option">
                        <input type="radio" id="zalopay" name="payment" value="zalopay"/>
                        <label for="momo">
                            <img src="/images/zalopay.webp" alt="ZaloPay"/>
                            Ví điện tử ZaloPay
                        </label>
                    </div>

                    <div className="payment-option">
                        <input type="radio" id="vnpay" checked name="payment" value="vnpay"/>
                        <label for="momo">
                            <img src="/images/icon-vnpay.webp" alt="VNPay"/>
                            Thanh Toán VNPAY
                        </label>
                    </div>

                </div>
                <div className="col-md-4 mb-3">
                    <form  onSubmit={handleSubmit(handlePayment)}>
                        <div className="u-pay-detail">
                            <h3>Thông tin chi tiết</h3>
                            <div className="name">
                                <span>Tài khoản</span>
                                <span>{user.user_name}</span>
                            </div>
                            <div className="divider-detail"></div>
                            <div className="package-detail">
                                <div className="name-package">
                                    <span>Tên gói</span>
                                    <span>{packages.name}</span>
                                </div>
                                <div className="date-package mt-2">
                                    <span>Thời gian gói</span>
                                    <span>{packages.duration} ngày</span>
                                </div>
                            </div> 
                            <div className="divider-detail"></div>
                            <div className="detail-date-package">
                                <div className="effective-date">
                                    <span>Ngày hiệu lực</span>
                                    <span>{new Date()?.toLocaleDateString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"})}</span>
                                </div>
                                <div className="package-useto mt-2">
                                    <span>Sử dụng đến</span>
                                    <span>{DaysLaterString}</span>
                                </div>
                            </div>
                            <div className="divider-detail"></div>
                            <div className="package-price">
                                <div className="price">
                                    <span>Mã Giảm Giá</span>
                                    {/* <span>{packages.price?.toLocaleString("vi-VN", {style: "currency",currency: "VND"})}</span> */}
                                </div>
                                <div className="code-sales">
                                    <input type="text" {...register('voucher_name')} placeholder="Nhập mã giảm giá"  className="discount-code"/>
                                    <input type="hidden" {...register('package_id')}/>
                                </div>
                            </div>
                            <div className="divider-detail"></div>
                            <div className="total-package">
                                <span>Thành tiền</span>
                                <span>{packages.price?.toLocaleString("vi-VN", {style: "currency",currency: "VND"})}</span>
                            </div>
                            <div className="button-pay">
                                {/* <Link href="after-payment"> */}
                                    <button className="btn btn-danger" type='submit'>Thanh toán</button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}