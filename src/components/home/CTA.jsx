import React, { useState } from 'react';
import { ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../layout/FadeIn';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
        name,
        email,
        message,
        date: serverTimestamp(),
        status: 'new'
      });
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 sm:py-32 relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.01] to-[#0E0E11]/80"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] sm:w-[800px] sm:h-[400px] blur-[80px] sm:blur-[120px] rounded-full pointer-events-none bg-gradient-to-t from-[#FF1493]/15 to-[#00BFFF]/15 z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <FadeIn direction="right">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white leading-[1.1]">
              Vamos construir o <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">próximo nível.</span>
            </h2>
            <p className="text-base sm:text-xl font-medium mb-8 sm:mb-12 max-w-xl text-gray-300 leading-relaxed">
              Seja uma startup inovadora ou uma marca de escala global, estamos prontos para projetar e codificar o seu sucesso digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/5598982715727?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto%20com%20o%20RKY%20Studio!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white"
              >
                Chamar no WhatsApp
                <ArrowRight size={20} className="sm:w-6 sm:h-6 shrink-0" />
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Send size={150} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Solicitar Orçamento</h3>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full min-h-[300px]">
                  <CheckCircle2 size={64} className="text-green-400 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Mensagem Enviada!</h4>
                  <p className="text-gray-400">Recebemos seu contato e retornaremos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Seu Nome / Empresa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="E-mail Profissional"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      placeholder="Fale um pouco sobre o projeto..."
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                    ></textarea>
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed insane-hover shadow-[0_0_15px_rgba(0,191,255,0.2)]"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
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
