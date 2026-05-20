import React from 'react';
import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, cart, updateQuantity, removeFromCart, cartTotal, checkoutWhatsApp } = useCart();

  return (
    <>
      {/* Overlay Escuro */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Painel Lateral */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#09090B] border-l border-white/10 z-[101] shadow-2xl flex flex-col transition-transform duration-500 ease-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-purple-500" size={24} />
            <div>
              <h3 className="text-xl font-black text-white">Seu Orçamento</h3>
              <p className="text-xs text-purple-400 font-bold uppercase tracking-wider mt-1">Valores Base Estimados</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de Produtos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
              <ShoppingBag size={48} className="text-gray-500 mb-4" />
              <p className="text-gray-400 font-medium">Seu orçamento está vazio.</p>
              <p className="text-xs text-gray-500 mt-2">Adicione soluções do catálogo.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col gap-3 group">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h4 className="text-white font-bold text-sm mb-1 leading-tight">{item.name}</h4>
                    <span className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">{item.type}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400/50 hover:text-red-400 transition-colors mt-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="flex justify-between items-end mt-2">
                  <div className="flex items-center gap-3 bg-black/40 rounded-full border border-white/10 px-2 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-white/10 rounded-full text-gray-400 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white font-bold text-xs w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-white/10 rounded-full text-gray-400 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-black text-sm">R$ {((item.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé de Checkout */}
        <div className="p-6 border-t border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex justify-between items-end mb-6">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Valor Médio</span>
            <span className="text-3xl font-black text-white">R$ {cartTotal.toFixed(2)}</span>
          </div>
          <button 
            onClick={checkoutWhatsApp}
            disabled={cart.length === 0}
            className={`w-full h-14 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] ${
              cart.length === 0 ? 'bg-gray-800 text-gray-500 cursor-not-allowed shadow-none' : 'bg-[#25D366] hover:bg-[#1EBE5D] text-white'
            }`}
          >
            <MessageCircle size={24} />
            Realizar Orçamento
          </button>
          <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest leading-relaxed">
            Nenhum pagamento é processado agora.<br/>Você negociará diretamente via WhatsApp.
          </p>
        </div>
      </div>
    </>
  );
};
