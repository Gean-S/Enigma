// =====================================================
// SETUP SUPABASE - GUIA VISUAL PASSO A PASSO
// =====================================================

const SUPABASE_SETUP = {
    step1: {
        titulo: "1️⃣ CRIAR CONTA SUPABASE",
        instrucoes: [
            "🌐 Acesse: https://supabase.com",
            "📱 Clique em 'Start your project'",
            "🔑 Faça login com GitHub (gratuito!)",
            "✅ Complete o email verification"
        ]
    },
    step2: {
        titulo: "2️⃣ CRIAR PROJETO",
        instrucoes: [
            "🎯 Clique em 'Create new project'",
            "📝 Nome: enigma-ranking",
            "🔒 Database password: (crie uma senha forte)",
            "🌍 Região: us-east-1 (ou a mais próxima)",
            "⏳ Aguarde 2-3 minutos de criação"
        ]
    },
    step3: {
        titulo: "3️⃣ CRIAR TABELA SQL",
        instrucoes: [
            "📊 No dashboard, vá para 'SQL Editor'",
            "➕ Clique em 'New query'",
            "📋 Cole o SQL abaixo e execute",
            "✅ Aguarde a confirmação"
        ]
    },
    step4: {
        titulo: "4️⃣ COPIAR CREDENCIAIS",
        instrucoes: [
            "⚙️ Clique em 'Project Settings' (rodinha)",
            "🔗 Vá para 'API'",
            "📌 Copie 'Project URL'",
            "🔐 Copie 'anon public' key"
        ]
    },
    step5: {
        titulo: "5️⃣ CONFIGURAR ARQUIVO",
        instrucoes: [
            "📄 Abra: supabase-config.js",
            "✏️ Cole suas credenciais",
            "💾 Salve o arquivo",
            "✅ Pronto!"
        ]
    }
};

// SQL para executar no Supabase
const SUPABASE_SQL = `
CREATE TABLE IF NOT EXISTS public.players (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  tomos INTEGER NOT NULL DEFAULT 0,
  avatar TEXT NOT NULL DEFAULT 'explorer',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para buscar rápido por tomos
CREATE INDEX IF NOT EXISTS idx_players_tomos ON public.players(tomos DESC);

-- Enable Realtime para esta tabela
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;

-- Política de acesso (ler público, escrever público para teste)
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.players
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON public.players
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.players
  FOR UPDATE USING (true) WITH CHECK (true);
`;

console.log("📖 Para setup visual, abra este arquivo no navegador!");
console.log("📋 SQL a executar no Supabase:");
console.log(SUPABASE_SQL);
