import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaTachometerAlt, FaDumbbell, FaHome } from 'react-icons/fa';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Мобильное меню */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800">Админ-панель</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Боковая панель */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-200 ease-in-out z-40 w-64 bg-white shadow-lg`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
            <h2 className="text-xl font-bold text-white">Админ-панель</h2>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            <Link
              to="/admin"
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
            >
              <FaTachometerAlt className="mr-3" />
              <span>Дашборд</span>
            </Link>
            <Link
              to="/admin/trainers"
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
            >
              <FaDumbbell className="mr-3" />
              <span>Тренажеры</span>
            </Link>
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
            >
              <FaHome className="mr-3" />
              <span>На сайт</span>
            </Link>
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 