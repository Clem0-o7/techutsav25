"use client";

import "@/styles/button.css";

const Workshops = () => {
  const mainWorkshop = {
    title: "Future-Proofing IT Careers in the Era of AI",
    subtitle: "Skills, Systems & Strategy for an AI-Driven World",
    description:
      "This session explores how AI is transforming modern IT roles, enterprise workflows, and career paths. Attendees will gain clarity on industry expectations, emerging skill sets, and how to stay relevant as AI becomes deeply embedded in engineering and business systems.",
    speaker: "Ramanathan R",
    designation: "Principal Process Engineer",
    organization: "Kapitus",
    date: "27th February 2026",
    time: "9:30 AM – 12:30 PM",
    location: "TCE Auditorium",
    fee: "₹354 (PASS 1 Workshop + 15 Events Access)",
  };

  const onlineWorkshops = [
    {
      id: 1,
      title: "Drag. Drop. Deploy",
      subtitle: "Low Code / No Code",
      description:
        "Master the art of building applications without writing extensive code. Learn popular no-code platforms and tools to create functional applications rapidly.",
      duration: "2 hours",
      platform: "Online",
      tags: ["No-Code", "Rapid Development", "Beginner Friendly"],
      speaker: "Suthalakshmi",
      designation: "Senior Data Scientist",
      organization: "Tiger Analytics",
    },
    {
      id: 2,
      title: "Quick Build",
      subtitle: "From Zero to Live",
      description:
        "Learn the complete process of building and deploying a production-ready web application from scratch. Cover modern development tools, CI/CD, and deployment strategies.",
      duration: "2 hours",
      platform: "Online",
      tags: ["Web Development", "Deployment", "DevOps"],
      speaker: "Subash A",
      designation: "Software Engineer",
      organization: "Cyberhaven, USA",
    },
  ];

  return (
    <section
      id="workshop"
      className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              WORKSHOPS
            </span>
          </h2>
          <div className="h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>

        {/* Main Workshop */}
        <div className="mb-20">
          <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-2xl shadow-2xl">
            <div className="p-8 sm:p-12 lg:p-16 text-center">
              <div className="inline-block bg-primary/20 border border-primary/40 px-4 py-2 rounded-full mb-6">
                <span className="text-primary text-sm font-semibold">
                  FEATURED OFFLINE WORKSHOP
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                  {mainWorkshop.title}
                </span>
              </h3>

              <p className="text-primary text-lg sm:text-xl font-semibold mb-6">
                {mainWorkshop.subtitle}
              </p>

              <p className="text-foreground/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                {mainWorkshop.description}
              </p>

              <div className="bg-card border border-primary/20 rounded-xl p-6 mb-10 max-w-xl mx-auto">
                <div className="text-lg font-semibold text-primary">
                  {mainWorkshop.speaker}
                </div>
                <div className="text-foreground text-sm">
                  {mainWorkshop.designation}
                </div>
                <div className="text-foreground/70 text-sm">
                  {mainWorkshop.organization}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                <div className="bg-card border border-primary/20 rounded-lg p-4">
                  <div className="text-primary text-sm font-semibold mb-1">
                    📅 Date
                  </div>
                  <div className="text-sm">{mainWorkshop.date}</div>
                </div>
                <div className="bg-card border border-primary/20 rounded-lg p-4">
                  <div className="text-primary text-sm font-semibold mb-1">
                    🕐 Time
                  </div>
                  <div className="text-sm">{mainWorkshop.time}</div>
                </div>
                <div className="bg-card border border-primary/20 rounded-lg p-4">
                  <div className="text-primary text-sm font-semibold mb-1">
                    📍 Location
                  </div>
                  <div className="text-sm">{mainWorkshop.location}</div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 inline-block">
                <span className="font-semibold text-primary">Fee: </span>
                {mainWorkshop.fee}
              </div>
            </div>
          </div>
        </div>

        {/* Online Workshops */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Online Workshops · 28th February
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {onlineWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="inline-block bg-accent/20 border border-accent/40 px-3 py-1 rounded-full mb-4">
                    <span className="text-accent text-xs font-semibold uppercase">
                      Online Workshop
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold mb-1">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary">
                      {workshop.title}
                    </span>
                  </h4>

                  <p className="text-primary font-semibold mb-4">
                    {workshop.subtitle}
                  </p>

                  <p className="text-foreground/80 text-sm mb-6 leading-relaxed">
                    {workshop.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {workshop.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-medium hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm mb-4">
                    <div className="font-semibold text-primary">
                      {workshop.speaker}
                    </div>
                    <div>{workshop.designation}</div>
                    <div className="text-foreground/70">
                      {workshop.organization}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-foreground/70 border-t border-border pt-4">
                    <span>{workshop.duration}</span>
                    <span>{workshop.platform}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshops;