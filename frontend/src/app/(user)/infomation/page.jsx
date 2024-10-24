"use client"
import "../../globals.css"; // Nhập tệp CSS toàn cục
import { useEffect, useState } from 'react';

export default function InfomationUser() {
    const [activeSection, setActiveSection] = useState('userInfo');

    useEffect(() => {
        showSection(activeSection); // Hiển thị phần tài khoản mặc định
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
                                <img src="images/default-user.png" className="img-fluid rounded-circle" id="userImg" />
                                <div className="upload-button">
                                    <input type="file" id="fileInput" className="d-none" accept="image/*" />
                                    <label htmlFor="fileInput" className="btn btn-outline-danger">Tải lên</label>
                                </div>
                            </div>


                            <div className="join-date text-white">Tham gia: 26/09/2024</div>
                        </div>
                        <div className="col-sm-10">
                            <form id="userInfoForm">
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="username" className="form-label text-white">Tên người dùng:</label>
                                        <input type="text" className="form-control" id="username" placeholder="Nguyễn Văn A" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label text-white">Giới tính:</label>
                                        <div className="d-flex">
                                            <div className="form-check me-4">
                                                <input className="form-check-input" type="radio" name="gender" id="genderMale" value="male" required />
                                                <label className="form-check-label text-white" htmlFor="genderMale">Nam</label>
                                            </div>
                                            <div className="form-check me-4">
                                                <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="female" required />
                                                <label className="form-check-label text-white" htmlFor="genderFemale">Nữ</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gender" id="genderOther" value="other" required />
                                                <label className="form-check-label text-white" htmlFor="genderOther">Khác</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="email" className="form-label text-white">Email:</label>
                                        <input type="email" className="form-control" id="email" placeholder="userABC@gmail.com" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="password" className="form-label text-white">Mật khẩu:</label>
                                        <input type="password" className="form-control" id="password" placeholder="********" required />
                                    </div>
                                </div>
                                <div className="u-button">
                                    <button type="submit" className="btn btn-danger">Lưu thay đổi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

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
                    <div className="card card-view">
                        <div className="card-body">
                            <div className="history-view-title d-flex align-items-center">
                                <p className="mb-0 text-white">Bạn đã xem 5 phim gần đây</p>
                                <button className="btn btn-danger">Xóa toàn bộ</button>
                            </div>
                            <div className="row mt-3">

                                <div className="col-sm-2 position-relative mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-2 position-relative mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-2 position-relative mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-2 position-relative mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-2 position-relative mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-2 position-relative mt-2">
                                    <div className="card u-card">
                                        <div className="image-container">
                                            <img src="images/cinema-4153289_640.webp" className="card-img-top" alt="Phim 1" />
                                            <span className="episode-label">Tập 01</span>
                                            <i className="fa-solid fa-trash icon-delete"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Thần thâm dật chiến</h5>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>            </div>
        </div>
    );
}
