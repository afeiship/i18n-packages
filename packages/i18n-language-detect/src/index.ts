import { stdLanguage, getLanguage } from '@jswork/i18n-helper';

interface I18nLanguageDetectOptions {
  lookupQuerystring?: string[];
  languageQueryFn?: () => string;
  store?: Storage;
  cacheNs?: string;
  cacheKey?: string;
  routerType?: string;
  supportedLngs?: string[];
  fallbackLng?: string;
}

const MSG = {
  store_not_available:
    "i18next-browser-languagedetector: Using memory store. Can't persist language.",
};

const MemoryStore = {
  data: {},
  setItem(key: string, value: string) {
    console.warn(MSG.store_not_available);
    this.data[key] = value;
  },
  getItem(key: string) {
    console.warn(MSG.store_not_available);
    return this.data[key];
  },
} as any;

const defaults = {
  lookupQuerystring: ['language', 'lang'],
  store: typeof localStorage !== 'undefined' ? localStorage : MemoryStore,
  cacheNs: '',
  cacheKey: 'i18next.lang',
  routerType: 'hash',
  supportedLngs: ['zh-CN', 'en-US', 'ru-RU'],
  fallbackLng: 'en-US',
};

class I18nLanguageDetect {
  public static readonly type = 'languageDetector';
  public options: I18nLanguageDetectOptions = { ...defaults };
  public services: any;

  get cacheKey() {
    const { cacheNs, cacheKey } = this.options;
    const { host } = window.location;
    const ns = cacheNs || host;
    return `${ns}@${cacheKey}`;
  }

  init(services: any) {
    const opts = services.languageUtils.options;
    this.services = services;
    this.options = { ...defaults, ...opts };
  }

  detect() {
    const { lookupQuerystring, languageQueryFn, store, fallbackLng, routerType } = this.options;
    const lang = languageQueryFn ? languageQueryFn() : getLanguage(routerType!, lookupQuerystring!);
    const resLang = lang || store!.getItem(this.cacheKey) || navigator.language;
    return stdLanguage(resLang!, fallbackLng);
  }

  cacheUserLanguage(lng: string) {
    const { store } = this.options;
    store!.setItem(this.cacheKey, lng);
  }
}

export default I18nLanguageDetect;
