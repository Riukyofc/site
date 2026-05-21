import React, { useState, useEffect } from 'react';

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Prevent scroll while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsExiting(true);
      document.body.style.overflow = '';
      setTimeout(() => setIsVisible(false), 800);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-[#030305] flex flex-col items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExiting ? 'opacity-0 -translate-y-10 scale-105' : 'opacity-100'
      }`}
    >
      {/* Logo letters */}
      <div className="flex items-baseline gap-1">
        {'RKY'.split('').map((letter, i) => (
          <span
            key={i}
            className="text-5xl sm:text-7xl md:text-8xl font-black text-white opacity-0"
            style={{
              animation: 'letterReveal 0.6s ease-out forwards',
              animationDelay: `${i * 0.15 + 0.3}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Studio subtitle */}
      <span
        className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/40 font-bold mt-3 opacity-0"
        style={{
          animation: 'letterReveal 0.6s ease-out forwards',
          animationDelay: '0.9s',
        }}
      >
        Studio
      </span>

      {/* Decorative dot */}
      <div
        className="mt-6 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#FF1493] opacity-0"
        style={{
          animation: 'letterReveal 0.4s ease-out forwards',
          animationDelay: '1.2s',
        }}
      />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#FF1493]"
          style={{ animation: 'progressFill 2.5s ease-out forwards' }}
        />
      </div>
    </div>
  );
};
