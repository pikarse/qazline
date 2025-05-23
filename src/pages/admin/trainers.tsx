import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaTrash, FaEdit, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Trainer {
  id: string;
  title: string;
  description: string;
  document_url: string;
  grade: number;
  created_at: string;
}

const Trainers: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      setTrainers(data || []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
      setError('Ошибка при загрузке тренеров');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCreateTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Загружаем файл в storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('trainers')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Получаем публичный URL файла
      const { data: { publicUrl } } = supabase.storage
        .from('trainers')
        .getPublicUrl(filePath);

      // Создаем запись в базе данных
      const { error: insertError } = await supabase
        .from('trainers')
        .insert([
          {
            title,
            description,
            grade,
            document_url: publicUrl
          }
        ]);

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

      // Очищаем форму
      setTitle('');
      setDescription('');
      setGrade(1);
      setSelectedFile(null);
      
      // Обновляем список
      fetchTrainers();
    } catch (error) {
      console.error('Error creating trainer:', error);
      setError('Ошибка при создании тренера');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteTrainer = async (id: string, documentUrl: string) => {
    try {
      // Извлекаем имя файла из URL
      const fileName = documentUrl.split('/').pop();
      if (!fileName) throw new Error('Invalid file URL');

      // Удаляем файл из storage
      const { error: deleteFileError } = await supabase.storage
        .from('trainers')
        .remove([fileName]);

      if (deleteFileError) {
        console.error('Delete file error:', deleteFileError);
        throw deleteFileError;
      }

      // Удаляем запись из базы данных
      const { error: deleteRecordError } = await supabase
        .from('trainers')
        .delete()
        .eq('id', id);

      if (deleteRecordError) {
        console.error('Delete record error:', deleteRecordError);
        throw deleteRecordError;
      }

      // Обновляем список
      fetchTrainers();
    } catch (error) {
      console.error('Error deleting trainer:', error);
      setError('Ошибка при удалении тренера');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Управление тренерами</h1>

      {/* Форма создания */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Добавить нового тренера</h2>
        <form onSubmit={handleCreateTrainer} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Класс
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
                <option key={g} value={g}>
                  {g} класс
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Файл тренера
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Загрузить файл</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                  <p className="pl-1">или перетащите</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX до 10MB
                </p>
              </div>
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-500">
                Выбран файл: {selectedFile.name}
              </p>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Загрузка...
              </>
            ) : (
              <>
                <FaPlus className="mr-2" />
                Добавить тренера
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Список тренеров */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Список тренеров</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Загрузка...</p>
            </div>
          ) : trainers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Тренеры пока не добавлены
            </div>
          ) : (
            trainers.map((trainer) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {trainer.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {trainer.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {trainer.grade} класс
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(trainer.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDeleteTrainer(trainer.id, trainer.document_url)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Trainers; 