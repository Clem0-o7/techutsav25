"use client";

import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import PastYearHighlights from '@/components/sections/pyq';
import Events from '@/components/sections/Events';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import MainLoader from '@/components/MainLoader';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  // (Authentication logic can remain if needed)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For example, you might check auth here.
    setLoading(false);
  }, []);

  if (loading) return <MainLoader />;

  return (
    <div className="font-poppins">
      <Navbar  />
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
