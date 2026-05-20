import React, { useState, useEffect } from 'react';
import { Monitor, PenTool, Code, Zap, ArrowRight, ExternalLink, Package, ShoppingCart, Check } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ProjectPreviewModal } from './ProjectPreviewModal';

export const Solutions = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [previewData, setPreviewData] = useState({ isOpen: false, url: '', title: '' });
  const { currentUser } = useAuth(); // Usado futuramente para o checkout
  const { cart, addToCart, removeFromCart } = useCart();

  const handleOpenPreview = (url, title) => {
    setPreviewData({ isOpen: true, url, title });
  };

  useEffect(() => {
    // Buscar Produtos em Tempo Real do Firebase
    const qProducts = query(collection(db, 'products'));
    const unsub = onSnapshot(qProducts, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
    }, (err) => {
      console.error("Erro ao carregar produtos na home:", err);
    });
    return () => unsub();
  }, []);

  const services = [
    { Icon: Monitor, title: "Experiências Web", desc: "Landing pages de alta performance com animações interativas.", color: "from-[#00BFFF] to-[#8B5CF6]" },
    { Icon: PenTool, title: "Design UI/UX", desc: "Interfaces projetadas com foco absoluto na jornada do usuário.", color: "from-[#FF1493] to-[#8B5CF6]" },
    { Icon: Code, title: "Sistemas Sob Medida", desc: "Aplicações robustas escaláveis com tecnologias de ponta.", color: "from-[#8B5CF6] to-[#00BFFF]" },
    { Icon: Zap, title: "Otimização & SEO", desc: "Aceleração de performance para você dominar as buscas.", color: "from-[#FF8C00] to-[#FF1493]" },
  ];

  // Extrair categorias dinâmicas dos produtos para o filtro
  const dynamicFilters = ['Todos', ...new Set(products.map(p => p.type))];

  const filteredProducts = activeFilter === 'Todos' 
    ? products 
    : products.filter(p => p.type === activeFilter);

  // Efeito 3D para os cards
  const handleMouseMove = (e, id) => {
    const card = document.getElementById(`product-card-${id}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (id) => {
    const card = document.getElementById(`product-card-${id}`);
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <>
      <section id="solucoes" className="py-20 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          
          {/* PARTE 1: O QUE FAZEMOS DE MELHOR (Serviços Core) */}
          <div className="mb-20 sm:mb-32">
            <FadeIn>
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-black bg-[#00BFFF]/10 text-[#00BFFF] mb-4">
                  Nosso Core
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white">
                  O que fazemos de <span className="text-gradient">melhor.</span>
                </h3>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const { Icon } = service;
                return (
                  <FadeIn key={index} delay={index * 100} direction="up" className="h-full">
                    <div className="glass-card insane-hover p-6 rounded-3xl h-full flex flex-col group cursor-pointer relative overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-40 group-hover:opacity-100 transition-opacity`}></div>
                      <div className="relative mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${service.color} opacity-20 blur-md group-hover:opacity-40 transition-opacity`}></div>
                        <Icon size={24} className="text-[#00BFFF] relative z-10" />
                      </div>
                      <h4 className="text-lg font-black mb-2 text-white group-hover:text-[#00BFFF] transition-colors">{service.title}</h4>
                      <p className="text-sm text-gray-400 font-medium leading-relaxed">{service.desc}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* PARTE 2: CATÁLOGO DINÂMICO (Vem do ERP) */}
          <div className="border-t border-white/5 pt-20 sm:pt-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <FadeIn>
                <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-black bg-[#FF1493]/10 text-[#FF1493] mb-3 inline-block">
                  Catálogo & Projetos
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white">
                  Soluções e <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF1493] to-[#8B5CF6]">Infoprodutos.</span>
                </h3>
              </FadeIn>
              
              {/* Filtros Dinâmicos */}
              {products.length > 0 && (
                <FadeIn delay={200} direction="left">
                  <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl sm:rounded-full bg-white/5 border border-white/10 backdrop-blur-md justify-center">
                    {dynamicFilters.map(filter => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-xl sm:rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 insane-hover ${
                          activeFilter === filter
                            ? 'bg-gradient-to-r from-[#FF1493] to-[#8B5CF6] text-white shadow-[0_0_15px_rgba(255,20,147,0.4)]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-1000">
              {products.length === 0 ? (
                <div className="col-span-full py-20 text-center glass-card rounded-3xl border border-white/5 border-dashed">
                  <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Catálogo em Atualização</h3>
                  <p className="text-gray-400">Em breve novos produtos e projetos estarão disponíveis aqui.</p>
                </div>
              ) : (
                filteredProducts.map((item, index) => {
                  const isProject = item.type === 'Projeto';
                  const inCart = cart.find(c => c.id === item.id);

                  return (
                    <FadeIn key={item.id} delay={index * 100} className="h-full">
                      <div 
                        id={`product-card-${item.id}`}
                        className="glass-card rounded-3xl p-1 overflow-hidden group relative h-full transition-transform duration-200 ease-out will-change-transform flex flex-col"
                        onMouseMove={(e) => handleMouseMove(e, item.id)}
                        onMouseLeave={(e) => handleMouseLeave(item.id)}
                      >
                        {/* Imagem de Fundo para Projetos (se houver imageUrl) */}
                        {item.imageUrl && (
                          <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover filter blur-[2px] group-hover:blur-0 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/90 to-transparent"></div>
                          </div>
                        )}

                        <div className="bg-black/60 backdrop-blur-md rounded-[22px] p-6 sm:p-8 h-full flex flex-col relative z-10 overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors">
                          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isProject ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'}`}></div>
                          
                          {item.link && (
                            <button 
                              onClick={() => handleOpenPreview(item.link, item.name)} 
                              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:bg-white/20 hover:scale-110" 
                              title="Ver Link (Live Preview)"
                            >
                              <ExternalLink size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                            </button>
                          )}

                          <div className="flex justify-between items-start mb-6">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-lg ${isProject ? 'shadow-cyan-500/20' : 'shadow-purple-500/20'}`}>
                              {isProject ? <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" /> : <Package className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-white/10 text-white backdrop-blur-md border border-white/5">
                                {item.type}
                              </span>
                              {!isProject && (
                                <span className="px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-bold uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20">
                                  Valor Negociável
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <h3 className={`text-xl sm:text-2xl font-black text-white mb-2 leading-tight transition-colors ${isProject ? 'group-hover:text-cyan-400' : 'group-hover:text-purple-400'}`}>
                            {item.name}
                          </h3>
                          
                          {isProject ? (
                            <p className="text-gray-300 text-xs sm:text-sm mb-8 flex-grow font-medium leading-relaxed">{item.category || "Projeto Digital Exclusivo"}</p>
                          ) : (
                            <p className="text-gray-400 text-xs sm:text-sm mb-8 flex-grow leading-relaxed">Sistema desenvolvido sob medida focado em alta conversão e design de elite.</p>
                          )}
                          
                          <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-4 sm:pt-6">
                            {isProject ? (
                              <>
                                <div className="flex flex-col">
                                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Status</span>
                                  <span className="text-xs sm:text-sm font-black text-cyan-400">Online</span>
                                </div>
                                {item.link ? (
                                  <button 
                                    onClick={() => handleOpenPreview(item.link, item.name)}
                                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-cyan-500 hover:text-black text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                                  >
                                    Pré-Visualizar <ArrowRight size={14} />
                                  </button>
                                ) : (
                                  <span className="text-gray-500 text-xs">Em breve</span>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="flex flex-col">
                                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">A partir de</span>
                                  <span className="text-xl sm:text-2xl font-black text-white">R$ {(item.price || 0).toFixed(2)}</span>
                                </div>
                                <button 
                                  onClick={() => inCart ? removeFromCart(item.id) : addToCart(item)}
                                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg ${
                                    inCart 
                                    ? 'bg-green-500 text-white shadow-green-500/40' 
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/40'
                                  }`}
                                  title={inCart ? "Remover do Orçamento" : "Adicionar ao Orçamento"}
                                >
                                  {inCart ? <Check size={18} /> : <ShoppingCart size={18} />}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </section>

      {/* Renderiza o Modal Global de Preview */}
      <ProjectPreviewModal 
        isOpen={previewData.isOpen} 
        onClose={() => setPreviewData({ ...previewData, isOpen: false })} 
        url={previewData.url} 
        title={previewData.title} 
      />
    </>
  );
};
