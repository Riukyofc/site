# 📦 Workflows n8n — RKY Studio

## Como importar no n8n

1. Acesse seu n8n: `https://sua-url.up.railway.app`
2. Clique em **"+ Add Workflow"**
3. No menu `⋯` (três pontos), clique em **"Import from File"**
4. Selecione o arquivo `.json` desejado
5. **Ative o workflow** (toggle no canto superior direito)

## Workflows

| # | Arquivo | Descrição |
|---|---------|-----------|
| 1 | `01-novo-lead.json` | 🔔 Lead no site → notificação no seu WhatsApp |
| 2 | `02-nova-transacao.json` | 💰 Nova receita/despesa → notificação no WhatsApp |
| 3 | `03-chatbot-ia.json` | 🤖 Chatbot automático com Gemini IA |
| 4 | `04-followup-leads.json` | 📅 Follow-up automático de leads após 3 dias |

## Pré-requisitos

Antes de importar, certifique-se de:

- [ ] **Evolution API** está rodando e conectada ao WhatsApp
- [ ] **Community node** `n8n-nodes-evolution-api` instalado no n8n
- [ ] **Credencial** "Evolution API RKY" configurada no n8n com:
  - Server URL: `https://evolution-xxxx.up.railway.app`
  - API Key: sua chave

## Configurações necessárias após importar

### Workflow 3 (Chatbot IA)
No n8n, vá em **Settings → Environment Variables** e adicione:
```
GEMINI_API_KEY=sua-chave-do-google-ai-studio
```

### Workflow 4 (Follow-up)
O Firebase project ID `rkystudio-b8c89` já está configurado automaticamente.

## Testando

```powershell
# Testar Workflow 1 (Lead):
$body = '{"name":"Teste","email":"teste@rky.com","message":"Quero um site"}'
Invoke-RestMethod -Uri "https://SUA-URL-N8N/webhook/novo-lead" -Method POST -ContentType "application/json" -Body $body

# Testar Workflow 2 (Transação):
$body = '{"type":"income","description":"Projeto XYZ","category":"Projeto Web","amount":2500}'
Invoke-RestMethod -Uri "https://SUA-URL-N8N/webhook/nova-transacao" -Method POST -ContentType "application/json" -Body $body
```
