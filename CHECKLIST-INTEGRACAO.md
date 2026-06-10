# ✅ CHECKLIST - Integração Supabase

## Suas Credenciais
```
✅ Project URL:  https://efdbihtozuulwxmqvszw.supabase.co
✅ Anon Key:     sb_publishable_sFXJ1QXWSh_oH1LSR49x6g_SFwqPfU_
✅ Project Ref:  efdbihtozuulwxmqvszw
```

---

## 📋 Tarefas Pendentes

### ☐ TAREFA 1: Criar Tabela no Supabase

**Você fez isso?** [ ] SIM  [ ] NÃO

Se NÃO, execute este SQL no **Supabase Dashboard → SQL Editor**:

```sql
-- 1. Criar tabela players
CREATE TABLE IF NOT EXISTS public.players (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  tomos INTEGER NOT NULL DEFAULT 0,
  avatar TEXT NOT NULL DEFAULT 'explorer',
  last_updated TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_players_tomos ON public.players(tomos DESC);
CREATE INDEX IF NOT EXISTS idx_players_name ON public.players(name);
CREATE INDEX IF NOT EXISTS idx_players_created ON public.players(created_at DESC);

-- 3. Ativar Row Level Security
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de acesso
DROP POLICY IF EXISTS "Allow public read" ON public.players;
CREATE POLICY "Allow public read" ON public.players FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON public.players;
CREATE POLICY "Allow public insert" ON public.players FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update" ON public.players;
CREATE POLICY "Allow public update" ON public.players FOR UPDATE USING (true) WITH CHECK (true);

-- 5. Ativar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;
```

**Resultado esperado:** ✅ "Query executed successfully"

---

### ☐ TAREFA 2: Adicionar Credenciais

**Você fez isso?** [ ] SIM  [ ] NÃO

Se NÃO:

1. Abra: **SUPABASE-CREDS.html**
2. Clique: "✓ Preencher com Credenciais Fornecidas"
3. Clique: "💾 Salvar Credenciais"
4. Teste: "🧪 Testar Conexão"

**Resultado esperado:** ✅ "Conexão perfeita!"

---

### ☐ TAREFA 3: Testar enigma.html

**Você fez isso?** [ ] SIM  [ ] NÃO

Se NÃO:

1. Abra: **enigma.html**
2. Abra: **Console (F12 ou Ctrl+Shift+J)**
3. Procure por: `✅ Supabase inicializado com sucesso!`
4. Se aparecer, você está pronto! ✅
5. Se aparecer erro, vá para **Troubleshooting** abaixo

**Resultado esperado:**
```
✅ Supabase inicializado com sucesso!
```

---

### ☐ TAREFA 4: Jogar e Testar Ranking

**Você fez isso?** [ ] SIM  [ ] NÃO

Se NÃO:

1. Em enigma.html, complete um enigma
2. Você verá seu nome no Ranking (canto inferior)
3. Atualize a página (F5)
4. Seu nome deve estar lá ainda ✅

**Resultado esperado:** 
- Seu nome aparece no ranking
- Dados persistem após recarregar
- Ranking sincroniza em tempo real

---

## 🧪 Troubleshooting

### Problema 1: "⚠️ Supabase não configurado"

**Solução:**
1. Abra `SUPABASE-CREDS.html`
2. Clique "Preencher com Credenciais Fornecidas"
3. Clique "Salvar Credenciais"
4. Recarregue `enigma.html`

---

### Problema 2: "❌ Erro ao inicializar Supabase"

**Causas possíveis:**

| Erro | Causa | Solução |
|------|-------|--------|
| `Invalid URL` | URL errada | Verifique em SUPABASE-CREDS.html |
| `Invalid key` | Chave errada | Use a Publishable/Anon key |
| `Network error` | Sem internet | Verifique conexão |
| `table does not exist` | Tabela não criada | Execute o SQL acima |

---

### Problema 3: "❌ Tabela não existe"

**Solução:**

1. Vá para **Supabase Dashboard**
2. Clique em **SQL Editor** (esquerda)
3. Cole TODO o SQL do **TAREFA 1** acima
4. Clique **Run**
5. Espere: ✅ "Query executed successfully"
6. Teste novamente em `SUPABASE-CREDS.html`

---

### Problema 4: Dados não aparecem no ranking

**Checklist:**

- [ ] Tabela foi criada? (veja no SQL Editor)
- [ ] Credenciais estão certas? (teste em SUPABASE-CREDS.html)
- [ ] Completou um enigma? (precisa ganhar pontos)
- [ ] Console mostra ✅ Supabase inicializado? (abra F12)
- [ ] Aguarde 2 segundos após completar (Realtime pode demorar)
- [ ] Recarregue a página (F5)

---

### Problema 5: "Erro de permissão (403)"

**Significa:** RLS está ativado mas políticas não estão corretas

**Solução:**

1. Vá para **Supabase Dashboard → Authentication → Policies**
2. Verifique se existem 3 políticas:
   - [ ] "Allow public read"
   - [ ] "Allow public insert"
   - [ ] "Allow public update"
3. Se não aparecerem, execute novamente o SQL (TAREFA 1)

---

## 🎮 Quando Tudo Está Funcionando

Você saberá quando:

✅ Console mostra "✅ Supabase inicializado com sucesso!"  
✅ Seu nome aparece no Ranking após completar enigma  
✅ Dados persistem após fechar/abrir browser  
✅ Múltiplos navegadores veem o mesmo ranking  

---

## 📞 Referência Rápida

| Arquivo | Propósito | Quando Usar |
|---------|-----------|------------|
| SUPABASE-CREDS.html | Adicionar credenciais | Primeira vez |
| enigma.html | Jogar | Sempre |
| SUPABASE-SETUP-COMPLETO.md | Aprender em detalhe | Se tiver dúvidas |
| SUPABASE-VISUAL.md | Ver prints das telas | Se estiver perdido |
| SUPABASE-SQL-COMPLETO.sql | Copiar SQL | Se precisar repetir |

---

## 🚀 Próximo Passo

### 👉 COMECE AQUI:

1. **Abra no navegador:** `SUPABASE-CREDS.html`
2. **Clique:** "✓ Preencher com Credenciais Fornecidas"
3. **Clique:** "💾 Salvar Credenciais"
4. **Clique:** "🧪 Testar Conexão"
5. **Se ✅ OK:** Vá para tarefa 1 abaixo
6. **Se ❌ Erro de tabela:** Faça TAREFA 1

---

## 📝 Anotações

```
Data de Início: 2026-06-10
Status: ⏳ Aguardando confirmação de tabela
Próxima Verificação: Após TAREFA 1
```

---

**Você tem alguma dúvida?** Veja a seção **Troubleshooting** acima! 🔧
