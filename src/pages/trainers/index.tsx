import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaDownload } from 'react-icons/fa';
import { supabase } from '../../lib/supabase';

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Тренажеры</h1>

        {/* Поиск и фильтры */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Поиск тренажеров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={selectedGrade || ''}
            onChange={(e) => setSelectedGrade(e.target.value ? Number(e.target.value) : null)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Все классы</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
              <option key={grade} value={grade}>
                {grade} класс
              </option>
            ))}
          </select>
        </div>

        {/* Список тренажеров */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">Загрузка...</div>
          ) : trainers.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Тренажеры не найдены
            </div>
          ) : (
            trainers.map((trainer) => (
              <div key={trainer.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{trainer.title}</h3>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    {trainer.grade} класс
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{trainer.description}</p>
                <a
                  href={trainer.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <FaDownload className="mr-2" />
                  Скачать тренажер
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Trainers; 