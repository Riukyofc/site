import React, { useState, useEffect } from 'react';
import { Menu, X, User, ShoppingBag } from 'lucide-react';
import { Logo } from './Logo';
import { LoginModal } from '../auth/LoginModal';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { cartCount, setIsSidebarOpen } = useCart();

  useEffect(() => {
    // Check if URL has ?login=true
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('login') === 'true') {
      setIsLoginOpen(true);
      // Clean up the URL without reloading the page
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Observer para a seção ativa
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' });

    // Iremos adicionar a seção 'sobre' em seguida
    const sections = ['home', 'sobre', 'servicos', 'portfolio', 'solucoes', 'contato'];
    sections.forEach((sec) => {
      const el = document.getElementById(sec);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3 md:py-4 shadow-lg' : 'bg-transparent py-5 md:py-6'}`}>
      {/* Scroll Progress Bar Premium */}
      <div className="absolute top-0 left-0 w-full h-[2px] sm:h-[3px] bg-white/5 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#FF1493] transition-all duration-150 ease-out shadow-[0_0_8px_#FF1493]"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo de Elite Baseada em Texto */}
        <a href="#home" className="flex items-center justify-center z-50 group transition-transform hover:scale-105 duration-300">
          <Logo className="text-[20px] sm:text-[24px] md:text-[28px]" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {[{ label: 'Sobre', id: 'sobre' }, { label: 'Serviços', id: 'servicos' }, { label: 'Portfólio', id: 'portfolio' }, { label: 'Contato', id: 'contato' }].map((item) => {
            const sectionId = item.id;
            const isActive = activeSection === sectionId;
            return (
              <a 
                key={item} 
                href={`#${sectionId}`} 
                className={`text-sm uppercase tracking-widest font-bold transition-colors relative py-1 group ${isActive ? 'text-[#00BFFF]' : 'text-white hover:text-[#00BFFF]'}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#FF1493] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            );
          })}
          
          <div className="w-px h-6 bg-zinc-800 transition-colors"></div>

          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="relative text-zinc-400 hover:text-purple-400 transition-colors p-2 rounded-full hover:bg-white/5 active:scale-95 flex items-center justify-center"
            title="Orçamento / Carrinho"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute 0 right-0 bg-[#FF1493] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-[#09090B]">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setIsLoginOpen(true)}
            className="text-zinc-400 hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-white/5 active:scale-95 flex items-center justify-center"
            title="Acesso / Login"
          >
            <User size={20} />
          </button>

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
            onClick={() => setIsSidebarOpen(true)}
            className="relative p-2 rounded-full bg-zinc-900 text-gray-200 border border-white/10 active:scale-95 transition-transform"
            aria-label="Carrinho"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF1493] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-zinc-900">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="p-2 rounded-full bg-zinc-900 text-gray-200 border border-white/10 active:scale-95 transition-transform"
            aria-label="Login"
          >
            <User size={20} />
          </button>
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
          {[{ label: 'Sobre', id: 'sobre' }, { label: 'Serviços', id: 'servicos' }, { label: 'Portfólio', id: 'portfolio' }, { label: 'Contato', id: 'contato' }].map((item) => {
            const sectionId = item.id;
            const isActive = activeSection === sectionId;
            return (
              <a 
                key={item.id} 
                href={`#${sectionId}`} 
                onClick={() => setIsOpen(false)} 
                className={`text-3xl sm:text-4xl font-black uppercase tracking-tighter transition-colors ${isActive ? 'text-[#00BFFF]' : 'text-white hover:text-[#00BFFF]'}`}
              >
                {item.label}
              </a>
            );
          })}
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

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};
