import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('about.title')}
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="dist/assets/image.jpg" 
                    alt="Ерменко Татьяна Сергеевна"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Ерменко Татьяна Сергеевна
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Платформа qazline.kz разработана Ерменко Татьяной Сергеевной и предлагает курсы по изучению казахского языка для взрослых и детей. Обучение проходит в онлайн формате с упором на разговорную речь и практическое применение языка. Включает подготовку к СОР и СОЧ.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Образование и опыт
                      </h4>
                      <p className="text-gray-600">
                        32 года педагогического стажа, высшее образование, авторские программы по изучению казахского языка
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Методические материалы
                      </h4>
                      <p className="text-gray-600">
                        Автор сборников тестов и контрольных работ с 5-11 класс (по разделам)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 