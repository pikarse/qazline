import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminLayout from '../../components/AdminLayout';
import { FaBook, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <AdminLayout>
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white rounded-lg shadow p-6"
          variants={itemVariants}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Здравствуйте, admin!
          </h1>
          <p className="text-gray-600">
            Добро пожаловать в панель управления
          </p>
        </motion.div>

        {/* Последние действия */}
        <motion.div 
          className="bg-white rounded-lg shadow"
          variants={itemVariants}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Последние действия
            </h2>
            <div className="text-gray-600 text-center py-8">
              Нет данных для отображения
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Link
              to="/admin/exercises"
              className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <FaBook className="w-8 h-8 text-green-600" />
                <div>
                  <h2 className="text-xl font-semibold">Упражнения</h2>
                  <p className="text-gray-600">Управление упражнениями</p>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/admin/registrations"
              className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <FaFileAlt className="w-8 h-8 text-purple-600" />
                <div>
                  <h2 className="text-xl font-semibold">Заявки</h2>
                  <p className="text-gray-600">Управление заявками на подготовку</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default Dashboard; 