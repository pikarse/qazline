-- Создание таблицы тренажеров
CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    document_url TEXT NOT NULL,
    grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 11),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Создание бакета для хранения файлов тренажеров
INSERT INTO storage.buckets (id, name, public) 
VALUES ('exercises', 'exercises', true)
ON CONFLICT (id) DO NOTHING;

-- Политики доступа к файлам в storage
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Публичный доступ к файлам тренажеров'
    ) THEN
        CREATE POLICY "Публичный доступ к файлам тренажеров"
        ON storage.objects FOR SELECT
        USING (bucket_id = 'exercises');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Только админы могут загружать файлы'
    ) THEN
        CREATE POLICY "Только админы могут загружать файлы"
        ON storage.objects FOR INSERT
        WITH CHECK (
            bucket_id = 'exercises' 
            AND auth.role() = 'authenticated' 
            AND auth.jwt() ->> 'role' = 'admin'
        );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Только админы могут удалять файлы'
    ) THEN
        CREATE POLICY "Только админы могут удалять файлы"
        ON storage.objects FOR DELETE
        USING (
            bucket_id = 'exercises' 
            AND auth.role() = 'authenticated' 
            AND auth.jwt() ->> 'role' = 'admin'
        );
    END IF;
END $$;

-- Создание индексов для оптимизации поиска
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'exercises' 
        AND indexname = 'exercises_grade_idx'
    ) THEN
        CREATE INDEX exercises_grade_idx ON public.exercises(grade);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'exercises' 
        AND indexname = 'exercises_title_idx'
    ) THEN
        CREATE INDEX exercises_title_idx ON public.exercises USING gin (to_tsvector('russian', title));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'exercises' 
        AND indexname = 'exercises_created_at_idx'
    ) THEN
        CREATE INDEX exercises_created_at_idx ON public.exercises(created_at DESC);
    END IF;
END $$;

-- Добавление RLS политик
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

-- Политики для таблицы exercises
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'exercises' 
        AND policyname = 'Публичный доступ к тренажерам'
    ) THEN
        CREATE POLICY "Публичный доступ к тренажерам"
        ON public.exercises FOR SELECT
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'exercises' 
        AND policyname = 'Только админы могут добавлять тренажеры'
    ) THEN
        CREATE POLICY "Только админы могут добавлять тренажеры"
        ON public.exercises FOR INSERT
        WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'exercises' 
        AND policyname = 'Только админы могут обновлять тренажеры'
    ) THEN
        CREATE POLICY "Только админы могут обновлять тренажеры"
        ON public.exercises FOR UPDATE
        USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'exercises' 
        AND policyname = 'Только админы могут удалять тренажеры'
    ) THEN
        CREATE POLICY "Только админы могут удалять тренажеры"
        ON public.exercises FOR DELETE
        USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
    END IF;
END $$;

-- Триггер для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_exercises_updated_at'
    ) THEN
        CREATE TRIGGER update_exercises_updated_at
            BEFORE UPDATE ON public.exercises
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$; 