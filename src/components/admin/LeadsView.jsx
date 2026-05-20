import React, { useState, useEffect } from 'react';
import { Mail, Clock, CheckCircle2, AlertCircle, Trash2, Eye, ExternalLink, MessageSquare } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const LeadsView = ({ showToast }) => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate
          ? new Date(doc.data().date.toDate()).toISOString()
          : new Date().toISOString()
      })));
    });
    return () => unsub();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), { status: newStatus });
      showToast(`Status atualizado para "${newStatus}"`, 'success');
    } catch (err) {
      showToast('Erro ao atualizar status', 'error');
    }
  };

  const handleDelete = async (leadId) => {
    if (!confirm('Tem certeza que deseja excluir este lead?')) return;
    try {
      await deleteDoc(doc(db, 'leads', leadId));
      setSelectedLead(null);
      showToast('Lead excluído', 'success');
    } catch (err) {
      showToast('Erro ao excluir', 'error');
    }
  };

  const filteredLeads = filterStatus === 'all' ? leads : leads.filter(l => l.status === filterStatus);

  const statusConfig = {
    new: { label: 'Novo', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', icon: AlertCircle },
    contacted: { label: 'Contatado', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: MessageSquare },
    followed_up: { label: 'Follow-up', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Clock },
    converted: { label: 'Convertido', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: CheckCircle2 },
    closed: { label: 'Fechado', color: 'bg-white/5 text-white/30 border-white/10', icon: CheckCircle2 },
  };

  return (
    <div className="space-y-6 animate-[fadeUp_0.5s_ease-out]">
      {/* Header with stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total', value: leads.length, color: 'text-white' },
          { label: 'Novos', value: leads.filter(l => l.status === 'new').length, color: 'text-cyan-400' },
          { label: 'Contatados', value: leads.filter(l => l.status === 'contacted').length, color: 'text-yellow-400' },
          { label: 'Convertidos', value: leads.filter(l => l.status === 'converted').length, color: 'text-green-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-4 text-center">
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[{ key: 'all', label: 'Todos' }, ...Object.entries(statusConfig).map(([key, val]) => ({ key, label: val.label }))].map(f => (
          <button
            key={f.key}
            onClick={() => setFilterStatus(f.key)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filterStatus === f.key
                ? 'bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/30'
                : 'bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Leads list */}
      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Mail className="w-12 h-12 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 font-medium">Nenhum lead encontrado</p>
          </div>
        ) : (
          filteredLeads.map(lead => {
            const status = statusConfig[lead.status] || statusConfig.new;
            const StatusIcon = status.icon;
            const isSelected = selectedLead?.id === lead.id;

            return (
              <div key={lead.id} className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${isSelected ? 'ring-1 ring-[#00BFFF]/30' : ''}`}>
                {/* Main row */}
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setSelectedLead(isSelected ? null : lead)}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFFF]/20 to-[#8B5CF6]/20 border border-white/[0.08] flex items-center justify-center shrink-0">
                    <span className="text-sm font-black text-white">{(lead.name || '?')[0].toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{lead.name || 'Sem nome'}</h4>
                    <p className="text-[11px] text-white/30 truncate">{lead.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${status.color} hidden sm:flex items-center gap-1.5`}>
                    <StatusIcon size={10} />
                    {status.label}
                  </span>
                  <span className="text-[10px] text-white/20 font-medium hidden md:block">
                    {new Date(lead.date).toLocaleDateString('pt-BR')}
                  </span>
                  <Eye size={14} className={`text-white/20 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                </div>

                {/* Expanded details */}
                {isSelected && (
                  <div className="border-t border-white/[0.06] p-4 bg-white/[0.01] animate-[fadeIn_0.3s_ease-out]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Mensagem</p>
                        <p className="text-sm text-white/70 leading-relaxed bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
                          {lead.message || 'Sem mensagem'}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Data</p>
                          <p className="text-sm text-white/60">{new Date(lead.date).toLocaleString('pt-BR')}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Alterar Status</p>
                          <div className="flex flex-wrap gap-1.5">
                            {Object.entries(statusConfig).map(([key, val]) => (
                              <button
                                key={key}
                                onClick={() => handleStatusChange(lead.id, key)}
                                className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all ${
                                  lead.status === key ? val.color : 'bg-white/[0.02] text-white/30 border-white/[0.06] hover:bg-white/[0.05]'
                                }`}
                              >
                                {val.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-white/[0.04]">
                      <a
                        href={`https://wa.me/?text=Olá ${lead.name}, aqui é do RKY Studio! Recebemos sua mensagem e gostaríamos de conversar sobre seu projeto.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] text-xs font-bold border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
                      >
                        <MessageSquare size={12} /> Responder WhatsApp
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] text-white/50 text-xs font-bold border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                      >
                        <Mail size={12} /> Email
                      </a>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/5 text-red-400/60 text-xs font-bold border border-red-500/10 hover:bg-red-500/15 transition-colors ml-auto"
                      >
                        <Trash2 size={12} /> Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
