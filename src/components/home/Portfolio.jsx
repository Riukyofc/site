import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';

export const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const projects = [
    { 
      title: "TechVibe", 
      category: "Inovação & Web", 
      filter: "Web",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop", 
      link: "https://riukydev.github.io/TechVibe/" 
    },
    { 
      title: "Nexar", 
      category: "Plataforma Corporativa", 
      filter: "Corporativo",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop", 
      link: "https://riukydev.github.io/Nexar/" 
    },
    { 
      title: "Coffee Aura", 
      category: "E-commerce & Branding", 
      filter: "Web",
      img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop", 
      link: "https://riukyofc.github.io/Coffe-aura/" 
    },
    { 
      title: "Lumia", 
      category: "Frontend Interface Premium", 
      filter: "Premium",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", 
      link: "https://riukydev.github.io/Lumia-Frontend/" 
    },
  ];

  const filters = ['Todos', 'Web', 'Corporativo', 'Premium'];

  const filteredProjects = activeFilter === 'Todos' 
    ? projects 
    : projects.filter(p => p.filter === activeFilter);

  return (
    <section id="trabalhos" className="py-20 sm:py-32 bg-black/20 relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
          <FadeIn>
            <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-black bg-[#8B5CF6]/10 text-[#8B5CF6] mb-3 inline-block">
              Portfólio
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white">
              Projetos em <span className="text-gradient-accent">destaque.</span>
            </h3>
          </FadeIn>
          
          {/* Interactive Filters */}
          <FadeIn delay={200} direction="left">
            <div className="flex flex-wrap gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-white/5 border border-white/10 backdrop-blur-md justify-center">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-[#FF1493] to-[#8B5CF6] text-white shadow-md'
                      : 'text-white hover:text-[#00BFFF]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.title} delay={index * 150} className={`group relative rounded-3xl overflow-hidden ${index % 2 !== 0 ? 'md:mt-16' : ''}`}>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer relative">
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-100"
                  />
                </div>
                
                {/* Overlay Premium Glassmorphic Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 sm:p-8 md:p-10">
                  
                  {/* Ícone Flutuante Superior de Link Externo */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                    <ExternalLink size={18} className="sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </div>

                  <span className="inline-block px-2.5 sm:px-3 py-1 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#00BFFF] bg-white/10 backdrop-blur-md w-max mb-2 sm:mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {project.category}
                  </span>
                  
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75 truncate pr-2">
                      {project.title}
                    </h4>
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-white group-hover:text-[#00BFFF] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 shrink-0">
                      Visitar <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
