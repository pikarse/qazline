import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О нас</h3>
            <p className="text-gray-400">
              Мы предлагаем качественные курсы казахского языка для всех уровней подготовки.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Курсы</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white">
                  Базовый курс
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white">
                  Продвинутый курс
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white">
                  Разговорный курс
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white">
                  Деловой курс
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Телефон: +7 778 613 4946</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} QazLine. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;