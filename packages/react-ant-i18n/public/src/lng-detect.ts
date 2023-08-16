import Cookies from 'js-cookie';

export default class {
  public static readonly type = 'languageDetector';

  init() {
  }

  detect() {
    return Cookies.get('lang') || localStorage.getItem('i18next.lang');
  }

  cacheUserLanguage(lng: string) {
    localStorage.setItem('i18next.lang', lng);
  }
}
