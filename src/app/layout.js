// app/layout.jsx
"use client";

import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import MainLoader from "@/components/MainLoader";
import { useEffect, useState } from "react";

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
      <html>
        <body>
          <MainLoader />
        </body>
      </html>
    );
  }

  return (
    <html>
      <head>
        <title>Techutsav</title>
      </head>
      <body className="font-poppins">
        
        {children}
      </body>
    </html>
  );
}
