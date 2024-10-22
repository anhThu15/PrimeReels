import Link from "next/link";

export default function AddActor() {
    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 align-items-center mt-2">
                <Link href="/admin/actor">
                    <button className="btn btn-danger">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </Link>
                <h3 className="align-items-center">Tạo mới diễn viên</h3>
            </div>
            <form className="p-4 shadow mt-2 rounded">
            <button className="btn btn-primary mb-3">Lưu</button>
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="actorName" className="form-label">Tên Diễn Viên</label>
                            <input type="text" className="form-control rounded" id="actorName" placeholder="Nhập tên diễn viên" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="actorBio" className="form-label">Tiểu Sử</label>
                            <textarea className="form-control rounded" id="actorBio" rows="10" placeholder="Nhập tiểu sử diễn viên"></textarea>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <h2>Avatar</h2>
                        <div className="text-center">
                            <img src="../../images/default-user.png" alt="Avatar" style={{ width: "250px", objectFit:"cover", height:"300px" }} className="rounded-circle mb-3" />
                            <div>
                                <button className="btn btn-danger mb-3">Chọn Hình Ảnh</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="form-label">Ngày Sinh</label>
                            <div className="input-group">
                                <input type="date" className="form-control rounded" id="birthdate" style={{ paddingLeft: '2.5rem' }} />
                                <span className="input-group-text" style={{ position: 'absolute', backgroundColor: '#e9ecef', border: 'none' , height:"100%", borderRadius:"0"}}>
                                    <i className="fas fa-calendar-alt"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
