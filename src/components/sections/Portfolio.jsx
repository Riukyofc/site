import React, { useState } from 'react';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { ProjectPreviewModal } from './ProjectPreviewModal';

import coffeeAura from '../../assets/portfolio/coffee_aura.png';
import lumia from '../../assets/portfolio/lumia.png';
import nexar from '../../assets/portfolio/nexar.png';
import techvibe from '../../assets/portfolio/techvibe.png';

export const Portfolio = () => {
  const [previewData, setPreviewData] = useState({ isOpen: false, url: '', title: '' });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    { title: 'Coffee Aura', category: 'Landing Page', image: coffeeAura, url: 'https://coffee-aura.vercel.app', color: '#FF8C00' },
    { title: 'Lumia', category: 'E-commerce', image: lumia, url: 'https://lumia-store.vercel.app', color: '#8B5CF6' },
    { title: 'Nexar', category: 'Dashboard', image: nexar, url: 'https://nexar-dash.vercel.app', color: '#00BFFF' },
    { title: 'TechVibe', category: 'SaaS Platform', image: techvibe, url: 'https://techvibe.vercel.app', color: '#FF1493' },
  ];

  return (
    <>
      <section id="portfolio" className="py-20 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <SectionHeader
            badge="Portfólio"
            badgeColor="violet"
            title="Trabalhos que"
            highlight="impressionam."
            subtitle="Cada projeto é uma obra única, desenvolvida com atenção obsessiva aos detalhes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <FadeIn key={index} delay={index * 120} className="h-full">
                <GlassCard 
                  className="overflow-hidden group h-full cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                      loading="lazy"
                    />

                    {/* Gradient color bar top */}
                    <div 
                      className="absolute top-0 left-0 w-full h-1 transition-all duration-500 opacity-0 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 sm:p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black mb-1.5" style={{ color: project.color }}>
                          {project.category}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-3">{project.title}</h3>
                        <div className="flex gap-2">
                          {/* Botão Visualizar Preview */}
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPreviewData({ isOpen: true, url: project.url, title: project.title }); }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                            style={{ background: `linear-gradient(135deg, ${project.color}CC, ${project.color}88)`, boxShadow: `0 0 20px ${project.color}40` }}
                          >
                            <Eye size={14} />
                            Visualizar
                          </button>
                          {/* Botão Abrir em Nova Aba */}
                          <a 
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300 hover:scale-110"
                          >
                            <ArrowUpRight size={16} />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Project number watermark */}
                    <div className="absolute top-4 right-4 text-white/[0.06] font-black text-6xl sm:text-7xl select-none pointer-events-none transition-all duration-500 group-hover:text-white/[0.12] group-hover:scale-110">
                      0{index + 1}
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>

          {/* CTA to see more */}
          <FadeIn delay={500} className="mt-10 sm:mt-14 text-center">
            <a 
              href="#contato"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider border border-white/10 text-white/60 hover:text-white hover:border-[#8B5CF6]/50 hover:bg-white/[0.03] transition-all duration-300 hover:scale-105"
            >
              Quer algo assim? Fale conosco
              <ArrowUpRight size={16} />
            </a>
          </FadeIn>
        </div>
      </section>

      <ProjectPreviewModal 
        isOpen={previewData.isOpen} 
        onClose={() => setPreviewData({ ...previewData, isOpen: false })} 
        url={previewData.url} 
        title={previewData.title} 
      />
    </>
  );
};
