import React from 'react';
import { X, Maximize2, ExternalLink } from 'lucide-react';

export const ProjectPreviewModal = ({ isOpen, onClose, url, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Overlay Escuro */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Janela do Navegador Fake (Glassmorphism) */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#09090B] rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,191,255,0.15)] flex flex-col overflow-hidden animate-[scaleUp_0.4s_ease-out]">
        
        {/* Header do Navegador */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
          
          {/* Botões do OS (Mac Style) */}
          <div className="flex gap-2 items-center w-24">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" title="Fechar"></button>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Barra de URL Fake */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="bg-black/50 border border-white/5 rounded-lg py-1.5 px-4 text-center text-xs text-gray-400 font-mono truncate flex items-center justify-center gap-2">
              <span className="text-green-400">🔒</span>
              {url}
            </div>
          </div>

          {/* Controles da Direita */}
          <div className="flex gap-3 items-center justify-end w-24">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              title="Abrir em Nova Guia"
            >
              <ExternalLink size={16} />
            </a>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Área do Iframe */}
        <div className="flex-1 bg-white relative w-full h-full overflow-hidden">
          {/* Fallback de Carregamento Brilhante (só aparece enquanto o iframe carrega) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#09090B] z-0">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#00BFFF] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 text-sm font-bold animate-pulse">Carregando visualização ao vivo...</p>
          </div>
          
          <iframe 
            src={url}
            title={title || "Pré-visualização do Projeto"}
            className="relative z-10 w-full h-full border-0 bg-transparent"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
