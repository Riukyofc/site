import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3 md:py-4 shadow-lg' : 'bg-transparent py-5 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo de Elite via Imagem Oficial */}
        <a href="#home" className="flex items-center justify-center z-50 group transition-transform hover:scale-105 duration-300">
          <img 
            src={logoImg} 
            alt="RKY Studio Logo" 
            className="h-10 sm:h-11 md:h-14 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,191,255,0.2)]" 
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {['Serviços', 'Trabalhos', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm uppercase tracking-widest font-bold text-white hover:text-[#00BFFF] transition-colors relative py-1 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#FF1493] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <div className="w-px h-6 bg-zinc-800 transition-colors"></div>

          <a 
            href="https://wa.me/5598982715727?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto%20com%20o%20RKY%20Studio!" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] text-white hover:shadow-cyan-500/25"
          >
            Iniciar Projeto
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3 z-50">
          <button 
            className="p-2 rounded-full bg-zinc-900 text-gray-200 border border-white/10 active:scale-95 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Alternar menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Fullscreen Overlay Menu */}
        <div className={`fixed inset-0 flex flex-col items-center justify-center space-y-8 transition-all duration-500 ease-in-out md:hidden backdrop-blur-2xl bg-[#09090B]/95 z-40 ${isOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}>
          {['Serviços', 'Trabalhos', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)} 
              className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white hover:text-[#00BFFF] transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="https://wa.me/5598982715727?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto%20com%20o%20RKY%20Studio!" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-[#00BFFF] to-[#FF1493] text-white shadow-lg active:scale-95 transition-transform"
          >
            Iniciar Projeto
          </a>
        </div>
      </div>
    </nav>
  );
};
