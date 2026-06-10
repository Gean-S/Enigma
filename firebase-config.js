// =====================================================
// CONFIGURAÇÃO FIREBASE - ENIGMA RANKING SYSTEM
// =====================================================
// Substitua os valores abaixo pelos seus dados do Firebase

const FIREBASE_CONFIG = {
    apiKey: "SEU_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123xyz"
};

// Script para carregar Firebase do CDN
if (!window.firebase) {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
    document.head.appendChild(script);
    
    const script2 = document.createElement('script');
    script2.src = 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
    document.head.appendChild(script2);
}

let firebaseDB = null;

function initializeFirebase() {
    try {
        if (window.firebase && FIREBASE_CONFIG.projectId !== 'seu-projeto') {
            firebase.initializeApp(FIREBASE_CONFIG);
            firebaseDB = firebase.database();
            console.log('✓ Firebase inicializado com sucesso');
            return true;
        }
    } catch (e) {
        console.warn('⚠ Firebase não configurado ou erro:', e.message);
    }
    return false;
}

// =====================================================
// FUNÇÕES DE RANKING ONLINE
// =====================================================

async function savePlayerToFirebase(playerName, score, avatar) {
    if (!firebaseDB) return false;
    
    try {
        const playerRef = firebaseDB.ref('players/' + encodeURIComponent(playerName));
        await playerRef.set({
            name: playerName,
            tomos: score,
            avatar: avatar,
            lastUpdate: new Date().toISOString(),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        console.log('✓ Jogador salvo no Firebase');
        return true;
    } catch (e) {
        console.error('✗ Erro ao salvar no Firebase:', e);
        return false;
    }
}

async function getGlobalRankingFromFirebase() {
    if (!firebaseDB) return [];
    
    try {
        const snapshot = await firebaseDB.ref('players').orderByChild('tomos').limitToLast(20).once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        const ranking = Object.values(data)
            .sort((a, b) => b.tomos - a.tomos)
            .map((player, idx) => ({
                rank: idx + 1,
                name: player.name,
                tomos: player.tomos,
                avatar: player.avatar,
                lastUpdate: player.lastUpdate
            }))
            .slice(0, 15);
        
        console.log('✓ Ranking carregado:', ranking.length, 'jogadores');
        return ranking;
    } catch (e) {
        console.error('✗ Erro ao carregar ranking:', e);
        return [];
    }
}

async function subscribeToRankingUpdates(callback) {
    if (!firebaseDB) return null;
    
    try {
        const ref = firebaseDB.ref('players');
        ref.orderByChild('tomos').limitToLast(20).on('value', (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                callback([]);
                return;
            }
            
            const ranking = Object.values(data)
                .sort((a, b) => b.tomos - a.tomos)
                .slice(0, 15)
                .map((player, idx) => ({
                    rank: idx + 1,
                    name: player.name,
                    tomos: player.tomos,
                    avatar: player.avatar
                }));
            
            callback(ranking);
        });
        
        return () => ref.off('value');
    } catch (e) {
        console.error('✗ Erro ao inscrever:', e);
        return null;
    }
}

// Inicializar Firebase quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFirebase);
} else {
    initializeFirebase();
}
