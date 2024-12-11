'use client'
import { useEffect, useState } from "react";
import "../../globals.css";
import Link from 'next/link';
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function UserBuyPackage() {
    const token = Cookies.get('token');
    const [user, setUser] = useState([])
    const [check, setCheck] = useState(0)
    const router = useRouter()
    const [packags, setPackages] = useState([])
    const [vouchers, setVouchers] = useState([])

    useEffect(() => {
        const getToken = () =>{
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
        } 
        setTimeout(() => {
            getToken()
        }, 2000);
      }, [token]);

    useEffect(() => {
        const checkUserInvoice = async () => {
            try {
              const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, { revalidate: 3600 });
            //   console.log(res.data);
              const userInvoices = res.data
                                  .filter(invoice => invoice.user_id === user.user_id) 
                                //   .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                                  .sort((a, b) => b.invoice_id - a.invoice_id);

                                //   console.log(user);
                                  
              const calculateSecondsBetweenDates = (startDate, endDate) => {
                      const formatDate = (dateStr) => {
                          if (dateStr.includes("/")) {
                              const [time, date] = dateStr.split(" ");
                              const [day, month, year] = date.split("/");
                              return new Date(`${year}-${month}-${day}T${time}`);
                          } else {
                              const [date, time] = dateStr.split(" ");
                              return new Date(`${date}T${time}`);
                          }
                      };
                    
                      const start = formatDate(startDate);
                      const end = formatDate(endDate);
                    
                      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                          return NaN;
                      }
                    
                      const differenceInMilliseconds = end - start;
                      const differenceInSeconds = differenceInMilliseconds / 1000;
                    
                      return differenceInSeconds;
              };
              // hàm tính giây cho thgian dc phép xem 
      
              if(userInvoices && userInvoices[0] && userInvoices[0].status){
                console.log(userInvoices[0].status === 'success');
                  if(userInvoices[0].status === 'success'){
                    const currentDate = new Date();
                    const options = {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false, // Định dạng 24 giờ
                    };
                    const formattedDateTimeVN = currentDate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', ...options })
                    const startDate = formattedDateTimeVN;
                    const endDate = userInvoices[0].end_date;
                    const seconds = calculateSecondsBetweenDates(startDate, endDate);
                    console.log(startDate, endDate, seconds);
                    // console.log('xử  lý coi theo ngày')
                    // console.log(seconds);
                    setCheck(seconds)
                  //   console.log(check);
                    
                  }
                  
              }
      
            } catch (error) {
              console.log(error);
            }
          }

          checkUserInvoice();
    },[user.user_id])

    useEffect(() => {
        const getPackages = async () => {
            const res = await axios.get(`/api/packages`, { revalidate: 3600 }).then((res) => res.data)
            setPackages(res)
        }

        const getVouchers = async () => {
            const res = await axios.get(`/api/vouchers`, { revalidate: 3600 }).then((res) => res.data)
            const filteredVouchers = res.filter(voucher => voucher.voucher_type_id !== 4);
            setVouchers(filteredVouchers)
        }
       
          getPackages()
          getVouchers()
    },[])
    

      console.log(check);
      

    const hanldeBack = () => {
        router.back();
    }

    

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
                                            {check > 0 ? (
                                                <p className="text-danger">Còn hạn sử dụng gói, vui lòng sử dụng hết trước khi mua gói mới.</p>
                                            ) : (
                                                <Link href={`/user-buy-package/${pk.package_id}`}>
                                                    <button className="btn btn-danger">Chọn Gói Vip</button>
                                                </Link>
                                            )}
                                        </div>
                                        <div className="content-vip mt-2">
                                            <div className="item">
                                                <i className="fa-solid fa-star"></i>
                                                Xem phim thả ga, không lo quảng cáo
                                            </div>
                                            <div className="item">
                                                <i className="fa-solid fa-star"></i>
                                                {pk.duration} ngày kể từ khi đăng ký
                                            </div>
                                            <div className="item">
                                                <i className="fa-solid fa-star"></i>
                                                Chất lượng phim Full HD
                                            </div>
                                        </div>
                                        <hr />
                                        <h6>Chương trình ưu đãi</h6>
                                            {vouchers.map((vch) => {
                                                if(vch?.voucher_type?.min_spend <= pk.price ){
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
                                                }
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