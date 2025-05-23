import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: {
          'navigation.home': 'Главная',
          'navigation.courses': 'Курсы',
          'navigation.benefits': 'Преимущества',
          'navigation.testimonials': 'Отзывы',
          'navigation.faq': 'FAQ',
          'navigation.about': 'О нас',
          'testimonials.title': 'Отзывы наших учеников',
          'faq.title': 'Часто задаваемые вопросы',
          'about.title': 'О нашей школе',
          'footer.contacts': 'Контакты',
          'footer.legal': 'Правовая информация',
          'footer.navigation': 'Навигация',
          'hero.title': 'Изучайте казахский язык с профессионалами',
          'hero.subtitle': 'Онлайн-курсы для всех уровней подготовки',
          'hero.cta': 'Начать обучение',
          'courses.title': 'Наши курсы',
          'courses.featured': 'Популярные курсы',
          'courses.whatYouLearn': 'Чему вы научитесь:',
          'courses.enroll': 'Записаться на курс',
          'courses.features.duration.title': 'Длительность',
          'courses.features.duration.description': '3 месяца интенсивного обучения',
          'courses.features.students.title': 'Студенты',
          'courses.features.students.description': 'До 4-5 человек в группе',
          'courses.features.lessons.title': 'Уроки',
          'courses.features.lessons.description': '2 раза в неделю по 90 минут',
          'courses.commonFeatures': 'Общие особенности всех курсов',
          'testimonials.student': 'Студент',
        }
      },
      kk: {
        translation: {
          'navigation.home': 'Басты бет',
          'navigation.courses': 'Курстар',
          'navigation.benefits': 'Артықшылықтар',
          'navigation.testimonials': 'Пікірлер',
          'navigation.faq': 'Жиі қойылатын сұрақтар',
          'navigation.about': 'Біз туралы',
          'testimonials.title': 'Біздің оқушылардың пікірлері',
          'faq.title': 'Жиі қойылатын сұрақтар',
          'about.title': 'Біздің мектеп туралы',
          'footer.contacts': 'Байланыстар',
          'footer.legal': 'Құқықтық ақпарат',
          'footer.navigation': 'Шарлау',
          'hero.title': 'Қазақ тілін кәсіби мамандардан үйреніңіз',
          'hero.subtitle': 'Барлық деңгейлерге арналған онлайн курстар',
          'hero.cta': 'Оқуға бастау',
          'courses.title': 'Біздің курстар',
          'courses.featured': 'Танымал курстар',
          'courses.whatYouLearn': 'Сіз не үйренесіз:',
          'courses.enroll': 'Курсқа жазылу',
          'courses.features.duration.title': 'Ұзақтығы',
          'courses.features.duration.description': '3 айлық интенсивті оқыту',
          'courses.features.students.title': 'Студенттер',
          'courses.features.students.description': 'Топта 10 адамға дейін',
          'courses.features.lessons.title': 'Сабақтар',
          'courses.features.lessons.description': 'Аптасына 2 рет, 90 минуттан',
          'courses.commonFeatures': 'Барлық курстардың ортақ ерекшеліктері'
        }
      }
    },
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 