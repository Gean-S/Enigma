# 🔥 Guia de Setup - Firebase Ranking Online

## Passo 1: Criar Projeto Firebase (Gratuito)

1. Acesse: https://console.firebase.google.com/
2. Clique em **"Criar Projeto"**
3. Nome: `enigma-ranking` (ou outro que preferir)
4. Desabilite Google Analytics (opcional)
5. Clique em **"Criar Projeto"** e aguarde

## Passo 2: Configurar Realtime Database

1. No painel do Firebase, vá para **"Realtime Database"**
2. Clique em **"Criar banco de dados"**
3. Local: **"Estados Unidos"** (us-central1)
4. Modo: **"Iniciar no modo de teste"** (depois mudaremos regras)
5. Clique em **"Ativar"**

## Passo 3: Obter Credenciais Firebase

1. No painel, clique no ícone de ⚙️ **Configurações**
2. Vá para **"Seu projeto"** → **"Configurações do projeto"**
3. Role para baixo até **"SDK do Firebase"**
4. Procure pelo código que começa com `const firebaseConfig = {`
5. **Copie todo o objeto de configuração**

Exemplo:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyD_7_xQ9mQ...",
    authDomain: "enigma-ranking.firebaseapp.com",
    databaseURL: "https://enigma-ranking-default-rtdb.firebaseio.com",
    projectId: "enigma-ranking",
    storageBucket: "enigma-ranking.appspot.com",
    messagingSenderId: "123456789...",
    appId: "1:123456789:web:abc123..."
};
```

## Passo 4: Configurar Arquivo firebase-config.js

1. Abra **firebase-config.js**
2. Substitua `FIREBASE_CONFIG` pelos valores copiados
3. Salve o arquivo

## Passo 5: Adicionar Script ao HTML

No arquivo **enigma.html**, adicione antes da tag `</body>`:

```html
<script src="firebase-config.js"></script>
```

## Passo 6: Configurar Regras de Segurança (IMPORTANTE!)

1. No Firebase Console, vá para **Realtime Database**
2. Clique na aba **"Regras"**
3. Substitua o conteúdo por:

```json
{
  "rules": {
    "players": {
      ".read": true,
      "$playerId": {
        ".write": true,
        "name": { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 50" },
        "tomos": { ".validate": "newData.isNumber() && newData.val() >= 0" },
        "avatar": { ".validate": "newData.isString()" },
        ".validate": "newData.hasChildren(['name', 'tomos', 'avatar'])"
      }
    }
  }
}
```

4. Clique em **"Publicar"**

## Passo 7: Modificar enigma.html para Usar Firebase

Substitua as funções de ranking pelo código Firebase. Procure por:
- `updateRanking()` - Adicionar sincronização com Firebase
- `getMergedRanking()` - Usar dados do Firebase

## ✅ Testando

1. Abra o jogo no navegador
2. Verifique o Console (F12 → Console)
3. Deve aparecer: ✓ Firebase inicializado com sucesso
4. Ao completar um enigma, o ranking deve sincronizar online

## 🔒 Dica de Segurança

Se o jogo ficar em produção:
- Use regras mais restritivas (adicionar autenticação)
- Limite gravações por IP
- Configure CORS no Firebase

## ❓ Troubleshooting

**Mensagem: "Firebase não configurado"**
- Verifique se copiou a configuração corretamente
- Certifique-se que o projectId não é "seu-projeto"

**Ranking não atualiza**
- Abra Console (F12) e procure por erros
- Verifique se o banco de dados está ativo

**Erro de CORS**
- Aguarde alguns minutos após criar o projeto
- Recarregue a página

---
**Precisa de ajuda?** Estou aqui para integrar no seu código!
