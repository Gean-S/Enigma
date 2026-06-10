# 🔧 SUPABASE - GUIA VISUAL COM PRINTS

## 📍 Mapa Visual do Dashboard Supabase

```
┌─────────────────────────────────────────────────────────────────┐
│ 🟢 SUPABASE                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ├─ Dashboard                                                   │
│  │  └─ Projects                                                 │
│  │     └─ enigma-ranking (seu projeto)                         │
│  │        │                                                     │
│  │        ├─ 🏠 Home                                            │
│  │        │   └─ Overview do projeto                           │
│  │        │                                                     │
│  │        ├─ 📊 Database                                        │
│  │        │   ├─ Tables          ← CRIAR TABELA AQUI           │
│  │        │   ├─ SQL Editor      ← EXECUTAR SQL AQUI           │
│  │        │   ├─ Backups                                       │
│  │        │   └─ Replication     ← ATIVAR REALTIME AQUI        │
│  │        │                                                     │
│  │        ├─ 🔐 Authentication                                  │
│  │        │   ├─ Users                                         │
│  │        │   └─ Policies                                      │
│  │        │                                                     │
│  │        ├─ 🔌 Realtime                                        │
│  │        │   └─ Extensions                                    │
│  │        │                                                     │
│  │        ├─ 📦 Storage                                         │
│  │        │   └─ Buckets                                       │
│  │        │                                                     │
│  │        └─ ⚙️ Settings                                        │
│  │           ├─ API              ← COPIAR CREDENCIAIS AQUI     │
│  │           ├─ Billing                                        │
│  │           └─ Database                                       │
│  │                                                              │
│  └─ Menu principal                                              │
│     ├─ Documentation                                            │
│     ├─ Status                                                   │
│     └─ Support                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎬 Passo a Passo com Descrição de Telas

### TELA 1: Dashboard Inicial

```
┌─────────────────────────────────────┐
│ Start your project                  │
├─────────────────────────────────────┤
│                                     │
│ [Continue with GitHub] ← CLIQUE     │
│ [Continue with Google]              │
│ [Sign up with Email]                │
│                                     │
│ Texto: "Join thousands of teams ... │
│                                     │
└─────────────────────────────────────┘

✅ O QUE FAZER:
   Clique em "Continue with GitHub"
   Autorize o acesso
   Confirme email
```

### TELA 2: Criar Novo Projeto

```
┌──────────────────────────────────────┐
│ Create a new project                 │
├──────────────────────────────────────┤
│                                      │
│ Organization: [Dropdown ▼]           │
│                                      │
│ Name: [enigma-ranking        ]       │
│                                      │
│ Database Password: [senha123  ]      │
│              (strong!)               │
│                                      │
│ Region: [us-east-1 ▼]                │
│                                      │
│ [✓ I have read terms...]             │
│                                      │
│ [Create new project] ← CLIQUE        │
│                                      │
└──────────────────────────────────────┘

✅ O QUE FAZER:
   Nome: enigma-ranking (exato!)
   Senha: algo como: Enigma@2024$Safe
   Região: us-east-1 (padrão)
   Clique "Create"
```

### TELA 3: Criando o Projeto

```
┌────────────────────────────────┐
│ Creating your project...       │
├────────────────────────────────┤
│                                │
│ 🔄 Setting up database...      │
│                                │
│ ⏳ Esperando: 2-3 minutos      │
│                                │
│ [Canteador de progresso]       │
│                                │
└────────────────────────────────┘

✅ O QUE FAZER:
   Aguarde! ☕
   Será redirecionado automaticamente
```

### TELA 4: Dashboard do Projeto

```
┌───────────────────────────────────────┐
│ enigma-ranking                        │
├───────────────────────────────────────┤
│                                       │
│ ← Menu (clique) na esquerda:          │
│  ├─ 🏠 Home                           │
│  ├─ 📊 Database                       │
│  │  ├─ Tables                         │
│  │  ├─ SQL Editor    ← AQUI!          │
│  │  └─ Replication   ← AQUI!          │
│  ├─ 🔐 Authentication                 │
│  ├─ 🔌 Realtime                       │
│  └─ ⚙️ Project Settings               │
│     └─ API            ← E AQUI!       │
│                                       │
│ Conteúdo principal vazio ou com       │
│ "Create your first table"             │
│                                       │
└───────────────────────────────────────┘

✅ O QUE FAZER:
   Clique em "Database" → "SQL Editor"
```

---

## 📝 SQL Editor - Visual

### TELA 5: SQL Editor Vazio

```
┌────────────────────────────────────────┐
│ SQL Editor                             │
├────────────────────────────────────────┤
│                                        │
│ [New query]  [Quick Start]             │
│                                        │
│ ┌──────────────────────────────────┐   │
│ │ Paste SQL here...                │   │
│ │                                  │   │
│ │ (editor vazio)                   │   │
│ │                                  │   │
│ └──────────────────────────────────┘   │
│                                        │
│ [RUN]  [Format]  [Clear]               │
│                                        │
│ Results:                               │
│ (vazio até executar)                   │
│                                        │
└────────────────────────────────────────┘

✅ O QUE FAZER:
   Cole todo o SQL da criação de tabela
   Clique "RUN"
   Aguarde confirmação ✅
```

### TELA 6: SQL Executado com Sucesso

```
┌────────────────────────────────────────┐
│ SQL Editor                             │
├────────────────────────────────────────┤
│                                        │
│ [SQL que foi executado...]             │
│                                        │
│ ✅ Query executed successfully         │
│    (duration: 125ms)                   │
│                                        │
│ Results:                               │
│ ┌──────────────────────────────────┐   │
│ │ (empty - sem resultado pois foi  │   │
│ │  CREATE TABLE, não SELECT)       │   │
│ └──────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘

✅ SUCESSO! Tabela criada!
```

---

## 📊 Tables View - Visual

### TELA 7: Tabelas Criadas

```
┌──────────────────────────────────────┐
│ Database → Tables                    │
├──────────────────────────────────────┤
│                                      │
│ Search tables...  [_______]          │
│                                      │
│ public                               │
│ ├─ 📄 players     ← NOSSA TABELA!    │
│ │  Columns (7):                      │
│ │  ├─ id (bigint)                    │
│ │  ├─ name (text)                    │
│ │  ├─ tomos (integer)                │
│ │  ├─ avatar (text)                  │
│ │  ├─ last_updated (timestamptz)     │
│ │  ├─ created_at (timestamptz)       │
│ │  └─ updated_at (timestamptz)       │
│ │                                    │
│ │  Rows: 0                           │
│ │  Size: 8.19 KB                     │
│ │  Actions: [Edit] [Delete]          │
│ │                                    │
│ └─ (outras tabelas do Supabase)      │
│    (você pode ignorar)               │
│                                      │
└──────────────────────────────────────┘

✅ PERFEITO! Tabela existe e está vazia (0 rows)
```

---

## 🔐 Row Level Security (RLS) - Visual

### TELA 8: Ativar RLS

```
┌──────────────────────────────────────┐
│ Database → Tables → players → RLS    │
├──────────────────────────────────────┤
│                                      │
│ Row Level Security is currently:     │
│ [⭕ OFF]                              │
│                                      │
│ [Enable RLS] ← CLIQUE!               │
│                                      │
│                                      │
│ Políticas:                           │
│ (nenhuma ainda)                      │
│                                      │
└──────────────────────────────────────┘

✅ O QUE FAZER:
   Clique em "Enable RLS"
   Depois execute o SQL das políticas
```

### TELA 9: RLS Ativado com Políticas

```
┌──────────────────────────────────────┐
│ Database → Tables → players → RLS    │
├──────────────────────────────────────┤
│                                      │
│ Row Level Security is currently:     │
│ [✅ ON]                               │
│                                      │
│ Políticas Criadas:                   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │ Allow public read access       │   │
│ │ SELECT | FOR ... | ✅ Enabled  │   │
│ │ [Edit] [Delete]                │   │
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │ Allow public insert            │   │
│ │ INSERT | WITH CHECK | ✅ ...   │   │
│ │ [Edit] [Delete]                │   │
│ └────────────────────────────────┘   │
│                                      │
│ ┌────────────────────────────────┐   │
│ │ Allow public update            │   │
│ │ UPDATE | USING | ✅ Enabled    │   │
│ │ [Edit] [Delete]                │   │
│ └────────────────────────────────┘   │
│                                      │
└──────────────────────────────────────┘

✅ 3 POLÍTICAS CRIADAS!
```

---

## 🔑 API Keys - Visual

### TELA 10: Copiar Credenciais

```
┌────────────────────────────────────────┐
│ Project Settings → API                 │
├────────────────────────────────────────┤
│                                        │
│ Project URL                            │
│ ┌──────────────────────────────────┐   │
│ │ https://xyzabc-defgh.supabase.co │ 📋 │
│ └──────────────────────────────────┘   │
│                  ↑ COPIE AQUI!          │
│                                        │
│ API Keys & Tokens                      │
│                                        │
│ Anon (Public) Key                      │
│ ┌──────────────────────────────────┐   │
│ │ eyJhbGciOiJIUzI1NiIsInR4In... │ 📋 │
│ │ [Show]                           │   │
│ └──────────────────────────────────┘   │
│              ↑ COPIE ESTA!              │
│                                        │
│ Service Role Key                       │
│ ┌──────────────────────────────────┐   │
│ │ eyJhbGciOiJIUzI1NiIsInR4In... │ 📋 │
│ │ (NÃO COPY - apenas backend)    │   │
│ └──────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘

✅ COPIE APENAS:
   - Project URL
   - Anon (Public) Key
```

---

## 🔄 Replication / Realtime - Visual

### TELA 11: Ativar Realtime

```
┌───────────────────────────────────────┐
│ Database → Replication                │
├───────────────────────────────────────┤
│                                       │
│ Realtime Database Extension           │
│                                       │
│ supabase_realtime                     │
│ ├─ 🔴 players     ← CLIQUE AQUI!      │
│ │  Toggle: [⭕ OFF]                    │
│ │                                     │
│ └─ (outras tabelas)                   │
│                                       │
└───────────────────────────────────────┘

✅ O QUE FAZER:
   Clique no toggle de players
   Deve ficar ✅ ON
```

---

## 📋 Resumo de Cliques

```
SEQUÊNCIA DE CLIQUES:

1. Acesse https://supabase.com
2. Clique "Continue with GitHub"
3. Login → Authorize
4. Clique "Create new project"
5. Nome: enigma-ranking
6. Selecione região
7. Aguarde criação (2-3 min)
8. Clique "Database" → "SQL Editor"
9. Clique "New query"
10. Cole SQL de criação
11. Clique "RUN"
12. ✅ Tabela criada!
13. Clique "SQL Editor" novamente
14. Cole SQL de políticas
15. Clique "RUN"
16. ✅ RLS configurado!
17. Vá em "Database" → "Replication"
18. Ative o toggle de "players"
19. ✅ Realtime ativado!
20. Vá em "Project Settings" → "API"
21. Copie "Project URL"
22. Copie "Anon Key"
23. Vá em SUPABASE-SETUP.html
24. Cole as credenciais
25. Clique "Salvar"
26. ✅ PRONTO!
```

---

## ✅ Checklist Visual

```
┌─────────────────────────────────────────────┐
│ SUPABASE - CHECKLIST COMPLETO               │
├─────────────────────────────────────────────┤
│                                             │
│ CONTA E PROJETO:                            │
│ ☐ Conta criada em supabase.com              │
│ ☐ GitHub conectado                          │
│ ☐ Projeto "enigma-ranking" criado           │
│                                             │
│ TABELAS SQL:                                │
│ ☐ Tabela "players" criada                   │
│ ☐ Colunas visíveis: id, name, tomos, avatar │
│ ☐ Índices criados (tomos, name, created)    │
│ ☐ Triggers funcionando                      │
│                                             │
│ PERMISSÕES RLS:                             │
│ ☐ RLS ativado em "players"                  │
│ ☐ Policy "Allow public read" criada         │
│ ☐ Policy "Allow public insert" criada       │
│ ☐ Policy "Allow public update" criada       │
│                                             │
│ REALTIME:                                   │
│ ☐ SQL ALTER PUBLICATION executado           │
│ ☐ Toggle de "players" em "Replication" ON   │
│ ☐ Icone verde confirmando ✅                │
│                                             │
│ CREDENCIAIS:                                │
│ ☐ Project URL copiada                       │
│ ☐ Anon Key copiada                          │
│ ☐ Valores guardados em local seguro         │
│                                             │
│ CONFIGURAÇÃO FINAL:                         │
│ ☐ SUPABASE-SETUP.html aberto                │
│ ☐ Credenciais coladas nos campos            │
│ ☐ Clicou "Salvar Credenciais"               │
│ ☐ enigma.html aberto no navegador           │
│ ☐ Console mostra "✅ Supabase inicializado" │
│                                             │
│ TESTE FINAL:                                │
│ ☐ Jogo abre normalmente                     │
│ ☐ Digitou um nome                           │
│ ☐ Completou um enigma                       │
│ ☐ Ganhou tomos                              │
│ ☐ Nome aparece no Ranking 🏆                │
│ ☐ Fechou e reabriu o jogo                   │
│ ☐ Dados persistem no ranking ✅             │
│                                             │
│ RESULTADO: 🚀 TUDO FUNCIONANDO!              │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🎯 Se Algo Não Funcionou

```
┌─────────────────────────────────────┐
│ TROUBLESHOOTING RÁPIDO              │
├─────────────────────────────────────┤
│                                     │
│ ❌ "Tabela não aparece"             │
│ ✅ Refresque a página (F5)          │
│    Ou execute SELECT * FROM         │
│    public.players; no SQL Editor   │
│                                     │
│ ❌ "Erro de permissão"              │
│ ✅ Ative RLS e crie políticas      │
│    Copie exatamente o SQL           │
│                                     │
│ ❌ "Realtime não funciona"          │
│ ✅ Execute ALTER PUBLICATION...     │
│    Verifique toggle em Replication  │
│    Aguarde 30 segundos              │
│                                     │
│ ❌ "Dados não salvam"               │
│ ✅ Abra Console (F12)               │
│    Procure por erros                │
│    Teste INSERT direto no SQL       │
│                                     │
│ ❌ "Credenciais não funcionam"      │
│ ✅ Copie novamente (Project URL)    │
│    Copie novamente (Anon Key)       │
│    Verifique se não há espaços      │
│    Atualizar página                 │
│                                     │
└─────────────────────────────────────┘
```

---

**Documentação Completa Criada! ✅**

Agora você tem tudo o que precisa para configurar Supabase!
