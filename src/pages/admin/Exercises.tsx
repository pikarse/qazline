import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaTrash, FaEdit, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Exercise {
  id: string;
  title: string;
  description: string;
  document_url: string;
  grade: number;
  created_at: string;
}

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState<number>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExercises(data || []);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setError('Ошибка при загрузке тренажеров');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCreateExercise = async (e: React.FormEvent) => {
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
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('exercises')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Создаем запись в базе данных
      const { error: insertError } = await supabase
        .from('exercises')
        .insert([
          {
            title,
            description,
            grade,
            document_url: filePath
          }
        ]);

      if (insertError) throw insertError;

      // Очищаем форму
      setTitle('');
      setDescription('');
      setGrade(1);
      setSelectedFile(null);
      
      // Обновляем список
      fetchExercises();
    } catch (error) {
      console.error('Error creating exercise:', error);
      setError('Ошибка при создании тренажера');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteExercise = async (id: string, documentUrl: string) => {
    try {
      // Удаляем файл из storage
      const { error: deleteFileError } = await supabase.storage
        .from('exercises')
        .remove([documentUrl]);

      if (deleteFileError) throw deleteFileError;

      // Удаляем запись из базы данных
      const { error: deleteRecordError } = await supabase
        .from('exercises')
        .delete()
        .eq('id', id);

      if (deleteRecordError) throw deleteRecordError;

      // Обновляем список
      fetchExercises();
    } catch (error) {
      console.error('Error deleting exercise:', error);
      setError('Ошибка при удалении тренажера');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Управление тренажерами</h1>

      {/* Форма создания */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Добавить новый тренажер</h2>
        <form onSubmit={handleCreateExercise} className="space-y-4">
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
              Файл тренажера
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
                Добавить тренажер
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Список тренажеров */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Список тренажеров</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Загрузка...</p>
            </div>
          ) : exercises.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Тренажеры пока не добавлены
            </div>
          ) : (
            exercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {exercise.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {exercise.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {exercise.grade} класс
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(exercise.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDeleteExercise(exercise.id, exercise.document_url)}
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

export default Exercises; 