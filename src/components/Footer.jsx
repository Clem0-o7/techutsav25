"use client";

import { FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const theme = {
    eerieBlack: "#1C2127",
    columbiaBlue: "#BED4E9",
    aliceBlue: "#E7F1FB",
  };

  return (
    <div className="w-full" style={{ backgroundColor: theme.eerieBlack }}>
      <div className="py-6 text-base sm:text-lg text-center text-[#BED4E9]">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center px-4 sm:px-8 lg:px-16">
          {/* Title Section */}
          <div className="mb-4 sm:mb-0">
            <h1 className="font-bold text-xl sm:text-2xl" style={{ color: theme.aliceBlue }}>
              PANORAMA&apos;25
            </h1>
            <p className="text-sm sm:text-base">THIAGARAJAR COLLEGE OF ENGINEERING, MADURAI</p>
          </div>

          {/* Copyright Section */}
          <div className="mb-4 sm:mb-0 text-sm sm:text-base">
            <p>© 2025. All rights reserved by TCE</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-5 sm:gap-6">
            <a
              href="https://www.linkedin.com/school/thiagarajar-college-of-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-white transition-colors"
              style={{ color: theme.columbiaBlue }}
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/tce_madurai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-white transition-colors"
              style={{ color: theme.columbiaBlue }}
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/tceofficialpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-white transition-colors"
              style={{ color: theme.columbiaBlue }}
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
