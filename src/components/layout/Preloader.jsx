import React, { useState, useEffect } from 'react';

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const remaining = 100 - prev;
        return Math.min(100, prev + Math.max(1, remaining * 0.15));
      });
    }, 40);

    // Force exit after 2.5s max
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsDone(true), 700);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#030305] flex flex-col items-center justify-center transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Logo */}
      <div className="flex items-baseline gap-1 mb-3">
        {'RKY'.split('').map((letter, i) => (
          <span
            key={letter}
            className="text-4xl sm:text-7xl font-black text-white animate-[fadeUp_0.6s_ease-out_forwards]"
            style={{ opacity: 0, animationDelay: `${i * 0.15 + 0.2}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <span
        className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold animate-[fadeIn_0.5s_ease-out_0.8s_forwards]"
        style={{ opacity: 0 }}
      >
        Studio
      </span>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#FF1493] transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
