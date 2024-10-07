import localFont from "next/font/local";
import "../globals.css";
import "../../../public/bootstrap/css/bootstrap.min.css";
import HeaderUser from "../layout/user/header";
import FooterUser from "../layout/user/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderUser></HeaderUser>

        {children}

        <FooterUser></FooterUser>

        <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="https://kit.fontawesome.com/6895c8023a.js" crossorigin="anonymous"></script>
      </body>
    </html>
  );
}
