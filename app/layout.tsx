import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// 1. Import the fonts from Next.js Google Fonts
import { Inter, Playfair_Display } from "next/font/google";

// 2. Configure them
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "RoEduBridge",
  description: "Connecting students to Romanian Universities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 3. Add the variables to the body so Tailwind can use them */}
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FDFBF7] text-[#1a1a1a]`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer /> {/* <--- 2. Add Footer here at the bottom */}
      </body>
    </html>
  );
}
