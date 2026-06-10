# 🎮 Como Ativar Ranking Online no Enigma

## ⚡ Método Fácil (Recomendado)

### 1. Abra `enigma.html`
### 2. Encontre a linha que diz:
```
<!-- Firebase Realtime Database para Ranking Online -->
<script src="firebase-config.js"></script>
```

### 3. Substitua por APENAS UMA das opções abaixo:

#### 🟢 **SUPABASE** (Melhor - Realtime)
```html
<script src="ranking-backend.js"></script>
<script>
    const RANKING_BACKEND = 'SUPABASE';
</script>
<script src="supabase-config.js"></script>
```

#### 🔷 **GITHUB** (Simples)
```html
<script src="ranking-backend.js"></script>
<script>
    const RANKING_BACKEND = 'GITHUB';
</script>
<script src="github-config.js"></script>
```

#### 🟥 **FIREBASE** (Original)
```html
<script src="ranking-backend.js"></script>
<script>
    const RANKING_BACKEND = 'FIREBASE';
</script>
<script src="firebase-config.js"></script>
```

#### 💾 **LOCAL** (Sem internet)
```html
<script src="ranking-backend.js"></script>
<script>
    const RANKING_BACKEND = 'LOCAL';
</script>
```

### 4. Configure seu backend escolhido

Confira o arquivo `SUPABASE-GITHUB-SETUP.md` para instruções de setup.

---

## 🔧 Opções Avançadas

### Alternar backends em tempo real:
```javascript
RANKING_BACKEND = 'SUPABASE'; // Muda para Supabase
RANKING_BACKEND = 'GITHUB';   // Muda para GitHub
RANKING_BACKEND = 'LOCAL';    // Volta ao local
```

### Ver qual backend está ativo:
```javascript
console.log(RANKING_BACKEND); // Mostra o backend atual
```

---

## 📊 Resumo dos Backends

| Backend | Pros | Contras | Setup |
|---------|------|---------|-------|
| **SUPABASE** | Realtime, PostgreSQL, Fácil | Precisa de conta | 5 min |
| **GITHUB** | Gratuito, Controle total | Sem realtime | 10 min |
| **FIREBASE** | Realtime, Built-in | Menos controle | 15 min |
| **LOCAL** | Offline, Nenhum setup | Só funciona offline | 0 min |

---

## ✅ Checklist

- [ ] Escolhi meu backend preferido
- [ ] Criei conta/configurei credentials
- [ ] Atualizei o arquivo config
- [ ] Modifiquei enigma.html com o novo script
- [ ] Testei o jogo
- [ ] Ranking aparece na tela

---

## 🆘 Problemas Comuns

**"Ranking vazio"** → Aguarde alguns segundos ou refresque a página

**"Erro de conexão"** → Verifique credenciais no arquivo config

**"Dados não salvam"** → Abra Console (F12) e procure por erros

**"Página em branco"** → Verifique se as credenciais estão corretas

---

Qualquer dúvida, posso ajudar com a configuração! 🚀
