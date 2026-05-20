import React from 'react';
import { FadeIn } from '../layout/FadeIn';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export const Stats = () => {
  const stats = [
    { end: 50, prefix: "+", label: "Projetos Entregues", desc: "Impacto digital global", color: 'text-[#00BFFF]', glow: 'group-hover:shadow-[0_0_30px_rgba(0,191,255,0.15)]' },
    { end: 99, suffix: "%", label: "Satisfação", desc: "Parcerias duradouras", color: 'text-[#FF1493]', glow: 'group-hover:shadow-[0_0_30px_rgba(255,20,147,0.15)]' },
    { end: 100, suffix: "%", label: "Otimização", desc: "Performance máxima", color: 'text-[#8B5CF6]', glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]' },
    { isText: true, value: "Pixel", label: "Perfect UI/UX", desc: "Precisão milimétrica", color: 'text-gradient-accent', glow: 'group-hover:shadow-[0_0_30px_rgba(255,140,0,0.15)]' },
  ];

  return (
    <section className="py-12 sm:py-16 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 100} direction="up" className="h-full">
              <div className={`group relative h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 ${stat.glow} overflow-hidden`}>
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-2 ${stat.color} inline-block`}>
                  {stat.isText ? stat.value : (
                    <AnimatedCounter end={stat.end} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                  )}
                </span>
                <h5 className="text-sm sm:text-base font-bold text-white mb-1">{stat.label}</h5>
                <p className="text-xs text-white/40 font-medium">{stat.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
