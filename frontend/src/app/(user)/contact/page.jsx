import Link from "next/link";
import "../../globals.css";

export default function contact() {

    return (
        <>
            <div className="container-fluid bg-black p-0 text-white">
                <div className="container p-0">
                    <div className="row pt-5">
                      <div className="col-3">
                        <div className="list-group" id="list-tab" role="tablist">
                          <a className=" text-start ms-2 ps-3 active btn btn-outline-light" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">
                                <p className="fs-6 mt-2"> <i className="fa-solid fa-headphones"></i> Yêu cầu hỗ trợ </p>
                          </a>
                          <a className=" text-start ms-2 ps-3 btn btn-outline-light mt-3" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">
                                <p className="fs-6 mt-2"> <i className="fa-solid fa-message"></i> Hỏi Đáp </p>
                          </a>
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="tab-content" id="nav-tabContent">
                          <div className="tab-pane fade show active bg-light text-black fs-1" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                                    Liên Hệ:
                                    <br />
                                    Tổng đài hỗ trợ: 9090 (24/7, 200đ/phút) <br />
                                    (hỗ trợ 24/24h) <br />
                                    Địa chỉ: Quận 12. <br />
                          </div>
                          <div className="tab-pane fade bg-light text-black" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">                                   
                                    <h3 className="pt-3">Chúng tôi có thể giúp gì cho bạn ?</h3>
                                    <hr />
                                <div className="accordion" id="accordionExample">
                                  <div className="accordion-item">
                                    <h2 className="accordion-header">
                                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        PrimeReels là dịch vụ gì?
                                      </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                      <div className="accordion-body">
                                        PrimeReels là dịch vụ truyền hình trên mạng Internet đem đến cho khách hàng trải nghiệm đặc sắc với các kênh truyền hình trong nước và quốc tế, hàng ngàn bộ phim bom tấn có bản quyền, kho nội dung VOD phong phú, đa dạng về thể thao, âm nhạc, gameshow, golf, chứng khoán, giáo dục… Khách hàng có thể sử dụng dịch vụ PrimeReels trên các thiết bị khác nhau có kết nối Internet như điện thoại, máy tính, SmartTV…
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Nội dung dịch vụ PrimeReels có gì nổi bật không?
                                      </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                      <div className="accordion-body">
                                      Nội dung dịch vụ PrimeReels 100% bản quyền các kênh truyền hình trong nước quốc tế, kho phim đặc sắc nhiều thể loại khác nhau, tổng hợp nhiều chương trinh truyền hình, giải trí, thể thao chất lượng Video HD. 4K đáp ứng mọi lứa tuổi.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                      Tôi click vào xem dịch vụ PrimeReels nhưng màn hình chuyển FullScreen, có cách nào lựa chọn thu nhỏ lại màn hình để tôi có thể tìm xem các nội dung khác tương tự không?
                                      </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                      <div className="accordion-body">
                                      Hiện tại, dịch vụ PrimeReels thiết kế tính năng chuyển FullScreen để khách hàng có thể trải nghiệm nội dung trực tiếp trên màn hình lớn luôn tương tự như khách hàng xem phim trên Netlfix. Để thuận tiện cho khách hàng trong việc lựa chọn, tìm kiếm nội dung, trong thời gian tới PrimeReels sẽ bổ sung thêm tính năng xem ở màn hình thu nhỏ
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                      Tôi ở nước ngoài, có thể mua vip xem phim trên PrimeReels ?
                                      </button>
                                    </h2>
                                    <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                      <div className="accordion-body">
                                      Hiện các phim trên PrimeReels chỉ có bản quyền trên lãnh thổ Việt Nam nên chúng tôi không hỗ trợ xem tại nước ngoài. Để xem nội dung, bạn cần sử dụng IP của Việt Nam.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                      Cài đặt ứng dụng ClipTV có mất tiền không ?
                                      </button>
                                    </h2>
                                    <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                      <div className="accordion-body">
                                      Bạn có thể cài đặt ứng dụng PrimeReels hoàn toàn miễn phí trên các nền tảng: Điện thoại, Smart TV, Android Box
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                      Tôi không xem được phim trên trình duyệt Chrome, cứ báo đang tải mãi, tôi phải làm gì?
                                      </button>
                                    </h2>
                                    <div id="collapse6" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                      <div className="accordion-body">
                                      Trường hợp không xem được phim trên trình duyệt Chrome, bạn hãy thử làm theo cách sau: Bước 1: Đóng trình duyệt Chrome. Sau đó ấn tổ hợp phím Windows + R để mở cửa sổ “Run”. Nhập %userprofile%/appdata Bước 2: Khi cửa sổ mở ra, chọn thư mục Local - chọn thư mục Google - chọn thư mục Chrome. Tìm thư mục WidevineCDM và xóa nó đi. Bước 3: Ấn tổ hợp phím Ctrl+Alt+Del và mở Task Manager. Ấn chuột phải vào chrome.exe - chọn end task - đóng Task Manager lại. Nếu không tìm thấy chrome.exe thì có thể bỏ qua phần này. Bước 4: Mở Chrome. Nhập chrome://components trên thanh địa chỉ. Bạn sẽ thấy Widevine, ấn Cập nhật. Bước 5: Sau khi cập nhật xong, nhập chrome://plugins trên thanh địa chỉ. Hãy chắc chắn rằng Widevine đã được kích hoạt (ở trạng thái enabled). Bước 6: Truy cập lại Clip.vn và chọn xem video.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                      Không xem được phim trên trình duyệt Cốc cốc, cứ báo đang tải mãi. Tôi phải làm gì?
                                      </button>
                                    </h2>
                                    <div id="collapse7" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                      <div className="accordion-body">
                                      Trường hợp không xem được phim trên trình duyệt Coccoc, bạn hãy thử làm theo cách sau: Bước 1: Đóng trình duyệt Coccoc. Sau đó ấn tổ hợp phím Windows + R để mở cửa sổ “Run”. Nhập %userprofile%/appdata Bước 2: Khi cửa sổ mở ra, chọn thư mục Local - chọn thư mục Google - chọn thư mục Coccoc. Tìm thư mục WidevineCDM và xóa nó đi. Bước 3: Ấn tổ hợp phím Ctrl+Alt+Del và mở Task Manager. Ấn chuột phải vào coccoc.exe - chọn end task - đóng Task Manager lại. Nếu không tìm thấy coccoc.exe thì có thể bỏ qua phần này. Bước 4: Mở Coccoc. Nhập coccoc://components trên thanh địa chỉ. Bạn sẽ thấy Widevine, ấn Cập nhật. Bước 5: Sau khi cập nhật xong, nhập coccoc://plugins trên thanh địa chỉ. Hãy chắc chắn rằng Widevine đã được kích hoạt (ở trạng thái Enabled). Bước 6: Truy cập lại Clip.vn và chọn xem video.
                                      </div>
                                    </div>
                                  </div>
                                </div>
                          </div>
                        </div>
                      </div>
                    </div>


                </div>
            </div>
        </>
    )
}