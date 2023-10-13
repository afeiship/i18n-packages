import Cookies from 'js-cookie';

class LanguageDetector {
  public static readonly type = 'languageDetector';
  public options: any;

  init(s, _, allopts) {
    this.options = allopts[LanguageDetector.type];
    console.log('all opts: ', this.options);
  }

  detect(s, opts) {
    return Cookies.get('lang') || localStorage.getItem('i18next.lang');
  }

  cacheUserLanguage(lng: string) {
    localStorage.setItem('i18next.lang', lng);
  }
}

export default LanguageDetector;
