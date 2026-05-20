import React from 'react';
import { Logo } from './Logo';

// Custom inline elite SVGs to guarantee build success and avoid missing esm exports for brand icons
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="pt-16 sm:pt-20 pb-10 sm:pb-12 border-t border-white/5 bg-[#0E0E11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12 sm:mb-16">
          
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            {/* Logo de Elite Baseada em Texto */}
            <a href="#home" className="flex items-center justify-center mb-6 group transition-transform hover:scale-105 duration-300">
              <Logo className="text-[24px] sm:text-[32px]" />
            </a>
            <p className="max-w-sm font-medium text-white text-xs sm:text-sm leading-relaxed px-2 sm:px-0 mt-4">
              Engenharia de software de ponta e estética digital de elite. Projetado com excelência e precisão milimétrica.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { Icon: InstagramIcon, href: '#', label: 'Instagram' },
              { Icon: TwitterIcon, href: '#', label: 'Twitter' },
              { Icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
              { Icon: GithubIcon, href: '#', label: 'GitHub' },
            ].map(({ Icon, href, label }, idx) => (
              <a 
                key={idx} 
                href={href} 
                aria-label={label}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-[#00BFFF] hover:border-[#00BFFF] hover:bg-white/5 transition-all duration-300 hover:scale-110"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 text-[10px] sm:text-xs font-bold uppercase tracking-wider border-t border-white/5 text-white gap-3 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} RKY Studio. Incomum por definição.</p>
          <div className="flex space-x-4 sm:space-x-6">
            <a href="#" className="hover:text-[#00BFFF] transition-colors">Privacidade</a>
            <a href="#" className="hover:text-[#00BFFF] transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
