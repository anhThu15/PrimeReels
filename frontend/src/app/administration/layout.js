'use client'
import "../globals.css";
import "../../../public/bootstrap/css/bootstrap.min.css";
import Link from "next/link";
import NavAdmin from "../layout/admin/nav";
import HeaderAdmin from "../layout/admin/header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({ children }) {


  return (
    <html lang="en">
          <title>PrimeReels</title>
          <meta name="description" content="Xem phim online chất lượng cao tại PrimeReels. Phim bộ, phim lẻ, anime hấp dẫn." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/Logo-PR-(1).png" type="image/png" />
      <body>
      <div className="container-fluid" >
      <div className="row">
        <NavAdmin></NavAdmin>
        <div className="col-md p-0">
          <HeaderAdmin></HeaderAdmin>

            {children}
            <ToastContainer />

        </div>
      </div>
    </div>

     

        <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="https://kit.fontawesome.com/6895c8023a.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
