import React from 'react';
import { Search, Palette, Code2, Rocket } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';

export const Process = () => {
  const steps = [
    { Icon: Search, title: 'Descoberta', desc: 'Entendemos profundamente o seu negócio, público-alvo e objetivos estratégicos.', num: '01' },
    { Icon: Palette, title: 'Design', desc: 'Criamos protótipos interativos com foco em UX e estética de elite.', num: '02' },
    { Icon: Code2, title: 'Desenvolvimento', desc: 'Codificamos com as melhores tecnologias, garantindo performance e escalabilidade.', num: '03' },
    { Icon: Rocket, title: 'Lançamento', desc: 'Deploy otimizado, testes finais e suporte contínuo pós-lançamento.', num: '04' },
  ];

  return (
    <section className="py-20 sm:py-32 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeader
          badge="Processo"
          badgeColor="orange"
          title="Como transformamos"
          highlight="ideias em realidade."
        />

        {/* Desktop: Grid with connection line */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 relative">
          <div className="absolute top-1/2 left-[12%] right-[12%] h-px bg-gradient-to-r from-[#00BFFF]/20 via-[#8B5CF6]/20 to-[#FF1493]/20" />

          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 150} direction="up">
              <div className="glass-card hover-lift p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center relative group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#030305] border border-white/10 rounded-full">
                  <span className="text-[10px] font-black text-[#00BFFF] tracking-[0.15em]">{step.num}</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                  <step.Icon size={24} className="text-white/80 group-hover:text-[#00BFFF] transition-colors" />
                </div>
                <h4 className="text-lg font-black text-white mb-2">{step.title}</h4>
                <p className="text-xs sm:text-sm text-white/40 font-medium leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mobile/Tablet: Vertical timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 150} direction="up">
              <div className="flex gap-4 sm:gap-6 relative">
                {/* Vertical line connector */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[23px] top-[60px] bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
                )}
                {/* Step number circle */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#00BFFF]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center">
                  <span className="text-xs font-black text-[#00BFFF]">{step.num}</span>
                </div>
                {/* Content */}
                <div className="glass-card p-5 rounded-2xl flex-1 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <step.Icon size={20} className="text-[#00BFFF]" />
                    <h4 className="text-base font-black text-white">{step.title}</h4>
                  </div>
                  <p className="text-xs text-white/40 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
