import React, { useState } from 'react';
import { Plus, Trash2, Filter, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { triggerWebhook, N8N_WEBHOOKS } from '../../lib/n8n';

export const FinancialView = ({ transactions = [], showToast }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    category: 'Marketing',
    amount: '',
    type: 'expense', // 'expense' or 'income'
  });

  const expenseCategories = ['Marketing', 'Infraestrutura', 'Software', 'Operacional', 'Freelancer', 'Impostos', 'Outros'];
  const incomeCategories = ['Projeto Web', 'Design UI/UX', 'Consultoria', 'Infoproduto', 'Mentoria', 'Manutenção', 'Outros'];
  
  const currentCategories = newTransaction.type === 'expense' ? expenseCategories : incomeCategories;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'transactions'), {
        description: newTransaction.description,
        category: newTransaction.category,
        amount: parseFloat(newTransaction.amount),
        type: newTransaction.type,
        date: serverTimestamp(),
      });
      // Disparar webhook n8n (fire-and-forget)
      triggerWebhook(N8N_WEBHOOKS.NOVA_TRANSACAO, {
        type: newTransaction.type,
        description: newTransaction.description,
        category: newTransaction.category,
        amount: parseFloat(newTransaction.amount),
      });

      setNewTransaction({ description: '', category: 'Marketing', amount: '', type: 'expense' });
      setIsAdding(false);
      showToast(
        newTransaction.type === 'income' 
          ? 'Receita registrada com sucesso!' 
          : 'Despesa registrada com sucesso!', 
        'success'
      );
    } catch (err) {
      console.error('Erro ao salvar transação:', err);
      showToast('Erro ao salvar no banco de dados.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (transactionId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta transação?')) return;
    try {
      await deleteDoc(doc(db, 'transactions', transactionId));
      showToast('Transação excluída com sucesso.', 'success');
    } catch (err) {
      console.error('Erro ao excluir:', err);
      showToast('Erro ao excluir transação.', 'error');
    }
  };

  // Derive unique categories from all transactions
  const allCategories = ['Todas', ...new Set(transactions.map(t => t.category).filter(Boolean))];
  
  // Filter transactions
  const filtered = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterCategory !== 'Todas' && t.category !== filterCategory) return false;
    return true;
  });

  // Summary calculations
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + (t.amount || 0), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + (t.amount || 0), 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6 animate-[fadeUp_0.5s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Gestão Financeira</h2>
          <p className="text-gray-400 mt-1 font-medium">Lançamento de receitas e despesas — persistido no Firebase em tempo real.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-5 py-2.5 text-white rounded-xl shadow-lg text-sm font-bold transition-all flex items-center gap-2 hover-lift ${
            isAdding ? 'bg-zinc-700 hover:bg-zinc-600' : 'bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] shadow-[0_0_15px_rgba(0,191,255,0.3)]'
          }`}
        >
          {isAdding ? 'Cancelar' : <><Plus className="w-4 h-4" /> Nova Transação</>}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-green-500">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Receitas</span>
          </div>
          <p className="text-2xl font-black text-green-400">R$ {totalIncome.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-pink-500">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-pink-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Despesas</span>
          </div>
          <p className="text-2xl font-black text-pink-400">R$ {totalExpenses.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
        </div>
        <div className={`glass-card p-5 rounded-2xl border-l-4 ${balance >= 0 ? 'border-l-cyan-500' : 'border-l-red-500'}`}>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Saldo</span>
          </div>
          <p className={`text-2xl font-black ${balance >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
            R$ {balance.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </p>
        </div>
      </div>

      {/* Add Transaction Form */}
      {isAdding && (
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-[#00BFFF] animate-[fadeUp_0.3s_ease-out]">
          <form onSubmit={handleAdd} className="space-y-4">
            {/* Type Toggle */}
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 w-fit">
              <button type="button"
                onClick={() => setNewTransaction({...newTransaction, type: 'income', category: 'Projeto Web'})}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  newTransaction.type === 'income' 
                    ? 'bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                    : 'text-gray-400 hover:text-white'
                }`}>
                💰 Receita
              </button>
              <button type="button"
                onClick={() => setNewTransaction({...newTransaction, type: 'expense', category: 'Marketing'})}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  newTransaction.type === 'expense' 
                    ? 'bg-pink-500/20 text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.2)]' 
                    : 'text-gray-400 hover:text-white'
                }`}>
                💸 Despesa
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descrição</label>
                <input type="text" required
                  value={newTransaction.description} onChange={e => setNewTransaction({...newTransaction, description: e.target.value})}
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-[#00BFFF]/50 focus:outline-none transition-colors text-sm" 
                  placeholder={newTransaction.type === 'income' ? 'Ex: Projeto Landing Page' : 'Ex: Anúncios Meta Ads'} 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Categoria</label>
                <select value={newTransaction.category} onChange={e => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-[#00BFFF]/50 focus:outline-none transition-colors text-sm">
                  {currentCategories.map(cat => (
                    <option key={cat} value={cat} className="bg-zinc-900 text-white">{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Valor (R$)</label>
                <input type="number" step="0.01" required min="0.01"
                  value={newTransaction.amount} onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})}
                  className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-[#00BFFF]/50 focus:outline-none transition-colors text-sm" 
                  placeholder="0.00" 
                />
              </div>
            </div>
            <button disabled={loading} type="submit" 
              className={`w-full md:w-auto px-8 py-2.5 text-white rounded-xl font-bold transition-all h-[46px] shadow-lg disabled:opacity-50 ${
                newTransaction.type === 'income' 
                  ? 'bg-green-500 hover:bg-green-400 shadow-green-500/30' 
                  : 'bg-pink-500 hover:bg-pink-400 shadow-pink-500/30'
              }`}>
              {loading ? 'Salvando...' : `Registrar ${newTransaction.type === 'income' ? 'Receita' : 'Despesa'}`}
            </button>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Filtros:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'income', label: '💰 Receitas' },
            { id: 'expense', label: '💸 Despesas' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === f.id 
                  ? 'bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/30' 
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:text-white'
              }`}>
              {f.label}
            </button>
          ))}
        </div>
        {allCategories.length > 1 && (
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-bold text-gray-400 focus:outline-none focus:border-[#00BFFF]/30">
            {allCategories.map(cat => (
              <option key={cat} value={cat} className="bg-zinc-900 text-white">{cat}</option>
            ))}
          </select>
        )}
      </div>

      {/* Transactions Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-5 font-semibold border-b border-white/10">Tipo</th>
                <th className="p-5 font-semibold border-b border-white/10">Data</th>
                <th className="p-5 font-semibold border-b border-white/10">Descrição</th>
                <th className="p-5 font-semibold border-b border-white/10">Categoria</th>
                <th className="p-5 font-semibold border-b border-white/10 text-right">Valor</th>
                <th className="p-5 font-semibold border-b border-white/10 text-center w-16">Ação</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">Nenhuma transação encontrada.</td>
                </tr>
              ) : filtered.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      t.type === 'income' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-pink-500/10 text-pink-400 border-pink-500/20'
                    }`}>
                      {t.type === 'income' ? '↑ Receita' : '↓ Despesa'}
                    </span>
                  </td>
                  <td className="p-5 text-gray-400 font-medium">{t.date}</td>
                  <td className="p-5 font-bold text-white">{t.description}</td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-xs font-bold">
                      {t.category}
                    </span>
                  </td>
                  <td className={`p-5 text-right font-black ${t.type === 'income' ? 'text-green-400' : 'text-pink-400'}`}>
                    {t.type === 'income' ? '+' : '-'} R$ {(t.amount || 0).toFixed(2)}
                  </td>
                  <td className="p-5 text-center">
                    <button 
                      onClick={() => handleDelete(t.id)}
                      className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Excluir transação"
                    >
                      <Trash2 size={14} />
                    </button>
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
