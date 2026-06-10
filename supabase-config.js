// =====================================================
// CONFIGURAÇÃO SUPABASE - ENIGMA RANKING SYSTEM
// =====================================================
// Alternativa melhor que Firebase!

const SUPABASE_CONFIG = {
    url: "https://seu-projeto.supabase.co",
    key: "sua-anon-key-aqui"
};

let supabaseClient = null;

function initializeSupabase() {
    try {
        // Carrega biblioteca Supabase
        if (!window.supabase) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            script.onload = () => {
                if (SUPABASE_CONFIG.url !== 'https://seu-projeto.supabase.co') {
                    supabaseClient = window.supabase.createClient(
                        SUPABASE_CONFIG.url,
                        SUPABASE_CONFIG.key
                    );
                    console.log('✓ Supabase inicializado com sucesso');
                }
            };
            document.head.appendChild(script);
        }
    } catch (e) {
        console.warn('⚠ Supabase não configurado:', e.message);
    }
}

// =====================================================
// FUNÇÕES DE RANKING COM SUPABASE
// =====================================================

async function savePlayerToSupabase(playerName, score, avatar) {
    if (!supabaseClient) return false;
    
    try {
        const { data, error } = await supabaseClient
            .from('players')
            .upsert([{
                name: playerName,
                tomos: score,
                avatar: avatar,
                last_updated: new Date().toISOString()
            }], { onConflict: 'name' });

        if (error) throw error;
        console.log('✓ Jogador salvo no Supabase');
        return true;
    } catch (e) {
        console.error('✗ Erro ao salvar no Supabase:', e.message);
        return false;
    }
}

async function getGlobalRankingFromSupabase() {
    if (!supabaseClient) return [];
    
    try {
        const { data, error } = await supabaseClient
            .from('players')
            .select('*')
            .order('tomos', { ascending: false })
            .limit(20);

        if (error) throw error;
        
        if (!data || data.length === 0) return [];
        
        const ranking = data.map((player, idx) => ({
            rank: idx + 1,
            name: player.name,
            tomos: player.tomos,
            avatar: player.avatar,
            lastUpdate: player.last_updated
        }));
        
        console.log('✓ Ranking carregado:', ranking.length, 'jogadores');
        return ranking;
    } catch (e) {
        console.error('✗ Erro ao carregar ranking:', e);
        return [];
    }
}

function subscribeToRankingUpdatesSupabase(callback) {
    if (!supabaseClient) return null;
    
    try {
        const subscription = supabaseClient
            .channel('players:*')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'players' },
                async () => {
                    const ranking = await getGlobalRankingFromSupabase();
                    callback(ranking);
                }
            )
            .subscribe();
        
        // Carrega dados iniciais
        getGlobalRankingFromSupabase().then(callback);
        
        return () => supabaseClient.removeChannel(subscription);
    } catch (e) {
        console.error('✗ Erro ao inscrever:', e);
        return null;
    }
}

// Inicializar quando página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSupabase);
} else {
    initializeSupabase();
}
