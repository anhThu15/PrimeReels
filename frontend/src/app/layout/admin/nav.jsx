import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavAdmin(){
    const pathName = usePathname();
    return(
        <>
        <div className="col-md-2 p-0 collapse collapse-horizontal show" style={{minHeight: "100vh", backgroundColor: "#213436"}} id="moMenu">
          <strong className="text-center d-block p-3" style={{color: "white"}}> 
            <img src="/images/Logo-PR-(1).png" width="80px" alt=""/>
           </strong>
           <div className="list-group list-group-flush">
            <Link style={{backgroundColor:"#213436"}} href="/admin" className={`list-group-item list-group-item-action text-white ${pathName == '/admin' ? "text-bg-dark":"" }`} aria-current="true">
            <img src="/images/tk.png" alt="" /><span> Thống Kê</span>
            </Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/order" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/order' ? "text-bg-dark":"" }`}><img src="/images/tt.png" alt="" /><span> Thanh Toán</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/product" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/product' ? "text-bg-dark":"" }`}><img src="/images/vip.png" alt="" /><span> Gói Vip</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/category" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/category' ? "text-bg-dark":"" }`}><img src="/images/vch.png" alt="" /><span> Voucher</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/user" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/user' ? "text-bg-dark":"" }`}><img src="/images/flim.png" alt="" /><span> Bộ Phim</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/brand" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/brand' ? "text-bg-dark":"" }`}><img src="/images/actor.png" alt="" /><span> Diễn Viên</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/brand" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/brand' ? "text-bg-dark":"" }`}><img src="/images/dm.png" alt="" /><span> Danh Mục</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/brand" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/brand' ? "text-bg-dark":"" }`}><img src="/images/tl.png" alt="" /><span> Thể Loại</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/admin/brand" className={`list-group-item list-group-item-action text-white ${pathName == '/admin/brand' ? "text-bg-dark":"" }`}><img src="/images/user.png" alt="" /><span> Tài Khoản</span></Link>
            <Link style={{backgroundColor:"#213436"}} href="/" className="list-group-item list-group-item-action text-white" aria-disabled="true"> 
            <i class="fa-solid fa-rotate-left text-danger me-1"></i> 
             Quay về Trang Chủ
            </Link>
          </div>
        </div>
        </>
    )
}