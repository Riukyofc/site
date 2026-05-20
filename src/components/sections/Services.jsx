import React from 'react';
import { Monitor, PenTool, Code, Zap, ArrowRight } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';

export const Services = () => {
  const services = [
    { 
      Icon: Monitor, 
      title: "Experiências Web", 
      desc: "Landing pages de alta performance com animações interativas e design imersivo que converte visitantes em clientes.", 
      gradient: "from-[#00BFFF] to-[#8B5CF6]",
      price: "A partir de R$500",
      features: ["Design Responsivo", "Animações CSS", "SEO Otimizado"]
    },
    { 
      Icon: PenTool, 
      title: "Design UI/UX", 
      desc: "Interfaces projetadas com foco absoluto na jornada e satisfação do usuário. Wireframes, protótipos e design system.", 
      gradient: "from-[#FF1493] to-[#8B5CF6]",
      price: "A partir de R$800",
      features: ["Figma Profissional", "User Research", "Design System"]
    },
    { 
      Icon: Code, 
      title: "Sistemas Sob Medida", 
      desc: "Aplicações robustas e escaláveis com tecnologias de ponta. Dashboards, painéis admin, SaaS completos.", 
      gradient: "from-[#8B5CF6] to-[#00BFFF]",
      price: "A partir de R$2.000",
      features: ["React / Next.js", "Firebase / API", "Painel Admin"]
    },
    { 
      Icon: Zap, 
      title: "Otimização & SEO", 
      desc: "Aceleração de performance para dominar as buscas e converter mais. Core Web Vitals e PageSpeed 95+.", 
      gradient: "from-[#FF8C00] to-[#FF1493]",
      price: "A partir de R$300",
      features: ["PageSpeed 95+", "Google Analytics", "Meta Tags"]
    },
  ];

  return (
    <section id="servicos" className="py-20 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeader
          badge="Nosso Core"
          badgeColor="cyan"
          title="O que fazemos de"
          highlight="melhor."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const { Icon } = service;
            return (
              <FadeIn key={index} delay={index * 100} direction="up" className="h-full">
                <div className="glass-card hover-glow p-6 rounded-2xl sm:rounded-3xl h-full flex flex-col group cursor-pointer relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${service.gradient} opacity-30 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="relative mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 transition-transform duration-500">
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-tr ${service.gradient} opacity-15 blur-md group-hover:opacity-30 transition-opacity`} />
                    <Icon size={22} className="text-[#00BFFF] relative z-10" />
                  </div>
                  
                  <h4 className="text-base sm:text-lg font-black mb-2 text-white group-hover:text-[#00BFFF] transition-colors">{service.title}</h4>
                  <p className="text-xs sm:text-sm text-white/40 font-medium leading-relaxed mb-4">{service.desc}</p>

                  {/* Features mini-list */}
                  <ul className="mb-5 space-y-1.5 flex-grow">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] text-white/30 font-medium">
                        <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.gradient} shrink-0`} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/25">{service.price}</span>
                    <a 
                      href="#contato"
                      className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-[#00BFFF] transition-colors group/btn"
                    >
                      Solicitar
                      <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
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
