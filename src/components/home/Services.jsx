import React from 'react';
import { Monitor, PenTool, Code, Zap, ChevronRight } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';

export const Services = () => {
  const services = [
    { 
      Icon: Monitor, 
      title: "Experiências Web", 
      desc: "Sites institucionais e landing pages de alta performance com animações interativas que cativam o usuário desde o primeiro segundo.",
      color: "from-[#00BFFF] to-[#8B5CF6]"
    },
    { 
      Icon: PenTool, 
      title: "Design UI/UX", 
      desc: "Interfaces projetadas com foco absoluto na jornada do usuário, combinando estética premium com usabilidade impecável.",
      color: "from-[#FF1493] to-[#8B5CF6]"
    },
    { 
      Icon: Code, 
      title: "Desenvolvimento Sob Medida", 
      desc: "Aplicações web robustas e escaláveis construídas com as tecnologias mais modernas e otimizadas do mercado.",
      color: "from-[#8B5CF6] to-[#00BFFF]"
    },
    { 
      Icon: Zap, 
      title: "Otimização & SEO", 
      desc: "Aceleração de performance e estruturação estratégica para garantir que seu projeto não apenas seja visto, mas domine as buscas.",
      color: "from-[#FF8C00] to-[#FF1493]"
    },
  ];

  return (
    <section id="servicos" className="py-20 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <FadeIn>
          <div className="flex flex-col items-start">
            <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-black bg-[#00BFFF]/10 text-[#00BFFF] mb-3">
              Especialidades
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black mb-10 sm:mb-16 tracking-tighter text-white">
              O que fazemos de <span className="text-gradient">melhor.</span>
            </h3>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const { Icon } = service;
            return (
              <FadeIn key={index} delay={index * 150} direction="up" className="h-full">
                <div className="glass-card p-6 sm:p-10 rounded-3xl h-full flex flex-col group cursor-pointer relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
                  
                  {/* Subtle top border gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-40 group-hover:opacity-100 transition-opacity`}></div>

                  {/* Watermark Icon */}
                  <div className="absolute -bottom-6 -right-6 p-6 sm:p-8 opacity-10 group-hover:scale-150 transition-all duration-700 pointer-events-none transform -rotate-12 text-[#00BFFF]">
                    <Icon size={120} className="sm:w-[160px] sm:h-[160px]" />
                  </div>

                  {/* Service Icon with background glow */}
                  <div className="relative mb-6 sm:mb-8 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${service.color} opacity-20 blur-md group-hover:opacity-40 transition-opacity`}></div>
                    <Icon size={24} className="sm:w-7 sm:h-7 text-[#00BFFF] relative z-10" />
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 tracking-tight text-white group-hover:text-[#00BFFF] transition-colors">
                    {service.title}
                  </h4>
                  <p className="leading-relaxed font-medium text-white text-sm sm:text-base mb-6 sm:mb-8">
                    {service.desc}
                  </p>

                  <div className="mt-auto pt-3 sm:pt-4 flex items-center text-[10px] sm:text-xs uppercase tracking-widest font-black text-white/70 group-hover:text-[#00BFFF] transition-colors">
                    Descobrir mais <ChevronRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
