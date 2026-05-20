import React, { useState, useEffect } from 'react';
import { Monitor, ArrowRight, ExternalLink, Package, ShoppingCart, Check } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { SectionHeader } from '../ui/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useCart } from '../../context/CartContext';
import { ProjectPreviewModal } from './ProjectPreviewModal';

export const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [previewData, setPreviewData] = useState({ isOpen: false, url: '', title: '' });
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsub = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => console.error("Erro ao carregar produtos:", err));
    return () => unsub();
  }, []);

  const filters = ['Todos', ...new Set(products.map(p => p.type))];
  const filtered = activeFilter === 'Todos' ? products : products.filter(p => p.type === activeFilter);

  return (
    <>
      <section id="solucoes" className="py-20 sm:py-32 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeader
              badge="Catálogo & Projetos"
              badgeColor="pink"
              title="Soluções e"
              highlight="Infoprodutos."
              align="left"
            />
            
            {products.length > 0 && (
              <FadeIn delay={200} direction="left">
                <div className="flex flex-wrap gap-2 p-1.5 rounded-xl sm:rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
                  {filters.map(filter => (
                    <button key={filter} onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg sm:rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
                        activeFilter === filter
                          ? 'bg-gradient-to-r from-[#FF1493] to-[#8B5CF6] text-white shadow-[0_0_15px_rgba(255,20,147,0.3)]'
                          : 'text-white/40 hover:text-white'
                      }`}>
                      {filter}
                    </button>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.length === 0 ? (
              <div className="col-span-full py-20 text-center glass-card rounded-3xl border-dashed">
                <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Catálogo em Atualização</h3>
                <p className="text-white/40">Em breve novos produtos estarão disponíveis.</p>
              </div>
            ) : (
              filtered.map((item, index) => {
                const isProject = item.type === 'Projeto';
                const inCart = cart.find(c => c.id === item.id);
                return (
                  <FadeIn key={item.id} delay={index * 100} className="h-full">
                    <GlassCard className="p-1 overflow-hidden group h-full flex flex-col">
                      {item.imageUrl && (
                        <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover blur-[2px] group-hover:blur-0 transition-all duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/90 to-transparent" />
                        </div>
                      )}

                      <div className="bg-black/60 backdrop-blur-md rounded-[20px] p-6 sm:p-8 h-full flex flex-col relative z-10 border border-white/[0.04] group-hover:border-white/[0.08] transition-colors">
                        <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${isProject ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'}`} />
                        
                        {item.link && (
                          <button onClick={() => setPreviewData({ isOpen: true, url: item.link, title: item.name })}
                            className="absolute top-4 right-4 w-9 h-9 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/15 bg-white/[0.06] text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-white/15">
                            <ExternalLink size={14} />
                          </button>
                        )}

                        <div className="flex justify-between items-start mb-5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 transition-transform duration-500`}>
                            {isProject ? <Monitor className="w-5 h-5 text-cyan-400" /> : <Package className="w-5 h-5 text-purple-400" />}
                          </div>
                          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/[0.06] text-white/70 border border-white/[0.04]">
                            {item.type}
                          </span>
                        </div>
                        
                        <h3 className={`text-lg sm:text-xl font-black text-white mb-2 leading-tight transition-colors ${isProject ? 'group-hover:text-cyan-400' : 'group-hover:text-purple-400'}`}>
                          {item.name}
                        </h3>
                        <p className="text-white/40 text-xs sm:text-sm mb-6 flex-grow leading-relaxed">
                          {isProject ? (item.category || "Projeto Digital Exclusivo") : "Sistema desenvolvido sob medida focado em alta conversão."}
                        </p>
                        
                        <div className="mt-auto flex items-end justify-between border-t border-white/[0.06] pt-4">
                          {isProject ? (
                            <>
                              <div><span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Status</span><br/><span className="text-xs font-black text-cyan-400">Online</span></div>
                              {item.link ? (
                                <button onClick={() => setPreviewData({ isOpen: true, url: item.link, title: item.name })}
                                  className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-cyan-500 hover:text-black text-white font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center gap-2">
                                  Visualizar <ArrowRight size={12} />
                                </button>
                              ) : <span className="text-white/20 text-xs">Em breve</span>}
                            </>
                          ) : (
                            <>
                              <div><span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">A partir de</span><br/><span className="text-lg sm:text-xl font-black text-white">R$ {(item.price || 0).toFixed(2)}</span></div>
                              <button onClick={() => inCart ? removeFromCart(item.id) : addToCart(item)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                  inCart ? 'bg-[#10B981] text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                }`}>
                                {inCart ? <Check size={16} /> : <ShoppingCart size={16} />}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </FadeIn>
                );
              })
            )}
          </div>
        </div>
      </section>
      <ProjectPreviewModal isOpen={previewData.isOpen} onClose={() => setPreviewData({ ...previewData, isOpen: false })} url={previewData.url} title={previewData.title} />
    </>
  );
};
