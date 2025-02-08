import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt_BR from '../locale/pt_BR.json';

import en_US from '../locale/en_US.json';

import Cookies from 'js-cookie';

const resources = {
  pt: {
    translation: {
      ...pt_BR,
    },
  },
  'pt-BR': {
    translation: {
      ...pt_BR,
    },
  },
  en: {
    translation: {
      ...en_US,
    },
  },
  'en-US': {
    translation: {
      ...en_US,
    },
  },
};

const supportedLanguages = ['pt-BR', 'en-US', 'en', 'pt'];
const detectedLanguage = Cookies.get('default_language');

const defineLanguage = supportedLanguages.includes(detectedLanguage ?? '')
  ? detectedLanguage
  : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: defineLanguage,
});
