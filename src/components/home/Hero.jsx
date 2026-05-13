import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-10 sm:pb-12">
      {/* Decoração de fundo de alta fidelidade para um Modo Escuro ainda mais imersivo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[900px] md:h-[900px] blur-[120px] sm:blur-[150px] rounded-full pointer-events-none bg-gradient-to-tr from-[#00BFFF]/20 via-[#FF1493]/15 to-[#8B5CF6]/20 animate-float z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full text-center">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          
          <FadeIn delay={100} direction="down">
            <div className="inline-flex items-center space-x-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-inner max-w-full text-left sm:text-center">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1493] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BFFF]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1 sm:gap-1.5 truncate">
                <Sparkles size={12} className="text-[#FF1493] shrink-0" /> Disponível para novos projetos
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.08] sm:leading-[1.05] text-white max-w-5xl mx-auto px-2 sm:px-0">
              Criamos o <br />
              <span className="text-gradient">incomum.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={500}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-medium leading-relaxed text-white px-2 sm:px-0">
              No <strong className="text-[#00BFFF]">RKY Studio</strong>, transformamos visões ousadas em experiências digitais imersivas. Design de elite e engenharia de ponta para marcas líderes.
            </p>
          </FadeIn>

          <FadeIn delay={700} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 pt-4 sm:pt-6 w-full sm:w-auto justify-center px-4 sm:px-0">
            <a 
              href="#trabalhos" 
              className="group flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#FF1493] text-white hover:shadow-[#FF1493]/20 text-center"
            >
              Explorar Portfólio
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </a>
            <a 
              href="#servicos" 
              className="px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base border border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center"
            >
              Nossa Especialidade
            </a>
          </FadeIn>

          {/* Badges Flutuantes / Micro-interações */}
          <FadeIn delay={900} className="pt-12 sm:pt-16 hidden lg:grid grid-cols-3 gap-8 max-w-4xl mx-auto text-left opacity-90">
            <div className="border-l-2 border-[#00BFFF] pl-4">
              <p className="text-2xl font-black text-white">Estética UI/UX</p>
              <p className="text-xs text-white/80 uppercase tracking-widest font-bold mt-1">Design Centrado no Usuário</p>
            </div>
            <div className="border-l-2 border-[#FF1493] pl-4">
              <p className="text-2xl font-black text-white">Performance</p>
              <p className="text-xs text-white/80 uppercase tracking-widest font-bold mt-1">Otimização Extrema</p>
            </div>
            <div className="border-l-2 border-[#8B5CF6] pl-4">
              <p className="text-2xl font-black text-white">Engenharia</p>
              <p className="text-xs text-white/80 uppercase tracking-widest font-bold mt-1">Arquitetura Escalável</p>
            </div>
          </FadeIn>
          
        </div>
      </div>
    </section>
  );
};
