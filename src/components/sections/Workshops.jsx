"use client";

import { useState } from "react";
import "@/styles/button.css";

const Workshops = () => {
  const [activeWorkshop, setActiveWorkshop] = useState(null);

  const mainWorkshop = {
    title: "Multi Agent Mastery",
    subtitle: "Orchestration for the Future",
    description: "Dive into the world of multi-agent systems and learn how to orchestrate AI agents for complex problem-solving. This hands-on workshop covers agent communication, coordination, and real-world applications.",
    date: "27th February 2026",
    time: "9:00 AM - 12: PM",
    location: "TCE Auditorium",
    fee: "₹354 (Included in PASS 1)",
  };

  const onlineWorkshops = [
    {
      id: 1,
      title: "Drag. Drop. Deploy",
      subtitle: "Low Code / No Code",
      description: "Master the art of building applications without writing extensive code. Learn popular no-code platforms and tools to create functional applications rapidly.",
      duration: "2 hours",
      platform: "Online",
      tags: ["No-Code", "Rapid Development", "Beginner Friendly"],
    },
    {
      id: 2,
      title: "Quick Build",
      subtitle: "From Zero to Live",
      description: "Learn the complete process of building and deploying a production-ready web application from scratch. Cover modern development tools, CI/CD, and deployment strategies.",
      duration: "2 hours",
      platform: "Online",
      tags: ["Web Development", "Deployment", "DevOps"],
    },
  ];

  return (
    <section id="workshop" className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              WORKSHOPS
            </span>
          </h2>
          <div className="h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"></div>
        </div>

        {/* Main Workshop - Featured */}
        <div className="mb-16">
          <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <div className="relative bg-gradient-to-br from-primary/10 via-background to-background p-8 sm:p-12 lg:p-16">
              <div className="text-center">
                <div className="inline-block bg-primary/20 border border-primary/40 px-4 py-2 rounded-full mb-6 animate-pulse-subtle">
                  <span className="text-primary text-sm font-semibold">FEATURED - OFFLINE WORKSHOP</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-bold mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                    {mainWorkshop.title}
                  </span>
                </h3>
                <p className="text-xl sm:text-2xl text-primary mb-6 font-semibold">
                  {mainWorkshop.subtitle}
                </p>
                <p className="text-foreground/80 mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                  {mainWorkshop.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                  <div className="bg-card border border-primary/20 rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="text-primary text-sm font-semibold mb-1">📅 Date</div>
                    <div className="text-foreground text-sm">{mainWorkshop.date}</div>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="text-primary text-sm font-semibold mb-1">🕐 Time</div>
                    <div className="text-foreground text-sm">{mainWorkshop.time}</div>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="text-primary text-sm font-semibold mb-1">📍 Location</div>
                    <div className="text-foreground text-sm">{mainWorkshop.location}</div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-8 inline-block">
                  <div className="text-foreground text-sm">
                    <span className="font-semibold text-primary">Fee: </span>
                    {mainWorkshop.fee}
                  </div>
                </div>

                <button onClick={() => window.location.href = '/login'} className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Register Now
            </button>
              </div>
            </div>
          </div>
        </div>

        {/* Online Workshops */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Online Workshops
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {onlineWorkshops.map((workshop, index) => (
              <div
                key={workshop.id}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="p-6 sm:p-8">
                  <div className="mb-4">
                    <div className="inline-block bg-accent/20 border border-accent/40 px-3 py-1 rounded-full mb-4 group-hover:bg-accent/30 transition-colors">
                      <span className="text-accent text-xs font-semibold uppercase">🌐 Online</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold mb-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary group-hover:from-primary group-hover:to-foreground transition-all">
                        {workshop.title}
                      </span>
                    </h4>
                    <p className="text-primary text-sm font-semibold mb-3">
                      {workshop.subtitle}
                    </p>
                  </div>

                  <p className="text-foreground/80 text-sm sm:text-base mb-6 leading-relaxed">
                    {workshop.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {workshop.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-medium hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-foreground/70 mb-6 pb-6 border-b border-border">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {workshop.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      {workshop.platform}
                    </span>
                  </div>

                  <div className="text-center bg-accent/10 border border-accent/30 rounded-lg p-3 mb-4">
                    <div className="text-foreground text-sm">
                      <span className="font-semibold text-accent">Included in PASS 4: </span>
                      ₹118 (All Online Workshops)
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base hover:scale-105">
                    Details Coming Soon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workshop Benefits */}
        <div className="mt-16 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 sm:p-10 text-center shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Why Attend Our Workshops?
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-foreground/70 text-sm">Workshop Participants</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">Expert</div>
              <div className="text-foreground/70 text-sm">Industry Trainers</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">Hands-On</div>
              <div className="text-foreground/70 text-sm">Practical Learning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshops;
