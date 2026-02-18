'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import eventsData from '../data/events.json';

export default function Events() {
  const { paperPresentation, ideathon, allEvents } = eventsData;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft <
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth
      );
    }
  };

  const CompetitionCard = ({ event, index }: { event: any; index: number }) => (
    <div
      className="glassmorphism rounded-lg overflow-hidden neon-border hover:shadow-lg transition-all duration-300 fade-in-up group"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Image
          src="/placeholder.svg?height=300&width=400"
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4 bg-primary/90 px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white">
          {event.date}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-3">
          {event.title}
        </h3>
        <p className="text-foreground/80 text-sm sm:text-base mb-6 leading-relaxed">
          {event.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-foreground/70">
            <Users className="w-4 h-4 text-accent" />
            <span>{event.participants}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <Trophy className="w-4 h-4 text-primary" />
            <span>{event.prizes}</span>
          </div>
        </div>

        <button className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base neon-box-glow inline-flex items-center justify-center gap-2 group/btn">
          View Details
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <section
      id="events"
      data-section="events"
      className="gradient-blue-red section-wrapper"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 neon-glow">
            Events
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
        </div>

        {/* Main Competitions */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-accent">
            Featured Competitions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <CompetitionCard event={paperPresentation} index={0} />
            <CompetitionCard event={ideathon} index={1} />
          </div>
        </div>

        {/* Events Carousel */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-accent">
            More Events
          </h3>

          <div className="relative">
            {/* Carousel Container */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
            >
              {allEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 w-72 sm:w-80 group"
                >
                  <div className="relative h-48 sm:h-56 rounded-lg overflow-hidden border border-accent/30 hover:border-accent transition-all duration-300">
                    <Image
                      src="/placeholder.svg?height=300&width=350"
                      alt={event.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex flex-col justify-end p-4">
                      <h4 className="text-lg sm:text-xl font-bold text-accent">
                        {event.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-foreground/70 flex items-center gap-1 mt-2">
                        <Calendar className="w-3 h-3" /> {event.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            {(canScrollLeft || canScrollRight) && (
              <div className="flex gap-2 justify-center mt-6">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="p-2 rounded-lg bg-accent/20 hover:bg-accent/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6 text-accent" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="p-2 rounded-lg bg-accent/20 hover:bg-accent/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6 text-accent" />
                </button>
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-300 inline-flex items-center gap-2 neon-box-glow group">
              View All Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
