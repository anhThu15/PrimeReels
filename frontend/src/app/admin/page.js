import Link from "next/link";
import "../globals.css";
import Table from "./components/table";
import Table2 from "./components/table2";

export default function Home() {
  return (
    <>
        <div className="container-fluid">
            <div className="row pb-3 bg-primary position-relative" style={{ height:"200px"}} >
              <h3> <strong className=" text-white">Báo Cáo Thống Kê</strong> </h3>
              <div className="col-3 mt-5" data-aos="flip-left" data-aos-duration="3000">
                <div className="card text-start">
                  <div className="card-body">
                    <div className="row">
                      <h5 className="card-title text-start col">Tổng Phim
                        <div className="text-start mt-3 fs-1 fw-bold ">00</div>
                      </h5>
                      <img className="col-3" height={45} src="/images/Group 324.png"></img>
                    </div>
                    <div>Bộ phim đang được công chiếu</div>
                  </div>
                </div>
              </div>
              <div className="col-3 mt-5">
                <div className="card text-start" data-aos="flip-left" data-aos-duration="3000">
                  <div className="card-body">
                    <div className="row">
                        <h5 className="card-title col text-start">Tổng Danh Mục
                          <div className="text-start mt-3 fs-1 fw-bold ">00</div>
                        </h5>
                        <img className="col-3" height={45} src="/images/Group 325.png"></img>
                    </div>
                    <div>Danh mục đang tồn tại</div>
                  </div>
                </div>
              </div>
              <div className="col-3 mt-5">
                <div className="card text-start" data-aos="flip-left" data-aos-duration="3000">
                  <div className="card-body">
                    <div className="row">
                        <h5 className="card-title col text-start">Tổng Thể Loại
                          <div className="text-start mt-3 fs-1 fw-bold ">00</div>
                        </h5>
                        <img className="col-3" height={45} src="/images/Group 326.png"></img>
                    </div>
                    <div>Thể loại đang tồn tại</div>
                  </div>
                </div>
              </div>
              <div className="col-3 mt-5">
                <div className="card text-start" data-aos="flip-left" data-aos-duration="3000">
                  <div className="card-body">
                    <div className="row">
                        <h5 className="card-title col text-start">Tổng Tài Khoản
                          <div className="text-start mt-3 fs-1 fw-bold ">00</div>
                        </h5>
                        <img className="col-3" height={45} src="/images/Group 327.png"></img>
                    </div>
                    <div>Tài khoản đang hoạt động</div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 pt-3"  data-aos="fade-up-right" data-aos-duration="3000">
                <div className="card text-center ">
                  <div className="card-body">
                  <Table></Table>
                  </div>
                </div>
                {/* <OrderAdmin data={data}></OrderAdmin> */}
              </div>

              <div className="col-md-6 pt-3"  data-aos="fade-up-left" data-aos-duration="3000">
                <div className="card text-start">
                  <div className="card-header">
                    <b>Thông Tin Tổng Quan</b>
                  </div>
                  <div className="card-body">
                        <Table2></Table2>
                  </div>
                </div>
              </div>

              {/* <!--  thêm trc đây  --> */}

            </div>
          </div>
    </>
  );
}
