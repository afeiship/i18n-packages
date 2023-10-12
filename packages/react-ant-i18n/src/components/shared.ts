import i18next, { Module } from 'i18next';

export interface ThirdPartyModule extends Module {}

export const SHARED_INIT_OPTIONS = {
  supportedLngs: ['zh-CN', 'en-US', 'ru-RU'],
  fallbackLng: 'en-US',
  load: 'currentOnly',
  ns: 'translation',
  debug: process.env.NODE_ENV === 'development',
  preload: false,
  interpolation: {
    escapeValue: false
  }
};

export const getInstance4Modules = (inModules) => {
  return inModules.reduce((instance, module) => instance.use(module), i18next);
};
