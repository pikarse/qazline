import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('trainers');

  const tabs = [
    { id: 'trainers', label: 'Преподаватели' },
    { id: 'students', label: 'Студенты' },
    { id: 'courses', label: 'Курсы' },
    { id: 'statistics', label: 'Статистика' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Панель администратора
        </motion.h1>

        {/* Табы */}
        <div className="flex space-x-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Контент в зависимости от выбранной вкладки */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'trainers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Управление преподавателями</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Добавить преподавателя
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Имя
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Специализация
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            АН
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Айгуль Нурланова</div>
                            <div className="text-sm text-gray-500">Старший преподаватель</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Разговорный казахский</div>
                        <div className="text-sm text-gray-500">Подготовка к экзаменам</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Активен
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">Редактировать</button>
                        <button className="text-red-600 hover:text-red-900">Удалить</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Управление студентами</h2>
              {/* Здесь будет контент для управления студентами */}
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Управление курсами</h2>
              {/* Здесь будет контент для управления курсами */}
            </div>
          )}

          {activeTab === 'statistics' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Статистика</h2>
              {/* Здесь будет контент для статистики */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin; 