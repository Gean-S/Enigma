-- =====================================================
-- SUPABASE RANKING SYSTEM - SQL COMPLETO
-- =====================================================
-- 
-- INSTRUÇÕES:
-- 1. No Supabase, vá em "Database" → "SQL Editor"
-- 2. Clique em "New query"
-- 3. Cole TODO o código abaixo
-- 4. Clique em "RUN"
-- 5. Pronto! Tabela criada
--
-- =====================================================

-- PARTE 1: CRIAR TABELA
CREATE TABLE IF NOT EXISTS public.players (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  tomos INTEGER NOT NULL DEFAULT 0,
  avatar TEXT NOT NULL DEFAULT 'explorer',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PARTE 2: CRIAR ÍNDICES (para performance)
CREATE INDEX IF NOT EXISTS idx_players_tomos ON public.players(tomos DESC);
CREATE INDEX IF NOT EXISTS idx_players_name ON public.players(name);
CREATE INDEX IF NOT EXISTS idx_players_created ON public.players(created_at DESC);

-- PARTE 3: CRIAR TRIGGER (atualizar timestamp)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_players_updated_at ON public.players;
CREATE TRIGGER update_players_updated_at BEFORE UPDATE
    ON public.players
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- PARTE 4: ENABLE RLS
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- PARTE 5: CRIAR POLÍTICAS DE ACESSO
DROP POLICY IF EXISTS "Allow public read access" ON public.players;
CREATE POLICY "Allow public read access" ON public.players
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON public.players;
CREATE POLICY "Allow public insert" ON public.players
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update" ON public.players;
CREATE POLICY "Allow public update" ON public.players
  FOR UPDATE USING (true) WITH CHECK (true);

-- PARTE 6: ENABLE REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;

-- =====================================================
-- TUDO PRONTO! ✅
-- =====================================================
-- 
-- Se tudo correu bem, você verá:
-- ✅ Query executed successfully
--
-- Para verificar, execute:
-- SELECT * FROM public.players;
-- 
-- Ou teste insertando dados:
-- INSERT INTO public.players (name, tomos, avatar)
-- VALUES ('TestPlayer', 100, 'explorer');
--
-- =====================================================
