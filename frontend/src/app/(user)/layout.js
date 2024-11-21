import localFont from "next/font/local";
import "../globals.css";
import "../../../public/bootstrap/css/bootstrap.min.css";
import HeaderUser from "../layout/user/header";
import FooterUser from "../layout/user/footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'PrimeReels - Xem phim online chất lượng cao',
  description: 'Xem phim online chất lượng cao tại PrimeReels. Phim bộ, phim lẻ, anime hấp dẫn.',
  icons: {
    icon: '/images/Logo-PR-(1).png',
  },
  openGraph: {
    title: 'PrimeReels - Xem phim online chất lượng cao',
    description: 'Xem phim bộ, phim lẻ và anime hấp dẫn tại PrimeReels. Thưởng thức ngay!',
    url: 'https://primereels.online', 
    images: [
      {
        url: '/images/Logo-PR-(1).png', 
        width: 1200,
        height: 630,
        alt: 'PrimeReels Logo',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
