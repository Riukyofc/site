import React, { useState, useEffect, memo } from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { ParticleField } from '../ui/ParticleField';

// Aurora gradient background - smaller blobs on mobile for GPU perf
const AuroraBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-[#00BFFF]/15 blur-[60px] sm:blur-[100px] md:blur-[120px] animate-aurora" />
    <div className="absolute top-1/3 right-1/4 w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#FF1493]/12 blur-[60px] sm:blur-[100px] md:blur-[120px] animate-aurora" style={{ animationDelay: '-7s' }} />
    <div className="absolute bottom-1/4 left-1/3 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-[#8B5CF6]/10 blur-[60px] sm:blur-[100px] md:blur-[120px] animate-aurora" style={{ animationDelay: '-14s' }} />
  </div>
));

// Dot grid overlay
const GridOverlay = memo(() => (
  <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
));

// Typewriter effect
const Typewriter = memo(({ words, delay = 100, pause = 2500 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => setCurrentText(word.substring(0, currentText.length - 1)), delay / 2);
    } else {
      timer = setTimeout(() => setCurrentText(word.substring(0, currentText.length + 1)), delay);
    }
    if (!isDeleting && currentText === word) {
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay, pause]);

  return (
    <span className="inline-block text-left min-w-[5ch] sm:min-w-[7ch]">
      {currentText}
      <span className="animate-pulse ml-0.5 text-[#FF1493]/70 font-light">|</span>
    </span>
  );
});

export const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featureBadges = [
    { label: 'Estética UI/UX', sub: 'Design Centrado no Usuário', color: 'border-[#00BFFF]' },
    { label: 'Performance', sub: 'Otimização Extrema', color: 'border-[#FF1493]' },
    { label: 'Engenharia', sub: 'Arquitetura Escalável', color: 'border-[#8B5CF6]' },
  ];

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-12">
      <AuroraBackground />
      <GridOverlay />
      <ParticleField />

      {/* Radial spotlight center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-radial from-white/[0.03] to-transparent rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full text-center">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">

          <FadeIn delay={100} direction="down">
            <div className="inline-flex items-center space-x-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/80 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#FF1493]" /> Disponível para novos projetos
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <h1 className="text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-[-0.04em] leading-[1.1] sm:leading-[1.05] text-white max-w-5xl mx-auto">
              Criamos o{' '}
              <br className="hidden sm:block" />
              <span className="text-gradient">
                <Typewriter words={["incomum.", "excepcional.", "futuro.", "impossível."]} />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={500}>
            <p className="text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed text-white/60 px-2 sm:px-0">
              No <strong className="text-[#00BFFF] font-bold">RKY Studio</strong>, transformamos visões ousadas em experiências digitais imersivas. Design de elite e engenharia de ponta.
            </p>
          </FadeIn>

          <FadeIn delay={700} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-6 w-full sm:w-auto justify-center px-2 sm:px-0">
            <a
              href="#portfolio"
              className="group relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#FF1493] text-white shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explorar Portfólio
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 shimmer" />
            </a>
            <a
              href="#solucoes"
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base border border-white/10 bg-white/[0.02] backdrop-blur-sm text-white hover:border-[#00BFFF]/50 hover:text-[#00BFFF] hover:bg-white/[0.05] transition-all duration-300 hover:scale-105 text-center"
            >
              Nossos Serviços
            </a>
          </FadeIn>

          {/* Feature badges - visible on all screen sizes */}
          <FadeIn delay={900} className="pt-6 sm:pt-16 w-full max-w-4xl mx-auto">
            {/* Mobile: horizontal scroll */}
            <div className="flex lg:hidden overflow-x-auto snap-x gap-3 pb-2 -mx-2 px-2">
              {featureBadges.map((item, i) => (
                <div key={i} className={`border-l-2 ${item.color} pl-3 min-w-[160px] snap-item shrink-0`}>
                  <p className="text-base font-black text-white">{item.label}</p>
                  <p className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
            {/* Desktop: grid */}
            <div className="hidden lg:grid grid-cols-3 gap-8 text-left opacity-80">
              {featureBadges.map((item, i) => (
                <div key={i} className={`border-l-2 ${item.color} pl-4`}>
                  <p className="text-xl font-black text-white">{item.label}</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator - positioned above bottom nav on mobile */}
      <div className={`absolute bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-60'}`}>
        <div className="flex flex-col items-center gap-2 animate-bounce-down">
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40">Scroll</span>
          <ChevronDown size={20} className="text-white/40" />
        </div>
      </div>
    </section>
  );
};
