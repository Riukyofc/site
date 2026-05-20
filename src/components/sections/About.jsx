import React from 'react';
import { Target, Layers, Cpu } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';

export const About = () => {
  return (
    <section id="sobre" className="py-20 sm:py-32 relative z-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none bg-gradient-to-bl from-[#00BFFF]/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeader
          badge="Nossa Essência"
          badgeColor="pink"
          title="A intersecção perfeita entre"
          highlight="arte e código."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Large card spanning 2 cols */}
          <FadeIn direction="right" className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-6 sm:p-8 h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] opacity-40 group-hover:opacity-100 transition-opacity" />
              <p className="text-base sm:text-lg text-white/70 font-medium leading-relaxed mb-6">
                O RKY Studio nasceu de uma insatisfação com a mediocridade digital. Nós não construímos apenas sites; nós projetamos <strong className="text-white">ativos digitais de alto impacto</strong>.
              </p>
              <p className="text-base sm:text-lg text-white/70 font-medium leading-relaxed mb-8">
                Combinamos design de elite centrado no usuário com engenharia de software de ponta para criar interfaces que convertem, engajam e dominam.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-[#00BFFF] pl-4">
                  <h4 className="text-2xl font-black text-white">100%</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mt-1">In-House</p>
                </div>
                <div className="border-l-2 border-[#8B5CF6] pl-4">
                  <h4 className="text-2xl font-black text-white">Elite</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mt-1">Padrão de Qualidade</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right column - stacked cards */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {[
              { Icon: Target, color: '#FF1493', title: 'Foco em Conversão', desc: 'Design estratégico para maximizar resultados.' },
              { Icon: Layers, color: '#00BFFF', title: 'UI/UX Premium', desc: 'Micro-interações e atenção a cada pixel.' },
              { Icon: Cpu, color: '#8B5CF6', title: 'Engenharia Limpa', desc: 'Código escalável e otimização extrema.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={150 + i * 150} direction="up">
                <div className="glass-card hover-lift p-5 sm:p-6 rounded-2xl group">
                  <div className="animate-float-slow" style={{ animationDelay: `${i}s` }}>
                    <item.Icon size={28} className="mb-3" style={{ color: item.color, filter: `drop-shadow(0 0 8px ${item.color})` }} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-white/50 font-medium">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
