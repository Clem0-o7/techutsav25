"use client";

import { motion } from "framer-motion";
import { Lightbulb, Calendar, Award, CheckCircle, AlertCircle, Users, Clock, Rocket, Target, TrendingUp, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IdeathonPage() {
  const categories = [
    "Healthcare & Medical Innovation",
    "Sustainable Technology & Green Solutions",
    "FinTech & Digital Banking",
    "EdTech & Online Learning",
    "Smart Cities & Urban Planning",
    "AgriTech & Food Security",
    "Social Impact & Community Development",
    "E-commerce & Retail Innovation",
    "Entertainment & Media Tech",
    "Emerging Technologies & Futuristic Concepts"
  ];

  const guidelines = [
    {
      title: "Idea Submission",
      points: [
        "Original and innovative concept",
        "Clear problem statement",
        "Practical and scalable solution",
        "Market potential analysis"
      ]
    },
    {
      title: "Pitch Presentation",
      points: [
        "15 minutes pitch duration",
        "10 minutes Q&A session",
        "Professional pitch deck required",
        "Demonstrate feasibility and impact"
      ]
    },
    {
      title: "Evaluation Criteria",
      points: [
        "Innovation & Uniqueness (30%)",
        "Market viability (25%)",
        "Implementation plan (25%)",
        "Social/Business impact (20%)"
      ]
    }
  ];

  const importantDates = [
    { event: "Idea Submission Opens", date: "February 1, 2026" },
    { event: "Idea Submission Deadline", date: "February 20, 2026" },
    { event: "Shortlist Notification", date: "February 22, 2026" },
    { event: "Pitch Deck Submission", date: "February 24, 2026" },
    { event: "Final Pitch Event", date: "February 27, 2026" }
  ];

  const prizes = [
    { place: "Winner", amount: "₹15,000", color: "from-yellow-500 to-orange-500" },
    { place: "1st Runner-Up", amount: "₹10,000", color: "from-gray-400 to-gray-500" },
    { place: "2nd Runner-Up", amount: "₹5,000", color: "from-amber-600 to-amber-700" },
    { place: "Most Innovative", amount: "₹5,000", color: "from-primary to-accent" }
  ];

  const pitchComponents = [
    {
      title: "Problem Statement",
      description: "Clearly define the problem you're solving",
      icon: Target
    },
    {
      title: "Solution Overview",
      description: "Present your innovative solution approach",
      icon: Lightbulb
    },
    {
      title: "Market Analysis",
      description: "Demonstrate market need and opportunity",
      icon: TrendingUp
    },
    {
      title: "Implementation Plan",
      description: "Show how you'll bring it to life",
      icon: Rocket
    },
    {
      title: "Business Model",
      description: "Explain revenue generation strategy",
      icon: Brain
    },
    {
      title: "Impact & Scalability",
      description: "Showcase potential reach and growth",
      icon: Zap
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
              Innovate. Pitch. Win.
            </p>
            
            <p className="text-foreground/70 max-w-3xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
              Transform your groundbreaking ideas into reality! Pitch your innovative solutions to real-world problems 
              and compete with creative minds from across the nation. Best idea awards await.
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
                <div className="text-2xl font-bold text-accent">₹35,000</div>
                <div className="text-sm text-foreground/70">Prize Pool</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">Pan-India</div>
                <div className="text-sm text-foreground/70">Participation</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">Mentorship</div>
                <div className="text-sm text-foreground/70">Opportunities</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">Investor</div>
                <div className="text-sm text-foreground/70">Pitch Format</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
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
                  Innovation Categories
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Choose from diverse categories to showcase your innovative solution
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:border-accent/40 hover:shadow-lg transition-all group"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground/80 font-medium">{category}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes a Great Pitch */}
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
                  What Makes a Great Pitch?
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Your pitch should include these essential components
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
                  Ideas must be original and not previously pitched in other competitions. Teams can have 2 members. 
                  Pitch decks should be professional and concise. Focus on problem-solution fit and market validation.
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

      {/* Prizes Section */}
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
                  Prizes & Opportunities
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Win exciting prizes and get access to mentorship opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {prizes.map((prize, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="bg-card/50 backdrop-blur-sm border-2 border-accent/30 rounded-xl p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="mb-4">
                      <Award className="w-12 h-12 mx-auto text-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${prize.color}`}>
                      {prize.amount}
                    </h3>
                    <p className="text-foreground/70 font-medium">{prize.place}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-foreground/60 text-sm mb-4">
                Plus certificates for all participants and mentorship opportunities from industry experts
              </p>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3">
                <Rocket className="w-5 h-5 text-accent" />
                <span className="text-accent font-semibold">Top ideas get startup guidance and potential funding</span>
              </div>
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
