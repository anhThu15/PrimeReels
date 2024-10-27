'use client'
import "../globals.css";
import "../../../public/bootstrap/css/bootstrap.min.css";
import Link from "next/link";
import NavAdmin from "../layout/admin/nav";
import HeaderAdmin from "../layout/admin/header";



export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body>
      <div className="container-fluid" >
      <div className="row">
        <NavAdmin></NavAdmin>
        <div className="col-md p-0">
          <HeaderAdmin></HeaderAdmin>

            {children}

        </div>
      </div>
    </div>

     

        <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="https://kit.fontawesome.com/6895c8023a.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
