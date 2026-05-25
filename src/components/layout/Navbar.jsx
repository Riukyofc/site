import React, { useState, useEffect } from 'react';
import { Menu, X, User, ShoppingBag, Heart, Home, Briefcase, MessageCircle, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { LoginModal } from '../auth/LoginModal';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [bottomNavVisible, setBottomNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { cartCount, setIsSidebarOpen } = useCart();

  useEffect(() => {
    // Check if URL has ?login=true
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('login') === 'true') {
      setIsLoginOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        setScrollProgress((currentScrollY / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }

      // Bottom nav auto-hide logic
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setBottomNavVisible(false);
      } else {
        setBottomNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Observer para a seção ativa
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' });

    const sections = ['home', 'sobre', 'servicos', 'portfolio', 'solucoes', 'contato'];
    sections.forEach((sec) => {
      const el = document.getElementById(sec);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY]);

  const navItems = [
    { label: 'Sobre', id: 'sobre' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Portfólio', id: 'portfolio' },
    { label: 'Contato', id: 'contato' },
  ];

  const bottomNavItems = [
    { label: 'Home', id: 'home', icon: Home },
    { label: 'Projetos', id: 'portfolio', icon: Briefcase },
    { label: 'Carrinho', id: 'cart', icon: ShoppingBag, action: () => setIsSidebarOpen(true) },
    { label: 'Contato', id: 'contato', icon: MessageCircle },
  ];

  return (
    <>
      <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-2.5 md:py-4 shadow-lg' : 'bg-transparent py-3 md:py-6'}`}>
        {/* Scroll Progress Bar Premium */}
        <div className="absolute top-0 left-0 w-full h-[2px] sm:h-[3px] bg-white/5 z-50">
          <div
            className="h-full bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#FF1493] transition-all duration-150 ease-out shadow-[0_0_8px_#FF1493]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center justify-center z-50 group transition-transform hover:scale-105 duration-300">
            <Logo className="text-[20px] sm:text-[24px] md:text-[28px]" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm uppercase tracking-widest font-bold transition-colors relative py-1 group ${isActive ? 'text-[#00BFFF]' : 'text-white hover:text-[#00BFFF]'}`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#FF1493] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              );
            })}

            <div className="w-px h-6 bg-zinc-800" />

            {/* Wishlist */}
            <button className="text-zinc-400 hover:text-pink-400 transition-colors p-2 rounded-full hover:bg-white/5 active:scale-95 flex items-center justify-center" title="Favoritos">
              <Heart size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="relative text-zinc-400 hover:text-purple-400 transition-colors p-2 rounded-full hover:bg-white/5 active:scale-95 flex items-center justify-center"
              title="Orçamento / Carrinho"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF1493] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-[#09090B]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login */}
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
          <div className="md:hidden flex items-center gap-2 z-50">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="relative p-2 rounded-full bg-zinc-900 text-gray-200 border border-white/10 active:scale-95 transition-transform touch-target"
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
              className="p-2 rounded-full bg-zinc-900 text-gray-200 border border-white/10 active:scale-95 transition-transform touch-target"
              aria-label="Login"
            >
              <User size={20} />
            </button>
            <button
              className="p-2 rounded-full bg-zinc-900 text-gray-200 border border-white/10 active:scale-95 transition-transform touch-target"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Alternar menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Drawer Overlay */}
          {isOpen && (
            <div className="drawer-overlay md:hidden" onClick={() => setIsOpen(false)} />
          )}

          {/* Mobile Drawer Panel */}
          <div className={`drawer-panel md:hidden ${isOpen ? 'animate-drawer-in' : 'translate-x-full'} transition-transform`}>
            <div className="p-6 pt-8">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white active:scale-95 transition-all"
              >
                <X size={20} />
              </button>

              {/* Logo in drawer */}
              <div className="mb-10">
                <Logo className="text-[24px]" />
              </div>

              {/* Nav Links */}
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#00BFFF]/10 to-transparent text-[#00BFFF] border border-[#00BFFF]/20'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-base font-bold">{item.label}</span>
                      <ChevronRight size={16} className="text-white/20" />
                    </a>
                  );
                })}
              </div>

              {/* CTA in drawer */}
              <a
                href="https://wa.me/5598982715727?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto%20com%20o%20RKY%20Studio!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-[#00BFFF] to-[#FF1493] text-white shadow-lg active:scale-95 transition-transform"
              >
                Iniciar Projeto
              </a>

              {/* Footer info in drawer */}
              <p className="mt-10 text-[10px] text-white/20 text-center font-medium">
                © {new Date().getFullYear()} RKY Studio
              </p>
            </div>
          </div>
        </div>

        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </nav>

      {/* Bottom Navigation Bar - Mobile Only */}
      <div
        className={`bottom-nav md:hidden safe-bottom transition-transform duration-300 ${
          bottomNavVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === 'cart' ? false : activeSection === item.id;
            const handleClick = item.action ? item.action : () => {
              const el = document.getElementById(item.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            };
            return (
              <button
                key={item.id}
                onClick={handleClick}
                className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all touch-target ${
                  isActive ? 'text-[#00BFFF]' : 'text-white/40'
                }`}
              >
                {isActive && (
                  <span className="absolute top-1 w-1 h-1 rounded-full bg-[#00BFFF] shadow-[0_0_6px_#00BFFF]" />
                )}
                <Icon size={20} />
                <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
                {item.id === 'cart' && cartCount > 0 && (
                  <span className="absolute top-0.5 right-1 bg-[#FF1493] text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
