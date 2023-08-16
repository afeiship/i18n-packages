declare var wx: any;

interface I18nLanguageDetectOptions {
  languageKeys?: string[];
  cacheNs?: string;
  cacheKey?: string;
}

const defaults = {
  languageKeys: ['language', 'lang'],
  cacheNs: '',
  cacheKey: 'i18next.lang',
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

  constructor(services: any, inOptions: I18nLanguageDetectOptions) {
    this.services = services;
    this.options = { ...defaults, ...inOptions };
  }

  detect() {
    const url = window.location.href;
    const uri = new URL(url);
    const { languageKeys } = this.options;
    let lang = null;
    for (let index = 0; index < languageKeys!.length; index++) {
      const key = languageKeys![index];
      const lang = uri.searchParams.get(key);
      if (lang) break;
    }
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
