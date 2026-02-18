"use client";

import { useState, useEffect, useRef } from "react";
import Question from "@/components/Question";
import Particles from "@/components/Particles";
import "@/styles/button.css";

const faqSections = [
  {
    title: "General Info",
    faqs: [
      {
        question: "What is TechUtsav PARADIGM 2026?",
        answer:
          "TechUtsav PARADIGM 2026 is a technical symposium organized by Thiagarajar College of Engineering on 27th February 2026. It's organized by the Departments of CSE, IT, CSBS, AMCS, and MCA, featuring workshops, technical events, and non-technical events with a total prize pool of ₹35,000.",
      },
      {
        question: "Who can participate?",
        answer:
          "Students from all backgrounds are welcome to participate and showcase their skills. Whether you're interested in technical competitions, workshops, or fun events, there's something for everyone.",
      },
      {
        question: "What is the theme for PARADIGM 2026?",
        answer:
          "The event features a Stranger Things inspired theme with events like 'Think Like Eleven', 'Hawkins Hack', 'Upside Down Markets', and more, combining technology with pop culture.",
      },
    ],
  },
  {
    title: "Registration & Passes",
    faqs: [
      {
        question: "What are the different registration passes available?",
        answer:
          "There are 4 passes: PASS 1 (₹354) - Offline Workshop + All Events access; PASS 2 (₹118) - Online Paper Presentation; PASS 3 (₹118) - Online Idea Pitching; PASS 4 (₹118) - All Online Workshops. All prices include 18% GST.",
      },
      {
        question: "How should I pay the registration fee?",
        answer:
          "After registering on our portal, upload your payment screenshot along with the transaction number. Our team will verify the payment and update your profile accordingly.",
      },
      {
        question: "Should I register as a team or individually?",
        answer:
          "Individual registration is required for most passes. PASS 3 (Idea Pitching) is registered per team. You can collaborate with others during team events once registered.",
      },
      {
        question: "Can I purchase multiple passes?",
        answer:
          "Yes! You can purchase any combination of passes. For example, buy PASS 1 for offline workshop and events, plus PASS 4 for online workshops access.",
      },
    ],
  },
  {
    title: "Events & Workshops",
    faqs: [
      {
        question: "What workshops are available?",
        answer:
          "Offline Workshop: 'Multi Agent Mastery - Orchestration for the Future' (PASS 1). Online Workshops: 'Drag. Drop. Deploy - Low Code/No Code' and 'Quick Build - From Zero to Live' (PASS 4).",
      },
      {
        question: "What technical events are there?",
        answer:
          "Online: Paper Presentation and Ideathon. Offline: Code Red: Escape The Mind, Core Logic Arena, Think Like Eleven, Model Matters, Mindflayer.io, Hawkins Hack, Upside Down Markets, Stranger Thinks, Fix & Play (Debugging), and Battle of Brains (Tech Puzzle).",
      },
      {
        question: "Are there non-technical events?",
        answer:
          "Yes! Enjoy VirtuAct, Hawkin's Lab, Survive the Deck, Dungeons and Dragons, and Fun Flicks. These events are included with PASS 1.",
      },
      {
        question: "What do I get with Paper Presentation (PASS 2)?",
        answer:
          "Access to online paper presentation, prize pool participation, Best Paper Award eligibility, and your paper will be published with an ISBN Number.",
      },
      {
        question: "What benefits does PASS 1 include?",
        answer:
          "PASS 1 (₹354) includes the offline physical workshop, access to ALL events (technical and non-technical), prize pool eligibility, registration kit, and food during the event.",
      },
    ],
  },
  {
    title: "Certificates & Prizes",
    faqs: [
      {
        question: "Will I receive a certificate?",
        answer:
          "Yes! All participants receive certificates. PASS 4 holders get online certification for workshop completion. Event winners receive special recognition certificates.",
      },
      {
        question: "What is the total prize pool?",
        answer:
          "The total prize pool is ₹35,000 distributed across various events. ",
      },
      {
        question: "How are prizes distributed?",
        answer:
          "Each pass has its own prize pool. PASS 1 - Shared prize pool for all events; PASS 2 - Shared pool + Best Paper Award; PASS 3 - Shared pool + Best Idea and Creative Idea awards.",
      },
    ],
  },
  {
    title: "Logistics",
    faqs: [
      {
        question: "Will accommodation be provided?",
        answer:
          "Accommodation is not provided. However, we're happy to assist with directions from major railway stations and bus stops to Thiagarajar College of Engineering.",
      },
      {
        question: "Will meals be provided?",
        answer:
          "Yes, meals are included with PASS 1. Vegetarian meals will be provided during the event for all registered PASS 1 participants.",
      },
      {
        question: "Where is the venue?",
        answer:
          "Thiagarajar College of Engineering (A Govt. Aided Autonomous Institution Affiliated to Anna University), Madurai. Specific venue details will be shared after registration.",
      },
      {
        question: "Can I register on the spot?",
        answer:
          "While on-spot registrations may be accommodated based on availability, we highly recommend registering in advance through our portal to secure your pass and receive event details early.",
      },
    ],
  },
];

const Faq = () => {
  const [openSection, setOpenSection] = useState(0);
  const [openQuestion, setOpenQuestion] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("overflow-x-hidden");
    return () => document.body.classList.remove("overflow-x-hidden");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);

  const toggleQuestion = (sectionIndex, questionIndex) => {
    setOpenQuestion((prevState) => ({
      ...prevState,
      [sectionIndex]:
        prevState[sectionIndex] === questionIndex ? null : questionIndex,
    }));
  };

  return (
    <section id="faq" className="h-screen flex items-center justify-center bg-background">
      <div
        className="relative h-full bg-card flex items-center justify-center overflow-auto w-full px-3 py-4 sm:px-6 sm:py-8 lg:py-10"
        ref={faqRef}
      >
        

        {/* FAQ Content */}
        <div
          className={`relative z-10 transition-all duration-1000 ease-in-out w-full max-w-4xl px-3 sm:px-6 lg:px-8 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              FAQs
            </span>
          </h1>
          <div className="h-1 w-24 sm:w-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"></div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2 justify-center mt-3 sm:mt-5">
            {faqSections.map((section, index) => (
              <button
                key={index}
                onClick={() => setOpenSection(index)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-500 shadow-md hover:shadow-lg ${
                  openSection === index 
                    ? "bg-primary scale-105 shadow-lg" 
                    : "bg-primary/70 hover:bg-primary/90"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Questions Section */}
          {openSection !== null && (
            <div className="mt-4 sm:mt-5 bg-card border border-border p-3 sm:p-5 rounded-xl shadow-xl w-full max-w-2xl mx-auto">
              {faqSections[openSection].faqs.map((faq, idx) => (
                <Question
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openQuestion[openSection] === idx}
                  onClick={() => toggleQuestion(openSection, idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faq;
