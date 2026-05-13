import React from 'react';
import { Quote, Star } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "O nível de precisão e capricho visual do RKY Studio é algo fora do comum. Cada pixel reflete cuidado extremo com a experiência do usuário.",
      author: "Sarah Viana",
      role: "CEO & Tech Founder",
      avatarBg: "bg-gradient-to-tr from-[#00BFFF] to-[#FF1493]",
      initials: "SV"
    },
    {
      quote: "Código totalmente limpo, otimizado e incrivelmente rápido. A taxa de conversão e a velocidade de carregamento das nossas páginas decolou.",
      author: "Marcos Aurélio",
      role: "Diretor de Produto",
      avatarBg: "bg-gradient-to-tr from-[#FF1493] to-[#8B5CF6]",
      initials: "MA"
    },
    {
      quote: "A equipe entendeu perfeitamente a nossa essência e entregou uma interface premium, imersiva e muito acima dos padrões do mercado.",
      author: "Elena Rostova",
      role: "Head de Design & Branding",
      avatarBg: "bg-gradient-to-tr from-[#8B5CF6] to-[#00BFFF]",
      initials: "ER"
    }
  ];

  return (
    <section className="py-20 sm:py-32 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] blur-[100px] sm:blur-[140px] rounded-full pointer-events-none bg-gradient-to-b from-[#8B5CF6]/10 to-[#FF1493]/10 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-black bg-[#FF1493]/10 text-[#FF1493] mb-3 inline-block">
            Reconhecimento
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white">
            O impacto do nosso <span className="text-gradient">código.</span>
          </h3>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, index) => (
            <FadeIn key={index} delay={index * 150} direction="up" className="h-full">
              <div className="glass-card p-6 sm:p-8 rounded-3xl h-full flex flex-col justify-between relative group hover:border-white/20 transition-all duration-500">
                
                {/* Quote Watermark */}
                <div className="absolute top-4 right-4 text-white/5 group-hover:text-white/10 transition-colors duration-300 pointer-events-none">
                  <Quote size={60} className="transform rotate-12" />
                </div>

                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-4 sm:mb-6 text-[#FF8C00]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" className="sm:w-4 sm:h-4" />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed mb-6 relative z-10">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${item.avatarBg} flex items-center justify-center font-black text-xs sm:text-sm text-white shadow-md shrink-0 border border-white/20`}>
                    {item.initials}
                  </div>
                  <div className="truncate">
                    <h5 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                      {item.author}
                    </h5>
                    <p className="text-[10px] sm:text-xs font-medium text-white/60 truncate">
                      {item.role}
                    </p>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
