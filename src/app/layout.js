import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
})

export const metadata = {
  title: "Get2AI | Innovation Made Accessible",
  description: "Get2AI tech software service company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
      >
        {children}
        <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000, // Duration each toast stays on the screen (in ms)
          style: {
            fontSize: '14px', // Font size
            borderRadius: '8px', // Border radius
            padding: '12px', // Padding inside the toast
          },
        }}
        />
        <Footer/>
      </body>
    </html>
  );
}
