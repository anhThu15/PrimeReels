"use client";
import Link from "next/link";
import "../../globals.css"; // Import global CSS
import { useEffect, useState } from 'react';
import ChangePasswordModal from "../components/user-infomation/changePassword";
import axios from "axios";
import { toast } from "react-toastify";

export default function InfomationUser() {
    const [activeSection, setActiveSection] = useState('userInfo');
    const [userData, setUserData] = useState({
        username: '',
        gender: '',
        email: '',
        password: '',
        avatar: '' // Avatar field
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [love, setLove] = useState([]);

    useEffect(() => {
        showSection(activeSection);
        fetchUserData();
    }, [activeSection]);

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


    //  xử lý cài đặt tài khoản
    const fetchUserData = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token.split('=')[1]}`,
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
                        avatar: data.user.avatar || '' // Initialize avatar
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
                gender: value // Update gender
            }));
        } else {
            setUserData(prevData => ({
                ...prevData,
                [id]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/profile/update', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token.split('=')[1]}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_name: userData.username,
                        gender: userData.gender,
                        avatar: userData.avatar // Include avatar URL
                    }),
                });

                const result = await response.json();
                if (result.status === 'success') {
                    alert('Thông tin đã được cập nhật thành công!');
                } else {
                    alert('Có lỗi xảy ra: ' + result.message);
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
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setLove(res.data); // Cập nhật love với dữ liệu trả về từ API
            } catch (error) {
                console.error(error);
            }
        };
        getLove();
    }, []);

    const hanldeRemoveLove = async (id) => {
        // alert(id)
        const token = localStorage.getItem('token');
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/favourites`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if(res){
                toast.success('Đá Xóa Thành Công Ra Khỏi Danh Sách Yêu Thích')
                window.location.reload()
            }else{
                toast.error('Thất Bại')
            }
        } catch (error) {
            console.error(error);
        }

    }
    
    
    //  xử lý load danh sách yêu thích

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
                                    src={userData.avatar || "images/default-user.png"}
                                    className="img-fluid rounded-circle"
                                    id="userImg"
                                    alt="User Avatar"
                                    style={{ width: '100px', height: '100px' }} // Adjust size as needed
                                />
                            </div>
                            <div className="join-date text-white">Tham gia: 26/09/2024</div>
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
                                    <div className="col-sm-6">
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
                                    </div>
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
                <div className="u-service-buy mt-3" id="u-service-buy" style={{ display: 'none' }}>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card box-card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="images/cinema-4153289_640.webp" className="img-fluid rounded-start" alt="Service Image 1" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <div>
                                                <h5 className="u-service-buy-title">Gói VIP 39K</h5>
                                                <button className="btn btn-sm btn-success">Đang sử dụng</button>
                                            </div>
                                            <p className="card-text">Thông tin mô tả về dịch vụ 1. Đây là nơi bạn có thể thêm một số chi tiết.</p>
                                            <p className="card-text text-end">
                                                <small className="text-white">
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                    Xem chi tiết
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card box-card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="images/cinema-4153289_640.webp" className="img-fluid rounded-start" alt="Service Image 1" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <div>
                                                <h5 className="u-service-buy-title">Gói VIP 39K</h5>
                                                <button className="btn btn-sm btn-success">Đang sử dụng</button>
                                            </div>
                                            <p className="card-text">Thông tin mô tả về dịch vụ 1. Đây là nơi bạn có thể thêm một số chi tiết.</p>
                                            <p className="card-text text-end">
                                                <small className="text-white">
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                    Xem chi tiết
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="u-history-view" id="u-history-view" style={{ display: 'none' }}>
                    <div className="card card-view">
                        <div className="card-body">
                            <div className="history-view-title d-flex align-items-center">
                                <p className="mb-0 text-white">Bạn đã xem 5 phim gần đây</p>
                                <button className="btn btn-danger">Xóa toàn bộ lịch sử</button>
                            </div>
                            <div className="row mt-3">

                                <div className="col-md-2 mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                            <small className="text-muted">Bạn đã xem tập 01 lúc 1 tuần trước</small>
                                            <p className="card-text text-end">
                                                <small>
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                    Xem chi tiết
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2 mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                            <small className="text-muted">Bạn đã xem tập 01 lúc 1 tuần trước</small>
                                            <p className="card-text text-end">
                                                <small>
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                    Xem chi tiết
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2 mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                            <small className="text-muted">Bạn đã xem tập 01 lúc 1 tuần trước</small>
                                            <p className="card-text text-end">
                                                <small>
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                    Xem chi tiết
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2 mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                            <small className="text-muted">Bạn đã xem tập 01 lúc 1 tuần trước</small>
                                            <p className="card-text text-end">
                                                <small>
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                    Xem chi tiết
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2 mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                            <small className="text-muted">Bạn đã xem tập 01 lúc 1 tuần trước</small>
                                            <p className="card-text text-end">
                                                <small>
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                    Xem chi tiết
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2 mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                            <small className="text-muted">Bạn đã xem tập 01 lúc 1 tuần trước</small>
                                            <p className="card-text text-end">
                                                <small>
                                                    <i className="fa-solid fa-chevron-left"></i>
                                                    Xem chi tiết
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>
                <div className="u-favorite mt-2" id="u-favorite" style={{ display: 'none' }}>
                    <div style={{backgroundColor:"#353A3F"}}>
                        <div className="card-body">
                            <div className="history-view-title d-flex align-items-center">
                                <p className="mb-0 text-white me-2 fw-bold fs-3">Bạn đã xem {love.length} phim gần đây</p>
                                {/* <button className="btn btn-danger">Xóa toàn bộ</button> */}
                            </div>
                            <div className="row mt-3">
                                {love?.map((mv) => {
                                    // console.log(mv);
                                    
                                    return(
                                        <>
                                            <div className="col-sm-2 position-relative mt-2">
                                                <div className="card text-bg-dark hover-box">
                                                  <div>
                                                      <img src={mv.movie.poster} height={350} className="card-img" alt="..."/>
                                                  </div>
                                                  <div className="play-icon-overlay">
                                                    <div className="row">
                                                        <div className=" col rounded-circle bg-black opacity-50 border border-white" style={{width:"50px", height:"50px"}}>
                                                           <Link href={`/film/${mv.movie.movie_id}`} className="nav-link fa-solid fa-play fa-2xl text-white  mt-4"></Link>
                                                        </div>
                                                        <div className=" col rounded-circle bg-black opacity-50 border border-white ms-2" style={{width:"50px", height:"50px"}}>
                                                           <button className="btn" onClick={() => hanldeRemoveLove(mv.movie.movie_id)} style={{paddingLeft:"1px"}}><i class="fa-solid fa-trash text-danger fa-xl mt-3"  ></i></button>
                                                        </div>
                                                    </div>
                                                  </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
