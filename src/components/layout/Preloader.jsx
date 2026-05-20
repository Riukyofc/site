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
          setTimeout(() => setIsExiting(true), 300);
          setTimeout(() => setIsDone(true), 1200);
          return 100;
        }
        // Ease the progress — starts fast, slows near end
        const remaining = 100 - prev;
        const increment = Math.max(1, remaining * 0.15);
        return Math.min(100, prev + increment);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#030305] flex flex-col items-center justify-center transition-all duration-700 ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00BFFF]/10 blur-[100px] animate-aurora" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#FF1493]/8 blur-[100px] animate-aurora" style={{ animationDelay: '-7s' }} />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8">
        <h1 className="text-3xl sm:text-4xl font-black tracking-[-0.06em]">
          <span className="text-white">RKY</span>
          <span className="text-gradient"> Studio</span>
        </h1>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-48 sm:w-56">
        <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#FF1493] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mt-3">
          {progress < 100 ? 'Carregando' : 'Pronto'}
        </p>
      </div>
    </div>
  );
};
