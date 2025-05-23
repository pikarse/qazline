import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, Clock, Users, BookOpen, Star, Check } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  image: string;
  studentsCount?: number;
  lessonsCount?: number;
  rating?: number;
  reviewsCount?: number;
  modules?: {
    title: string;
    lessons: string[];
  }[];
  features?: string[];
}

const FeaturedCourses: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const featuredCourses: Course[] = [
    {
      id: 1,
      title: 'Базовый курс казахского языка',
      description: 'Изучите основы казахского языка с нуля. Курс включает базовую грамматику, лексику и разговорные навыки.',
      duration: '3 месяца',
      level: 'Начальный',
      price: '24 000 ₸',
      image: '/images/courses/basic.jpg',
      features: [
        'Базовые грамматические конструкции',
        'Основная лексика',
        'Разговорная практика',
        'Домашние задания',
        'Поддержка преподавателя'
      ]
    },
    {
      id: 2,
      title: 'Продвинутый курс казахского языка',
      description: 'Углубленное изучение казахского языка. Совершенствуйте свои навыки и достигните свободного владения языком.',
      duration: '6 месяцев',
      level: 'Средний',
      price: '24 000 ₸',
      image: '/images/courses/advanced.jpg',
      features: [
        'Сложные грамматические конструкции',
        'Расширенная лексика',
        'Разговорная практика',
        'Домашние задания',
        'Поддержка преподавателя'
      ]
    },
    {
      id: 3,
      title: 'Интенсивный курс казахского языка',
      description: 'Быстрое освоение казахского языка. Интенсивная программа для тех, кто хочет быстро заговорить на казахском.',
      duration: '2 месяца',
      level: 'Любой',
      price: '24 000 ₸',
      image: '/images/courses/intensive.jpg',
      features: [
        'Базовые грамматические конструкции',
        'Основная лексика',
        'Разговорная практика',
        'Домашние задания',
        'Поддержка преподавателя'
      ]
    }
  ];

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <section id="courses" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('courses.featured')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div 
              key={course.id} 
              onClick={() => handleCourseClick(course)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="h-48 bg-gray-200">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
                <div className="text-xl font-bold text-blue-600">{course.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-6 text-sm mb-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{selectedCourse.studentsCount} студентов</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{selectedCourse.lessonsCount} уроков</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{selectedCourse.rating} ({selectedCourse.reviewsCount} отзывов)</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{selectedCourse.description}</p>

              {selectedCourse.modules && (
                <>
                  <h3 className="text-xl font-semibold mb-4">Программа курса</h3>
                  <div className="space-y-6">
                    {selectedCourse.modules.map((module, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                        <h4 className="text-lg font-semibold mb-4">{module.title}</h4>
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
                </>
              )}

              <div className="mt-8 flex justify-between items-center">
                <div className="text-3xl font-bold text-blue-600">{selectedCourse.price}</div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Записаться на курс
                </button>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-600" />
                  <span>Доступ к материалам навсегда</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-600" />
                  <span>Сертификат о завершении</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-600" />
                  <span>Поддержка преподавателей</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-600" />
                  <span>Гарантия возврата денег</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedCourses; 