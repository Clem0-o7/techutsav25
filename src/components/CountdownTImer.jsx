"use client";

import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Convert target date string to Date object if it's a string
    const targetDateTime =
      typeof targetDate === "string" ? new Date(targetDate) : targetDate;

    const calculateTimeLeft = () => {
      const difference = targetDateTime - new Date();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Event has already started
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately and then update every second
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const TimeBox = ({ value, label, isPulsing = false }) => (
    <div className="flex flex-col items-center group">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 relative overflow-hidden bg-card hover:bg-gradient-to-br hover:from-primary hover:to-accent border-2 border-primary/40 hover:border-white group">
        {/* Animated shine effect on hover */}
        <div className="absolute -inset-full h-full w-1/2 z-10 opacity-0 group-hover:animate-card-shine bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-[25deg]"></div>
        
        <span className={`text-3xl sm:text-4xl font-bold relative z-20 transition-all duration-300 text-foreground group-hover:text-white ${isPulsing ? 'animate-pulse-subtle' : ''}`}>
          {formatNumber(value)}
        </span>
      </div>
      <p className="mt-2 font-medium text-sm sm:text-base transition-all duration-300 text-foreground">
        {label}
      </p>
    </div>
  );

  return (
    <div
      className="flex flex-col items-center mt-8 animate-fade-in"
      data-testid="countdown-timer"
    >
      <div className="mb-4 p-2 px-6 rounded-full backdrop-blur-sm shadow-lg animate-pulse-subtle bg-primary/20 border border-primary/40">
        <p className="text-sm sm:text-lg lg:text-xl font-bold tracking-wider text-primary">
          EVENT COUNTDOWN
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {timeLeft.days > 0 && (
          <TimeBox value={timeLeft.days} label="Days" />
        )}
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" isPulsing={true} />
      </div>
    </div>
  );
};

export default CountdownTimer;
