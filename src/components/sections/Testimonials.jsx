import React, { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';

export const Testimonials = () => {
  const testimonials = [
    { quote: "O nível de precisão e capricho visual do RKY Studio é algo fora do comum. Cada pixel reflete cuidado extremo com a experiência do usuário.", author: "Sarah Viana", role: "CEO & Tech Founder", gradient: "from-[#00BFFF] to-[#FF1493]", initials: "SV" },
    { quote: "Código totalmente limpo, otimizado e incrivelmente rápido. A taxa de conversão e a velocidade de carregamento das nossas páginas decolou.", author: "Marcos Aurélio", role: "Diretor de Produto", gradient: "from-[#FF1493] to-[#8B5CF6]", initials: "MA" },
    { quote: "A equipe entendeu perfeitamente a nossa essência e entregou uma interface premium, imersiva e muito acima dos padrões do mercado.", author: "Elena Rostova", role: "Head de Design & Branding", gradient: "from-[#8B5CF6] to-[#00BFFF]", initials: "ER" },
  ];

  return (
    <section className="py-20 sm:py-32 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none bg-gradient-to-b from-[#8B5CF6]/8 to-[#FF1493]/8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeader
          badge="Reconhecimento"
          badgeColor="pink"
          title="O impacto do nosso"
          highlight="código."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((item, index) => (
            <FadeIn key={index} delay={index * 150} direction="up" className="h-full">
              <div className="glass-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl h-full flex flex-col justify-between relative group hover:border-white/15 transition-all duration-500">
                <div className="absolute top-4 right-4 text-white/[0.04] group-hover:text-white/[0.08] transition-colors pointer-events-none">
                  <Quote size={50} className="rotate-12" />
                </div>

                <div>
                  <div className="flex gap-1 mb-5 text-[#FF8C00]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                  </div>
                  <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.gradient} flex items-center justify-center font-black text-xs text-white border border-white/20`}>
                    {item.initials}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{item.author}</h5>
                    <p className="text-[10px] font-medium text-white/40">{item.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
