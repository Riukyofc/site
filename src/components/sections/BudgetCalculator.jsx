import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Check, Monitor, PenTool, Code, Zap, Layers, Shield } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';

const serviceOptions = [
  { id: 'landing', label: 'Landing Page', icon: Monitor, basePrice: 497.90, maxPrice: 1197, color: 'from-[#00BFFF] to-[#8B5CF6]' },
  { id: 'uiux', label: 'Design UI/UX', icon: PenTool, basePrice: 799.90, maxPrice: 1997, color: 'from-[#FF1493] to-[#8B5CF6]' },
  { id: 'sistema', label: 'Sistema Sob Medida', icon: Code, basePrice: 1997, maxPrice: 4997, color: 'from-[#8B5CF6] to-[#00BFFF]' },
  { id: 'seo', label: 'Otimização & SEO', icon: Zap, basePrice: 297.90, maxPrice: 797, color: 'from-[#FF8C00] to-[#FF1493]' },
];

const extras = [
  { id: 'admin', label: 'Painel Administrativo', icon: Layers, price: 1500 },
  { id: 'responsive', label: 'Design Responsivo Premium', icon: Monitor, price: 500 },
  { id: 'seoAdv', label: 'SEO Avançado', icon: Shield, price: 400 },
];

export const BudgetCalculator = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [pages, setPages] = useState(3);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const toggleService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleExtra = (id) => {
    setSelectedExtras(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const total = useMemo(() => {
    let sum = 0;
    selectedServices.forEach(id => {
      const service = serviceOptions.find(s => s.id === id);
      if (service) {
        const pageMultiplier = Math.min(pages / 5, 1);
        sum += service.basePrice + (service.maxPrice - service.basePrice) * pageMultiplier;
      }
    });
    selectedExtras.forEach(id => {
      const extra = extras.find(e => e.id === id);
      if (extra) sum += extra.price;
    });
    if (selectedServices.includes('sistema') && pages > 5) {
      sum += (pages - 5) * 200;
    }
    return Math.round(sum);
  }, [selectedServices, pages, selectedExtras]);

  return (
    <section className="py-20 sm:py-32 relative z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeader
          badge="Orçamento"
          badgeColor="cyan"
          title="Calcule seu"
          highlight="investimento."
          subtitle="Selecione os serviços desejados e receba uma estimativa instantânea."
        />

        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left: Options */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8 order-last lg:order-none">
              {/* Service Selection */}
              <div>
                <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calculator size={16} className="text-[#00BFFF]" />
                  Selecione os Serviços
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    const ServiceIcon = service.icon;
                    return (
                      <button
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 border ${
                          isSelected
                            ? 'bg-gradient-to-r from-white/[0.06] to-white/[0.02] border-[#00BFFF]/30 shadow-[0_0_15px_rgba(0,191,255,0.1)]'
                            : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-gradient-to-r ' + service.color : 'bg-white/[0.06]'
                        }`}>
                          {isSelected ? <Check size={18} className="text-white" /> : <ServiceIcon size={18} className="text-white/50" />}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-white/60'}`}>{service.label}</p>
                          <p className="text-[10px] text-white/30 font-medium">R$ {service.basePrice} - R$ {service.maxPrice}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pages Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">Número de Páginas</h4>
                  <span className="text-lg font-black text-[#00BFFF]">{pages}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={pages}
                  onChange={(e) => setPages(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#00BFFF] [&::-webkit-slider-thumb]:to-[#8B5CF6] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,191,255,0.4)] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/20"
                />
                <div className="flex justify-between mt-1.5 text-[10px] text-white/20 font-bold">
                  <span>1 página</span>
                  <span>20 páginas</span>
                </div>
              </div>

              {/* Extras */}
              <div>
                <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Extras</h4>
                <div className="space-y-2.5">
                  {extras.map((extra) => {
                    const isSelected = selectedExtras.includes(extra.id);
                    const ExtraIcon = extra.icon;
                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 border ${
                          isSelected
                            ? 'bg-white/[0.04] border-[#8B5CF6]/30'
                            : 'bg-white/[0.01] border-white/[0.06] hover:border-white/[0.12]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-[#8B5CF6]/20' : 'bg-white/[0.04]'
                          }`}>
                            <ExtraIcon size={14} className={isSelected ? 'text-[#8B5CF6]' : 'text-white/40'} />
                          </div>
                          <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-white/50'}`}>{extra.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-white/30">+R$ {extra.price}</span>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected ? 'bg-[#8B5CF6] border-[#8B5CF6]' : 'border-white/20'
                          }`}>
                            {isSelected && <Check size={12} className="text-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Result Panel */}
            <div className="lg:col-span-2 order-first lg:order-none">
              <div className="glass-premium rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:sticky lg:top-28">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00BFFF] via-[#8B5CF6] to-[#FF1493] rounded-t-2xl" />

                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Estimativa de Investimento</h4>

                {/* Selected items summary */}
                <div className="space-y-2 mb-6">
                  {selectedServices.length === 0 && selectedExtras.length === 0 ? (
                    <p className="text-sm text-white/30 text-center py-4">Selecione serviços ao lado para calcular</p>
                  ) : (
                    <>
                      {selectedServices.map(id => {
                        const s = serviceOptions.find(sv => sv.id === id);
                        return (
                          <div key={id} className="flex items-center justify-between text-sm">
                            <span className="text-white/60">{s.label}</span>
                            <span className="text-white/40 text-xs">R$ {s.basePrice}+</span>
                          </div>
                        );
                      })}
                      {selectedExtras.map(id => {
                        const e = extras.find(ex => ex.id === id);
                        return (
                          <div key={id} className="flex items-center justify-between text-sm">
                            <span className="text-white/60">{e.label}</span>
                            <span className="text-white/40 text-xs">R$ {e.price}</span>
                          </div>
                        );
                      })}
                      {pages > 1 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">{pages} páginas</span>
                          <span className="text-white/40 text-xs">incluso</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-white/[0.08] pt-6 mb-6">
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Total Estimado</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-white/40">R$</span>
                    <span className="text-3xl sm:text-5xl font-black text-gradient tracking-tight">
                      {total.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contato"
                  className="relative flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] text-white hover:scale-[1.02] active:scale-[0.98] transition-transform overflow-hidden shadow-[0_0_20px_rgba(0,191,255,0.2)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="hidden sm:inline">Solicitar Orçamento Detalhado</span>
                    <span className="sm:hidden">Solicitar Orçamento</span>
                    <ArrowRight size={16} />
                  </span>
                  <div className="absolute inset-0 shimmer" />
                </a>

                <p className="text-[10px] text-white/20 text-center mt-4 leading-relaxed">
                  *Valores estimados. O orçamento final pode variar conforme a complexidade do projeto.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
