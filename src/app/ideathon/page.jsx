"use client";

import { motion } from "framer-motion";
import { Lightbulb, Calendar, Award, CheckCircle, AlertCircle, Users, Clock, Rocket, Target, TrendingUp, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IdeathonPage() {
  const problemStatements = [
    {
      title: "Silent Mental Health Crisis in Students",
      sdg: "SDG 3 – Good Health & Well-being",
      description: "A large number of students experience stress, anxiety, loneliness, and burnout, but avoid professional help due to stigma, fear of being judged, or lack of awareness. Most educational institutions only identify the problem after academic performance drops or serious incidents occur."
    },
    {
      title: "Waste That Travels",
      sdg: "SDG 12 – Responsible Consumption & Production",
      description: "Citizens segregate waste at home, but during collection and transportation, different types of waste are mixed again. This destroys public trust and discourages participation in sustainable waste practices."
    },
    {
      title: "Digital Benefits, Analog People",
      sdg: "SDG 10 – Reduced Inequalities",
      description: "Many essential services are digital, but elderly and low-literacy citizens cannot access them due to complex interfaces, language barriers, and lack of digital skills."
    },
    {
      title: "Pre-Crisis Infrastructure Intelligence System",
      sdg: "SDGs 3, 9, 11, 13, 16",
      description: "Global systems such as health, food, energy, climate, and finance operate in isolation and respond only after visible failure. There is no unified early-warning system capable of detecting cascading risks across sectors before they escalate into large-scale crises.",
      theme: "Global Systems Resilience & Governance"
    },
    {
      title: "Global Climate Migration Governance Protocol",
      sdg: "SDGs 1, 10, 13, 16, 17",
      description: "Climate change is expected to displace over 200 million people by 2050, yet current international law does not formally recognize climate migrants. There is no structured global framework to manage identity, employment, housing, and rights for displaced populations.",
      theme: "Climate Migration & Global Governance"
    },
    {
      title: "Space Debris Accountability Protocol",
      sdg: "SDGs 9, 12, 17",
      description: "Low Earth Orbit is increasingly congested with satellites and space debris. Existing international regulations lack enforceable accountability, clear liability mechanisms, and incentives for debris removal.",
      theme: "Planetary Technology Governance"
    }
  ];

  const guidelines = [
    {
      title: "Idea Submission Format",
      points: [
        "Format: PPT (PowerPoint Presentation)",
        "Must include: Problem Statement, Proposed Solution, Tech-stack, Innovation/Uniqueness, Feasibility & Impact",
        "Only one idea per team/individual",
        "Plagiarism will result in immediate disqualification"
      ]
    },
    {
      title: "Team & Registration",
      points: [
        "Individual or Team of 2 members",
        "Registration Fee: ₹118 per team (inclusive of GST)",
        "Open to all UG and PG students",
        "Accurate participant details required; incomplete registrations will be rejected"
      ]
    },
    {
      title: "Evaluation Criteria",
      points: [
        "Innovation & Creativity",
        "Problem Relevance",
        "Feasibility & Practicality",
        "Impact & Usefulness",
        "Presentation Quality"
      ]
    }
  ];

  const importantDates = [
    { event: "Idea Submission Opens", date: "February 1, 2026" },
    { event: "Round 1: Idea Submission Deadline", date: "February 27, 2026" },
    { event: "Shortlist Notification", date: "February 27, 2026" },
    { event: "Round 2: Online Idea Presentation", date: "February 28, 2026" }
  ];

  const benefits = [
    { title: "E-Certificates", description: "Provided to all eligible participants", icon: Award },
    { title: "Cash Prizes", description: "Cash prizes and certificates for winners", icon: Target },
    { title: "Online Mode", description: "Participate from anywhere with stable internet", icon: Users },
    { title: "Recognition", description: "Certificate of merit for top performers", icon: TrendingUp }
  ];

  const pitchComponents = [
    {
      title: "Problem Statement",
      description: "Clearly identify and explain the problem you're addressing",
      icon: Target
    },
    {
      title: "Proposed Solution",
      description: "Present your innovative approach to solve the problem",
      icon: Lightbulb
    },
    {
      title: "Tech-stack",
      description: "Detail the technologies and tools you'll use",
      icon: Brain
    },
    {
      title: "Innovation / Uniqueness",
      description: "Highlight what makes your solution stand out",
      icon: Zap
    },
    {
      title: "Feasibility & Impact",
      description: "Demonstrate practicality and potential real-world impact",
      icon: Rocket
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-background to-primary/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* TCE Banner */}
            <div className="mb-6 p-2 px-6 rounded-full backdrop-blur-sm shadow-lg animate-pulse-subtle bg-primary/20 border border-primary/40 inline-block">
              <p className="text-xs sm:text-sm lg:text-base tracking-widest font-semibold text-primary">
                THIAGARAJAR COLLEGE OF ENGINEERING PRESENTS
              </p>
            </div>

            <div className="mb-6">
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-wider">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  PARADIGM '26
                </span>
              </h1>
            </div>

            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 px-4 py-2 rounded-full mb-6">
              <Lightbulb className="w-5 h-5 text-accent" />
              <span className="text-accent text-sm font-semibold">ONLINE EVENT</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-foreground">
                Ideathon
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-accent font-semibold mb-4">
              Idea Pitching Event
            </p>
            
            <p className="text-foreground/70 max-w-3xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
              Ideathon aims to encourage innovative and practical ideas that address real-world problems using 
              emerging technologies and interdisciplinary approaches. Pitch your solutions to tackle critical challenges 
              aligned with the UN Sustainable Development Goals.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link href="/profile">
                <Button className="px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Register Now
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="px-8 py-6 text-lg font-bold"
                onClick={() => window.scrollTo({ top: document.getElementById('guidelines')?.offsetTop, behavior: 'smooth' })}
              >
                View Guidelines
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">₹118</div>
                <div className="text-sm text-foreground/70">Per Team</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">1-2</div>
                <div className="text-sm text-foreground/70">Team Size</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">6</div>
                <div className="text-sm text-foreground/70">Problem Statements</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">Online</div>
                <div className="text-sm text-foreground/70">Event Mode</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-foreground">
                  Problem Statements
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Choose one of these real-world challenges aligned with UN Sustainable Development Goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {problemStatements.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-accent/40 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{problem.title}</h3>
                      <p className="text-sm text-primary font-semibold mb-2">{problem.sdg}</p>
                      {problem.theme && (
                        <p className="text-xs text-accent font-medium mb-2">Theme: {problem.theme}</p>
                      )}
                      <p className="text-foreground/70 text-sm leading-relaxed">{problem.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PPT Submission Requirements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-foreground">
                  PPT Submission Requirements
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Your presentation must include these essential components
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pitchComponents.map((component, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-xl hover:border-accent/40 transition-all text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <component.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {component.title}
                  </h3>
                  <p className="text-foreground/70 text-sm">
                    {component.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section id="guidelines" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-foreground">
                  Submission Guidelines
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Follow these guidelines to create a winning pitch
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {guidelines.map((guideline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-xl hover:border-accent/40 transition-all"
                >
                  <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    {guideline.title}
                  </h3>
                  <ul className="space-y-3">
                    {guideline.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-foreground/70 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Important Note */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-primary mb-2">Important Note</h4>
                <p className="text-foreground/70 text-sm">
                  Teams must provide accurate participant details; incomplete registrations will be rejected. 
                  Participants can register individually or as a team of two. Ideas must be original and plagiarism will 
                  result in immediate disqualification.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-foreground">
                  Important Dates
                </span>
              </h2>
              <p className="text-foreground/70">
                Mark your calendar with these important deadlines
              </p>
            </div>

            <div className="space-y-4">
              {importantDates.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:border-accent/40 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-foreground">{item.event}</span>
                  </div>
                  <span className="text-accent font-semibold">{item.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates & Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-foreground">
                  Certificates & Recognition
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Get recognized for your innovative ideas and solutions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="bg-card/50 backdrop-blur-sm border-2 border-accent/30 rounded-xl p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                      <div className="mb-4">
                        <IconComponent className="w-12 h-12 mx-auto text-accent group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-foreground/70 text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 text-center space-y-3">
              <p className="text-foreground/80 font-medium">
                Registration Fee: ₹118 per team (inclusive of GST)
              </p>
              <p className="text-foreground/60 text-sm">
                * Non-refundable • Open to all UG and PG students
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-foreground">
                  Why Participate?
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Target, title: "Validate Ideas", desc: "Get expert feedback on your concept" },
                { icon: Users, title: "Network", desc: "Connect with entrepreneurs & investors" },
                { icon: TrendingUp, title: "Launch Opportunity", desc: "Turn your idea into reality" },
                { icon: Brain, title: "Mentorship", desc: "Learn from industry experts" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-accent/40 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-foreground/70 text-sm">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/10 via-background to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-foreground">
                Ready to Pitch Your Big Idea?
              </span>
            </h2>
            <p className="text-foreground/70 mb-8 text-lg">
              Join innovative minds from across the nation. Register now and transform your vision into reality!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/profile">
                <Button className="px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Register for Ideathon
                </Button>
              </Link>
              <Link href="/#online-events">
                <Button variant="outline" className="px-10 py-6 text-lg font-bold">
                  View All Events
                </Button>
              </Link>
            </div>
            <p className="text-foreground/60 text-sm mt-6">
              <span className="text-accent font-semibold">Included in PASS 3:</span> Online Idea Pitching (₹118)
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
