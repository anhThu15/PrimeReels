import Image from "next/image";
import styles from "./page.module.css";
import ListChoie from "../layout/user/listchoie";
import SlideShow from "./components/slideshow";
import Banner from "./components/banner";
import Film from "./components/film";

export default function Home() {
  
  return (
    <>
     <div className="container-fluid d-flex justify-content-center pt-3" style={{backgroundColor:"#283237", width:"100%"}}>
        <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark" >
          <SlideShow></SlideShow>
          <div className=" mt-3 col font-monospace text-white">
              <Banner></Banner>   
              <div className="font-monospace pb-3"  data-bs-theme="dark" >
                  <h3 className=" fw-bold rounded" style={{width:300, backgroundColor:"#932730"}}>Phim Mới Cập Nhập <i class="fa-solid fa-chevron-right"></i> </h3>
                  <div className=" d-flex flex-wrap">
                    <Film></Film>
                  </div>
              </div>
              
              <div className="font-monospace pb-3"  data-bs-theme="dark" >
                  <h3 className=" fw-bold rounded" style={{width:190, backgroundColor:"#932730"}}>Phim Đề Cử <i class="fa-solid fa-chevron-right"></i> </h3>
                  <div className=" d-flex flex-wrap">
                    <Film></Film>
                  </div>
              </div>
          </div>
          <div className=" mt-3 col-4 font-monospace text-white">
              <ListChoie></ListChoie>
          </div>
        </div>
     </div>
    </>
  );
}
