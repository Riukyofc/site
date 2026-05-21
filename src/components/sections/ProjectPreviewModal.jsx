import React, { useState } from 'react';
import { X, ExternalLink, Monitor, Tablet, Smartphone } from 'lucide-react';

export const ProjectPreviewModal = ({ isOpen, onClose, url, title }) => {
  const [deviceMode, setDeviceMode] = useState('desktop');
  
  if (!isOpen) return null;

  const deviceWidths = { desktop: '100%', tablet: '768px', mobile: '375px' };
  const devices = [
    { id: 'desktop', icon: Monitor, label: 'Desktop' },
    { id: 'tablet', icon: Tablet, label: 'Tablet' },
    { id: 'mobile', icon: Smartphone, label: 'Mobile' },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Overlay Escuro */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Janela do Navegador Fake (Glassmorphism) */}
      <div className="relative w-full max-w-6xl h-full sm:max-h-[90vh] bg-[#09090B] rounded-none sm:rounded-3xl border-0 sm:border sm:border-white/10 shadow-[0_0_50px_rgba(0,191,255,0.15)] flex flex-col overflow-hidden animate-[scaleUp_0.4s_ease-out]">

        {/* Header do Navegador */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">

          {/* Botões do OS (Mac Style) */}
          <div className="flex gap-2 items-center w-20 sm:w-24">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" title="Fechar" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Barra de URL */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-4">
            <div className="bg-black/50 border border-white/5 rounded-lg py-1.5 px-3 sm:px-4 text-center text-[10px] sm:text-xs text-gray-400 font-mono truncate flex items-center justify-center gap-2">
              <span className="text-green-400 hidden sm:inline">🔒</span>
              <span className="truncate">{url}</span>
            </div>
          </div>

          {/* Controles da Direita */}
          <div className="flex gap-2 sm:gap-3 items-center justify-end w-auto">
            {/* Device Toggle - Desktop Only */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
              {devices.map((device) => {
                const DeviceIcon = device.icon;
                const isActive = deviceMode === device.id;
                return (
                  <button
                    key={device.id}
                    onClick={() => setDeviceMode(device.id)}
                    className={`p-1.5 rounded-md transition-all ${
                      isActive
                        ? 'bg-[#00BFFF]/20 text-[#00BFFF]'
                        : 'text-gray-500 hover:text-white'
                    }`}
                    title={device.label}
                  >
                    <DeviceIcon size={14} />
                  </button>
                );
              })}
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-1"
              title="Abrir em Nova Guia"
            >
              <ExternalLink size={16} />
            </a>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Área do Iframe */}
        <div className="flex-1 bg-white relative w-full h-full overflow-hidden flex justify-center">
          {/* Fallback de Carregamento */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#09090B] z-0">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#00BFFF] rounded-full animate-spin mb-4" />
            <p className="text-gray-400 text-sm font-bold animate-pulse">Carregando visualização ao vivo...</p>
          </div>

          <iframe
            src={url}
            title={title || "Pré-visualização do Projeto"}
            className="relative z-10 h-full border-0 bg-transparent transition-all duration-500"
            style={{ width: deviceWidths[deviceMode], maxWidth: '100%' }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
