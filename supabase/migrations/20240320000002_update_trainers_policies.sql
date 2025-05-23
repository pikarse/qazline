-- Включаем RLS для таблицы trainers
ALTER TABLE public.trainers ENABLE ROW LEVEL SECURITY;

-- Удаляем все старые политики
DROP POLICY IF EXISTS "Публичный доступ к тренерам" ON public.trainers;
DROP POLICY IF EXISTS "Только админы могут добавлять тренеров" ON public.trainers;
DROP POLICY IF EXISTS "Только админы могут обновлять тренеров" ON public.trainers;
DROP POLICY IF EXISTS "Только админы могут удалять тренеров" ON public.trainers;

-- Создаем простые политики
CREATE POLICY "Публичный доступ к тренерам"
    ON public.trainers FOR SELECT
    USING (true);

CREATE POLICY "Доступ к тренерам для админа"
    ON public.trainers FOR ALL
    USING (true)
    WITH CHECK (true);

-- Политики для storage
DROP POLICY IF EXISTS "Публичный доступ к файлам тренеров" ON storage.objects;
DROP POLICY IF EXISTS "Только админы могут загружать файлы тренеров" ON storage.objects;
DROP POLICY IF EXISTS "Только админы могут удалять файлы тренеров" ON storage.objects;

-- Создаем политики для полного доступа к файлам
CREATE POLICY "Публичный доступ к файлам тренеров"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'trainers');

CREATE POLICY "Загрузка файлов тренеров"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'trainers');

CREATE POLICY "Обновление файлов тренеров"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'trainers')
    WITH CHECK (bucket_id = 'trainers');

CREATE POLICY "Удаление файлов тренеров"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'trainers');

-- Создаем бакет для тренеров если его нет
INSERT INTO storage.buckets (id, name, public) 
VALUES ('trainers', 'trainers', true)
ON CONFLICT (id) DO NOTHING; 