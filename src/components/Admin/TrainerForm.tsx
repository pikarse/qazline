import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import TrainerFileUpload from './TrainerFileUpload';

interface TrainerFormProps {
  onSuccess: () => void;
  initialData?: {
    id: string;
    title: string;
    description: string;
    document_url: string;
    grade: number;
  };
}

const TrainerForm: React.FC<TrainerFormProps> = ({ onSuccess, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [grade, setGrade] = useState(initialData?.grade || 1);
  const [documentUrl, setDocumentUrl] = useState(initialData?.document_url || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const trainerData = {
        title,
        description,
        grade,
        document_url: documentUrl,
      };

      if (initialData) {
        // Обновление существующего тренажера
        const { error: updateError } = await supabase
          .from('trainers')
          .update(trainerData)
          .eq('id', initialData.id);

        if (updateError) throw updateError;
      } else {
        // Создание нового тренажера
        const { error: insertError } = await supabase
          .from('trainers')
          .insert([trainerData]);

        if (insertError) throw insertError;
      }

      onSuccess();
    } catch (err) {
      console.error('Error saving trainer:', err);
      setError('Ошибка при сохранении тренажера');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Название
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Описание
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
          Класс
        </label>
        <select
          id="grade"
          value={grade}
          onChange={(e) => setGrade(Number(e.target.value))}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
            <option key={g} value={g}>
              {g} класс
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Файл тренажера
        </label>
        <TrainerFileUpload
          onFileUploaded={setDocumentUrl}
          currentFile={documentUrl}
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !documentUrl}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Сохранение...' : initialData ? 'Обновить' : 'Создать'}
        </button>
      </div>
    </form>
  );
};

export default TrainerForm; 