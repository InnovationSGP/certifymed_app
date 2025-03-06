import Mainpage from "@/components/common/Mainpage";
import AosProvider from "@/providers/AosProvider";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-datepicker/dist/react-datepicker.css";
import "aos/dist/aos.css";

export const metadata = {
  title: " CertifyMed - Your gateway to healthcare anytime anywhere",
  description:
    "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins">
        <AosProvider>
          <Mainpage>{children}</Mainpage>
        </AosProvider>
      </body>
    </html>
  );
}
