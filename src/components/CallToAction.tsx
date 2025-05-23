import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+77777777777';
    const message = encodeURIComponent('Здравствуйте! Я хочу начать изучение казахского языка.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
      
      {/* Анимированные круги */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white transform hover:scale-105 transition-transform duration-300">
            {t('cta.title')}
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {t('cta.description')}
          </p>
          
          <button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-blue-800 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-blue-600 border-2 border-white group-hover:bg-blue-700"></span>
            <span className="relative flex items-center gap-2">
              <MessageCircle size={24} className="transform group-hover:rotate-12 transition-transform duration-300" />
              {t('cta.writeUs')}
              <ArrowRight 
                size={20} 
                className={`transform transition-transform duration-300 ${
                  isHovered ? 'translate-x-2' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;