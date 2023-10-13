import Cookies from 'js-cookie';

export default class {
  public static readonly type = 'languageDetector';

  init(s, opts) {
    console.log('all opts: ', s.languageUtils.options);
  }

  detect(s, opts) {
    console.log('opts:', opts);

    return Cookies.get('lang') || localStorage.getItem('i18next.lang');
  }

  cacheUserLanguage(lng: string) {
    localStorage.setItem('i18next.lang', lng);
  }
}
