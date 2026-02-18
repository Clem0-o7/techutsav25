"use client";

import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import "@/styles/button.css";
import CountdownTimer from "@/components/CountdownTImer";
import Particles from "@/components/Particles";

const Home = ({ authenticated, user }) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Paradigms of Tomorrow.";
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
    <section id="home" className="relative w-full min-h-screen bg-background">
      {/* Particles background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Particles
          particleCount={400}
          particleSpread={8}
          speed={0.05}
          particleColors={["#ffffff", "#e50914", "#404040"]}
          moveParticlesOnHover={true}
          particleHoverFactor={0.7}
          alphaParticles={true}
          particleBaseSize={150}
          cameraDistance={18}
          disableRotation={false}
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-background/60 to-background/70"></div>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center w-full py-10 sm:py-16 md:py-20 px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center w-full max-w-6xl">
          {/* College name banner */}
          <div className="mb-4 sm:mb-8 p-1 sm:p-2 px-3 sm:px-6 rounded-full backdrop-blur-sm shadow-lg animate-pulse-subtle bg-primary/20 border border-primary/40">
            <p className="text-xs sm:text-sm lg:text-lg tracking-widest font-semibold text-primary">
              THIAGARAJAR COLLEGE OF ENGINEERING PRESENTS
            </p>
          </div>

          {/* PARADIGM '26 title */}
          <div className="relative">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider relative z-20 animate-fade-in-up">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-text-shimmer bg-[length:200%_auto]">
                PARADIGM '26
              </span>
            </h1>
          </div>

          {/* Date banner */}
          <div className="mt-4 sm:mt-6 px-4 sm:px-6 py-1 sm:py-2 rounded-full backdrop-blur-sm animate-float-enhanced shadow-md bg-primary/20 border border-primary/40">
            <p className="text-sm sm:text-lg lg:text-xl font-bold tracking-wider text-primary">
              On 27th February
            </p>
          </div>

          {/* CountdownTimer */}
          <div className="mt-4 sm:mt-6 animate-fade-in">
            <CountdownTimer targetDate="2026-02-27T00:00:00" />
          </div>

          {/* Typed text */}
          <div className="h-12 sm:h-16 flex items-center justify-center mt-2 sm:mt-4">
            <p className="text-lg sm:text-xl lg:text-2xl min-h-[24px] sm:min-h-[28px] px-2 text-foreground">
              {typedText}
              <span className="animate-blink">|</span>
            </p>
          </div>

          {/* Edition banner */}
          <div className="mb-4 sm:mb-6 p-1 sm:p-2 px-3 sm:px-6 rounded-full backdrop-blur-sm shadow-md animate-pulse-subtle bg-primary/15 border border-primary/30 mt-2" style={{ maxWidth: isMobile ? "90%" : "100%" }}>
            <p className="text-sm sm:text-lg lg:text-xl font-bold tracking-wider text-primary">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-text-shimmer bg-[length:200%_auto]">
                5th EDITION
              </span>{" "}
              • 500+ PARTICIPANTS
            </p>
          </div>

          {/* Authentication-dependent content */}
          {authenticated ? (
            <div className="flex flex-col items-center gap-3 sm:gap-6 mt-4 sm:mt-6 animate-fade-in">
              {user?.name && (
                <p className="text-xl sm:text-2xl font-semibold text-foreground drop-shadow-sm">
                  Welcome back, {user.name}!
                </p>
              )}
              {/* Button layout: Stack on mobile, side by side on tablet and up */}
              <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row w-full sm:w-auto px-4 sm:px-0">
                <ScrollLink
                  to="events"
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-center cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg w-full bg-card hover:bg-primary text-foreground hover:text-white border-2 border-primary group"
                >
                  <span className="relative z-10">Explore Events</span>
                </ScrollLink>
                <Link
                  href="/profile"
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-md text-center transition-all duration-300 shadow-md hover:shadow-lg w-full bg-primary hover:bg-primary/90 text-white border-2 border-primary group"
                >
                  <span className="relative z-10">View Profile</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex gap-5 mt-8 sm:flex-row flex-col animate-fade-in">
              <Link
                href="/signup"
                className="px-8 py-3 rounded-md text-center transition-all duration-300 shadow-md hover:shadow-lg bg-card hover:bg-primary text-foreground hover:text-white border-2 border-primary group"
              >
                <span className="relative z-10">Register</span>
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 rounded-md text-center transition-all duration-300 shadow-md hover:shadow-lg bg-card hover:bg-accent text-foreground hover:text-white border-2 border-accent group"
              >
                <span className="relative z-10">Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
