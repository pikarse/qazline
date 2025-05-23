import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vusyehpazdtzexpdlgzj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1c3llaHBhemR0emV4cGRsZ3pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTgxODUsImV4cCI6MjA2MzQ3NDE4NX0.FsrxbOoMfYgrodbvUXH1u1BhxCRle6ckvvGC2xKlW0Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'kazakh-language-platform'
    }
  }
});

// Обработчик обновления токена
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed successfully');
  }
  if (event === 'SIGNED_OUT') {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  }
});

// Функция для проверки подключения
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('registrations').select('count').limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};

// Типы для таблиц
export interface Trainer {
  id: string;
  name: string;
  document_url: string;
  class: number;
  created_at: string;
}

export interface PageVisit {
  id: string;
  page_path: string;
  visit_date: string;
  ip_address: string | null;
}

export interface CoursePurchase {
  id: string;
  customer_name: string;
  course_name: string;
  phone_number: string;
  purchase_date: string;
}

export interface Registration {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  grade: string;
  exam_type: string;
  status: string;
} 