import Image from "next/image";
import styles from "./page.module.css";
import ListChoie from "../layout/user/listchoie";

export default function Home() {
  
  return (
    <>
     <div className="container-fluid d-flex justify-content-center pt-3" style={{backgroundColor:"#283237", width:"100%"}}>
        <div className="containerVipPro font-monospace h-100 bg-nenVipPro row pb-5" data-bs-theme="dark" >
          <div className=" mt-3 col font-monospace text-white">Sản Phẩm bên đây nhóe</div>
          <div className=" mt-3 col-4 font-monospace text-white">
              <ListChoie></ListChoie>
          </div>
        </div>
     </div>
    </>
  );
}
