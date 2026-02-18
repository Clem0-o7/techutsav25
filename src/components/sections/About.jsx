"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Particles from "@/components/Particles";
import { Calendar, Users, Trophy, Zap, Target, Sparkles } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const highlights = [
    {
      icon: Calendar,
      title: "February 27, 2026",
      description: "Mark your calendars for a day of innovation"
    },
    {
      icon: Users,
      title: "500+ Participants",
      description: "Join students and professionals from across the nation"
    },
    {
      icon: Trophy,
      title: "Competitive Events",
      description: "Challenge yourself in cutting-edge tech competitions"
    },
    {
      icon: Zap,
      title: "Hands-on Workshops",
      description: "Learn from industry experts and gain practical skills"
    },
    {
      icon: Target,
      title: "5th Edition",
      description: "Celebrating five years of technological excellence"
    },
    {
      icon: Sparkles,
      title: "Innovation Hub",
      description: "Network with innovators and explore emerging technologies"
    }
  ];

  return (
    <section id="about" className="relative min-h-screen overflow-hidden bg-background">
      {/* Particles background */}
      <div className="absolute inset-0 opacity-20 z-0">
        <Particles
          particleCount={150}
          particleSpread={8}
          speed={0.05}
          particleColors={["#ffffff", "#e50914", "#404040"]}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={0.5}
          cameraDistance={15}
          disableRotation={true}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              ABOUT US
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        </div>

        <div ref={sectionRef} className="space-y-12">
          {/* TCE Section */}
          <div className={`flex flex-col lg:flex-row items-center gap-12 p-8 rounded-2xl shadow-xl border border-border transition-all duration-1000 bg-card/50 backdrop-blur-sm ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/40 to-accent/40 rounded-xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <Image 
                src="/tce1.jpg" 
                alt="TCE" 
                className="relative rounded-xl shadow-lg transform transition duration-500 group-hover:scale-105" 
                width={500} 
                height={500} 
              />
            </div>
            <div className="lg:w-1/2 text-base sm:text-lg text-foreground leading-relaxed text-justify">
              Founded in 1957 by philanthropist and industrialist late Shri Karumuthu Thiagarajan Chettiar, <strong className="text-primary">Thiagarajar College Of Engineering (TCE)</strong> is an institution affiliated to Anna University and situated in Madurai, the Temple city. The college is funded by central & state Governments and Management. The courses offered in TCE are approved by the All India Council for Technical Education, New Delhi. TCE was granted Autonomy in the year 1987 and the programmes have been accredited by the National Board of Accreditation (NBA).
            </div>
          </div>

          {/* PARADIGM 2026 Section */}
          <div className={`flex flex-col lg:flex-row-reverse items-center gap-12 p-8 rounded-2xl shadow-xl border border-border transition-all duration-1000 bg-card/50 backdrop-blur-sm ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <div 
                      key={index}
                      className="group p-4 rounded-xl bg-card border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm text-foreground mb-1">{highlight.title}</h3>
                          <p className="text-xs text-muted-foreground">{highlight.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:w-1/2 text-base sm:text-lg text-foreground leading-relaxed text-justify">
              <strong className="text-primary">PARADIGM 2026</strong> is the 5th edition of TECHUTSAV, a prestigious National Level Symposium organized annually by TCE. Under the theme <em className="text-accent">"Paradigms of Tomorrow"</em>, this year's event brings together experts, innovators, and students to explore cutting-edge advancements in cybersecurity, artificial intelligence, cloud computing, and emerging technologies. The symposium features competitive events, hands-on workshops, and keynote sessions designed to provide practical learning experiences and foster collaboration. With over 500 participants expected, PARADIGM 2026 serves as a premier platform for knowledge exchange, networking, and celebrating technological innovation in the digital era.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
