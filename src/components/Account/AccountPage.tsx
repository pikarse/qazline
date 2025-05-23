import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';

interface Homework {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  file_url?: string;
}

export const AccountPage = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [homework, setHomework] = useState<Homework[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    const getHomework = async () => {
      const { data, error } = await supabase
        .from('homework')
        .select('*')
        .eq('user_id', user?.id);

      if (data) {
        setHomework(data);
      }
    };

    getUser();
    if (user) {
      getHomework();
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      // Загрузка файла
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: fileData, error: fileError } = await supabase.storage
        .from('homework')
        .upload(fileName, selectedFile);

      if (fileError) throw fileError;

      // Создание записи о домашнем задании
      const { data, error } = await supabase
        .from('homework')
        .insert([
          {
            user_id: user?.id,
            title: selectedFile.name,
            file_url: fileData?.path,
            status: 'pending',
            comment: comment
          }
        ]);

      if (error) throw error;

      // Обновление списка домашних заданий
      const { data: newHomework } = await supabase
        .from('homework')
        .select('*')
        .eq('user_id', user?.id);

      if (newHomework) {
        setHomework(newHomework);
      }

      // Очистка формы
      setSelectedFile(null);
      setComment('');
    } catch (error) {
      console.error('Error submitting homework:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl">👤</span>
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user?.email}</h1>
          <p className="text-gray-600">{t('account.title')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">{t('account.learningPlan')}</h2>
          {/* Здесь будет план обучения */}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">{t('account.homework.title')}</h2>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t('account.homework.comment')}
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
              />
            </div>
            <button
              type="submit"
              disabled={!selectedFile}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {t('account.homework.submit')}
            </button>
          </form>

          <div className="space-y-4">
            {homework.map((hw) => (
              <div key={hw.id} className="border rounded-lg p-4">
                <h3 className="font-bold">{hw.title}</h3>
                <p className="text-sm text-gray-600">
                  {t(`account.homework.status.${hw.status}`)}
                </p>
                {hw.comment && (
                  <p className="mt-2 text-sm">{hw.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 