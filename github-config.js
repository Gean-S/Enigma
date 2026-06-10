// =====================================================
// CONFIGURAÇÃO GITHUB - ENIGMA RANKING SYSTEM
// =====================================================
// Armazena dados em repositório GitHub via API

const GITHUB_CONFIG = {
    owner: "seu-usuario-github",           // ex: "seu-usuario"
    repo: "enigma-ranking",                 // ex: "enigma-ranking"
    branch: "main",
    token: "seu-github-token-aqui",         // Personal Access Token
    filePath: "ranking/players.json"        // Arquivo onde salva dados
};

// Função auxiliar para chamadas API GitHub
async function githubAPI(method, endpoint, data = null) {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${endpoint}`;
    
    try {
        const options = {
            method: method,
            headers: {
                'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (e) {
        console.error('✗ Erro GitHub API:', e.message);
        return null;
    }
}

// =====================================================
// FUNÇÕES DE RANKING COM GITHUB
// =====================================================

async function savePlayerToGitHub(playerName, score, avatar) {
    if (!GITHUB_CONFIG.token || GITHUB_CONFIG.token === 'seu-github-token-aqui') {
        return false;
    }

    try {
        // Carrega ranking atual
        let players = [];
        const fileData = await githubAPI('GET', GITHUB_CONFIG.filePath);
        
        if (fileData && fileData.content) {
            const content = atob(fileData.content); // Decodifica base64
            players = JSON.parse(content);
        }

        // Atualiza ou adiciona jogador
        const idx = players.findIndex(p => p.name === playerName);
        if (idx !== -1) {
            players[idx] = { name: playerName, tomos: score, avatar: avatar, lastUpdate: new Date().toISOString() };
        } else {
            players.push({ name: playerName, tomos: score, avatar: avatar, lastUpdate: new Date().toISOString() });
        }

        // Ordena por tomos
        players.sort((a, b) => b.tomos - a.tomos);
        players = players.slice(0, 50); // Mantém top 50

        // Codifica para base64
        const content = btoa(JSON.stringify(players, null, 2));

        // Salva no GitHub
        await githubAPI('PUT', GITHUB_CONFIG.filePath, {
            message: `Update ranking: ${playerName} - ${score} tomos`,
            content: content,
            branch: GITHUB_CONFIG.branch,
            sha: fileData ? fileData.sha : undefined
        });

        console.log('✓ Jogador salvo no GitHub');
        return true;
    } catch (e) {
        console.error('✗ Erro ao salvar no GitHub:', e.message);
        return false;
    }
}

async function getGlobalRankingFromGitHub() {
    if (!GITHUB_CONFIG.token || GITHUB_CONFIG.token === 'seu-github-token-aqui') {
        return [];
    }

    try {
        const fileData = await githubAPI('GET', GITHUB_CONFIG.filePath);
        
        if (!fileData || !fileData.content) {
            return [];
        }

        const content = atob(fileData.content); // Decodifica base64
        const players = JSON.parse(content);

        const ranking = players
            .sort((a, b) => b.tomos - a.tomos)
            .slice(0, 15)
            .map((player, idx) => ({
                rank: idx + 1,
                name: player.name,
                tomos: player.tomos,
                avatar: player.avatar,
                lastUpdate: player.lastUpdate
            }));

        console.log('✓ Ranking carregado do GitHub:', ranking.length, 'jogadores');
        return ranking;
    } catch (e) {
        console.error('✗ Erro ao carregar ranking:', e);
        return [];
    }
}

// Polling para atualizações (GitHub não tem WebSocket)
let githubPollingInterval = null;

function subscribeToRankingUpdatesGitHub(callback) {
    if (!GITHUB_CONFIG.token || GITHUB_CONFIG.token === 'seu-github-token-aqui') {
        return null;
    }

    try {
        // Carrega dados iniciais
        getGlobalRankingFromGitHub().then(callback);

        // Faz polling a cada 30 segundos
        githubPollingInterval = setInterval(async () => {
            const ranking = await getGlobalRankingFromGitHub();
            callback(ranking);
        }, 30000);

        return () => clearInterval(githubPollingInterval);
    } catch (e) {
        console.error('✗ Erro ao inscrever:', e);
        return null;
    }
}

console.log('✓ GitHub config carregado (aguardando token válido)');
