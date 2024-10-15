import Link from "next/link";

export default function chitiettheLoai({params}){
    return(
        <>
            <div className=" container-fluid">
                <div className=" fw-bold"> 
                  <Link className="btn btn-danger mb-2 me-2" href='/admin/theLoai'><i class="fa-solid fa-chevron-left"></i></Link> 
                  <span className="fs-4 ">Chi Tiết Thể Loại</span> 
                </div>
                <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label class="form-label">Tên Thể Loại</label>
                        <input type="text" class="form-select" />
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Tên Danh Mục</label>
                        <select class="form-select" aria-label="Default select example">
                          <option selected>Phim Bộ</option>
                          <option value="1">Phim Lẻ</option>
                          <option value="1">Phim Hoạt Hình</option>
                        </select>
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
                  <button type="button" class="btn btn-primary">Lưu thay đổi</button>
                </div>
            </div>
        </>
    )
}