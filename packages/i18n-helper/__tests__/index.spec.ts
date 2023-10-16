import { stdLanguage, getLanguage } from '../src';

// mock window.location
// global.window = Object.create(window);

describe('stdLanguage', () => {
  test('language: en', () => {
    expect(stdLanguage('en')).toBe('en-US');
    expect(stdLanguage('en-US')).toBe('en-US');
    expect(stdLanguage('en-us')).toBe('en-US');
  });

  test('language: zh', () => {
    expect(stdLanguage('zh')).toBe('zh-CN');
    expect(stdLanguage('zh-CN')).toBe('zh-CN');
    expect(stdLanguage('zh-cn')).toBe('zh-CN');
    expect(stdLanguage('zh-HK')).toBe('zh-CN');
    expect(stdLanguage('zh-hk')).toBe('zh-CN');
    expect(stdLanguage('zh-TW')).toBe('zh-CN');
    expect(stdLanguage('zh-tw')).toBe('zh-CN');
  });

  test('language: ru', () => {
    expect(stdLanguage('ru')).toBe('ru-RU');
    expect(stdLanguage('ru-RU')).toBe('ru-RU');
    expect(stdLanguage('ru-ru')).toBe('ru-RU');
    expect(stdLanguage('ru-RU')).toBe('ru-RU');
    expect(stdLanguage('ru-ru')).toBe('ru-RU');
    expect(stdLanguage('ru-RU')).toBe('ru-RU');
    expect(stdLanguage('ru-ru')).toBe('ru-RU');
  });
});

describe.skip('getLanguage', () => {
  const keys = ['language', 'lang'];
  test('routerType: browser', () => {
    const routerType = 'browser';
    location.href = 'http://localhost?language=en-US';
    expect(getLanguage(routerType, keys)).toBe('en-US');
  });
});
