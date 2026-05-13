import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';

export const CTA = () => {
  return (
    <section id="contato" className="py-20 sm:py-32 relative overflow-hidden z-10 border-t border-white/5">
      {/* Immersive background decoration otimizada para modo escuro */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.01] to-[#0E0E11]/80"></div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] sm:w-[800px] sm:h-[400px] blur-[80px] sm:blur-[120px] rounded-full pointer-events-none bg-gradient-to-t from-[#FF1493]/15 to-[#00BFFF]/15 z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
        <FadeIn direction="scale">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 sm:mb-8 text-white leading-[1.1]">
            Vamos construir o <br />
            <span className="text-gradient">próximo nível.</span>
          </h2>
          <p className="text-base sm:text-xl font-medium mb-8 sm:mb-12 max-w-2xl mx-auto text-white leading-relaxed px-2 sm:px-0">
            Seja uma startup inovadora ou uma marca de escala global, estamos prontos para projetar e codificar o seu sucesso digital.
          </p>
          <a 
            href="https://wa.me/5598982715727?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto%20com%20o%20RKY%20Studio!" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl bg-gradient-to-r from-[#FF1493] via-[#8B5CF6] to-[#00BFFF] text-white hover:shadow-[#FF1493]/25"
          >
            Iniciar uma conversa
            <ArrowRight size={20} className="sm:w-6 sm:h-6 animate-pulse shrink-0" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
};
