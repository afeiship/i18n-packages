import lang from '../public/locales/en-US.json';

export const locale = {translation: lang} as const;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof locale;
  }
}

declare global {
  interface NxStatic {
    t: (key: keyof typeof locale['translation'], opts?: any) => string;
    i18n: import('i18next').i18n;
  }
}
