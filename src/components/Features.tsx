import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Clock } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Качественное обучение',
      description: 'Профессиональные преподаватели с большим опытом работы'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Маленькие группы',
      description: 'Индивидуальный подход к каждому ученику'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Высокие результаты',
      description: 'Наши ученики показывают отличные результаты на экзаменах'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Гибкое расписание',
      description: 'Выбирайте удобное время для занятий'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Почему выбирают нас
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 