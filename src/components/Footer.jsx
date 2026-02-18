"use client";

import { FaLinkedinIn, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-card border-t border-border">
      <div className="py-6 px-6 sm:px-10 lg:px-16 text-center text-foreground/70">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Title Section */}
          <div className="text-center md:text-left">
            <h1 className="font-bold text-xl sm:text-2xl mb-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                PARADIGM &apos;26
              </span>
            </h1>
            <p className="text-sm sm:text-base text-foreground/60">
              THIAGARAJAR COLLEGE OF ENGINEERING, MADURAI
            </p>
          </div>

          {/* Copyright Section */}
          <div className="text-sm sm:text-base text-foreground/60">
            <p>© 2026. All rights reserved by TCE</p>
          </div>

          {/* Social Media & Email Icons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/school/thiagarajar-college-of-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/tce_madurai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/tceofficialpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="mailto:admin@techutsavtce.tech"
              className="text-2xl text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-110"
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
