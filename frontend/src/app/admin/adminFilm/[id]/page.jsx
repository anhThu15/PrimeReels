"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function AddNewFilm() {
    const [activeTab, setActiveTab] = useState('info');
    const [genres, setGenres] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const id = 15;
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue) {
            event.preventDefault();
            setGenres([...genres, inputValue]);
            setInputValue('');
        }
    };

    const handleRemove = (index) => {
        const newGenres = genres.filter((_, i) => i !== index);
        setGenres(newGenres);
    };
    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <div className="container-fluid">
                        <form className="p-4 shadow mt-2 rounded">
                            <button className="btn btn-primary mb-3">Lưu</button>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label htmlFor="actorName" className="form-label">Tên Phim</label>
                                        <input type="text" className="form-control rounded" id="actorName" placeholder="Anh Thầy Ngôi Sao" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="actorBio" className="form-label">Mô tả</label>
                                        <textarea className="form-control rounded" id="actorBio" rows="10" placeholder="Mô tả bộ phim">
                                            Hoàng là một chàng trai trẻ ôm mộng thành ngôi sao ca nhạc, vì chưa gặp thời nên tạm kiếm sống bằng công việc làm thầy giáo dạy nhạc. Sau biến cố, Hoàng buộc phải chuyển công tác ra một hòn đảo cách xa đất liền và tiếp quản một lớp học đặc biệt...
                                        </textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="actorName" className="form-label">Đạo diễn</label>
                                        <input type="text" className="form-control rounded" id="actorName" placeholder="Đức Thịnh" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="actorName" className="form-label">Diễn Viên</label>
                                        <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên bộ phim" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="genre" className="form-label">Thể loại</label>
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                id="genre"
                                                placeholder="Nhập thể loại và nhấn Enter"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                            />
                                            <div className="tags mt-2">
                                                {genres.map((genre, index) => (
                                                    <span key={index} className="badge bg-primary me-1">
                                                        {genre}
                                                        <button type="button" className="btn-close btn-close-white ms-1" onClick={() => handleRemove(index)}></button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="countryFilm" className="form-label">Quốc Gia</label>
                                        <input type="text" className="form-control rounded" id="countryFilm" placeholder="Việt Nam" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="countryFilm" className="form-label">Trạng thái</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Công khai</option>
                                            <option value="1">Không công khai</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="countryFilm" className="form-label">Năm phát hành</label>
                                        <input type="text" className="form-control rounded" id="countryFilm" placeholder="2024" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="countryFilm" className="form-label">Loại phim</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Phim bộ</option>
                                            <option value="1">Phim lẻ</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <img src="../../images/imgFilm2.jpg" alt="" style={{ width: "100%" }} className="rounded" />
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-danger">Chọn hình ảnh</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                );
            case 'episodes':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            {/* <h2 className=" col fw-bold">Diễn Sách Phim</h2> */}
                            <div className="col-2 mb-3">

                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    + Thêm Tập Phim
                                </button>

                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Tạo Mới Tập Phim</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="mb-3">
                                                        <label class="form-label">Tên Tập Phim</label>
                                                        <input type="text" class="form-control rounded" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">Link Video</label>
                                                        <input type="text" class="form-control  rounded" />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputPassword1" class="form-label">Trạng Thái</label>
                                                        <select class="form-select" aria-label="Default select example">
                                                            <option selected>Công Khai</option>
                                                            <option value="1">Không Công Khai</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Xác Nhận</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <form class="d-flex" role="search">
                                    <input class="form-control" type="search" placeholder="Tìm kiếm" aria-label="Search" />
                                </form>
                            </div>
                            <div className="col">
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-filter"></i> Lọc
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">A-Z</a></li>
                                        <li><a class="dropdown-item" href="#">Z-A</a></li>
                                        <li><a class="dropdown-item" href="#">...</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-1">
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        10
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">20</a></li>
                                        <li><a class="dropdown-item" href="#">30</a></li>
                                        <li><a class="dropdown-item" href="#">...</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">TÊN TẬP PHIM</th>
                                    <th scope="col">LINK</th>
                                    <th scope="col">THỜI LƯỢNG</th>
                                    <th scope="col">TRẠNG THÁI</th>
                                    <th scope="col">TÁC VỤ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="row">1</th>
                                    <td>Tập 8</td>
                                    <td>/api/videos/1uL1y0h7dxieyi3t0ntTeS_DKnh</td>
                                    <td>
                                        00:30:23
                                    </td>
                                    <td>
                                        <div class="bg-success text-white rounded text-center">
                                            Công Khai
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <button className="btn btn-danger ms-2"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case 'comments':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <h2 className=" col fw-bold">Bình Luận</h2>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <form class="d-flex" role="search">
                                    <input class="form-control" type="search" placeholder="Tìm kiếm" aria-label="Search" />
                                </form>
                            </div>
                            <div className="col">
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-filter"></i> Lọc
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">A-Z</a></li>
                                        <li><a class="dropdown-item" href="#">Z-A</a></li>
                                        <li><a class="dropdown-item" href="#">...</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-1">
                                <div class="dropdown">
                                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        10
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">20</a></li>
                                        <li><a class="dropdown-item" href="#">30</a></li>
                                        <li><a class="dropdown-item" href="#">...</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">AVATAR</th>
                                    <th scope="col">TÊN</th>
                                    <th scope="col">ĐÁNH GIÁ</th>
                                    <th scope="col">NỘI DUNG</th>
                                    <th scope="col">THỜI GIAN</th>
                                    <th scope="col">ẨN HIỆN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="row">70</th>
                                    <td>
                                        <img src="../../images/avatarActor1.jpg" alt="" style={{ width: "50px", height: "100%", objectFit: "cover" }} className="rounded-circle" />
                                    </td>
                                    <td>Đỗ Công Nam</td>
                                    <td>
                                        5
                                        <i class="fa-solid fa-star mx-1" style={{ color: "gold" }}></i>
                                    </td>
                                    <td style={{ width: "30%" }}>
                                        "Inception" là một tác phẩm xuất sắc của đạo diễn Christopher Nolan, khám phá những tầng sâu của giấc mơ và ý thức con người.
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        12 Th09 2024 vào lúc 10 giờ 2 phút
                                    </td>
                                    <td>
                                        <i class="fa-solid fa-eye"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <input type="checkbox" />
                                    </th>
                                    <th scope="row">70</th>
                                    <td>
                                        <img src="../../images/avatarActor1.jpg" alt="" style={{ width: "50px", height: "100%", objectFit: "cover" }} className="rounded-circle" />
                                    </td>
                                    <td>Đỗ Công Nam</td>
                                    <td>
                                        5
                                        <i class="fa-solid fa-star mx-1" style={{ color: "gold" }}></i>
                                    </td>
                                    <td style={{ width: "30%" }}>
                                        "Inception" là một tác phẩm xuất sắc của đạo diễn Christopher Nolan, khám phá những tầng sâu của giấc mơ và ý thức con người.
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        12 Th09 2024 vào lúc 10 giờ 2 phút
                                    </td>
                                    <td>
                                        <i class="fa-solid fa-eye"></i>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/admin/adminFilm">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Cập nhật bộ phim</h3>
            </div>

            <div className="border rounded mt-4">
                <div className="d-flex justify-content-around p-3">
                    <button onClick={() => setActiveTab('info')} className={`btn ${activeTab === 'info' ? 'btn-primary' : 'btn-light'}`}>Thông tin phim</button>
                    <button onClick={() => setActiveTab('episodes')} className={`btn ${activeTab === 'episodes' ? 'btn-primary' : 'btn-light'}`}>Danh sách tập phim</button>
                    <button onClick={() => setActiveTab('comments')} className={`btn ${activeTab === 'comments' ? 'btn-primary' : 'btn-light'}`}>Bình luận</button>
                </div>

                <div className="p-4">
                    {renderContent()}
                </div>
            </div>

            <button className="btn btn-primary mb-3 mt-4">Lưu</button>
        </div>
    );
}
