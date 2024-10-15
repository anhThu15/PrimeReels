import Link from "next/link";

export default function chitietgoiVip({params}){
    return(
        <>
            <div className=" container-fluid">
                <div className=" fw-bold"> 
                  <Link className="btn btn-danger mb-2 me-2" href='/admin/goiVip'><i class="fa-solid fa-chevron-left"></i></Link> 
                  <span className="fs-4 ">Chi Tiết Gói Vip</span> 
                </div>
                <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label class="form-label">Tên Gói</label>
                        <input type="text" class="form-select" />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Giá Gói</label>
                        <input type="number" class="form-select" />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời Gian</label>
                        <input type="date" class="form-select" />
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