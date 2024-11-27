'use client'
import Link from "next/link";
import "../globals.css";
import Table from "./components/table";
import Table2 from "./components/table2";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Home() {
  const token = Cookies.get('token');
    const [films, setFilms] = useState([])
    const [types, setTypes] = useState([])
    const [genres, setGenres] = useState([])
    const [users, setUsers] = useState([])
    const [satistical, setSatistical] = useState([])
    const [chartData, setChartData] = useState(null);
    const [chartData2, setChartData2] = useState(null);
    
    useEffect(() => {
      const getStatistical = async () => {
        try {
          // const token = localStorage.getItem('token');
          const res = await axios.get(`/api/statistics`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            revalidate: 3600
          }).then((res) => res.data);
          setSatistical(res)

        const labels = res.monthly_revenue.map(item => `${item.month} ${item.year}`);
        const values = res.monthly_revenue.map(item => parseFloat(item.total.replace(" VND", "").replace(".", "")));
        setChartData({
          labels: labels,
          values: values
        });


        const labels2 = res.monthly_Voucherused.map(item => `${item.month} ${item.year}`);
        const values2 = res.monthly_Voucherused.map(item => item.invoice);
        setChartData2({
          labels: labels2,
          datasets: [{
            backgroundColor: ["#F3FEB8", "#FFDE4D", "#FF4C4C"], // Màu nền cho các phần trong biểu đồ
            data: values2 // Dữ liệu cho biểu đồ
          }]
        });

        } catch (error) {
          console.log(); 
        }
      }

  
      // getFilms() 
      // getTypes() 
      // getGenres()
      // getUsers();
      getStatistical();
    
    },[])

      console.log(chartData);


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
                        <div className="text-start mt-3 fs-1 fw-bold ">{satistical.total_Movie}</div>
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
                          <div className="text-start mt-3 fs-1 fw-bold ">{satistical.total_MovieType}</div>
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
                          <div className="text-start mt-3 fs-1 fw-bold ">{satistical.total_Genre}</div>
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
                          <div className="text-start mt-3 fs-1 fw-bold ">{satistical.total_User}</div>
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
                  <Table data={chartData}></Table>
                  </div>
                </div>
              </div>
              

              <div className="col-md-6 pt-3"  data-aos="fade-up-left" data-aos-duration="3000">
                <div className="card text-start">
                  <div className="card-body">
                        <Table2 data={chartData2}></Table2>
                  </div>
                </div>
              </div>

              {/* <!--  thêm trc đây  --> */}

            </div>
          </div>
    </>
  );
}
