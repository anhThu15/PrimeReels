import Link from "next/link";

export default function AddNewFilm() {
    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/admin/adminFilm">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Tạo Mới Bộ Phim</h3>
            </div>
            <form className="p-4 shadow mt-2 rounded">
                <button className="btn btn-primary mb-3">Lưu</button>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Tên Phim</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên bộ phim" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorBio" className="form-label">Mô tả</label>
                            <textarea className="form-control rounded" id="actorBio" rows="10" placeholder="Mô tả bộ phim"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Đạo diễn</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên bộ phim" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Diễn Viên</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên bộ phim" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Thể loại</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên bộ phim" />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="countryFilm" className="form-label">Quốc Gia</label>
                            <input type="text" className="form-control rounded" id="countryFilm" placeholder="" />
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
                            <input type="text" className="form-control rounded" id="countryFilm" placeholder="" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="countryFilm" className="form-label">Loại phim</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Phim bộ</option>
                                <option value="1">Phim lẻ</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <img src="../../images/cinema-4153289_640.webp" alt="" style={{width:"100%"}} className="rounded"/>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-danger">Chọn hình ảnh</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}