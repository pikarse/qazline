import React from 'react';
import { motion } from 'framer-motion';

const Advantages: React.FC = () => {
  const advantages = [
    {
      title: 'Опытные преподаватели',
      description: 'Наши преподаватели имеют многолетний опыт работы и используют современные методики обучения.',
      icon: '👨‍🏫'
    },
    {
      title: 'Индивидуальный подход',
      description: 'Мы учитываем особенности каждого студента и адаптируем программу под ваши цели.',
      icon: '🎯'
    },
    {
      title: 'Практика с носителями',
      description: 'Регулярные занятия с носителями языка помогут вам быстро освоить разговорную речь.',
      icon: '🗣️'
    },
    {
      title: 'Удобный формат',
      description: 'Выбирайте удобное время для занятий и учитесь в комфортной обстановке.',
      icon: '⏰'
    },
    {
      title: 'Современные материалы',
      description: 'Используем актуальные учебные материалы и цифровые технологии в обучении.',
      icon: '📚'
    },
    {
      title: 'Гибкая система оплаты',
      description: 'Предлагаем различные варианты оплаты и скидки для постоянных клиентов.',
      icon: '💰'
    }
  ];

  return (
    <section id="advantages" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          >
            Наши преимущества
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600"
          >
            Почему выбирают именно нас
          </motion.p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages; 