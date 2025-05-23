import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaDownload, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface Trainer {
  id: string;
  title: string;
  description: string;
  document_url: string;
  grade: number;
  created_at: string;
}

const Trainers: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, [selectedGrade, searchQuery]);

  const fetchTrainers = async () => {
    try {
      let query = supabase.from('trainers').select('*');
      
      if (selectedGrade) {
        query = query.eq('grade', selectedGrade);
      }
      
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      setTrainers(data || []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPublicUrl = (path: string) => {
    const { data } = supabase.storage.from('trainers').getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Заголовок и описание */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Тренажеры для подготовки
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Здесь вы найдете тренажеры для подготовки к экзаменам. Выбирайте нужный класс и скачивайте материалы для самостоятельной работы.
            </p>
          </div>

          {/* Поиск и фильтры */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Поиск тренажеров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FaFilter className="mr-2" />
                Фильтры
              </button>
              <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
                <select
                  value={selectedGrade || ''}
                  onChange={(e) => setSelectedGrade(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Все классы</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((grade) => (
                    <option key={grade} value={grade}>
                      {grade} класс
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Список тренажеров */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Загрузка тренажеров...</p>
              </div>
            ) : trainers.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery || selectedGrade
                    ? 'Тренажеры не найдены. Попробуйте изменить параметры поиска.'
                    : 'Тренажеры пока не добавлены.'}
                </p>
              </div>
            ) : (
              trainers.map((trainer, index) => (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{trainer.title}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {trainer.grade} класс
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-3">{trainer.description}</p>
                    <a
                      href={getPublicUrl(trainer.document_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FaDownload className="mr-2" />
                      Скачать тренажер
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Trainers; 