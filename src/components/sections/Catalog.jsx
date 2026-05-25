import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Monitor, PenTool, Code, Zap, ArrowRight, ExternalLink, Package, ShoppingCart, Check, ChevronDown, Clock, Layers } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useCart } from '../../context/CartContext';
import { ProjectPreviewModal } from './ProjectPreviewModal';

// ==================== DATA ====================
const services = [
  {
    Icon: Monitor,
    title: 'Experiências Web',
    desc: 'Landing pages de alta performance com animações interativas e design imersivo que converte visitantes em clientes.',
    gradient: 'from-[#00BFFF] to-[#8B5CF6]',
    features: ['Design Responsivo', 'Animações CSS', 'SEO Otimizado', 'Performance 95+'],
    tiers: [
      { name: 'Essencial', price: 'R$ 500', desc: '1 página, design responsivo' },
      { name: 'Profissional', price: 'R$ 1.200', desc: 'Até 5 páginas, animações, SEO', recommended: true },
      { name: 'Premium', price: 'Sob Consulta', desc: 'Projeto completo customizado' },
    ],
    deliveryTime: '7-15 dias',
    techStack: ['React', 'Tailwind', 'Vite'],
  },
  {
    Icon: PenTool,
    title: 'Design UI/UX',
    desc: 'Interfaces projetadas com foco absoluto na jornada e satisfação do usuário. Wireframes, protótipos e design system.',
    gradient: 'from-[#FF1493] to-[#8B5CF6]',
    features: ['Figma Profissional', 'User Research', 'Design System', 'Protótipos'],
    tiers: [
      { name: 'Essencial', price: 'R$ 800', desc: 'Wireframes + 3 telas' },
      { name: 'Profissional', price: 'R$ 2.000', desc: 'Design system completo', recommended: true },
      { name: 'Premium', price: 'Sob Consulta', desc: 'Branding + UI completo' },
    ],
    deliveryTime: '10-20 dias',
    techStack: ['Figma', 'Adobe XD'],
  },
  {
    Icon: Code,
    title: 'Sistemas Sob Medida',
    desc: 'Aplicações robustas e escaláveis com tecnologias de ponta. Dashboards, painéis admin, SaaS completos.',
    gradient: 'from-[#8B5CF6] to-[#00BFFF]',
    features: ['React / Next.js', 'Firebase / API', 'Painel Admin', 'Deploy'],
    tiers: [
      { name: 'Essencial', price: 'R$ 2.000', desc: 'MVP funcional básico' },
      { name: 'Profissional', price: 'R$ 5.000', desc: 'Sistema completo + admin', recommended: true },
      { name: 'Premium', price: 'Sob Consulta', desc: 'SaaS enterprise completo' },
    ],
    deliveryTime: '20-45 dias',
    techStack: ['React', 'Node.js', 'Firebase'],
  },
  {
    Icon: Zap,
    title: 'Otimização & SEO',
    desc: 'Aceleração de performance para dominar as buscas e converter mais. Core Web Vitals e PageSpeed 95+.',
    gradient: 'from-[#FF8C00] to-[#FF1493]',
    features: ['PageSpeed 95+', 'Google Analytics', 'Meta Tags', 'Sitemap'],
    tiers: [
      { name: 'Essencial', price: 'R$ 300', desc: 'Auditoria + otimização básica' },
      { name: 'Profissional', price: 'R$ 800', desc: 'SEO completo + analytics', recommended: true },
      { name: 'Premium', price: 'Sob Consulta', desc: 'Estratégia SEO contínua' },
    ],
    deliveryTime: '5-10 dias',
    techStack: ['Lighthouse', 'Analytics'],
  },
];

// ==================== SKELETON ====================
const SkeletonCard = () => (
  <div className="glass-card rounded-2xl p-6 h-[320px] flex flex-col gap-4">
    <div className="skeleton h-4 w-24" />
    <div className="skeleton h-32 w-full rounded-xl" />
    <div className="skeleton h-4 w-3/4" />
    <div className="skeleton h-4 w-1/2" />
    <div className="flex justify-between mt-auto">
      <div className="skeleton h-8 w-24" />
      <div className="skeleton h-10 w-10 rounded-full" />
    </div>
  </div>
);

// ==================== SERVICE CARD ====================
const ServiceCard = ({ service, index }) => {
  const [expanded, setExpanded] = useState(false);
  const { Icon } = service;

  return (
    <FadeIn delay={index * 100} direction="up" className="h-full">
      <div className="glass-card md:hover-glow rounded-2xl sm:rounded-3xl h-full flex flex-col group cursor-pointer relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradient} opacity-40 group-hover:opacity-100 transition-opacity`} />

        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          {/* Icon + Title */}
          <div className="relative mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 transition-transform duration-500">
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-tr ${service.gradient} opacity-15 blur-md group-hover:opacity-30 transition-opacity`} />
            <Icon size={22} className="text-[#00BFFF] relative z-10" />
          </div>

          <h4 className="text-base sm:text-lg font-black mb-2 text-white group-hover:text-[#00BFFF] transition-colors">{service.title}</h4>
          <p className="text-xs sm:text-sm text-white/40 font-medium leading-relaxed mb-4">{service.desc}</p>

          {/* Features */}
          <ul className="mb-4 space-y-1.5 flex-grow">
            {service.features.map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-[11px] text-white/30 font-medium">
                <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.gradient} shrink-0`} />
                {feat}
              </li>
            ))}
          </ul>

          {/* Delivery + Tech */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/[0.04] text-white/40 border border-white/[0.06]">
              <Clock size={10} /> {service.deliveryTime}
            </span>
            {service.techStack.map((tech, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/[0.06] text-white/50 border border-white/[0.04]">
                {tech}
              </span>
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              expanded
                ? 'bg-gradient-to-r from-[#00BFFF]/10 to-[#8B5CF6]/10 border-[#00BFFF]/30 text-[#00BFFF]'
                : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:text-white hover:border-white/20'
            }`}
          >
            Ver Planos
            <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expandable Pricing Tiers */}
        {expanded && (
          <div className="border-t border-white/[0.06] p-4 space-y-3 animate-expand">
            {service.tiers.map((tier, i) => (
              <div
                key={i}
                className={`relative p-4 rounded-xl transition-all ${
                  tier.recommended
                    ? 'bg-gradient-to-r from-[#00BFFF]/10 to-[#8B5CF6]/10 border border-[#00BFFF]/30 shadow-[0_0_20px_rgba(0,191,255,0.1)]'
                    : 'bg-white/[0.02] border border-white/[0.06]'
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] text-white">
                    Recomendado
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-white">{tier.name}</h5>
                    <p className="text-[10px] text-white/40 mt-0.5">{tier.desc}</p>
                  </div>
                  <span className={`text-base font-black ${tier.recommended ? 'text-[#00BFFF]' : 'text-white/70'}`}>
                    {tier.price}
                  </span>
                </div>
              </div>
            ))}
            <a
              href="#contato"
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${service.gradient} text-white hover:scale-[1.02] transition-transform`}
            >
              Solicitar Orçamento <ArrowRight size={14} />
            </a>
          </div>
        )}
      </div>
    </FadeIn>
  );
};

// ==================== PRODUCT CARD (Infoprodutos/Projetos) ====================
const ProductCard = ({ item, index, onPreview }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const isProject = item.type === 'Projeto';
  const inCart = cart.find(c => c.id === item.id);

  return (
    <FadeIn delay={index * 100} className="h-full">
      <GlassCard className="p-1 overflow-hidden group h-full flex flex-col relative">
        {/* Ribbons */}
        {item.tag === 'novo' && <div className="ribbon ribbon-new">🆕 Novo</div>}
        {item.tag === 'popular' && <div className="ribbon ribbon-popular">⭐ Popular</div>}

        {/* Background Image */}
        {item.imageUrl && (
          <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover blur-[2px] group-hover:blur-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/90 to-transparent" />
          </div>
        )}

        <div className="bg-black/60 backdrop-blur-md rounded-[20px] p-4 sm:p-8 h-full flex flex-col relative z-10 border border-white/[0.04] group-hover:border-white/[0.08] transition-colors">
          <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${isProject ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'}`} />

          {item.link && (
            <button
              onClick={() => onPreview(item.link, item.name)}
              className="absolute top-4 right-4 w-9 h-9 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/15 bg-white/[0.06] text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-white/15"
            >
              <ExternalLink size={14} />
            </button>
          )}

          {/* Header */}
          <div className="flex justify-between items-start mb-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 transition-transform duration-500`}>
              {isProject ? <Monitor className="w-5 h-5 text-cyan-400" /> : <Package className="w-5 h-5 text-purple-400" />}
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/[0.06] text-white/70 border border-white/[0.04]">
                {item.type}
              </span>
              {!isProject && (
                <span className="px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20">
                  Valor Negociável
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <h3 className={`text-lg sm:text-xl font-black text-white mb-2 leading-tight transition-colors ${isProject ? 'group-hover:text-cyan-400' : 'group-hover:text-purple-400'}`}>
            {item.name}
          </h3>
          <p className="text-white/40 text-xs sm:text-sm mb-6 flex-grow leading-relaxed">
            {isProject ? (item.category || 'Projeto Digital Exclusivo') : 'Sistema desenvolvido sob medida focado em alta conversão.'}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-end justify-between border-t border-white/[0.06] pt-4">
            {isProject ? (
              <>
                <div>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Status</span><br />
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                    </span>
                    Online
                  </span>
                </div>
                {item.link ? (
                  <button
                    onClick={() => onPreview(item.link, item.name)}
                    className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-cyan-500 hover:text-black text-white font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center gap-2"
                  >
                    Visualizar <ArrowRight size={12} />
                  </button>
                ) : (
                  <span className="text-white/20 text-xs">Em breve</span>
                )}
              </>
            ) : (
              <>
                <div>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">A partir de</span><br />
                  <span className="text-lg sm:text-xl font-black text-white">R$ {(item.price || 0).toFixed(2)}</span>
                </div>
                <button
                  onClick={() => inCart ? removeFromCart(item.id) : addToCart(item)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    inCart ? 'bg-[#10B981] text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}
                >
                  {inCart ? <Check size={16} /> : <ShoppingCart size={16} />}
                </button>
              </>
            )}
          </div>
        </div>
      </GlassCard>
    </FadeIn>
  );
};

// ==================== MAIN COMPONENT ====================
export const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('servicos');
  const [previewData, setPreviewData] = useState({ isOpen: false, url: '', title: '' });

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsub = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      console.error('Erro ao carregar produtos:', err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handlePreview = useCallback((url, title) => {
    setPreviewData({ isOpen: true, url, title });
  }, []);

  const infoprodutos = useMemo(() => products.filter(p => p.type !== 'Projeto'), [products]);
  const projetos = useMemo(() => products.filter(p => p.type === 'Projeto'), [products]);

  const tabs = [
    { id: 'servicos', label: 'Nossos Serviços', icon: Zap, count: services.length },
    { id: 'infoprodutos', label: 'Infoprodutos', icon: Package, count: infoprodutos.length },
    { id: 'projetos', label: 'Projetos', icon: Monitor, count: projetos.length },
  ];

  const renderEmptyState = (type) => (
    <div className="col-span-full py-16 text-center glass-card rounded-3xl border-dashed">
      <Package className="w-14 h-14 text-white/15 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Catálogo em Atualização</h3>
      <p className="text-white/40 text-sm mb-6">
        Em breve novos {type === 'infoprodutos' ? 'infoprodutos' : 'projetos'} estarão disponíveis.
      </p>
      <a
        href="#contato"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF1493] to-[#8B5CF6] text-white text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform"
      >
        Solicitar {type === 'infoprodutos' ? 'Produto' : 'Projeto'} <ArrowRight size={14} />
      </a>
    </div>
  );

  const renderSkeletons = () => (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );

  return (
    <>
      <section id="solucoes" className="py-20 sm:py-32 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Header */}
          <SectionHeader
            badge="Catálogo & Soluções"
            badgeColor="pink"
            title="Soluções e"
            highlight="Infoprodutos."
          />

          {/* Tabs */}
          <FadeIn delay={100}>
            <div className="flex items-center gap-1.5 p-1 rounded-xl sm:rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md mb-10 sm:mb-14 overflow-x-auto snap-x sm:overflow-visible sm:justify-center">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-6 py-2 rounded-xl sm:rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 whitespace-nowrap snap-item ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF1493] to-[#8B5CF6] text-white shadow-[0_0_15px_rgba(255,20,147,0.3)]'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <TabIcon size={14} />
                    {tab.label}
                    {tab.count > 0 && (
                      <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-black ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-white/30'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Tab Content */}
          {activeTab === 'servicos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          )}

          {activeTab === 'infoprodutos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {loading ? renderSkeletons() : (
                infoprodutos.length === 0 ? renderEmptyState('infoprodutos') : (
                  infoprodutos.map((item, index) => (
                    <ProductCard key={item.id} item={item} index={index} onPreview={handlePreview} />
                  ))
                )
              )}
            </div>
          )}

          {activeTab === 'projetos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {loading ? renderSkeletons() : (
                projetos.length === 0 ? renderEmptyState('projetos') : (
                  projetos.map((item, index) => (
                    <ProductCard key={item.id} item={item} index={index} onPreview={handlePreview} />
                  ))
                )
              )}
            </div>
          )}
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
