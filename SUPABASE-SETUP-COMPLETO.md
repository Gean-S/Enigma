# 🟢 GUIA COMPLETO: SUPABASE + ENIGMA RANKING

## 📋 Índice
1. [Criar Conta](#criar-conta)
2. [Criar Projeto](#criar-projeto)
3. [Criar Tabelas SQL](#criar-tabelas-sql)
4. [Configurar Permissões (RLS)](#configurar-permissões-rls)
5. [Ativar Realtime](#ativar-realtime)
6. [Copiar Credenciais](#copiar-credenciais)
7. [Testar Integração](#testar-integração)
8. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Criar Conta

### Passo A: Acessar Supabase
```
🌐 URL: https://supabase.com
1. Clique em "Start your project"
2. Você verá opções de login:
   - GitHub (recomendado)
   - Google
   - Email
```

### Passo B: Login com GitHub (Recomendado)
```
1. Clique em "Continue with GitHub"
2. Autorize o acesso
3. Complete o email verification
   (procure na caixa de entrada)
4. ✅ Conta criada!
```

### Passo C: Dashboard Inicial
```
Você verá:
├── Projects (seu espaço de projetos)
├── Documentation (ajuda)
├── Pricing (planos)
└── Settings (configurações)
```

---

## 2️⃣ Criar Projeto

### Passo A: Novo Projeto
```
1. No dashboard, clique em "New project" ou "Create new project"
2. Preencha:
   │
   ├── Organization: (escolha ou crie)
   ├── Name: enigma-ranking (EXATAMENTE assim)
   ├── Database Password: (crie uma senha forte!)
   │   ⚠️ Salve esta senha em lugar seguro
   │
   └── Region: us-east-1 (ou a mais próxima de você)
       - us-east-1 (Virgínia)
       - us-west-1 (Califórnia)
       - eu-west-1 (Irlanda)
       - ap-northeast-1 (Tóquio)
```

### Passo B: Aguardar Criação
```
Você verá:
🔄 Creating your project...
   ├── Setting up database
   ├── Creating Auth instance
   ├── Setting up Realtime
   └── Finalizing (2-3 minutos)

✅ Quando terminar, você será levado ao dashboard do projeto
```

### Passo C: Dashboard do Projeto
```
Você verá na esquerda:
├── 🏠 Home
├── 📊 Database
│   ├── Tables
│   ├── SQL Editor
│   ├── Backups
│   └── Migrations
├── 🔐 Authentication
├── 🔌 Realtime
├── 📦 Storage
├── 🔧 Vector
└── ⚙️ Project Settings
```

---

## 3️⃣ Criar Tabelas SQL

### Passo A: Abrir SQL Editor
```
1. Na esquerda, clique em "Database"
2. Clique em "SQL Editor"
3. Clique em "New query"
4. Você verá um editor em branco
```

### Passo B: Copiar SQL Completo

#### 📋 SQL PARA COPIAR (TABELA PRINCIPAL):

```sql
-- =====================================================
-- TABELA PLAYERS - RANKING ENIGMA
-- =====================================================

CREATE TABLE IF NOT EXISTS public.players (
  -- ID único
  id BIGSERIAL PRIMARY KEY,
  
  -- Nome do jogador (único)
  name TEXT UNIQUE NOT NULL,
  
  -- Tomos de Sabedoria (pontuação)
  tomos INTEGER NOT NULL DEFAULT 0,
  
  -- Avatar selecionado
  avatar TEXT NOT NULL DEFAULT 'explorer',
  
  -- Timestamps
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES (para buscas rápidas)
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_players_tomos ON public.players(tomos DESC);
CREATE INDEX IF NOT EXISTS idx_players_name ON public.players(name);
CREATE INDEX IF NOT EXISTS idx_players_created ON public.players(created_at DESC);

-- =====================================================
-- TRIGGERS (atualizar timestamp automaticamente)
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_players_updated_at BEFORE UPDATE
    ON public.players
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- COMENTÁRIOS NA TABELA (para documentação)
-- =====================================================

COMMENT ON TABLE public.players IS 'Ranking global de jogadores do Enigma';
COMMENT ON COLUMN public.players.id IS 'ID único do jogador';
COMMENT ON COLUMN public.players.name IS 'Nome do jogador (único)';
COMMENT ON COLUMN public.players.tomos IS 'Pontuação total em Tomos de Sabedoria';
COMMENT ON COLUMN public.players.avatar IS 'ID do avatar selecionado';
COMMENT ON COLUMN public.players.last_updated IS 'Última vez que foi atualizado';
COMMENT ON COLUMN public.players.created_at IS 'Data de criação do registro';
```

### Passo C: Colar no Editor
```
1. Abra o arquivo SUPABASE-SETUP.html no navegador
2. Na seção "SQL para Executar", clique "Copiar SQL"
3. Volte ao Supabase SQL Editor
4. Cole o SQL (Ctrl+V)
5. Clique em "RUN" ou pressione "Ctrl+Enter"
```

### Passo D: Confirmar Execução
```
Você deverá ver:
✅ Query executed successfully

Ou se já existir:
ℹ️ Relation "public.players" already exists

Ambos indicam sucesso! ✅
```

### Passo E: Verificar Tabela Criada
```
1. Na esquerda, clique em "Tables"
2. Você deverá ver: public.players
3. Clique nela para expandir e ver as colunas:
   ├── id (bigint)
   ├── name (text)
   ├── tomos (integer)
   ├── avatar (text)
   ├── last_updated (timestamptz)
   ├── created_at (timestamptz)
   └── updated_at (timestamptz)
```

---

## 4️⃣ Configurar Permissões (RLS)

### ⚠️ Importante: Row Level Security (RLS)

O RLS controla quem pode ler/escrever na tabela.

### Passo A: Ativar RLS
```
1. Na esquerda, clique em "Database" → "Tables"
2. Clique em "public.players"
3. Vá para aba "RLS" (ou "Row Level Security")
4. Clique em "Enable RLS"
5. ✅ RLS ativado!
```

### Passo B: Criar Políticas de Acesso

#### 📋 SQL PARA COPIAR (POLÍTICAS):

```sql
-- =====================================================
-- ROW LEVEL SECURITY - POLÍTICAS
-- =====================================================

-- ✅ PERMITIR LEITURA PÚBLICA (Todos podem ver o ranking)
CREATE POLICY "Allow public read access" ON public.players
  FOR SELECT USING (true);

-- ✅ PERMITIR INSERT PÚBLICO (Qualquer um pode criar entrada)
CREATE POLICY "Allow public insert" ON public.players
  FOR INSERT WITH CHECK (true);

-- ✅ PERMITIR UPDATE PÚBLICO (Qualquer um pode atualizar seu próprio nome)
CREATE POLICY "Allow public update" ON public.players
  FOR UPDATE USING (true) WITH CHECK (true);

-- ✅ PERMITIR DELETE PÚBLICO (Opcional - permitir deletar)
-- CREATE POLICY "Allow public delete" ON public.players
--   FOR DELETE USING (true);
```

### Passo C: Executar Políticas
```
1. Volte a "SQL Editor"
2. Clique em "New query"
3. Cole o SQL das políticas
4. Clique "RUN"
5. ✅ Políticas criadas!
```

### Passo D: Verificar Políticas
```
1. Vá em "Database" → "Tables" → "public.players"
2. Clique na aba "RLS"
3. Você deverá ver 3 políticas:
   ✅ Allow public read access
   ✅ Allow public insert
   ✅ Allow public update
```

---

## 5️⃣ Ativar Realtime

### O que é Realtime?
```
Realtime = Atualizações automáticas em tempo real
Quando alguém adiciona pontos, TODOS veem instantaneamente!
```

### Passo A: Ativar Realtime
```
1. Na esquerda, clique em "Database"
2. Clique em "Replication" (ou "Publications")
3. Procure por "supabase_realtime"
4. Clique para expandir
5. Localize "public.players"
6. Clique no toggle para ATIVAR ✅
```

### Passo B: Alternativa via SQL
```
Se não encontrar, execute no SQL Editor:

ALTER PUBLICATION supabase_realtime ADD TABLE public.players;
```

### Passo C: Confirmar
```
Você deverá ver a tabela "players" com status ✅ Enabled
```

---

## 6️⃣ Copiar Credenciais

### 🔑 PASSO CRÍTICO!

Essas credenciais são necessárias para conectar o jogo ao Supabase.

### Passo A: Ir para Settings
```
1. Na esquerda, no fim, clique na ⚙️ (Settings)
2. Clique em "Project Settings"
3. Na esquerda, clique em "API"
```

### Passo B: Encontrar Project URL
```
Você verá:

📌 Project URL (com ícone de copiar)
https://XXXXX-XXXXX-XXXXX.supabase.co

1. Clique no ícone de copiar (📋)
2. Guarde este valor como "PROJECT_URL"
```

### Passo C: Encontrar Anon Key
```
Você verá várias chaves:

🔐 Anon (Public) Key ← USE ESTA!
eyJhbGciOiJIUzI1NiIsInR...

1. Clique no ícone de copiar
2. Guarde como "ANON_KEY"

⚠️ NÃO copie a "Service Role Key"
   (essa é apenas para backend)
```

### Passo D: Guardar em Lugar Seguro
```
Crie um arquivo .env ou anote:

PROJECT_URL=https://XXXXX-XXXXX-XXXXX.supabase.co
ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...

⚠️ Nunca compartilhe a ANON_KEY publicamente!
```

---

## 7️⃣ Testar Integração

### Teste 1: Testar SQL Direto

#### No SQL Editor, execute:

```sql
-- Inserir teste
INSERT INTO public.players (name, tomos, avatar) 
VALUES ('TestPlayer', 100, 'explorer');

-- Visualizar dados
SELECT * FROM public.players;

-- Contar linhas
SELECT COUNT(*) FROM public.players;
```

**Resultado esperado:**
```
✅ 1 linha inserida
✅ TestPlayer com 100 tomos aparece
✅ COUNT = 1
```

### Teste 2: Testar no Navegador

#### No Console do Navegador (F12):

```javascript
// Carregar Supabase
const { createClient } = supabase;
const client = createClient(PROJECT_URL, ANON_KEY);

// Buscar dados
const { data, error } = await client
  .from('players')
  .select('*');

console.log(data);
// Deve mostrar [{ name: 'TestPlayer', tomos: 100, ... }]
```

### Teste 3: Testar Realtime

```javascript
// Inscrever-se em mudanças
const subscription = client
  .channel('players:*')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'players' },
    payload => {
      console.log('Mudança detectada:', payload);
    }
  )
  .subscribe();

// Agora, se outro usuario adicionar dados no SQL Editor,
// Você verá a mudança em tempo real no console!
```

---

## 8️⃣ Troubleshooting

### ❌ Erro: "Table does not exist"
```
Solução:
1. Verifique se executou o SQL de criação da tabela
2. Verifique se o nome é "public.players" (exatamente)
3. Refresque a página
4. Tente criar novamente
```

### ❌ Erro: "Permission denied"
```
Solução:
1. Verifique se RLS está ativado
2. Verifique se as políticas foram criadas
3. Execute novamente o SQL das políticas
4. Se persistir, desative RLS temporariamente para debug:
   ALTER TABLE public.players DISABLE ROW LEVEL SECURITY;
```

### ❌ "Realtime não funciona"
```
Solução:
1. Verifique se executou: ALTER PUBLICATION supabase_realtime ADD TABLE public.players;
2. Vá em Database → Replication
3. Confirme que "players" está com toggle ✅
4. Espere 30 segundos e tente novamente
```

### ❌ "Dados não salvam do jogo"
```
Solução:
1. Abra Console (F12) do navegador
2. Procure por erros de rede
3. Verifique se PROJECT_URL e ANON_KEY estão corretos
4. Teste com SQL direto:
   INSERT INTO public.players (name, tomos, avatar) VALUES ('Test2', 50, 'knight');
5. Se funcionar no SQL, o problema é no código JavaScript
```

### ❌ "Quota excedida"
```
Supabase gratuito tem limite de 500MB
Solução:
1. Faça backup dos dados
2. Delete registros antigos
3. Ou faça upgrade para plano pago
```

---

## 🎯 Checklist Final

```
Antes de usar o jogo:

SQL e Tabelas:
☐ Tabela "public.players" criada
☐ Colunas corretas (id, name, tomos, avatar, etc)
☐ Índices criados (idx_players_tomos, idx_players_name)

Permissões (RLS):
☐ RLS ativado em public.players
☐ 3 Políticas criadas (read, insert, update)
☐ Testou INSERT e SELECT no SQL Editor

Realtime:
☐ Executou ALTER PUBLICATION
☐ Verificou em Database → Replication
☐ "players" está habilitada ✅

Credenciais:
☐ Copiou PROJECT_URL
☐ Copiou ANON_KEY
☐ Guardou em lugar seguro
☐ Adicionou a SUPABASE-SETUP.html

Integração:
☐ Abriu enigma.html
☐ Abriu Console (F12)
☐ Viu "✅ Supabase inicializado com sucesso!"
☐ Testou com um enigma
☐ Dados apareceram no Ranking

Tudo pronto? 🚀 Bom jogo!
```

---

## 📞 Links Úteis

| Link | Descrição |
|------|-----------|
| https://supabase.com | Site oficial |
| https://supabase.com/docs | Documentação |
| https://app.supabase.com | Dashboard |
| https://supabase.com/docs/guides/api | API Reference |
| https://github.com/supabase/supabase | GitHub |

---

## 💡 Dicas Avançadas

### Backup Automático
```
1. Em "Database" → "Backups"
2. Configure backup diário
3. Seus dados estarão sempre seguros
```

### Monitor de Performance
```
1. Em "Database" → "Performance"
2. Veja consultas lentas
3. Otimize conforme necessário
```

### Logs em Tempo Real
```
1. Em "Logs" na esquerda
2. Veja todas as requisições
3. Debug de problemas
```

### Upgrade do Plano
```
Se precisar de mais:
- Mais de 500MB de dados
- Mais requisições
- Autenticação avançada

Acesse: Project Settings → Billing
```

---

## 🎉 Pronto!

```
┌──────────────────────────────────────┐
│  SUPABASE COMPLETAMENTE CONFIGURADO!  │
│                                      │
│  ✅ PostgreSQL                        │
│  ✅ Tabelas criadas                   │
│  ✅ RLS configurado                   │
│  ✅ Realtime ativado                  │
│  ✅ Credenciais copiadas              │
│                                      │
│  Agora use SUPABASE-SETUP.html       │
│  para adicionar suas credenciais     │
│                                      │
│  E então jogue enigma.html! 🎮       │
└──────────────────────────────────────┘
```

---

**Versão:** 1.0  
**Data:** 2026-06-10  
**Status:** ✅ Completo
