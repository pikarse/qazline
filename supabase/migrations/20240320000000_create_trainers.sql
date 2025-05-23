-- Создание таблицы тренажеров
CREATE TABLE trainers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    document_url TEXT NOT NULL,
    grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 11),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Создание бакета для хранения файлов тренажеров
INSERT INTO storage.buckets (id, name, public) VALUES ('trainers', 'trainers', true);

-- Политики доступа к файлам в storage
CREATE POLICY "Публичный доступ к файлам тренажеров"
ON storage.objects FOR SELECT
USING (bucket_id = 'trainers');

CREATE POLICY "Только админы могут загружать файлы"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'trainers' 
    AND auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Только админы могут удалять файлы"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'trainers' 
    AND auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'role' = 'admin'
);

-- Создание индексов для оптимизации поиска
CREATE INDEX trainers_grade_idx ON trainers(grade);
CREATE INDEX trainers_title_idx ON trainers USING gin (to_tsvector('russian', title));
CREATE INDEX trainers_created_at_idx ON trainers(created_at DESC);

-- Добавление RLS политик
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;

-- Политика для чтения (публичный доступ)
CREATE POLICY "Публичный доступ к тренажерам"
    ON trainers FOR SELECT
    USING (true);

-- Политика для вставки (только админы)
CREATE POLICY "Только админы могут добавлять тренажеры"
    ON trainers FOR INSERT
    WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- Политика для обновления (только админы)
CREATE POLICY "Только админы могут обновлять тренажеры"
    ON trainers FOR UPDATE
    USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- Политика для удаления (только админы)
CREATE POLICY "Только админы могут удалять тренажеры"
    ON trainers FOR DELETE
    USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- Триггер для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_trainers_updated_at
    BEFORE UPDATE ON trainers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Добавление тестовых данных
INSERT INTO trainers (title, description, document_url, grade) VALUES
('Тренажер по математике 5 класс', 'Базовые задачи по математике для 5 класса', 'trainers/math5.pdf', 5),
('Тренажер по русскому языку 6 класс', 'Упражнения по грамматике и пунктуации', 'trainers/russian6.pdf', 6),
('Тренажер по физике 7 класс', 'Задачи по механике и термодинамике', 'trainers/physics7.pdf', 7); 