"use client";

import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import Workshops from '@/components/sections/Workshops';
import OnlineEvents from '@/components/sections/OnlineEvents';
import Events from '@/components/sections/Events';
import Memories from '@/components/sections/Memories';
import FAQ from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import MainLoader from '@/components/MainLoader';
import { Navbar } from '@/components/Navbar/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const { authenticated, user } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <MainLoader />;

  return (
    <div className="font-poppins">
      <Navbar authenticated={authenticated} />
      <Home authenticated={authenticated} user={user} />
      <About />
      <Workshops />
      <OnlineEvents />
      <Events />
      <Memories />
      <FAQ />
      <Contact />     
      <Footer />
    </div>
  );
}
