import React from 'react';

export const Logo = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-start justify-center select-none font-black font-['Outfit'] ${className} group`}>
      {/* STUDIO */}
      <span className="text-[#00BFFF] text-[0.4em] tracking-[0.2em] absolute top-[-0.4em] right-[0.5em] uppercase z-10 opacity-90 group-hover:text-white transition-colors duration-300">
        Studio
      </span>
      
      {/* <rky> */}
      <div className="text-[#FF1493] text-[1.2em] leading-none tracking-tighter z-0 group-hover:text-[#ff38a2] transition-colors duration-300">
        &lt;rky&gt;
      </div>
      
      {/* code */}
      <div className="flex items-end text-[#00BFFF] text-[1.6em] leading-[0.7] tracking-tighter z-10 mt-[-0.1em] ml-[0.2em] group-hover:text-[#33ccff] transition-colors duration-300">
        code
        <span className="w-[0.18em] h-[0.18em] bg-[#8B5CF6] rounded-[2px] ml-[0.05em] mb-[0.08em] group-hover:bg-[#a78bfa] transition-colors duration-300 shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
      </div>
    </div>
  );
};
