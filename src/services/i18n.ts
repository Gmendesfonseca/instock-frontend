import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt_BR from '../locale/pt_BR.json';
import en_US from '../locale/en_US.json';

const resources = {
  pt_BR,
  en_US,
};

export const i18nConfig = {
  resources,
  lng: 'pt_BR',
};

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;
