import React from 'react';
import { FadeIn } from '../layout/FadeIn';

export const TechStack = () => {
  const techs = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", 
    "Node.js", "Framer Motion", "UI/UX Elite", "Vite", "SEO Avançado"
  ];

  // Duplicando a lista para criar o efeito de loop perfeito no marquee
  const duplicatedTechs = [...techs, ...techs];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden bg-[#09090B] border-y border-white/5">
      {/* Sombras laterais para criar o efeito de surgimento/desaparecimento suave (fade edges) */}
      <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-[#09090B] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-[#09090B] to-transparent z-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-6 text-center">
        <FadeIn direction="scale">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white/40">
            Stack Tecnológico de Alta Performance
          </p>
        </FadeIn>
      </div>

      <div className="flex overflow-hidden select-none">
        <div className="flex shrink-0 animate-marquee items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
          {duplicatedTechs.map((tech, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-sm transition-colors hover:border-[#00BFFF]/50 hover:bg-white/[0.05] group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493] group-hover:bg-[#00BFFF] transition-colors shadow-[0_0_6px_#FF1493] group-hover:shadow-[0_0_6px_#00BFFF]"></span>
              <span className="text-xs sm:text-sm font-black tracking-wider text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
