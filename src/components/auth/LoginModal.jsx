import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const AnimatedEye = ({ isVisible, onClick }) => {
// ... preserving AnimatedEye untouched

  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => {
    setClicked(true);
    onClick();
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <button 
      type="button" 
      onClick={handleClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 focus:outline-none overflow-hidden rounded-full group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-pink-500/30 rounded-full transform transition-transform duration-500 ${clicked ? 'scale-150 opacity-0' : 'scale-0 opacity-100'}`} />
      
      <div className="relative z-10 w-5 h-5 flex items-center justify-center">
        <div className={`absolute transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 drop-shadow-[0_0_5px_rgba(0,191,255,0.8)]">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3" className="animate-[pulse_2s_ease-in-out_infinite]"/>
          </svg>
        </div>
        
        <div className={`absolute transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${!isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-150 rotate-90'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 drop-shadow-[0_0_5px_rgba(255,20,147,0.8)]">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
            <line x1="2" x2="22" y1="2" y2="22" className="stroke-pink-500 transition-all duration-300 ease-in-out" strokeDasharray="30" strokeDashoffset={!isVisible ? "0" : "30"} style={{transitionDelay: !isVisible ? '150ms' : '0ms'}}/>
          </svg>
        </div>
      </div>
    </button>
  );
};

export const LoginModal = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
    }
  }, [location.state]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden'; // Impede scroll do site
    } else {
      setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = 'unset';
      
      // Limpar formulário ao fechar
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  if (!isOpen && !mounted) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isLoginView && password !== confirmPassword) {
      return setError('As senhas não coincidem!');
    }

    setLoading(true);

    try {
      if (isLoginView) {
        await login(email, password);
        onClose();
        navigate('/admin'); // Vai pro admin, e o ProtectedRoute resolve se é admin ou não.
      } else {
        await signup(email, password, name);
        await logout(); // Desloga pra garantir
        setSuccess('Cadastro realizado! Conta em análise.');
        setTimeout(() => setIsLoginView(true), 2000);
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') setError('Este e-mail já está em uso.');
      else if (err.code === 'auth/weak-password') setError('A senha deve ter pelo menos 6 caracteres.');
      else if (err.code === 'auth/invalid-credential') setError('E-mail ou senha incorretos.');
      else setError('Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-md bg-[#050508] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_-12px_rgba(0,191,255,0.3)] transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors p-1"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6 mt-2">
          <h2 className="text-3xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
            Acesso Exclusivo
          </h2>
          <p className="text-zinc-400 text-sm mt-2 font-medium">Acompanhe seus projetos e solicitações.</p>
        </div>

        {/* Toggle Login/Cadastro */}
        <div className="flex p-1 bg-white/5 rounded-xl mb-6 border border-white/5">
          <button
            onClick={() => { setIsLoginView(true); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              isLoginView ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            Acessar Conta
          </button>
          <button
            onClick={() => { setIsLoginView(false); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              !isLoginView ? 'bg-pink-500/20 text-pink-400 shadow-[0_0_10px_rgba(255,20,147,0.2)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            Cadastrar-se
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]">
            <AlertCircle size={16} className="shrink-0" />
            <p className="text-xs font-bold">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]">
            <AlertCircle size={16} className="shrink-0" />
            <p className="text-xs font-bold">{success}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLoginView && (
            <div className="space-y-1 animate-[fadeIn_0.2s_ease-out]">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Nome Completo</label>
              <input 
                type="text" required
                value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(0,191,255,0.2)] placeholder-zinc-600"
                placeholder="Ex: João Silva"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Email</label>
            <input 
              type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(0,191,255,0.2)] placeholder-zinc-600"
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Senha</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500/50 rounded-lg pl-4 pr-12 py-3 text-white text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,20,147,0.2)] placeholder-zinc-600"
                placeholder="••••••••"
              />
              <AnimatedEye isVisible={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>
          </div>

          {!isLoginView && (
            <div className="space-y-1 animate-[fadeIn_0.2s_ease-out]">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Confirmar Senha</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} required
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500/50 rounded-lg pl-4 pr-12 py-3 text-white text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,20,147,0.2)] placeholder-zinc-600"
                  placeholder="••••••••"
                />
                <AnimatedEye isVisible={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
              </div>
            </div>
          )}

          <button 
            type="submit" disabled={loading}
            className="w-full mt-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-sm bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(0,191,255,0.3)] hover:shadow-[0_0_30px_rgba(255,20,147,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Aguarde...' : (isLoginView ? 'Acessar Painel' : 'Criar Conta')}
          </button>
        </form>
      </div>
    </div>
  );

  // Usa createPortal para renderizar o modal no final do body, ignorando qualquer contexto CSS de empilhamento!
  return createPortal(modalContent, document.body);
};
