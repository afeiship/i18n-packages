import getLanguage from './helpers/get-language';
import stdLanguage from './helpers/std-language';

declare var wx: any;

const I18nHelper = {
  getLanguage,
  stdLanguage,
};

// ---- UMD DELETE ME ----
// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = I18nHelper;
}

export default I18nHelper;
