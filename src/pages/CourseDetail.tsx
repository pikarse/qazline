import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Users, BookOpen, Star, ChevronRight } from 'lucide-react';

interface CourseModule {
  title: string;
  lessons: string[];
}

const courseModules: CourseModule[] = [
  {
    title: "Модуль 1: Основы казахского языка",
    lessons: [
      "Алфавит и произношение",
      "Базовые приветствия",
      "Числа и даты",
      "Личные местоимения",
      "Простое настоящее время"
    ]
  },
  {
    title: "Модуль 2: Повседневное общение",
    lessons: [
      "Знакомство и представление",
      "Семья и родственники",
      "Профессии и работа",
      "Еда и напитки",
      "Покупки и цены"
    ]
  },
  {
    title: "Модуль 3: Грамматика и практика",
    lessons: [
      "Падежи и их использование",
      "Глаголы и времена",
      "Прилагательные и наречия",
      "Сложные предложения",
      "Идиомы и выражения"
    ]
  }
];

const CourseDetail: React.FC = () => {
  const { t } = useTranslation();
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка курса */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{t('courses.basic.title')}</h1>
            <p className="text-xl mb-6">{t('courses.basic.description')}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>12 недель</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>3540 студентов</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>42 урока</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                <span>4.8 (325 отзывов)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Левая колонка - информация о курсе */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">{t('courses.basic.title')}</h2>
                <p className="text-gray-600 mb-6">
                  {t('courses.basic.description')}
                </p>
                <h3 className="text-xl font-semibold mb-4">Чему вы научитесь:</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Основам казахского алфавита и произношения</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Базовым фразам для повседневного общения</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Основным правилам грамматики</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span>Навыкам чтения и письма</span>
                  </li>
                </ul>
              </div>

              {/* Программа курса */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Программа курса</h2>
                <div className="space-y-6">
                  {courseModules.map((module, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                      <h3 className="text-xl font-semibold mb-4">{module.title}</h3>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center text-gray-600">
                            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                              {lessonIndex + 1}
                            </span>
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Правая колонка - цена и кнопка записи */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">19 999 ₸</div>
                  <div className="text-gray-500 line-through">29 999 ₸</div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                  Записаться на курс
                </button>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">✓ Доступ к материалам навсегда</p>
                  <p className="mb-2">✓ Сертификат о завершении</p>
                  <p className="mb-2">✓ Поддержка преподавателей</p>
                  <p>✓ Гарантия возврата денег</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 