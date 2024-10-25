'use client'
import Link from "next/link";
import "../globals.css";
import Table from "./components/table";
import Table2 from "./components/table2";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [films, setFilms] = useState([])
    const [types, setTypes] = useState([])
    const [genres, setGenres] = useState([])
    const [users, setUsers] = useState([])
    
    useEffect(() => {
      const getFilms = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies`,{ revalidate: 3600 }).then((res) => res.data)
        setFilms(res)
      }
      const getTypes = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movie-types`,{ revalidate: 3600 }).then((res) => res.data)
        setTypes(res)
      }
      const getGenres = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/genres`,{ revalidate: 3600 }).then((res) => res.data)
        setGenres(res)
      }
      const getUsers = async () => {
        const token = localStorage.getItem('token');
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          setUsers(res.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

  
      getFilms() 
      getTypes() 
      getGenres()
      getUsers();
    
    },[])

      console.log(users);


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
                        <div className="text-start mt-3 fs-1 fw-bold ">{films.length}</div>
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
                          <div className="text-start mt-3 fs-1 fw-bold ">{types.length}</div>
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
                          <div className="text-start mt-3 fs-1 fw-bold ">{genres.length}</div>
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
                          <div className="text-start mt-3 fs-1 fw-bold ">{users.length}</div>
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
