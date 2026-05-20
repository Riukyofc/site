/**
 * n8n Webhook Integration - RKY Studio
 * 
 * Configuração centralizada dos webhooks do n8n.
 * Altere a BASE_URL quando seu n8n estiver online.
 */

// ⚠️ ALTERE ESTA URL para o endereço real do seu n8n
const N8N_BASE_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://seu-n8n.exemplo.com';

// Endpoints dos webhooks
export const N8N_WEBHOOKS = {
  NOVO_LEAD: `${N8N_BASE_URL}/webhook/novo-lead`,
  NOVA_TRANSACAO: `${N8N_BASE_URL}/webhook/nova-transacao`,
};

/**
 * Dispara um webhook para o n8n de forma assíncrona.
 * Não bloqueia o fluxo principal — se falhar, apenas loga o erro.
 * 
 * @param {string} url - URL do webhook
 * @param {object} data - Payload JSON
 */
export const triggerWebhook = async (url, data) => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        _source: 'rky-studio-site',
        _timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    // Silencioso — não queremos que falhas no n8n quebrem a UX do site
    console.warn('[n8n] Webhook falhou (não-crítico):', err.message);
  }
};
