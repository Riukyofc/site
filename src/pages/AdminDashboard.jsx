import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Wallet, Users, Activity, CheckCircle2, Mail } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// Components
import { Sidebar } from '../components/admin/Sidebar';
import { DashboardView } from '../components/admin/DashboardView';
import { OrdersView } from '../components/admin/OrdersView';
import { ProductsView } from '../components/admin/ProductsView';
import { FinancialView } from '../components/admin/FinancialView';
import { LeadsView } from '../components/admin/LeadsView';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-[fadeUp_0.3s_ease-out]">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border backdrop-blur-md ${
        type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 
        type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
        'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
      }`}>
        {type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Activity className="w-5 h-5 text-cyan-400" />}
        <p className="font-bold text-sm">{message}</p>
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toastConfig, setToastConfig] = useState(null);
  
  // Real data from Firebase
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Listen to all transactions (both income and expense)
    const qTransactions = query(collection(db, 'transactions'), orderBy('date', 'desc'));
    const unsubTransactions = onSnapshot(qTransactions, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate 
          ? new Date(doc.data().date.toDate()).toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0]
      }));
      setTransactions(data);
      
      // Derive orders from income transactions
      const incomes = data.filter(t => t.type === 'income');
      if (incomes.length > 0) {
        setOrders(incomes.map((inc) => ({
          id: `PED-${inc.id.substring(0,5).toUpperCase()}`,
          firestoreId: inc.id,
          customer: inc.description || 'Venda Diversa',
          product: inc.category || 'Venda',
          amount: inc.amount,
          status: 'Pago',
          date: inc.date,
          termsAccepted: true,
          refundBlocked: true,
          token: null
        })));
      } else {
        setOrders([]);
      }
    }, (error) => {
      console.error("Erro no Firestore (Transactions):", error);
    });

    // Listen to products
    const qProducts = query(collection(db, 'products'));
    const unsubProducts = onSnapshot(qProducts, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Erro no Firestore (Products):", error);
    });

    return () => {
      unsubTransactions();
      unsubProducts();
    };
  }, []);

  const showToast = (message, type = 'success') => {
    setToastConfig({ message, type });
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Pedidos & Entregas', icon: ShoppingCart },
    { id: 'products', label: 'Catálogo Digital', icon: Package },
    { id: 'financial', label: 'Gestão Financeira', icon: Wallet },
    { id: 'leads', label: 'Leads & Contatos', icon: Mail },
    { id: 'staff', label: 'Staff & Permissões', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#030305] font-sans overflow-hidden">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navItems={navItems}
      />

      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/15 via-[#030305] to-[#030305] -z-10" />
        
        <header className="h-16 sm:h-20 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-4 sm:px-8 justify-between z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 bg-[#00BFFF] rounded-full shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] rounded-full border border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Firebase Real-time</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <DashboardView transactions={transactions} products={products} />}
            {activeTab === 'orders' && <OrdersView orders={orders} setOrders={setOrders} showToast={showToast} />}
            {activeTab === 'products' && <ProductsView products={products} />}
            {activeTab === 'financial' && <FinancialView transactions={transactions} showToast={showToast} />}
            {activeTab === 'leads' && <LeadsView showToast={showToast} />}
            {activeTab === 'staff' && (
              <div className="text-center py-20 animate-[fadeUp_0.5s_ease-out] glass-card rounded-3xl">
                <Users className="w-14 h-14 text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(0,191,255,0.3)]" />
                <h2 className="text-2xl font-black text-white">Módulo de Staff (RBAC)</h2>
                <p className="text-gray-400 mt-2 font-medium text-sm">Área restrita para cadastro e definição de permissões.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {toastConfig && <Toast message={toastConfig.message} type={toastConfig.type} onClose={() => setToastConfig(null)} />}
    </div>
  );
};
