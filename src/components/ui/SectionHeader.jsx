import React from 'react';
import { FadeIn } from '../layout/FadeIn';

export const SectionHeader = ({ badge, badgeColor = 'cyan', title, highlight, subtitle, align = 'center' }) => {
  const colorMap = {
    cyan: { bg: 'bg-[#00BFFF]/10', text: 'text-[#00BFFF]' },
    pink: { bg: 'bg-[#FF1493]/10', text: 'text-[#FF1493]' },
    violet: { bg: 'bg-[#8B5CF6]/10', text: 'text-[#8B5CF6]' },
    orange: { bg: 'bg-[#FF8C00]/10', text: 'text-[#FF8C00]' },
  };
  const colors = colorMap[badgeColor] || colorMap.cyan;
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <FadeIn className={`flex flex-col ${alignment} max-w-3xl ${align === 'center' ? 'mx-auto' : ''} mb-12 sm:mb-16`}>
      {badge && (
        <span className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-black ${colors.bg} ${colors.text} mb-4`}>
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[1.1]">
        {title}{' '}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-white/60 font-medium leading-relaxed mt-4 max-w-2xl">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
};
