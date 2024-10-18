import Link from "next/link";

export default function UpdateAccount({ params }) {
    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/admin/account">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Cập nhật tài khoản</h3>
            </div>
            <form className="p-4 shadow mt-2 rounded">
                <button className="btn btn-primary mt-3">Lưu</button>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Tên người dùng</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nguyễn Văn A" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Email</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="userpr1234@gmail.com" />
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="actorBio" className="form-label">Mật khẩu</label>
                                    <input type="text" className="form-control rounded" id="actorName" placeholder="*******" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="actorBio" className="form-label">Giới tính</label>
                                    <div className="d-flex mt-2">
                                        <div className="form-check me-4">
                                            <input className="form-check-input" type="radio" name="gender" id="genderMale" value="male" required />
                                            <label className="form-check-label" htmlFor="genderMale">Nam</label>
                                        </div>
                                        <div className="form-check me-4">
                                            <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="female" required />
                                            <label className="form-check-label" htmlFor="genderFemale">Nữ</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="gender" id="genderOther" value="other" required />
                                            <label className="form-check-label" htmlFor="genderOther">Khác</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="actorBio" className="form-label">Vai trò</label>
                                    <select name="" id="" className="form-select">
                                        <option selected>Khách hàng</option>
                                        <option value="1">Quản trị</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="actorBio" className="form-label">Trạng thái</label>
                                    <select name="" id="" className="form-select">
                                        <option selected>Đang hoạt động</option>
                                        <option value="1">Ngừng hoạt động</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <h2>Avatar</h2>
                        <div className="text-center">
                            <img src="../../images/avatarActor1.jpg" alt="Avatar" style={{ width: "250px", objectFit: "cover", height: "250px" }} className="rounded-circle mb-3" />
                            <div>
                                <button className="btn btn-danger mb-3">Chọn Hình Ảnh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}