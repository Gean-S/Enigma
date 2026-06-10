// =====================================================
// RANKING SYSTEM UNIFICADO
// =====================================================
// Escolha qual backend usar: SUPABASE, GITHUB, FIREBASE ou LOCAL

const RANKING_BACKEND = 'SUPABASE'; // Opções: 'SUPABASE', 'GITHUB', 'FIREBASE', 'LOCAL'

// =====================================================
// WRAPPER UNIFICADO - NÃO MODIFICAR
// =====================================================

async function savePlayerToBackend(playerName, score, avatar) {
    switch (RANKING_BACKEND) {
        case 'SUPABASE':
            return window.savePlayerToSupabase ? 
                await window.savePlayerToSupabase(playerName, score, avatar) : false;
        
        case 'GITHUB':
            return window.savePlayerToGitHub ? 
                await window.savePlayerToGitHub(playerName, score, avatar) : false;
        
        case 'FIREBASE':
            return window.savePlayerToFirebase ? 
                await window.savePlayerToFirebase(playerName, score, avatar) : false;
        
        case 'LOCAL':
            return saveToLocalStorage(playerName, score, avatar);
        
        default:
            return saveToLocalStorage(playerName, score, avatar);
    }
}

async function getGlobalRankingFromBackend() {
    switch (RANKING_BACKEND) {
        case 'SUPABASE':
            return window.getGlobalRankingFromSupabase ? 
                await window.getGlobalRankingFromSupabase() : [];
        
        case 'GITHUB':
            return window.getGlobalRankingFromGitHub ? 
                await window.getGlobalRankingFromGitHub() : [];
        
        case 'FIREBASE':
            return window.getGlobalRankingFromFirebase ? 
                await window.getGlobalRankingFromFirebase() : [];
        
        case 'LOCAL':
            return getFromLocalStorage();
        
        default:
            return getFromLocalStorage();
    }
}

// =====================================================
// FALLBACK: LOCAL STORAGE
// =====================================================

function saveToLocalStorage(playerName, score, avatar) {
    try {
        let players = JSON.parse(localStorage.getItem('enigma_ranking') || '[]');
        const idx = players.findIndex(p => p.name === playerName);
        
        if (idx !== -1) {
            players[idx] = { name: playerName, tomos: score, avatar: avatar };
        } else {
            players.push({ name: playerName, tomos: score, avatar: avatar });
        }
        
        players.sort((a, b) => b.tomos - a.tomos);
        localStorage.setItem('enigma_ranking', JSON.stringify(players.slice(0, 50)));
        return true;
    } catch (e) {
        console.warn('Erro ao salvar localmente:', e);
        return false;
    }
}

function getFromLocalStorage() {
    try {
        const players = JSON.parse(localStorage.getItem('enigma_ranking') || '[]');
        return players.map((p, idx) => ({
            rank: idx + 1,
            name: p.name,
            tomos: p.tomos,
            avatar: p.avatar
        })).slice(0, 15);
    } catch (e) {
        return [];
    }
}

// =====================================================
// CARREGAR BACKEND SELECIONADO
// =====================================================

console.log(`📊 Ranking Backend: ${RANKING_BACKEND}`);

switch (RANKING_BACKEND) {
    case 'SUPABASE':
        if (!window.initializeSupabase) {
            const script = document.createElement('script');
            script.src = 'supabase-config.js';
            document.head.appendChild(script);
        }
        break;
    
    case 'GITHUB':
        if (!window.githubAPI) {
            const script = document.createElement('script');
            script.src = 'github-config.js';
            document.head.appendChild(script);
        }
        break;
    
    case 'FIREBASE':
        if (!window.initializeFirebase) {
            const script = document.createElement('script');
            script.src = 'firebase-config.js';
            document.head.appendChild(script);
        }
        break;
    
    default:
        console.log('✓ Usando armazenamento local (localStorage)');
}
