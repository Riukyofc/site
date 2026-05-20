import React from 'react';
import { Menu, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab, navItems }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} flex-shrink-0 bg-[#09090B] text-white transition-all duration-500 ease-in-out flex flex-col relative z-20 border-r border-white/10`}>
      <div className="h-20 flex items-center px-6 border-b border-white/10 justify-between">
        {isSidebarOpen && (
          <span className="font-black text-xl tracking-wide flex items-center gap-3 animate-fade-in text-white">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,191,255,0.4)]">
              <ShieldCheck className="w-5 h-5 text-white"/>
            </div>
            RKY ERP
          </span>
        )}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 hover:bg-white/10 rounded-xl transition-colors ${!isSidebarOpen && 'mx-auto'}`}>
          <Menu className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${
                    isActive 
                      ? 'bg-cyan-500/10 text-cyan-400' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(0,191,255,0.5)]"></div>}
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'group-hover:text-white'} transition-colors`} />
                  {isSidebarOpen && <span className={`text-sm font-bold whitespace-nowrap ${isActive ? 'text-cyan-400' : ''}`}>{item.label}</span>}
                  
                  {/* Tooltip quando menu fechado */}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-800 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl border border-white/10">
                      {item.label}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-white/10 bg-white/5">
        <div className={`flex items-center gap-4 ${!isSidebarOpen && 'justify-center'}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-sm font-black shadow-lg shadow-cyan-500/20 flex-shrink-0 text-white">
            {currentUser?.name?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
          {isSidebarOpen && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-bold text-white truncate">{currentUser?.name}</p>
              <p className="text-xs text-cyan-400 font-medium truncate uppercase tracking-wider">{currentUser?.role}</p>
            </div>
          )}
          {isSidebarOpen && (
            <button onClick={handleLogout} className="p-2 text-gray-500 hover:bg-white/10 hover:text-red-400 rounded-lg transition-colors" title="Sair">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
