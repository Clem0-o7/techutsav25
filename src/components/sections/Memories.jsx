"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Create a motion-enhanced Next.js Image component
const MotionImage = motion(Image);

const Memories = () => {
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
      id="memories"
      className="relative min-h-screen overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight px-2 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              MEMORIES
            </span>
          </h1>
          <div className="h-1 w-24 sm:w-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="text-foreground/70 mt-6 text-sm sm:text-base max-w-2xl mx-auto">
            Relive the excitement and innovation from our previous editions
          </p>
        </div>

        {/* Category Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden sm:block bg-gradient-to-b from-transparent via-primary to-transparent opacity-30" />

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
                <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border-2 border-primary/30 hover:border-primary hover:shadow-primary/20 transition-all">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary">
                      Multi-College Participation
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-foreground/70 text-justify leading-relaxed">
                    TECHUTSAV 2024 witnessed an unprecedented level of inter-collegiate engagement, bringing together over 25 engineering colleges from across Tamil Nadu.
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex justify-center">
                <MotionImage
                  src="/pyq/image.png"
                  alt="Multi-College Participation"
                  className="rounded-xl shadow-lg border-2 border-border hover:border-primary/40 transition-all"
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
                <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 border-2 border-primary/30 hover:border-primary hover:shadow-primary/20 transition-all">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary">
                      Innovative Tech Workshops
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-foreground/70 text-justify leading-relaxed">
                    We curated a series of cutting-edge technology workshops focusing on emerging domains, providing students with practical skills and insights from industry experts.
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex justify-center">
                <MotionImage
                  src="/pyq/workshop.png"
                  alt="Tech Workshops"
                  className="rounded-xl shadow-lg border-2 border-border hover:border-primary/40 transition-all"
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

export default Memories;
