'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import navLinks from '../data/sections.json';

interface NavbarProps {
  isAuthenticated?: boolean;
  onAuthClick?: () => void;
}

export default function Navbar({ isAuthenticated = false, onAuthClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 200) {
          setActiveSection(section.getAttribute('data-section') || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glassmorphism py-3 border-b border-accent/20'
          : 'bg-gradient-to-b from-background/80 via-background/50 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 blur-lg group-hover:bg-accent/50 transition-all"></div>
              <span className="relative text-xl font-bold neon-text">⚡</span>
            </div>
            <span className="text-lg font-bold hidden sm:inline neon-text">
              Techutsav
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  activeSection === link.name.toLowerCase()
                    ? 'text-accent neon-text'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link.name}
                {activeSection === link.name.toLowerCase() && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent neon-box-glow"></span>
                )}
              </a>
            ))}
          </div>

          {/* Auth Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={onAuthClick}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg neon-box-glow text-sm"
            >
              {isAuthenticated ? 'Profile' : 'Sign In'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-accent" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-accent/20 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === link.name.toLowerCase()
                      ? 'bg-accent/20 text-accent neon-text'
                      : 'text-foreground/70 hover:bg-accent/10 hover:text-foreground'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
