import React from 'react';
import { FadeIn } from '../layout/FadeIn';

export const Stats = () => {
  const stats = [
    {
      value: "+50",
      label: "Projetos Entregues",
      desc: "Com excelência e impacto digital global",
      accent: "text-[#00BFFF]",
      border: "hover:border-[#00BFFF]/40",
      glow: "group-hover:shadow-[0_0_30px_rgba(0,191,255,0.2)]"
    },
    {
      value: "99%",
      label: "Satisfação",
      desc: "Parcerias estratégicas e duradouras",
      accent: "text-[#FF1493]",
      border: "hover:border-[#FF1493]/40",
      glow: "group-hover:shadow-[0_0_30px_rgba(255,20,147,0.2)]"
    },
    {
      value: "100%",
      label: "Otimização Extrema",
      desc: "Performance máxima e SEO impecável",
      accent: "text-[#8B5CF6]",
      border: "hover:border-[#8B5CF6]/40",
      glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
    },
    {
      value: "Pixel",
      label: "Perfect UI/UX",
      desc: "Precisão milimétrica em cada layout",
      accent: "text-gradient-accent",
      border: "hover:border-[#FF8C00]/40",
      glow: "group-hover:shadow-[0_0_30px_rgba(255,140,0,0.2)]"
    }
  ];

  return (
    <section className="py-12 sm:py-16 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 100} direction="up" className="h-full">
              <div className={`group relative h-full rounded-2xl bg-white/[0.02] border border-white/5 p-6 transition-all duration-500 hover:-translate-y-1.5 ${stat.border} ${stat.glow} overflow-hidden`}>
                {/* Subtle top ambient glow */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex flex-col items-start">
                  <span className={`text-4xl sm:text-5xl font-black tracking-tighter mb-2 ${stat.accent} transition-transform duration-500 group-hover:scale-105 origin-left`}>
                    {stat.value}
                  </span>
                  <h5 className="text-base sm:text-lg font-bold text-white mb-1 tracking-tight">
                    {stat.label}
                  </h5>
                  <p className="text-xs sm:text-sm text-white/60 font-medium leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
