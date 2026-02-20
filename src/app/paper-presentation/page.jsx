"use client";

import { motion } from "framer-motion";
import { FileText, Calendar, Award, CheckCircle, AlertCircle, Users, Clock, BookOpen, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaperPresentationPage() {
  const topics = [
    "Artificial Intelligence & Machine Learning",
    "Internet of Things (IoT)",
    "Blockchain & Cryptocurrency",
    "Cybersecurity",
    "Cloud Computing",
    "Data Science & Big Data",
    "Software Engineering",
    "Web & Mobile Development",
    "Computer Networks",
    "Emerging Technologies"
  ];

  const guidelines = [
    {
      title: "Paper Format",
      points: [
        "Must be original and unpublished work",
        "4-6 pages in IEEE format",
        "Abstract: 150-250 words",
        "Include keywords and references"
      ]
    },
    {
      title: "Presentation",
      points: [
        "20 minutes presentation time",
        "10 minutes Q&A session",
        "Use clear and concise slides",
        "Professional attire recommended"
      ]
    },
    {
      title: "Evaluation Criteria",
      points: [
        "Innovation and originality (30%)",
        "Technical depth (25%)",
        "Presentation quality (25%)",
        "Practical applicability (20%)"
      ]
    }
  ];

  const importantDates = [
    { event: "Abstract Submission Opens", date: "February 1, 2026" },
    { event: "Abstract Submission Deadline", date: "February 20, 2026" },
    { event: "Acceptance Notification", date: "February 22, 2026" },
    { event: "Full Paper Submission", date: "February 24, 2026" },
    { event: "Event Date", date: "February 27, 2026" }
  ];

  const prizes = [
    { place: "1st Prize", amount: "₹15,000", color: "from-yellow-500 to-orange-500" },
    { place: "2nd Prize", amount: "₹10,000", color: "from-gray-400 to-gray-500" },
    { place: "3rd Prize", amount: "₹5,000", color: "from-amber-600 to-amber-700" },
    { place: "Best Paper", amount: "₹5,000", color: "from-primary to-accent" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 px-4 sm:px-6 lg:px-8">
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

            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 px-4 py-2 rounded-full mb-6">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-primary text-sm font-semibold">ONLINE EVENT</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                Paper Presentation
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-primary font-semibold mb-4">
              Share Your Research. Inspire Innovation.
            </p>
            
            <p className="text-foreground/70 max-w-3xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
              Present your groundbreaking research and technical findings to a panel of expert judges. 
              Showcase your academic excellence and contribute to the knowledge pool with cutting-edge ideas and solutions.
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
                <div className="text-2xl font-bold text-primary">₹35,000</div>
                <div className="text-sm text-foreground/70">Prize Pool</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">Pan-India</div>
                <div className="text-sm text-foreground/70">Participation</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">ISBN</div>
                <div className="text-sm text-foreground/70">Publication</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">Expert</div>
                <div className="text-sm text-foreground/70">Panel</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topics Section */}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                  Topics & Domains
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Choose from a wide range of technical domains for your research paper
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:border-primary/40 hover:shadow-lg transition-all group"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground/80 font-medium">{topic}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section id="guidelines" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                  Submission Guidelines
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Follow these guidelines to ensure your paper meets all requirements
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
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary/40 transition-all"
                >
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {guideline.title}
                  </h3>
                  <ul className="space-y-3">
                    {guideline.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-foreground/70 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Important Note */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-accent mb-2">Important Note</h4>
                <p className="text-foreground/70 text-sm">
                  All papers must be submitted in IEEE format. Papers not adhering to the format will be rejected. 
                  Selected papers will be published in ISBN proceedings. Plagiarism check will be conducted for all submissions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
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
                  className="flex items-center justify-between bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:border-primary/40 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-foreground">{item.event}</span>
                  </div>
                  <span className="text-primary font-semibold">{item.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prizes Section */}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                  Prizes & Recognition
                </span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Compete for exciting prizes and recognition
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
                  <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-xl p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="mb-4">
                      <Award className="w-12 h-12 mx-auto text-primary group-hover:scale-110 transition-transform" />
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
              <p className="text-foreground/60 text-sm">
                Plus certificates for all participants and publication opportunities in ISBN proceedings
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Participate */}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                  Why Participate?
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Target, title: "Showcase Research", desc: "Present your work to experts" },
                { icon: Users, title: "Network", desc: "Connect with researchers" },
                { icon: TrendingUp, title: "Career Growth", desc: "Boost your academic profile" },
                { icon: BookOpen, title: "Publication", desc: "Get ISBN published" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/40 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                Ready to Present Your Research?
              </span>
            </h2>
            <p className="text-foreground/70 mb-8 text-lg">
              Join hundreds of researchers from across the nation. Register now and showcase your innovation!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/profile">
                <Button className="px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Register for Paper Presentation
                </Button>
              </Link>
              <Link href="/#online-events">
                <Button variant="outline" className="px-10 py-6 text-lg font-bold">
                  View All Events
                </Button>
              </Link>
            </div>
            <p className="text-foreground/60 text-sm mt-6">
              <span className="text-primary font-semibold">Included in PASS 2:</span> Online Paper Presentation (₹118)
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
