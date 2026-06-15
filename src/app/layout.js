import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "src/components/layout/Header";
import Footer from "src/components/layout/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import 'swiper/css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import "../css/style.css"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken-grotesk",
});
export const metadata = {
  metadataBase: new URL('https://www.jindalmetals.com'),
  title: {
    default: 'Jindal Metals & Alloys Ltd | Precision Stainless Steel Strips',
    template: '%s | Jindal Metals & Alloys Ltd'
  },
  description: 'Jindal Metals & Alloys Ltd (subsidiary of Jindal SAW Ltd) manufactures thin & ultra-thin Precision Stainless Steel Strips with global standards of quality.',
  openGraph: {
    title: 'Jindal Metals & Alloys Ltd',
    description: 'Leading manufacturer of Precision Stainless Steel Strips.',
    url: 'https://www.jindalmetals.com',
    siteName: 'Jindal Metals & Alloys',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {

  return (
    <html
      lang="en"
      className={`h-full antialiased ${hankenGrotesk.className}`}
    >
      <body className="min-h-full flex flex-col">

        <Header />
        
        {children}
        <Footer />

      </body>
    </html>
  );
}
