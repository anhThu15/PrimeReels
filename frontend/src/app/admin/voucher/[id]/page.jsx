import Link from "next/link";

export default function chitietvoucher({params}){
    return(
        <>
            <div className=" container-fluid">
                <div className=" fw-bold"> 
                  <Link className="btn btn-danger mb-2 me-2" href='/admin/voucher'><i class="fa-solid fa-chevron-left"></i></Link> 
                  <span className="fs-4 ">Chi Tiết Voucher</span> 
                </div>
                <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label class="form-label">Tên Voucher</label>
                          <input type="text" class="form-select" />
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Giảm Voucher</label>
                          <input type="text" class="form-select" />
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Ngày Bắt Đầu</label>
                          <input type="date" class="form-select" />
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Ngày Kết Thúc</label>
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