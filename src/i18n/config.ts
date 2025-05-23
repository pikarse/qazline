import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import kk from './locales/kk.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kk: {
        translation: kk
      }
    },
    lng: 'kk',
    fallbackLng: 'kk',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 