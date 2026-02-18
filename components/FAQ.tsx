'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import faqData from '@/data/faq.json';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      data-section="faq"
      className="gradient-blue-red section-wrapper"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 neon-glow">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.faqs.map((item, index) => (
            <div
              key={item.id}
              className="glassmorphism rounded-lg neon-border overflow-hidden fade-in-up"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <button
                onClick={() => toggleFaq(item.id)}
                className="w-full px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between hover:bg-accent/5 transition-all duration-300"
              >
                <h3 className="text-base sm:text-lg font-bold text-accent text-left">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 transition-transform duration-300 ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openId === item.id && (
                <div className="px-6 py-4 sm:px-8 sm:py-5 border-t border-accent/20 bg-accent/5">
                  <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 p-8 sm:p-10 glassmorphism rounded-lg neon-border text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-accent mb-3">
            Still have questions?
          </h3>
          <p className="text-foreground/80 mb-6 text-sm sm:text-base">
            Can't find the answer you're looking for? Please contact us.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-300 neon-box-glow text-sm sm:text-base"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
