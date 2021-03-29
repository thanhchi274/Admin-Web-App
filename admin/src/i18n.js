import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { withTranslation, initReactI18next } from "react-i18next";
import translationVN from './locales/vn/translation.json';
import translationNippon from './locales/nippon/translation.json';
import translationENG from './locales/en/translation.json';
//translations
const resources = {
  vn: {
    translation: translationVN
  },
   nippon: {
    translation: translationNippon
  },
   eng: {
    translation: translationENG
  }
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available
    react: {
      useSuspense: false
    },
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;