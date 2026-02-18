'use client';

import Image from 'next/image';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import workshopData from '../data/workshops.json';

export default function Workshops() {
  const { mainWorkshop, onlineWorkshops } = workshopData;

  return (
    <section
      id="workshops"
      data-section="workshops"
      className="gradient-blue-red section-wrapper"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 neon-glow">
            Workshops
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
        </div>

        {/* Main Workshop */}
        <div className="relative rounded-lg overflow-hidden mb-12 group fade-in-up">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${mainWorkshop.bgImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-purple-950/70 to-red-950/80"></div>
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center">
            <h3 className="text-3xl sm:text-5xl font-bold text-white mb-2 neon-glow">
              {mainWorkshop.title}
            </h3>
            <p className="text-xl sm:text-2xl text-accent mb-6 font-semibold">
              {mainWorkshop.subtitle}
            </p>
            <p className="text-foreground/90 mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {mainWorkshop.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 text-sm sm:text-base">
              <div className="flex items-center justify-center gap-2 text-foreground/80">
                <Calendar className="w-5 h-5 text-accent" />
                <span>{mainWorkshop.date}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-foreground/80">
                <Clock className="w-5 h-5 text-accent" />
                <span>{mainWorkshop.time}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-foreground/80">
                <MapPin className="w-5 h-5 text-accent" />
                <span>{mainWorkshop.location}</span>
              </div>
            </div>

            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-300 inline-flex items-center gap-2 neon-box-glow group/btn">
              Register Now
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Online Workshops */}
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-accent">
            Online Workshops
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {onlineWorkshops.map((workshop, index) => (
              <div
                key={workshop.id}
                className="glassmorphism rounded-lg overflow-hidden neon-border hover:shadow-lg transition-all duration-300 fade-in-up group"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt={workshop.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>

                <div className="p-6 sm:p-8">
                  <h4 className="text-xl sm:text-2xl font-bold text-accent mb-2">
                    {workshop.title}
                  </h4>
                  <p className="text-foreground/80 text-sm sm:text-base mb-4 leading-relaxed">
                    {workshop.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {workshop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs sm:text-sm border border-accent/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-foreground/70 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {workshop.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {workshop.date}
                    </span>
                  </div>

                  <button className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base neon-box-glow">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
