import localFont from "next/font/local";
import "../globals.css";
import "../../../public/bootstrap/css/bootstrap.min.css";
import HeaderUser from "../layout/user/header";
import FooterUser from "../layout/user/footer";
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
        <HeaderUser></HeaderUser>

        {children}
        <ToastContainer />
        
        <FooterUser></FooterUser>

        <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="https://kit.fontawesome.com/6895c8023a.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
