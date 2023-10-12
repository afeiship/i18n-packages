import stdLang from '../src/std-language';

describe('test for std lang', () => {
  test('language: en', () => {
    expect(stdLang('en')).toBe('en-US');
    expect(stdLang('en-US')).toBe('en-US');
    expect(stdLang('en-us')).toBe('en-US');
  });

  test('language: zh', () => {
    expect(stdLang('zh')).toBe('zh-CN');
    expect(stdLang('zh-CN')).toBe('zh-CN');
    expect(stdLang('zh-cn')).toBe('zh-CN');
    expect(stdLang('zh-HK')).toBe('zh-CN');
    expect(stdLang('zh-hk')).toBe('zh-CN');
    expect(stdLang('zh-TW')).toBe('zh-CN');
    expect(stdLang('zh-tw')).toBe('zh-CN');
  });

  test('language: ru', () => {
    expect(stdLang('ru')).toBe('ru-RU');
    expect(stdLang('ru-RU')).toBe('ru-RU');
    expect(stdLang('ru-ru')).toBe('ru-RU');
    expect(stdLang('ru-RU')).toBe('ru-RU');
    expect(stdLang('ru-ru')).toBe('ru-RU');
    expect(stdLang('ru-RU')).toBe('ru-RU');
    expect(stdLang('ru-ru')).toBe('ru-RU');
  });
});
