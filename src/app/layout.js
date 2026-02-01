// app/layout.jsx
"use client";

import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import MainLoader from "@/components/MainLoader";
import { Analytics } from '@vercel/analytics/next';
import { useEffect, useState } from "react";
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile/getProfile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <html lang="en" className={poppins.variable}>
        <body className="font-sans antialiased">
          <MainLoader />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <title>TechUtsav - National Level Tech Symposium</title>
        <meta name="description" content="TechUtsav  2026 - National Level Tech Symposium hosted by CSE, IT, CSBS, AMCS, MCA" />
        <link rel="icon" href="/icon-light-32x32.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/icon-dark-32x32.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={`${poppins.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
