import { stdLanuage } from '../src';

describe('test for std lang', () => {
  test('language: en', () => {
    expect(stdLanuage('en')).toBe('en-US');
    expect(stdLanuage('en-US')).toBe('en-US');
    expect(stdLanuage('en-us')).toBe('en-US');
  });

  test('language: zh', () => {
    expect(stdLanuage('zh')).toBe('zh-CN');
    expect(stdLanuage('zh-CN')).toBe('zh-CN');
    expect(stdLanuage('zh-cn')).toBe('zh-CN');
    expect(stdLanuage('zh-HK')).toBe('zh-CN');
    expect(stdLanuage('zh-hk')).toBe('zh-CN');
    expect(stdLanuage('zh-TW')).toBe('zh-CN');
    expect(stdLanuage('zh-tw')).toBe('zh-CN');
  });

  test('language: ru', () => {
    expect(stdLanuage('ru')).toBe('ru-RU');
    expect(stdLanuage('ru-RU')).toBe('ru-RU');
    expect(stdLanuage('ru-ru')).toBe('ru-RU');
    expect(stdLanuage('ru-RU')).toBe('ru-RU');
    expect(stdLanuage('ru-ru')).toBe('ru-RU');
    expect(stdLanuage('ru-RU')).toBe('ru-RU');
    expect(stdLanuage('ru-ru')).toBe('ru-RU');
  });
});
