"use client"

import { useRef } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: form.current.user_name.value,
          user_email: form.current.user_email.value,
          message: form.current.message.value,
        }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }

    e.target.reset();
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              CONTACT US
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="text-foreground/70 mt-6 text-sm sm:text-base max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Info Section */}
          <div className="space-y-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary">
                  Get In Touch
                </span>
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-8">
                Thank you for visiting our website! If you have any questions or queries,
                drop us a message, and we'll get back to you promptly.
                Your time is valuable to us!
              </p>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                    <p className="text-sm text-foreground/70">admin@techutsav.tech</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Quick Response</h3>
                    <p className="text-sm text-foreground/70">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full h-12 px-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter your name"
                  name="user_name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full h-12 px-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter your email"
                  name="user_email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground tracking-wide">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Type your message here..."
                  name="message"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <span>SEND MESSAGE</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
