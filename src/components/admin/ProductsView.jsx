import React, { useState } from 'react';
import { Plus, Package, Trash2, X } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const ProductsView = ({ products }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: 'Web',
    price: '',
    link: '',
    imageUrl: '',
    status: 'Ativo',
    color: 'bg-cyan-500' // Visual decorator color
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
        price: newProduct.price ? parseFloat(newProduct.price) : 0,
        sales: 0, // Starts at 0 sales
        createdAt: new Date()
      });
      setIsAdding(false);
      setNewProduct({ name: '', type: 'Web', price: '', link: '', imageUrl: '', status: 'Ativo', color: 'bg-cyan-500' });
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      alert('Erro ao salvar produto no banco de dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto do catálogo? Isso o removerá da página principal.')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
      } catch (err) {
        console.error('Erro ao excluir:', err);
      }
    }
  };

  return (
    <div className="space-y-6 animate-[fadeUp_0.5s_ease-out]">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Catálogo Digital (Home)</h2>
          <p className="text-gray-400 mt-1 font-medium">Gerencie os produtos/serviços que aparecem na página inicial.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-5 py-2.5 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2 insane-hover shadow-lg ${
            isAdding ? 'bg-zinc-700 hover:bg-zinc-600' : 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
          }`}
        >
          {isAdding ? <><X className="w-4 h-4"/> Cancelar</> : <><Plus className="w-4 h-4" /> Novo Produto</>}
        </button>
      </div>

      {isAdding && (
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-purple-500 animate-fade-in bg-white/[0.02]">
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nome do Produto</label>
              <input 
                type="text" required
                value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-purple-500/50 outline-none" 
                placeholder="Ex: Landing Page Premium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Categoria</label>
              <select 
                value={newProduct.type} onChange={e => setNewProduct({...newProduct, type: e.target.value})}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-purple-500/50 outline-none"
              >
                <option value="Projeto" className="bg-zinc-900">Projeto (Gratuito)</option>
                <option value="Web" className="bg-zinc-900">Web</option>
                <option value="App" className="bg-zinc-900">App</option>
                <option value="E-book" className="bg-zinc-900">E-book</option>
                <option value="Mentoria" className="bg-zinc-900">Mentoria</option>
                <option value="SaaS" className="bg-zinc-900">SaaS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Preço (R$) - Opcional</label>
              <input 
                type="number" step="0.01" min="0"
                value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-purple-500/50 outline-none" 
                placeholder="2997.00" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Link do Projeto (Opcional)</label>
              <input 
                type="url"
                value={newProduct.link} onChange={e => setNewProduct({...newProduct, link: e.target.value})}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-purple-500/50 outline-none text-sm" 
                placeholder="https://..." 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">URL da Imagem (Opcional)</label>
              <input 
                type="url"
                value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}
                className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-purple-500/50 outline-none text-sm" 
                placeholder="https://..." 
              />
            </div>
            <button disabled={loading} type="submit" className="w-full lg:col-span-2 xl:col-span-5 h-[46px] bg-purple-500 hover:bg-purple-400 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-50 mt-2">
              {loading ? 'Salvando...' : 'Adicionar ao Site'}
            </button>
          </form>
        </div>
      )}

      {products.length === 0 && !isAdding ? (
        <div className="text-center py-20 glass-card rounded-2xl border border-white/5 border-dashed">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Nenhum produto cadastrado</h3>
          <p className="text-gray-400 text-sm">Adicione produtos para que eles apareçam na sua vitrine inicial.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <div key={product.id} className="glass-card rounded-3xl p-1 overflow-hidden animate-[fadeUp_0.5s_ease-out] group insane-hover relative">
              <div className="bg-black/40 rounded-[22px] p-6 h-full flex flex-col relative overflow-hidden border border-white/5">
                <div className={`absolute top-0 left-0 w-full h-1 ${product.color || 'bg-purple-500'}`}></div>
                
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100 z-10"
                  title="Remover do site"
                >
                  <Trash2 size={16} />
                </button>

                <div className="flex justify-between items-start mb-6 mt-2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold tracking-wide bg-green-500/10 text-green-400 border border-green-500/20">
                    {product.status || 'Ativo'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 leading-tight pr-8">{product.name}</h3>
                <p className="text-sm font-bold text-cyan-400 mb-6 bg-cyan-500/10 inline-block px-3 py-1 rounded-lg self-start border border-cyan-500/20">
                  {product.type}
                </p>
                
                <div className="mt-auto grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Valor Oficial</p>
                    <p className="text-xl font-black text-white">R$ {(product.price || 0).toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Vendas Totais</p>
                    <p className="text-xl font-black text-purple-400">{product.sales || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
