-- Создание таблицы для заявок на подготовку
CREATE TABLE IF NOT EXISTS public.registrations (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    exam_type VARCHAR(10) NOT NULL CHECK (exam_type IN ('sor', 'soch', 'both')),
    status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'approved', 'rejected'))
);

-- Создание индексов для оптимизации запросов
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_grade ON registrations(grade);

-- Включаем RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Политики доступа
CREATE POLICY "Публичный доступ для создания заявок"
    ON public.registrations FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Только админы могут просматривать заявки"
    ON public.registrations FOR SELECT
    USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Только админы могут обновлять заявки"
    ON public.registrations FOR UPDATE
    USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin')
    WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin'); 