import React from 'react';
import { FadeIn } from '../layout/FadeIn';

export const LogoMarquee = () => {
  const techs = [
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    "Node.js", "Firebase", "UI/UX Elite", "Vite",
    "SEO Avançado", "Framer Motion"
  ];
  const duplicated = [...techs, ...techs];

  return (
    <section className="py-10 sm:py-14 relative overflow-hidden border-y border-white/5 bg-[#030305]">
      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#030305] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#030305] to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-5 text-center">
        <FadeIn direction="scale">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-white/30">
            Stack Tecnológico de Alta Performance
          </p>
        </FadeIn>
      </div>

      <div className="flex overflow-hidden select-none">
        <div className="flex shrink-0 animate-marquee items-center gap-6 sm:gap-10 pr-6 sm:pr-10">
          {duplicated.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:border-[#00BFFF]/40 hover:bg-white/[0.04] group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493] group-hover:bg-[#00BFFF] transition-colors shadow-[0_0_6px_#FF1493] group-hover:shadow-[0_0_6px_#00BFFF]" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-white/60 group-hover:text-white/90 transition-colors whitespace-nowrap">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
