'use client';

import { useState } from 'react';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full px-4 sm:px-6 py-3 sm:py-4 bg-background/50 border border-accent/30 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 text-sm sm:text-base';

  return (
    <section
      id="contact"
      data-section="contact"
      className="gradient-blue-red section-wrapper"
    >
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 neon-glow">
            Get In Touch
          </h2>
          <p className="text-foreground/80 max-w-xl mx-auto text-sm sm:text-base">
            Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary mx-auto rounded-full mt-6"></div>
        </div>

        {/* Contact Form */}
        <div className="glassmorphism rounded-lg neon-border p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="fade-in-up">
              <label htmlFor="name" className="block text-sm sm:text-base font-medium text-accent mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Your Name
                </div>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className={inputClasses}
              />
            </div>

            {/* Email Field */}
            <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-accent mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  Email Address
                </div>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className={inputClasses}
              />
            </div>

            {/* Message Field */}
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="message" className="block text-sm sm:text-base font-medium text-accent mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  Message
                </div>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you'd like to know..."
                required
                rows={6}
                className={inputClasses}
              />
            </div>

            {/* Submit Button */}
            <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 sm:py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 neon-box-glow text-sm sm:text-base"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 sm:p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm sm:text-base">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 sm:p-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm sm:text-base">
                ✗ Failed to send message. Please try again.
              </div>
            )}
          </form>
        </div>

        {/* Alternative Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-12">
          <div className="glassmorphism rounded-lg p-6 sm:p-8 neon-border text-center">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-accent mx-auto mb-3" />
            <h3 className="font-bold text-accent mb-2 text-sm sm:text-base">Email</h3>
            <a href="mailto:contact@techutsav.com" className="text-foreground/80 hover:text-foreground transition-colors text-xs sm:text-sm">
              contact@techutsav.com
            </a>
          </div>
          <div className="glassmorphism rounded-lg p-6 sm:p-8 neon-border text-center">
            <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-accent mx-auto mb-3" />
            <h3 className="font-bold text-accent mb-2 text-sm sm:text-base">Phone</h3>
            <a href="tel:+919876543210" className="text-foreground/80 hover:text-foreground transition-colors text-xs sm:text-sm">
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
