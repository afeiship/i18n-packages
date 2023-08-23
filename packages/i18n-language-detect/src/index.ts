declare var wx: any;

interface I18nLanguageDetectOptions {
  lookupQuerystring?: string[];
  languageQueryFn?: () => string;
  cacheNs?: string;
  cacheKey?: string;
  routerType?: string;
}

const defaults = {
  lookupQuerystring: ['language', 'lang'],
  cacheNs: '',
  cacheKey: 'i18next.lang',
  routerType: 'hash',
};

const getLanguage = (keys: string[], inOptions: I18nLanguageDetectOptions) => {
  const { routerType } = inOptions;
  const suburl = routerType === 'hash' ? window.location.hash : window.location.search;
  const uri = new URL(suburl.slice(1), 'http://localhost');
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
    const { lookupQuerystring, languageQueryFn } = this.options;
    const lang = languageQueryFn
      ? languageQueryFn()
      : getLanguage(lookupQuerystring!, this.options);
    return lang || localStorage.getItem(this.cacheKey) || navigator.language;
  }

  cacheUserLanguage(lng: string) {
    localStorage.setItem(this.cacheKey, lng);
  }
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = I18nLanguageDetect;
}

export default I18nLanguageDetect;
