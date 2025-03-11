"use client";

import { FaLinkedinIn, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const theme = {
    eerieBlack: "#1C2127",
    columbiaBlue: "#BED4E9",
    aliceBlue: "#E7F1FB",
  };

  return (
    <div className="w-full bg-[#1C2127]">
      <div className="py-6 px-6 sm:px-10 lg:px-16 text-center text-[#BED4E9]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Title Section */}
          <div className="text-center md:text-left">
            <h1 className="font-bold text-xl sm:text-2xl text-[#E7F1FB]">
              PANORAMA&apos;25
            </h1>
            <p className="text-sm sm:text-base">
              THIAGARAJAR COLLEGE OF ENGINEERING, MADURAI
            </p>
          </div>

          {/* Copyright Section */}
          <div className="text-sm sm:text-base">
            <p>© 2025. All rights reserved by TCE</p>
          </div>

          {/* Social Media & Email Icons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/school/thiagarajar-college-of-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-white transition-all duration-300"
              style={{ color: theme.columbiaBlue }}
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/tce_madurai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-white transition-all duration-300"
              style={{ color: theme.columbiaBlue }}
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/tceofficialpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-white transition-all duration-300"
              style={{ color: theme.columbiaBlue }}
            >
              <FaTwitter />
            </a>
            <a
              href="mailto:admin@techutsavtce.tech"
              className="text-2xl hover:text-white transition-all duration-300"
              style={{ color: theme.columbiaBlue }}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
