'use client';

import Image from 'next/image';
import aboutData from '../data/sections.json';

export default function About() {
  const { collegeTitle, collegeDescription, techutsavTitle, techutsavHistory } =
    aboutData.about;

  return (
    <section
      id="about"
      data-section="about"
      className="gradient-blue-red section-wrapper"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 neon-glow">
            About
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* College Section */}
          <div className="flex flex-col justify-center fade-in-up">
            <div className="glassmorphism rounded-lg p-6 sm:p-8 neon-border mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-4">
                {collegeTitle}
              </h3>
              <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                {collegeDescription}
              </p>
            </div>
            <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-accent/30">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Thiagarajar College of Engineering"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
            </div>
          </div>

          {/* Techutsav Section */}
          <div className="flex flex-col justify-center fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-accent/30 mb-6">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Techutsav Events"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
            </div>
            <div className="glassmorphism rounded-lg p-6 sm:p-8 neon-border">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                {techutsavTitle}
              </h3>
              <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                {techutsavHistory}
              </p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {[
            { number: '25+', label: 'Events & Workshops' },
            { number: '5000+', label: 'Participants' },
            { number: '₹500K+', label: 'Total Prizes' },
          ].map((highlight, index) => (
            <div
              key={index}
              className="glassmorphism rounded-lg p-6 text-center neon-border"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                {highlight.number}
              </div>
              <div className="text-foreground/70 text-sm sm:text-base">
                {highlight.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
