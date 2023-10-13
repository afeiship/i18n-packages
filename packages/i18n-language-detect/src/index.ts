import stdLanuage from './std-language';

declare var wx: any;

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

const getLanguage = (keys: string[], inOptions: I18nLanguageDetectOptions) => {
  const { routerType } = inOptions;
  const isHashType = routerType === 'hash';
  const suburl = isHashType ? window.location.hash : window.location.search;
  const idx = isHashType ? 1 : 0;
  const uri = new URL(suburl.slice(idx), 'http://localhost');
  for (const key of keys) {
    const lang = uri.searchParams.get(key);
    if (lang) return lang;
  }
  return null;
};

class I18nLanguageDetect {
  public static readonly type = 'languageDetector';
  public options: I18nLanguageDetectOptions;
  public services: any;

  get cacheKey() {
    const { cacheNs, cacheKey } = this.options;
    const { host } = window.location;
    const ns = cacheNs || host;
    return `${ns}@${cacheKey}`;
  }

  init(services: any, inOptions: I18nLanguageDetectOptions) {
    this.services = services;
    this.options = { ...defaults, ...inOptions };
  }

  detect() {
    const { lookupQuerystring, languageQueryFn, store, fallbackLng } = this.options;
    const lang = languageQueryFn
      ? languageQueryFn()
      : getLanguage(lookupQuerystring!, this.options);
    const resLang = lang || navigator.language || store!.getItem(this.cacheKey);
    return stdLanuage(resLang!, fallbackLng);
  }

  cacheUserLanguage(lng: string) {
    const { store } = this.options;
    store!.setItem(this.cacheKey, lng);
  }
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = I18nLanguageDetect;
}

export default I18nLanguageDetect;
