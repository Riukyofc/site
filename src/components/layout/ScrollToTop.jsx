import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 group ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      } bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-[#00BFFF]/40 hover:bg-white/[0.08] hover:scale-110 active:scale-95 shadow-lg`}
    >
      <ArrowUp size={18} className="text-white/60 group-hover:text-[#00BFFF] transition-colors" />
    </button>
  );
};
