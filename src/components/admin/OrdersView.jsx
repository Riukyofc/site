import React, { useState } from 'react';
import { Search, Filter, Package, ShieldCheck, Lock, AlertCircle, Key, Loader2, CheckCircle2 } from 'lucide-react';

export const OrdersView = ({ orders, setOrders, showToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingToken, setLoadingToken] = useState(null);

  const filteredOrders = orders.filter(o => 
    o.customer?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateToken = (orderId) => {
    setLoadingToken(orderId);
    setTimeout(() => {
      const newToken = `SEC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      // Numa app real, atualizaríamos o Firestore aqui
      setOrders(orders.map(o => o.id === orderId ? { ...o, token: newToken } : o));
      setLoadingToken(null);
      showToast(`Token gerado e enviado para o pedido ${orderId}`, 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-[fadeUp_0.5s_ease-out]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Controle de Entregas e Pedidos</h2>
          <p className="text-gray-400 mt-1 font-medium">Gestão de vendas, liberação de tokens de acesso e proteção legal (Anti-fraude).</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/[0.02]">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar por ID ou Nome do cliente..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
          <button className="p-2.5 bg-black/50 border border-white/10 rounded-xl text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-5 font-semibold border-b border-white/10">Transação</th>
                <th className="p-5 font-semibold border-b border-white/10">Cliente & Produto</th>
                <th className="p-5 font-semibold border-b border-white/10">Status Financeiro</th>
                <th className="p-5 font-semibold border-b border-white/10">Segurança & Entrega</th>
                <th className="p-5 font-semibold border-b border-white/10 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">Nenhum pedido encontrado.</td>
                </tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5">
                    <div className="font-semibold text-white">{order.id}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.date}</div>
                  </td>
                  <td className="p-5">
                    <div className="font-medium text-white">{order.customer}</div>
                    <div className="text-xs text-cyan-400 mt-1 flex items-center gap-1">
                      <Package className="w-3 h-3" /> {order.product}
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border ${
                      order.status === 'Pago' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      order.status === 'Pendente' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {order.status} • R$ {order.amount?.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 text-xs">
                        {order.termsAccepted && <ShieldCheck className="w-4 h-4 text-green-400" />}
                        <span className="text-gray-400">Termos e IP Registrados</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        {order.refundBlocked ? (
                          <><Lock className="w-4 h-4 text-purple-400" /><span className="text-purple-400 font-medium">Reembolso Bloqueado</span></>
                        ) : (
                          <><AlertCircle className="w-4 h-4 text-yellow-400" /><span className="text-yellow-400">Em Prazo de Garantia</span></>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    {order.status === 'Pago' && !order.token ? (
                      <button 
                        onClick={() => generateToken(order.id)}
                        disabled={loadingToken === order.id}
                        className="inline-flex items-center justify-center min-w-[140px] px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-xs font-bold hover:shadow-[0_0_15px_rgba(0,191,255,0.4)] transition-all disabled:opacity-50"
                      >
                        {loadingToken === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Key className="w-3 h-3 mr-2" /> Liberar Acesso</>}
                      </button>
                    ) : order.token ? (
                      <span className="inline-flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-mono font-bold shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                        {order.token} <CheckCircle2 className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs italic">Aguardando Pagamento</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
