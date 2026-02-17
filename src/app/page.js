"use client";

import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import PastYearHighlights from '@/components/sections/pyq';
import Events from '@/components/sections/Events';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import MainLoader from '@/components/MainLoader';
import { Navbar } from '@/components/Navbar/Navbar';
import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const { authenticated } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <MainLoader />;

  return (
    <div className="font-poppins">
      <Navbar authenticated={authenticated} />
      <Home />
      <About />
      <PastYearHighlights />
      <Events />
      <Faq />
      <Contact />     
      <Footer />
    </div>
  );
}
