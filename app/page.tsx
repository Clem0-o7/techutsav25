'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import About from '../components/About';
import Workshops from '../components/Workshops';
import Events from '../components/Events';
import Memories from '../components/Memories';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthClick = () => {
    // Placeholder for auth logic
    alert(isAuthenticated ? 'Going to profile...' : 'Redirecting to sign in...');
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar isAuthenticated={isAuthenticated} onAuthClick={handleAuthClick} />
      <Home isAuthenticated={isAuthenticated} onAuthClick={handleAuthClick} />
      <About />
      <Workshops />
      <Events />
      <Memories />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
