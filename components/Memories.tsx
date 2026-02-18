'use client';

import Image from 'next/image';
import memoryData from '../data/sections.json';

export default function Memories() {
  const { title, description, gallery } = memoryData.memories;

  return (
    <section
      id="memories"
      data-section="memories"
      className="gradient-blue-red section-wrapper"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 neon-glow">
            {title}
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-4">
            {description}
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {gallery.map((item, index) => (
            <div
              key={item.id}
              className="group relative h-64 sm:h-72 rounded-lg overflow-hidden neon-border cursor-pointer fade-in-up hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex flex-col justify-end p-6 group-hover:from-background">
                <h3 className="text-lg sm:text-xl font-bold text-accent group-hover:text-white transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-accent/50 hover:border-accent text-accent hover:bg-accent/10 font-bold rounded-lg transition-all duration-300">
            Load More Memories
          </button>
        </div>
      </div>
    </section>
  );
}
