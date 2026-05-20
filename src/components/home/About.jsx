import React from 'react';
import { Target, Layers, Cpu } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';

export const About = () => {
  return (
    <section id="sobre" className="py-20 sm:py-32 relative z-10 border-t border-white/5 bg-[#09090B] overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] blur-[120px] rounded-full pointer-events-none bg-gradient-to-bl from-[#00BFFF]/10 to-transparent z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <FadeIn direction="right">
            <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-black bg-[#FF1493]/10 text-[#FF1493] mb-4 inline-block">
              Nossa Essência
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tighter text-white leading-tight">
              A intersecção perfeita entre <span className="text-gradient">arte e código.</span>
            </h3>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-medium mb-6">
              O RKY Studio nasceu de uma insatisfação com a mediocridade digital. Nós não construímos apenas sites; nós projetamos <strong>ativos digitais de alto impacto</strong>.
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-medium mb-8">
              Acreditamos que uma experiência visual deslumbrante não deve custar a performance. Combinamos design de elite centrado no usuário com engenharia de software de ponta para criar interfaces que convertem, engajam e dominam.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-[#00BFFF] pl-4">
                <h4 className="text-2xl font-black text-white">100%</h4>
                <p className="text-xs uppercase tracking-widest text-white/60 font-bold mt-1">In-House</p>
              </div>
              <div className="border-l-2 border-[#8B5CF6] pl-4">
                <h4 className="text-2xl font-black text-white">Elite</h4>
                <p className="text-xs uppercase tracking-widest text-white/60 font-bold mt-1">Padrão de Qualidade</p>
              </div>
            </div>
          </FadeIn>

          {/* Value Props Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 sm:pt-0">
            <FadeIn delay={150} direction="up">
              <div className="glass-card insane-hover p-6 sm:p-8 rounded-3xl h-full border border-white/10 bg-white/[0.02]">
                <div className="animate-float-slow">
                  <Target size={32} className="text-[#FF1493] mb-4 drop-shadow-[0_0_8px_#FF1493]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Foco em Conversão</h4>
                <p className="text-sm text-white/60 font-medium">Design estratégico projetado para guiar o usuário e maximizar resultados de negócios.</p>
              </div>
            </FadeIn>
            <FadeIn delay={300} direction="up" className="sm:translate-y-8">
              <div className="glass-card insane-hover p-6 sm:p-8 rounded-3xl h-full border border-white/10 bg-white/[0.02]">
                <div className="animate-float-slow" style={{ animationDelay: '1s' }}>
                  <Layers size={32} className="text-[#00BFFF] mb-4 drop-shadow-[0_0_8px_#00BFFF]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">UI/UX Premium</h4>
                <p className="text-sm text-white/60 font-medium">Estética moderna, micro-interações e atenção obsessiva a cada pixel da interface.</p>
              </div>
            </FadeIn>
            <FadeIn delay={450} direction="up">
              <div className="glass-card insane-hover p-6 sm:p-8 rounded-3xl h-full border border-white/10 bg-white/[0.02]">
                <div className="animate-float-slow" style={{ animationDelay: '2s' }}>
                  <Cpu size={32} className="text-[#8B5CF6] mb-4 drop-shadow-[0_0_8px_#8B5CF6]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Engenharia Limpa</h4>
                <p className="text-sm text-white/60 font-medium">Código escalável, arquitetura moderna e otimização extrema para velocidade.</p>
              </div>
            </FadeIn>
            {/* Empty block to fill grid nicely on some breakpoints if needed or let it wrap naturally */}
          </div>

        </div>
      </div>
    </section>
  );
};
