'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface HomeProps {
  onAuthClick?: () => void;
  isAuthenticated?: boolean;
}

export default function Home({ onAuthClick, isAuthenticated = false }: HomeProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const eventDate = new Date('2026-03-15').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      data-section="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20"
      style={{
        backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Start%20Frame-FSsooGFhYUlQehnWGAcDC03hTBY444.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-red-950/40 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <div className="mb-8 fade-in-up">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 neon-glow">
            Techutsav
          </h1>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">
            "PARADIGM"
          </h2>
          <p className="text-xl sm:text-2xl text-foreground/90 font-light">
            '26
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          A Stranger Things inspired journey into the future of technology. Experience innovation, creativity, and excellence.
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-12 max-w-md mx-auto">
          {[
            { label: 'Days', value: days },
            { label: 'Hours', value: hours },
            { label: 'Mins', value: minutes },
            { label: 'Secs', value: seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="glassmorphism rounded-lg p-3 sm:p-4 neon-border"
            >
              <div className="text-xl sm:text-2xl font-bold text-accent mb-1">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-foreground/70">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onAuthClick}
          className="relative inline-block px-8 py-4 text-lg font-bold rounded-lg bg-primary hover:bg-primary/90 text-white transition-all duration-300 overflow-hidden group"
        >
          <span className="relative z-10">
            {isAuthenticated ? 'Go to Profile' : 'Register Now'}
          </span>
          <div className="absolute inset-0 bg-accent/30 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-accent/30 group-hover:shadow-lg neon-box-glow"></div>
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-accent opacity-70" />
        </div>
      </div>
    </section>
  );
}
