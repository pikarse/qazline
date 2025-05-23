import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [courseType, setCourseType] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Проверка всех обязательных полей
    if (!name || !phone || !email || !grade) {
      setError('Пожалуйста, заполните все поля формы');
      setIsSubmitting(false);
      return;
    }

    // Подготовка данных для отправки
    const formData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      grade: grade.trim(),
      subject: 'Курс по Казахскому Языку',
      course_type: courseType,
      status: 'new'
    };

    try {
      // Сначала проверяем подключение к Supabase
      const { data: testData, error: testError } = await supabase
        .from('registrations')
        .select('id')
        .limit(1);

      if (testError) {
        throw new Error('Ошибка подключения к базе данных');
      }

      // Отправляем данные
      const { data, error } = await supabase
        .from('registrations')
        .insert([formData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Если все успешно
      if (data) {
        // Очищаем форму
        setName('');
        setPhone('');
        setEmail('');
        setGrade('');
        setCourseType('basic');
        setSuccess(true);
        
        // Перенаправляем на страницу оплаты через 2 секунды
        setTimeout(() => {
          navigate('/payment');
        }, 2000);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Запись на курс казахского языка
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Заполните форму для записи на курс казахского языка
          </p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-green-900 mb-2">
              Заявка успешно отправлена!
            </h3>
            <p className="text-green-700">
              Сейчас вы будете перенаправлены на страницу оплаты...
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-6 space-y-6"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Имя ученика
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                Класс
              </label>
              <input
                type="text"
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Предмет
              </label>
              <input
                type="text"
                id="subject"
                value="Курс по Казахскому Языку"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Выберите курс
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="basic"
                    checked={courseType === 'basic'}
                    onChange={(e) => setCourseType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Базовый курс</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="advanced"
                    checked={courseType === 'advanced'}
                    onChange={(e) => setCourseType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Продвинутый курс</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="conversational"
                    checked={courseType === 'conversational'}
                    onChange={(e) => setCourseType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Разговорный курс</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="business"
                    checked={courseType === 'business'}
                    onChange={(e) => setCourseType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Деловой курс</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Отправка...' : 'Записаться на курс'}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm; 