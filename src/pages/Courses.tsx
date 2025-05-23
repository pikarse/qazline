import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses: React.FC = () => {
  const { t } = useTranslation();

  const courses = [
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
      title: 'Разговорный курс казахского языка',
      description: 'Быстрое освоение казахского языка. Интенсивная программа для тех, кто хочет быстро заговорить на казахском.',
      duration: '2 месяца',
      level: 'Любой',
      price: '24 000 ₸',
      image: '/images/courses/intensive.jpg',
      features: [
        'Разговорная практика',
        'Живые диалоги',
        'Практические ситуации',
        'Домашние задания',
        'Поддержка преподавателя'
      ]
    },
    {
      id: 4,
      title: 'Деловой курс казахского языка',
      description: 'Специализированный курс для бизнес-коммуникации на казахском языке. Идеально подходит для предпринимателей и менеджеров.',
      duration: '4 месяца',
      level: 'Средний',
      price: '24 000 ₸',
      image: '/images/courses/business.jpg',
      features: [
        'Деловая лексика',
        'Бизнес-коммуникация',
        'Разговорная практика',
        'Домашние задания',
        'Поддержка преподавателя'
      ]
    }
  ];

  const commonFeatures = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('courses.features.duration.title', 'Длительность'),
      description: t('courses.features.duration.description', '3 месяца интенсивного обучения')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('courses.features.students.title', 'Студенты'),
      description: t('courses.features.students.description', 'До 10 человек в группе')
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t('courses.features.lessons.title', 'Уроки'),
      description: t('courses.features.lessons.description', '2 раза в неделю по 90 минут')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('courses.title', 'Наши курсы')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-8">
                  <div className="flex flex-col items-center text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-blue-600">
                        {course.price}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {t('courses.whatYouLearn', 'Чему вы научитесь:')}
                    </h3>
                    <ul className="space-y-3">
                      {course.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-3 text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/payment"
                      className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg font-semibold
                               hover:bg-blue-700 transition-colors duration-300 block text-center"
                    >
                      {t('courses.enroll', 'Записаться на курс')}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              {t('courses.commonFeatures', 'Общие особенности всех курсов')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commonFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-blue-600">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses; 