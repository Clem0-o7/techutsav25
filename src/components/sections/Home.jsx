"use client";

import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import "@/styles/button.css";
import CountdownTimer from "@/components/CountdownTImer";
import Particles from "@/components/Particles";

// Color theme
const theme = {
  eerieBlack: "#1C2127",
  berkeleyBlue: "#0B385F",
  uclaBlue: "#3373B0",
  columbiaBlue: "#BED4E9",
  aliceBlue: "#E7F1FB",
};

const Home = ({ authenticated }) => {
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isExploreHovered, setIsExploreHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Decoding the Digital: Unveiling the future of tech.";
  const isDesktop = useMediaQuery("(min-width:900px)");
  const isTablet = useMediaQuery("(min-width:600px)");
  const isMobile = useMediaQuery("(max-width:480px)");

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <section id="home" className="relative w-full min-h-screen bg-white">
      {/* Particles background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Particles
          particleCount={400} // Increased for more particles
          particleSpread={8} // Reduced spread
          speed={0.05}
          particleColors={[theme.columbiaBlue, theme.aliceBlue, theme.uclaBlue]}
          moveParticlesOnHover={true}
          particleHoverFactor={0.7}
          alphaParticles={true}
          particleBaseSize={150} // Larger particles
          cameraDistance={18} // Bring particles closer
          disableRotation={false}
        />
      </div>

      {/* Overlay gradient for improved particle visibility */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.7))",
        }}
      ></div>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center w-full py-10 sm:py-16 md:py-20 px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center w-full max-w-6xl">
          {/* College name banner */}
          <div
            className="mb-4 sm:mb-8 p-1 sm:p-2 px-3 sm:px-6 rounded-full backdrop-blur-sm shadow-lg animate-pulse-subtle"
            style={{
              backgroundColor: `${theme.uclaBlue}20`,
              border: `1px solid ${theme.columbiaBlue}40`,
            }}
          >
            <p
              className="text-xs sm:text-sm lg:text-lg tracking-widest font-semibold"
              style={{ color: theme.berkeleyBlue }}
            >
              THIAGARAJAR COLLEGE OF ENGINEERING PRESENTS
            </p>
          </div>

          {/* PARADIGM '26 title */}
          <div className="relative">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider relative z-20 animate-fade-in-up">
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B385F] to-[#3373B0] animate-text-shimmer"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.berkeleyBlue}, ${theme.uclaBlue}, ${theme.berkeleyBlue})`,
                  backgroundSize: "200% auto",
                }}
              >
                PARADIGM '26
              </span>
            </h1>
          </div>

          {/* Date banner */}
          <div
            className="mt-4 sm:mt-6 px-4 sm:px-6 py-1 sm:py-2 rounded-full backdrop-blur-sm animate-float-enhanced shadow-md"
            style={{
              backgroundColor: `${theme.uclaBlue}20`,
              border: `1px solid ${theme.columbiaBlue}40`,
            }}
          >
            <p
              className="text-sm sm:text-lg lg:text-xl font-bold tracking-wider"
              style={{ color: theme.berkeleyBlue }}
            >
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r animate-text-shimmer"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.eerieBlack}, ${theme.berkeleyBlue}, ${theme.eerieBlack})`,
                  backgroundSize: "200% auto",
                }}
              ></span>
              On 27th February
            </p>
          </div>

          {/* CountdownTimer */}
          <div className="mt-4 sm:mt-6 animate-fade-in">
            <CountdownTimer targetDate="2026-02-27T00:00:00" />
          </div>

          {/* Typed text */}
          <div className="h-12 sm:h-16 flex items-center justify-center mt-2 sm:mt-4">
            <p
              className="text-lg sm:text-xl lg:text-2xl min-h-[24px] sm:min-h-[28px] px-2"
              style={{ color: theme.berkeleyBlue }}
            >
              {typedText}
              <span className="animate-blink">|</span>
            </p>
          </div>

          {/* Edition banner */}
          <div
            className="mb-4 sm:mb-6 p-1 sm:p-2 px-3 sm:px-6 rounded-full backdrop-blur-sm shadow-md animate-pulse-subtle"
            style={{
              backgroundColor: `${theme.uclaBlue}15`,
              border: `1px solid ${theme.columbiaBlue}30`,
              marginTop: "0.5rem",
              maxWidth: isMobile ? "90%" : "100%",
            }}
          >
            <p
              className="text-sm sm:text-lg lg:text-xl font-bold tracking-wider"
              style={{ color: theme.berkeleyBlue }}
            >
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r animate-text-shimmer"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.eerieBlack}, ${theme.berkeleyBlue}, ${theme.eerieBlack})`,
                  backgroundSize: "200% auto",
                }}
              >
                5th EDITION
              </span>{" "}
              • 500+ PARTICIPANTS
            </p>
          </div>

          {/* Authentication-dependent content */}
          {authenticated ? (
            <div className="flex flex-col items-center gap-3 sm:gap-6 mt-4 sm:mt-6 animate-fade-in">
              <p
                className="text-xl sm:text-2xl font-semibold filter drop-shadow-sm"
                style={{ color: theme.berkeleyBlue }}
              >
                Welcome, {sessionStorage.getItem("name")}
              </p>
              {/* Button layout: Stack on mobile, side by side on tablet and up */}
              <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row w-full sm:w-auto px-4 sm:px-0">
                <ScrollLink
                  to="events"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-center cursor-pointer transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg w-full"
                  style={{
                    backgroundColor: isExploreHovered ? theme.berkeleyBlue : "white",
                    color: isExploreHovered ? "white" : theme.berkeleyBlue,
                    border: `2px solid ${theme.berkeleyBlue}`,
                  }}
                  onMouseEnter={() => setIsExploreHovered(true)}
                  onMouseLeave={() => setIsExploreHovered(false)}
                >
                  <span className="relative z-10">Explore</span>
                  <span
                    className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out"
                    style={{
                      transform: isExploreHovered ? "translateY(0)" : "translateY(100%)",
                      background: `linear-gradient(45deg, ${theme.berkeleyBlue}, ${theme.uclaBlue})`,
                    }}
                  ></span>
                </ScrollLink>
                <Link
                  href="/profile"
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-center transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg w-full"
                  style={{
                    backgroundColor: isProfileHovered ? theme.uclaBlue : "white",
                    color: isProfileHovered ? "white" : theme.uclaBlue,
                    border: `2px solid ${theme.uclaBlue}`,
                  }}
                  onMouseEnter={() => setIsProfileHovered(true)}
                  onMouseLeave={() => setIsProfileHovered(false)}
                >
                  <span className="relative z-10">Profile</span>
                  <span
                    className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out"
                    style={{
                      transform: isProfileHovered ? "translateY(0)" : "translateY(100%)",
                      background: `linear-gradient(45deg, ${theme.uclaBlue}, ${theme.columbiaBlue})`,
                    }}
                  ></span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex gap-5 mt-8 sm:flex-row flex-col animate-fade-in">
              <Link
                href="/signup"
                className="px-8 py-3 rounded-md text-center transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: isRegisterHovered ? theme.berkeleyBlue : "white",
                  color: isRegisterHovered ? "white" : theme.berkeleyBlue,
                  border: `2px solid ${theme.berkeleyBlue}`,
                }}
                onMouseEnter={() => setIsRegisterHovered(true)}
                onMouseLeave={() => setIsRegisterHovered(false)}
              >
                <span className="relative z-10">Register</span>
                <span
                  className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: isRegisterHovered ? "translateY(0)" : "translateY(100%)",
                    background: `linear-gradient(45deg, ${theme.berkeleyBlue}, ${theme.uclaBlue})`,
                  }}
                ></span>
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 rounded-md text-center transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: isLoginHovered ? theme.uclaBlue : "white",
                  color: isLoginHovered ? "white" : theme.uclaBlue,
                  border: `2px solid ${theme.uclaBlue}`,
                }}
                onMouseEnter={() => setIsLoginHovered(true)}
                onMouseLeave={() => setIsLoginHovered(false)}
              >
                <span className="relative z-10">Login</span>
                <span
                  className="absolute inset-0 -z-10 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: isLoginHovered ? "translateY(0)" : "translateY(100%)",
                    background: `linear-gradient(45deg, ${theme.uclaBlue}, ${theme.columbiaBlue})`,
                  }}
                ></span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
