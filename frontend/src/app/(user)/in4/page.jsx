"use client";
import Link from "next/link";
import "../../globals.css"; // Import global CSS
import { useEffect, useState } from 'react';
import ChangePasswordModal from "../components/user-infomation/changePassword";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPlayer from "react-player"
import Cookies from 'js-cookie';
import DVDX from "../components/dvdx";
import LSDX from "../components/lsdx";
import DSYT from "../components/dsyt";


export default function InfomationUser() {
    const [activeSection, setActiveSection] = useState('userInfo');
    const [userData, setUserData] = useState({
        username: '',
        gender: '',
        email: '',
        password: '',
        avatar: '', // Avatar field
        // file: null,

    });
    const [modalOpen, setModalOpen] = useState(false);
    const token = Cookies.get('token');
    const [user, setUser] = useState([])
    const [love, setLove] = useState([]);
    const [history, setHistory] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [invoice, setInvoice] = useState([]);
    const [voucher, setVoucher] = useState([]);


    useEffect(() => {
        showSection(activeSection);
        // fetchUserData();
    }, [activeSection]);

    useEffect(() => {
        fetchUserData();
    }, [isUpdated]);

    const showSection = (sectionId) => {
        setActiveSection(sectionId);
        const sections = document.querySelectorAll('.user-info, .u-service-buy, .u-history-view, .u-favorite');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    };

    useEffect(() => {
        const getToken = () => {
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

    //   console.log(user);

    const fetchUserData = async () => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const response = await fetch(`/api/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setUserData({
                        username: data.user.user_name,
                        gender: data.user.gender,
                        email: data.user.email,
                        password: '',
                        avatar: data.user.avatar || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { id, value, type } = e.target;
        if (type === 'radio') {
            setUserData(prevData => ({
                ...prevData,
                gender: value
            }));
        } else {
            setUserData(prevData => ({
                ...prevData,
                [id]: value
            }));
        }
    };

    //xử lý cài đặt tài khoản
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (token) {
            try {
                const response = await fetch('/api/profile/update', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_name: userData.username,
                        gender: userData.gender,
                        avatar: userData.avatar,  // Chỉ gửi URL ảnh
                    }),
                });

                const result = await response.json();
                if (result.status === 'success') {
                    toast.success("Thông tin đã được cập nhật thành công!");
                    // fetchUserData();
                    setTimeout(() => {
                        window.location.reload();
                      }, 1000); //đợi 1s mới reload lại
                } else {
                    toast.error("Có lỗi xảy ra: " + result.message);
                }
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }
    };


    //  xử lý cài đặt tài khoản


    //  xử lý load danh sách yêu thích
    useEffect(() => {
        const getLove = async () => {
            const token = Cookies.get('token');
            try {
                const res = await axios.get(`/api/favourites`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setLove(res.data); // Cập nhật love với dữ liệu trả về từ API
            } catch (error) {
                console.error(error);
            }
        };
        setTimeout(() => {
            getLove();
        }, 2000);
    }, [isUpdated]); // Chỉ chạy khi có cập nhật
    // console.log(love);
    

    const hanldeRemoveLove = async (id) => {
        // alert(id)
        const token = Cookies.get('token');
        try {
            const res = await axios.delete(`/api/movies/${id}/favourites`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res) {
                toast.success('Đá Xóa Thành Công Ra Khỏi Danh Sách Yêu Thích')
                window.location.reload()
            } else {
                toast.error('Thất Bại')
            }
        } catch (error) {
            console.error(error);
        }

    }
    //  xử lý load danh sách yêu thích

    // xử lý load ds lịch sử đã xem 
    useEffect(() => {
        const getHistory = async () => {
            const token = Cookies.get('token');
            try {
                const res = await axios.get(`/api/history`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }).then((res) => res.data)
                setHistory(res.history)
            } catch (error) {
                console.log(error);
            }
        }
        getHistory()
    }, [isUpdated]) // Chỉ chạy khi có cập nhật
    // console.log(history);

    // xử lý load ds lịch sử đã xem 

    useEffect(() => {
        const getInvoice = async () => {
            try {
                const res = await axios.get(`/api/invoices`, { revalidate: 3600 }).then((res) => res.data)
                const userInvoices = res.filter(invoice => invoice.user_id === user.user_id && invoice.status ==='success')
                setInvoice(userInvoices)
                if(userInvoices.length >= 1){
                    try {
                        const vouchers =  await axios.get(`/api/vouchers`, { revalidate: 3600 }).then((res) => res.data)
                        const find = vouchers.filter( v => v.name === `THUONGNAPLANDAU_${user.user_id}`)
                        setVoucher(find)
                    } catch (error) {
                        console.error("Error fetching vouchers:", error);
                    }

                }
            } catch (error) {
                console.log(error);
            }
        }

        getInvoice()
        // getVouchers()
    }, [user.user_id])
    // console.log(invoice);

    useEffect(() => {
        if(voucher){
            // console.log("Voucher has been updated:", voucher);
        }
    },[voucher])
    console.log(voucher);

    const marqueeStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        animation: 'colorChange 1s infinite',
      };
    
    const keyframesStyle = `
        @keyframes colorChange {
          0% { color: red; }
          20% { color: yellow; }
          40% { color: green; }
          60% { color: blue; }
          80% { color: purple; }
          100% { color: orange; }
        }
      `;
    
      // Thêm keyframes vào đầu tài liệu
      if (typeof document !== 'undefined') {
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(keyframesStyle, styleSheet.cssRules.length);
      }


    return (
        <div className="first-page">
            <div className="container">
                <h4 className="u-title text-white">Cài đặt tài khoản</h4>
                <ul className="u-menu">
                    <li style={{ position: 'relative' }}>
                        <a
                            href="#"
                            onClick={() => showSection('userInfo')}
                            className={activeSection === 'userInfo' ? 'active' : ''}
                        >
                            Tài khoản
                        </a>
                        {activeSection === 'userInfo' && <span className="active-indicator" />}
                    </li>
                    <li style={{ position: 'relative' }}>
                        <a
                            href="#"
                            onClick={() => showSection('u-service-buy')}
                            className={activeSection === 'u-service-buy' ? 'active' : ''}
                        >
                            Dịch vụ đã xem
                        </a>
                        {activeSection === 'u-service-buy' && <span className="active-indicator" />}
                    </li>
                    <li style={{ position: 'relative' }}>
                        <a
                            href="#"
                            onClick={() => showSection('u-history-view')}
                            className={activeSection === 'u-history-view' ? 'active' : ''}
                        >
                            Lịch sử đã xem
                        </a>
                        {activeSection === 'u-history-view' && <span className="active-indicator" />}
                    </li>
                    <li style={{ position: 'relative' }}>
                        <a
                            href="#"
                            onClick={() => showSection('u-favorite')}
                            className={activeSection === 'u-favorite' ? 'active' : ''}
                        >
                            Danh sách yêu thích
                        </a>
                        {activeSection === 'u-favorite' && <span className="active-indicator" />}
                    </li>
                </ul>

                <div className="user-info" id="userInfo">
                    <div className="user-info-content row">
                        <div className="col-sm-2 text-center">
                            <div className="user-image">
                                <img
                                    src={userData.avatar || "images/userAvatar.png"}
                                    className="img-fluid rounded-circle"
                                    id="userImg"
                                    alt="User Avatar"
                                    style={{ width: '100px', height: '100px' }} // Adjust size as needed
                                />
                            </div>
                            <div className="join-date text-white">{userData.created_at}</div>
                        </div>
                        <div className="col-sm-10">
                            <form id="userInfoForm" onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="username" className="form-label text-white">Tên người dùng:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Nguyễn Văn A"
                                            value={userData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label text-white">Giới tính:</label>
                                        <div className="d-flex">
                                            <div className="form-check me-4">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="genderMale"
                                                    value="nam"
                                                    checked={userData.gender === 'nam'}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label text-white" htmlFor="genderMale">Nam</label>
                                            </div>
                                            <div className="form-check me-4">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="genderFemale"
                                                    value="nu"
                                                    checked={userData.gender === 'nu'}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label text-white" htmlFor="genderFemale">Nữ</label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="email" className="form-label text-white">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="userABC@gmail.com"
                                            value={userData.email}
                                            readOnly
                                        />
                                    </div>
                                    {/* <div className="col-sm-6">
                                        <label htmlFor="avatar" className="form-label text-white">Avatar URL:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="avatar"
                                            placeholder="https://example.com/avatar.png"
                                            value={userData.avatar}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div> */}
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="password" className="form-label text-white">Mật khẩu:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="********"
                                            value={userData.password}
                                            readOnly
                                        />
                                        <Link
                                            href="#"
                                            onClick={() => setModalOpen(true)}
                                            className="change-password"
                                        >
                                            Thay đổi mật khẩu
                                        </Link>
                                    </div>
                                </div>
                                <div className="u-button">
                                    <button type="submit" className="btn btn-danger">Lưu thay đổi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Modal for changing password */}
                <ChangePasswordModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                <div className="u-service-buy mt-3 h-25" id="u-service-buy" style={{ display: 'none' }}>
                    <div className="w-100 bg-danger mb-2">
                        {voucher[0]?.voucher_quantity === 1 ? (
                            // console.log(voucher),
                            
                            <>
                                <marquee behavior="scroll" direction="left" scrollamount="5" loop="infinite" className="text-white fw-bold fs-4">
                                    Chúc mừng bạn nạp lần đầu thành công, tặng bạn voucher <span  style={marqueeStyle} >{voucher[0]?.name}</span>hạn sử dụng lên đến 1 năm , Chúc bạn xem phim vui vẻ =)))
                                </marquee>
                            </>
                        ):(<></>)}
                    </div>
                    {invoice.length === 0 ? (<DVDX></DVDX>):(
                        <>
                        <div className="row">
                            {invoice.map((iv) => {
                                let statusButton;

                                const calculateSeconds = (targetDate) => {
                                    const now = new Date(); 
                                    const target = new Date(targetDate); 

                                    // console.log('now:'+now , 'then:'+target);
                                    
                                    
                                    // Tính khoảng cách bằng giây
                                    const diffInSeconds = Math.floor((target - now) / 1000);
                                    
                                    return diffInSeconds;
                                  };

                    
                            if(iv){
                                const seconds = calculateSeconds(iv.end_date);
                                // console.log(seconds);
                                
                                if(seconds > 0){
                                  statusButton = <button className="btn btn-sm btn-success">Thành Công</button>;
                                }else{
                                  statusButton = <button className="btn btn-sm btn-warning">Hết Hạn</button>;
                                }
                                
                            }

                                return (
                                    <>
                                        <div className="col-md-6 mb-4">
                                            <div className="card box-card">
                                                <div className="row g-0">
                                                    <div className="col-md-4">
                                                        <img src="images/cinema-4153289_640.webp" className="img-fluid rounded-start" alt="Service Image 1" />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <div>
                                                                <h5 className="u-service-buy-title">Gói {iv.package.name}</h5>
                                                                {statusButton}
                                                            </div>
                                                            <p className="card-text">Hình Thức Thanh Toán: {iv.payment_method}</p>
                                                            <p className="card-text">Mã Giảm Giá: {iv?.voucher ? (iv?.voucher?.name) : ('Không Dùng')}</p>
                                                            <p className="card-text">Ngày Giờ Bắt Đầu Sử Dụng: {iv.start_date}</p>
                                                            <p className="card-text">Ngày Giờ Kết Thúc Sử Dụng: {iv.end_date}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        </>
                    )}
                </div>

                <div className="u-history-view" id="u-history-view" style={{ display: 'none' }}>
                    <div style={{ backgroundColor: "#353A3F" }}>
                        <div className="card-body">
                            {history.length === 0 ? (<LSDX></LSDX>):(
                                <>
                            <div className="history-view-title d-flex align-items-center">
                                <p className="mb-0 text-white">Bạn đã xem {history.length} phim gần đây</p>
                            </div>
                            {/* <div className="row mt-3">
                                {history.map((ht) => {
                                    return (
                                        <>
                                            <div key={ht.episode?.episode_id} className="card text-bg-dark hover-box me-5 ms-2 mt-3 " style={{ width: "350px", }}>
                                                <div className="bg-black opacity-75">
                                                    <ReactPlayer width='100%' height={220} style={{ marginTop: "-18px" }} url={ht.episode?.video_url} light={true} />
                                                </div>
                                                <div className="card-img-overlay ">
                                                </div>
                                                <div className="play-icon-overlay">
                                                    <div className=" rounded-circle bg-black opacity-50 border border-white" style={{ width: "50px", height: "50px" }}>
                                                        {localStorage.getItem("token") ? (
                                                            <Link href={`/watch/${ht.episode?.movie_id}/${ht.episode_id}`} className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></Link>
                                                        ) : (
                                                            <div className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div> */}
                            <div className="row mt-3">
                                    {history.map((ht) => {
                                        return (
                                            <div
                                                key={ht.episode?.episode_id}
                                                className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3 mb-3"
                                            >
                                                <div className="card text-bg-dark hover-box me-2 ms-2" style={{ width: "100%" }}>
                                                    <div className="bg-black opacity-75">
                                                        <ReactPlayer
                                                            width="100%"
                                                            height={220}
                                                            // style={{ marginTop: "-18px" }}
                                                            url={ht.episode?.video_url}
                                                            light={true}
                                                        />
                                                    </div>
                                                    <div className="card-img-overlay "></div>
                                                    <div className="play-icon-overlay">
                                                        <div
                                                            className="rounded-circle bg-black opacity-50 border border-white"
                                                            style={{ width: "50px", height: "50px" }}
                                                        >
                                                            {localStorage.getItem("token") ? (
                                                                <Link
                                                                    href={`/watch/${ht.episode?.movie_id}/${ht.episode_id}`}
                                                                    className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"
                                                                ></Link>
                                                            ) : (
                                                                <div className="nav-link fa-solid fa-play fa-2xl text-white ms-3 mt-4"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                </>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="u-favorite mt-2" id="u-favorite" style={{ display: 'none' }}>
                    <div style={{ backgroundColor: "#353A3F" }}>
                        <div className="card-body">
                            {love.length === 0 ? (<DSYT></DSYT>):(
                                <>
                            <div className="history-view-title d-flex align-items-center">
                                <p className="mb-0 text-white me-2 fw-bold fs-3">Bạn đã thích {love.length} phim gần đây</p>
                                {/* <button className="btn btn-danger">Xóa toàn bộ</button> */}
                            </div>
                            <div className="row mt-3">
                                {love?.map((mv) => {
                                    // console.log(mv);

                                    return (
                                        <>
                                            <div className="col-sm-2 position-relative mt-2">
                                                <div className="card text-bg-dark hover-box">
                                                    <div>
                                                        <img src={mv.movie.poster} height={350} className="card-img" alt="..." />
                                                    </div>
                                                    <div className="play-icon-overlay d-flex justify-content-center align-items-center">
                                                        <div className="d-flex">
                                                            <div className="rounded-circle bg-black opacity-50 border border-white" style={{ width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                <Link href={`/film/${mv.movie.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white" />
                                                            </div>
                                                            <div className="rounded-circle bg-black opacity-50 border border-white ms-2" style={{ width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                <button className="btn" onClick={() => hanldeRemoveLove(mv.movie.movie_id)} style={{ padding: 0 }}>
                                                                    <i className="fa-solid fa-trash text-danger fa-xl"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })}

                            </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

