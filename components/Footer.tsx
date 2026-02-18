'use client';

import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import socialLinks from '@/data/socialLinks.json';

export default function Footer() {
  const getSocialIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      linkedin: <Linkedin className="w-5 h-5" />,
      twitter: <Twitter className="w-5 h-5" />,
      github: <Github className="w-5 h-5" />,
      mail: <Mail className="w-5 h-5" />,
      instagram: <ExternalLink className="w-5 h-5" />,
      facebook: <ExternalLink className="w-5 h-5" />,
      discord: <ExternalLink className="w-5 h-5" />,
    };
    return iconMap[iconName] || <ExternalLink className="w-5 h-5" />;
  };

  return (
    <footer className="gradient-blue-red border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-accent mb-3">
              Techutsav
            </h3>
            <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
              Experience the ultimate tech festival with workshops, competitions, and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-accent mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {['Home', 'About', 'Events', 'Workshops'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-foreground/70 hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-accent mb-4 text-sm sm:text-base">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {['FAQ', 'Contact', 'Register', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-accent mb-4 text-sm sm:text-base">Contact</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="text-foreground/70">
                Thiagarajar College of Engineering
              </p>
              <p className="text-foreground/70">Madurai, India</p>
              <a href="mailto:contact@techutsav.com" className="text-accent hover:underline">
                contact@techutsav.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/20 py-8">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-all duration-300 neon-box-glow hover:neon-box-glow"
                title={social.name}
                aria-label={social.name}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>

          {/* Bottom Text */}
          <div className="text-center">
            <h3 className="text-lg sm:text-2xl font-bold neon-glow mb-2">
              Techutsav "PARADIGM" '26
            </h3>
            <p className="text-foreground/70 mb-4 text-xs sm:text-sm">
              THIAGARAJAR COLLEGE OF ENGINEERING, MADURAI
            </p>
            <p className="text-foreground/70 text-xs sm:text-sm">
              © 2026. All rights reserved by TCE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
