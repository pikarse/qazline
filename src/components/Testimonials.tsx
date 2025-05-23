import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Пилипак Тимур',
      initials: 'П.Т.',
      role: t('Студент'),
      text: 'Отличный подход к обучению! Преподаватели всегда готовы помочь и объяснить сложные моменты. Благодаря индивидуальному подходу я смог быстро освоить основы казахского языка.'
    },
    {
      name: 'Омаров Мирас',
      initials: 'О.М.',
      role: t('Студент'),
      text: 'Очень доволен качеством обучения. Интересные уроки, современные методики и дружелюбная атмосфера. Особенно понравилась практика разговорной речи с носителями языка.'
    },
    {
      name: 'Лустин Ефим',
      initials: 'Л.Е.',
      role: t('Студент'),
      text: 'Спасибо за профессиональный подход к обучению! Материал подается структурированно и понятно. Уже через месяц занятий я начал свободно общаться на казахском языке.'
    },
    {
      name: 'Тамбе Макар',
      initials: 'Т.М.',
      role: t('Студент'),
      text: 'Замечательная методика преподавания! Особенно ценю индивидуальный подход и внимание к деталям. Преподаватели всегда готовы помочь и объяснить сложные моменты.'
    },
    {
      name: 'Баянов Гаплан',
      initials: 'Б.Г.',
      role: t('testimonials.student'),
      text: 'Очень эффективный курс! Благодаря четкой структуре и профессиональному подходу преподавателей, я смог значительно улучшить свой уровень казахского языка.'
    },
    {
      name: 'Омаров Мейрам',
      initials: 'О.М.',
      role: t('testimonials.student'),
      text: 'Отличная школа казахского языка! Особенно понравилась практика разговорной речи и индивидуальный подход к каждому студенту. Рекомендую всем!'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Отзывы наших студентов
        </motion.h2>
        
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-6 flex items-center justify-center text-2xl font-bold text-gray-600">
                  {testimonials[currentIndex].initials}
                </div>
                <div>
                  <h3 className="font-semibold text-xl">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg">{testimonials[currentIndex].text}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;