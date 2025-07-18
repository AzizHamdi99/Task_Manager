import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Customize weights
  variable: '--font-poppins',          // Optional: CSS variable name
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskify",
  description: "Create and manage tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >

      <body className={poppins.className} >
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
