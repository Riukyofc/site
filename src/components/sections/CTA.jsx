import React, { useState } from 'react';
import { ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { triggerWebhook, N8N_WEBHOOKS } from '../../lib/n8n';

export const CTA = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        name, email, message,
        date: serverTimestamp(),
        status: 'new'
      });
      // Disparar webhook n8n (fire-and-forget)
      triggerWebhook(N8N_WEBHOOKS.NOVO_LEAD, { name, email, message });

      setIsSuccess(true);
      setName(''); setEmail(''); setMessage('');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 sm:py-32 relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#0E0E11]/80" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] rounded-full pointer-events-none bg-gradient-to-t from-[#FF1493]/10 to-[#00BFFF]/10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="right">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white leading-[1.1]">
              Vamos construir o <br />
              <span className="text-gradient">próximo nível.</span>
            </h2>
            <p className="text-base sm:text-lg font-medium mb-8 max-w-xl text-white/50 leading-relaxed">
              Seja uma startup inovadora ou uma marca de escala global, estamos prontos para projetar e codificar o seu sucesso digital.
            </p>
            <a
              href="https://wa.me/5598982715727?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto%20com%20o%20RKY%20Studio!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white"
            >
              Chamar no WhatsApp
              <ArrowRight size={20} />
            </a>
          </FadeIn>

          <FadeIn direction="left">
            <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                <Send size={120} />
              </div>
              <h3 className="text-xl font-bold text-white mb-6">Solicitar Orçamento</h3>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center min-h-[280px]">
                  <CheckCircle2 size={56} className="text-[#10B981] mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Mensagem Enviada!</h4>
                  <p className="text-white/40 text-sm">Recebemos seu contato e retornaremos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <input type="text" required placeholder="Seu Nome / Empresa" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/40 transition-all text-sm" />
                  <input type="email" required placeholder="E-mail Profissional" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/40 transition-all text-sm" />
                  <textarea required placeholder="Fale sobre o projeto..." rows="4" value={message} onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/40 transition-all resize-none text-sm" />
                  <button disabled={isSubmitting} type="submit"
                    className="relative w-full overflow-hidden bg-gradient-to-r from-[#00BFFF] to-[#8B5CF6] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(0,191,255,0.2)]">
                    <span className="relative z-10">{isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}</span>
                    <div className="absolute inset-0 shimmer" />
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
