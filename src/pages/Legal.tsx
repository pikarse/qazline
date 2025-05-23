import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Legal: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            {t('legal.title', 'Юридические документы')}
          </h1>

          <div className="space-y-12">
            {/* Политика конфиденциальности */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('legal.privacy.title', 'Политика конфиденциальности')}
              </h2>
              <div className="prose prose-blue max-w-none">
                <p>{t('legal.privacy.content', 'Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных qazline.kz...')}</p>
                {/* Добавьте полный текст политики конфиденциальности */}
              </div>
            </section>

            {/* Условия использования */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('legal.terms.title', 'Условия использования')}
              </h2>
              <div className="prose prose-blue max-w-none">
                <p>{t('legal.terms.content', 'Настоящие Условия использования регулируют отношения между qazline.kz и пользователями платформы...')}</p>
                {/* Добавьте полный текст условий использования */}
              </div>
            </section>

            {/* Соглашение о файлах cookie */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('legal.cookies.title', 'Соглашение о файлах cookie')}
              </h2>
              <div className="prose prose-blue max-w-none">
                <p>{t('legal.cookies.content', 'Настоящее Соглашение о файлах cookie объясняет, как qazline.kz использует файлы cookie и аналогичные технологии...')}</p>
                {/* Добавьте полный текст соглашения о cookie */}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal; 