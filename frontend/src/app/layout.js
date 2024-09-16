import localFont from "next/font/local";
import "./globals.css";
import "../../public/bootstrap/css/bootstrap.min.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}


        <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="https://kit.fontawesome.com/6895c8023a.js" crossorigin="anonymous"></script>
      </body>
    </html>
  );
}
