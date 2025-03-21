"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const theme = {
  eerieBlack: "#1C2127",
  berkeleyBlue: "#0B385F",
  uclaBlue: "#3373B0",
  columbiaBlue: "#BED4E9",
  aliceBlue: "#E7F1FB",
  neonBlue: "#00B4FF",
  glowBlue: "#00E5FF",
};

// Create a motion-enhanced Next.js Image component
const MotionImage = motion(Image);

const PastYearHighlights = () => {
  const [activeEntries, setActiveEntries] = useState([false, false, false]);
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const observers = sectionRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveEntries((prev) => {
              const newEntries = [...prev];
              newEntries[index] = true;
              return newEntries;
            });
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (sectionRefs[index].current) {
          observer.unobserve(sectionRefs[index].current);
        }
      });
    };
  }, [sectionRefs]);

  return (
    <section
      id="past-year-highlights"
      className="relative min-h-screen overflow-hidden bg-gray-50"
      style={{
        background: `linear-gradient(135deg, ${theme.aliceBlue} 0%, ${theme.columbiaBlue} 100%)`,
      }}
    >
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-16">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight px-2"
            style={{
              background: `linear-gradient(to right, ${theme.eerieBlack}, ${theme.berkeleyBlue})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PAST YEAR HIGHLIGHTS
          </h1>
          <div
            className="h-1 w-24 sm:w-32 mx-auto mt-3 sm:mt-4 rounded-full"
            style={{
              background: `linear-gradient(to right, ${theme.uclaBlue}, ${theme.columbiaBlue})`,
            }}
          ></div>
        </div>

        {/* Category Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden sm:block"
            style={{
              background: `linear-gradient(to bottom, transparent, ${theme.neonBlue}, transparent)`,
              opacity: 0.7,
            }}
          />

          {/* Timeline Entries */}
          <div className="relative space-y-8 sm:space-y-16 py-8 sm:py-16">
            {/* First Timeline Entry */}
            <div
              ref={sectionRefs[0]}
              className={`flex flex-col sm:flex-row items-center w-full transition-all duration-1000 ${
                activeEntries[0]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="w-full sm:w-1/2 sm:pr-8 mb-4 sm:mb-0">
                <div
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-transparent hover:border-neon-blue transition-all"
                  style={{
                    borderColor: theme.neonBlue,
                    boxShadow: `0 0 15px 0 ${theme.neonBlue}40`,
                  }}
                >
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800">
                    Multi-College Participation
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 text-justify">
                    TECHUTSAV 2024 witnessed an unprecedented level of inter-collegiate engagement, bringing together over 25 engineering colleges from across Tamil Nadu.
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex justify-center">
                <MotionImage
                  src="/pyq/image.png"
                  alt="Multi-College Participation"
                  className="rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  quality={90}
                  width={500}
                  height={500}
                />
              </div>
            </div>

            {/* Second Timeline Entry */}
            <div
              ref={sectionRefs[1]}
              className={`flex flex-col sm:flex-row-reverse items-center w-full transition-all duration-1000 ${
                activeEntries[1]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="w-full sm:w-1/2 sm:pl-8 mb-4 sm:mb-0">
                <div
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-transparent hover:border-neon-blue transition-all"
                  style={{
                    borderColor: theme.neonBlue,
                    boxShadow: `0 0 15px 0 ${theme.neonBlue}40`,
                  }}
                >
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800">
                    Innovative Tech Workshops
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 text-justify">
                    We curated a series of cutting-edge technology workshops focusing on emerging domains, providing students with practical skills and insights from industry experts.
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex justify-center">
                <MotionImage
                  src="/pyq/workshop.png"
                  alt="Tech Workshops"
                  className="rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  quality={90}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastYearHighlights;
