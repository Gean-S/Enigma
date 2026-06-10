# 🚀 SUPABASE vs GITHUB vs FIREBASE - Comparação

## 📊 Comparação Rápida

| Feature | Supabase | GitHub | Firebase |
|---------|----------|--------|----------|
| **Banco de Dados** | PostgreSQL | JSON em arquivo | NoSQL |
| **Realtime** | ✅ Nativo | ❌ Polling | ✅ Nativo |
| **Custo** | Gratuito | Gratuito | Gratuito |
| **Limite Dados** | 500MB grátis | Tamanho repo | 1GB grátis |
| **Facilidade** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Performance** | 🔥 Excelente | ⚠️ Bom | 🔥 Excelente |
| **Autenticação** | ✅ Built-in | ❌ Manual | ✅ Built-in |

---

# 🟢 SUPABASE (RECOMENDADO)

## ✅ Vantagens:
- PostgreSQL real (muito mais poderoso)
- Realtime automático
- Autenticação built-in
- Muito fácil de usar
- Melhor para crescimento futuro

## 📦 Setup em 5 Minutos

### Passo 1: Criar Conta Supabase
1. Acesse: https://supabase.com
2. Clique em **"Start your project"**
3. Faça login com GitHub (grátis!)
4. Clique em **"Create new project"**
5. Nome: `enigma-ranking`
6. Aguarde criação (2-3 minutos)

### Passo 2: Criar Tabela de Players
1. No painel Supabase, vá para **"SQL Editor"**
2. Cole este código e execute:

```sql
CREATE TABLE public.players (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  tomos INTEGER NOT NULL DEFAULT 0,
  avatar TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para buscar rápido
CREATE INDEX idx_players_tomos ON public.players(tomos DESC);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;
```

### Passo 3: Copiar Credenciais
1. Clique em **"Project Settings"** (rodinha no inferior esquerdo)
2. Vá para **"API"**
3. Procure por **"Project URL"** e **"anon public"**
4. Copie ambos

### Passo 4: Atualizar supabase-config.js
```javascript
const SUPABASE_CONFIG = {
    url: "https://seu-projeto-aleatorio.supabase.co",  // Project URL
    key: "eyJhbGciOiJIUzI1NiIsInR..."                   // anon key
};
```

### Passo 5: Usar no HTML
No arquivo `enigma.html`, adicione:

```html
<script src="supabase-config.js"></script>
```

E modifique a função `updateRanking()` para:
```javascript
async function updateRanking() {
    // ... código existente ...
    
    // Sincronizar com Supabase
    if (window.savePlayerToSupabase && state.playerName) {
        await savePlayerToSupabase(state.playerName, state.score, state.selectedAvatar)
            .catch(e => console.warn('Supabase sync falhou:', e));
    }
}
```

E `getMergedRanking()` para:
```javascript
async function getMergedRanking() {
    let onlineRanking = [];
    
    if (window.getGlobalRankingFromSupabase) {
        try {
            onlineRanking = await getGlobalRankingFromSupabase();
        } catch (e) {
            console.warn('Supabase indisponível');
        }
    }
    
    // ... resto do código ...
}
```

### ✅ Pronto!
O ranking agora sincroniza em tempo real!

---

# 🔷 GITHUB (ALTERNATIVA)

## ✅ Vantagens:
- Hospedagem grátis
- Controle total do código
- Tudo em um só lugar
- Backup automático

## ⚠️ Limitações:
- Atualização é mais lenta (não realtime)
- Requer token pessoal
- Limite de API calls

## 📦 Setup em 10 Minutos

### Passo 1: Criar Repositório
1. Acesse: https://github.com/new
2. Nome: `enigma-ranking`
3. Descrição: "Ranking online para Enigma"
4. Clique em **"Create repository"**

### Passo 2: Gerar Token Pessoal
1. Vá para GitHub Settings
2. **Developer settings** → **Personal access tokens**
3. Clique em **"Generate new token (classic)"**
4. Permissões necessárias:
   - ✅ `repo` (acesso completo ao repo)
   - ✅ `workflow` (ações)
5. Copie o token (⚠️ nunca compartilhe!)

### Passo 3: Criar Arquivo inicial
1. No repositório, clique em **"Add file"**
2. Nome: `ranking/players.json`
3. Conteúdo:
```json
[]
```
4. Clique em **"Commit new file"**

### Passo 4: Atualizar github-config.js
```javascript
const GITHUB_CONFIG = {
    owner: "seu-usuario-github",     // Ex: "joao123"
    repo: "enigma-ranking",
    branch: "main",
    token: "ghp_xxxxxxxxxxxxxyyy",   // Seu token
    filePath: "ranking/players.json"
};
```

### Passo 5: Usar no HTML
No arquivo `enigma.html`, adicione:

```html
<script src="github-config.js"></script>
```

E modifique `updateRanking()` para:
```javascript
async function updateRanking() {
    // ... código existente ...
    
    if (window.savePlayerToGitHub && state.playerName) {
        await savePlayerToGitHub(state.playerName, state.score, state.selectedAvatar)
            .catch(e => console.warn('GitHub sync falhou:', e));
    }
}
```

### ⚠️ Importante:
- GitHub API tem limite de 60 requisições/hora sem autenticação
- Com token: 5000 requisições/hora
- **Não commite o token no código!**

---

# 🎯 RECOMENDAÇÃO FINAL

**Use SUPABASE se:**
- Quer o melhor performance
- Precisa de realtime
- Quer banco de dados profissional
- Pensa em escalar o projeto

**Use GITHUB se:**
- Prefere tudo em um repositório
- Quer máximo controle
- OK com atualização mais lenta
- Quer backup versionado

---

## 🆘 Troubleshooting

### Supabase
**"Erro de conexão"** → Verifique URL e API key  
**"Dados não sincronizam"** → Verifique permissões da tabela  
**"Realtime não funciona"** → Ative em "Realtime" nas configurações  

### GitHub
**"404 Not Found"** → Token ou repo name errado  
**"Permissão negada"** → Token não tem permissões  
**"Rate limit atingido"** → Aguarde 1 hora ou gere novo token  

---

Qual você quer configurar? **Supabase** é mais fácil! 🚀
