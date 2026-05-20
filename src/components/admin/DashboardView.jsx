import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Download, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';

export const DashboardView = ({ transactions = [], products = [] }) => {
  const stats = useMemo(() => {
    const incomes = transactions.filter(t => t.type === 'income');
    const expenses = transactions.filter(t => t.type === 'expense');
    
    const totalReceitas = incomes.reduce((acc, t) => acc + (t.amount || 0), 0);
    const totalDespesas = expenses.reduce((acc, t) => acc + (t.amount || 0), 0);
    const lucro = totalReceitas - totalDespesas;
    const margem = totalReceitas > 0 ? ((lucro / totalReceitas) * 100).toFixed(1) : 0;
    
    // Expense Distribution by Category
    const expByCategory = expenses.reduce((acc, t) => {
      if (t.category) {
        acc[t.category] = (acc[t.category] || 0) + (t.amount || 0);
      }
      return acc;
    }, {});
    
    const pieData = Object.keys(expByCategory).map(key => ({
      name: key,
      value: expByCategory[key]
    }));

    // Monthly data - group transactions by month
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const monthlyMap = {};
    
    transactions.forEach(t => {
      let month;
      if (t.date) {
        // t.date could be a string like "2026-05-20" or a Date object
        const dateStr = typeof t.date === 'string' ? t.date : t.date;
        const monthIdx = parseInt(dateStr.substring(5, 7), 10) - 1;
        month = monthNames[monthIdx] || 'N/A';
      } else {
        month = monthNames[new Date().getMonth()];
      }
      
      if (!monthlyMap[month]) {
        monthlyMap[month] = { month, receitas: 0, despesas: 0 };
      }
      
      if (t.type === 'income') {
        monthlyMap[month].receitas += t.amount || 0;
      } else {
        monthlyMap[month].despesas += t.amount || 0;
      }
    });

    // Sort months properly
    const orderedMonths = monthNames.filter(m => monthlyMap[m]);
    const monthlyData = orderedMonths.map(m => monthlyMap[m]);

    // If no data, show placeholder
    if (monthlyData.length === 0) {
      monthlyData.push(
        { month: 'Jan', receitas: 0, despesas: 0 },
        { month: 'Fev', receitas: 0, despesas: 0 },
        { month: 'Mar', receitas: 0, despesas: 0 },
      );
    }

    // Income by category for bar chart
    const incByCategory = incomes.reduce((acc, t) => {
      if (t.category) {
        acc[t.category] = (acc[t.category] || 0) + (t.amount || 0);
      }
      return acc;
    }, {});
    
    const barData = Object.keys(incByCategory).map(key => ({
      name: key,
      valor: incByCategory[key]
    }));

    // Recent transactions (last 5)
    const recent = [...transactions].sort((a, b) => {
      const da = a.date || '';
      const db2 = b.date || '';
      return db2.localeCompare(da);
    }).slice(0, 5);

    return { totalReceitas, totalDespesas, lucro, margem, pieData, monthlyData, barData, recent, totalTransactions: transactions.length };
  }, [transactions]);

  const COLORS = ['#00BFFF', '#FF1493', '#8B5CF6', '#FF8C00', '#10B981', '#6366F1', '#F59E0B'];

  return (
    <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Dashboard Financeiro</h2>
          <p className="text-gray-400 mt-1 flex items-center gap-2 font-medium">
            <Activity className="w-4 h-4 text-cyan-400" /> Dados reais do Firebase em tempo real
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-green-500 relative overflow-hidden group hover-lift">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-green-500/10 text-green-400 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Receita Total</p>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            R$ {stats.totalReceitas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </h3>
        </div>

        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-pink-500 relative overflow-hidden group hover-lift">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-pink-500/10 text-pink-400 rounded-xl">
              <TrendingDown className="w-5 h-5" />
            </div>
            <ArrowDownRight className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Despesas</p>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            R$ {stats.totalDespesas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </h3>
        </div>

        <div className={`glass-card p-5 rounded-2xl border-t-2 ${stats.lucro >= 0 ? 'border-t-cyan-500' : 'border-t-red-500'} relative overflow-hidden group hover-lift`}>
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${stats.lucro >= 0 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-red-500/20 text-red-400'}`}>
              {stats.margem}%
            </span>
          </div>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Lucro Líquido</p>
          <h3 className={`text-2xl sm:text-3xl font-black ${stats.lucro >= 0 ? 'text-white' : 'text-red-400'}`}>
            R$ {stats.lucro.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </h3>
        </div>

        <div className="glass-card p-5 rounded-2xl border-t-2 border-t-violet-500 relative overflow-hidden group hover-lift">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-violet-500/10 text-violet-400 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Transações</p>
          <h3 className="text-2xl sm:text-3xl font-black text-white">{stats.totalTransactions}</h3>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart - Cash Flow */}
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl">
          <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" /> Fluxo de Caixa Mensal
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00BFFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF1493" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF1493" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 11}} tickFormatter={(val) => val >= 1000 ? `R$${(val/1000).toFixed(0)}k` : `R$${val}`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(3, 3, 5, 0.95)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', fontSize: '12px' }} 
                  formatter={(value) => `R$ ${value.toFixed(2)}`}
                />
                <Area type="monotone" dataKey="receitas" stroke="#00BFFF" strokeWidth={2} fillOpacity={1} fill="url(#colorReceita)" name="Receitas" />
                <Area type="monotone" dataKey="despesas" stroke="#FF1493" strokeWidth={2} fillOpacity={1} fill="url(#colorDespesa)" name="Despesas" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Expense Distribution */}
        <div className="glass-card p-5 rounded-2xl">
          <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-purple-400" /> Distribuição de Custos
          </h3>
          <div className="h-56">
            {stats.pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.pieData} innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value" stroke="none">
                    {stats.pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(3, 3, 5, 0.95)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px' }} 
                    formatter={(value) => `R$ ${value.toFixed(2)}`} 
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600 font-medium text-sm">
                Sem despesas registradas
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card p-5 rounded-2xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00BFFF]" /> Últimas Transações
        </h3>
        <div className="space-y-2">
          {stats.recent.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-6">Nenhuma transação registrada ainda.</p>
          ) : stats.recent.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  t.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-pink-500/10 text-pink-400'
                }`}>
                  {t.type === 'income' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.description}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{t.date} • {t.category}</p>
                </div>
              </div>
              <span className={`text-sm font-black ${t.type === 'income' ? 'text-green-400' : 'text-pink-400'}`}>
                {t.type === 'income' ? '+' : '-'} R$ {(t.amount || 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
