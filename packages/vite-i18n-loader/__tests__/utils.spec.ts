import { getFileId, loadContent, isLocalFile } from '../src/utils';

describe('utils tests: getFileId', () => {
  test('01/absolute path', () => {
    const path1 = '/Users/ap7/aric-notes/i18next-notes/src/components/abc-comp/locale.yml';
    const fileId1 = getFileId(path1);
    expect(fileId1).toBe('components.abc-comp');
  });
  test('02/relative path', () => {
    const path2 = './src/components/abc-comp/locale.yml';
    const fileId2 = getFileId(path2);
    expect(fileId2).toBe('components.abc-comp');
  });
});

describe('utils tests: loadJson', () => {
  test('01/normal', async () => {
    const path1 = './__tests__/fixtures/sample.json';
    const data1 = await loadContent(path1);
    expect(data1).toStrictEqual({
      hello: 'world',
      foo: 'bar',
    });
  });
});

describe('utils tests: loadYaml', () => {
  test('01/yml', async () => {
    const path1 = './__tests__/fixtures/s1.yml';
    const data1 = await loadContent(path1);
    expect(data1).toStrictEqual({
      name: 's1',
      description: 's1 description',
    });
  });

  test('02/yaml', async () => {
    const path1 = './__tests__/fixtures/s2.yaml';
    const data1 = await loadContent(path1);
    expect(data1).toStrictEqual({
      name: 's2',
      items: [
        { name: 'item1', value: 'value1' },
        { name: 'item2', value: 'value2' },
      ],
    });
  });
});

describe('utils tests: isLocalFile', () => {
  test('01/valid patterns', async () => {
    const file1 = '__tests__/locales/en-US.locale.json';
    const file3 = '__tests__/locales/locale.json';
    const file4 = '__tests__/locales/locale.yaml';
    const file5 = '__tests__/locales/s1.locale.yml';
    const file6 = '__tests__/locales/s2.locale.yaml';
    const file8 = '__tests__/locales/zh-CN.locale.json';

    const patterns = [
      'locale.json',
      'locale.yml',
      'locale.yaml',
      '*.locale.json',
      '*.locale.yml',
      '*.locale.yaml',
    ];

    expect(isLocalFile(file1, patterns)).toBe(true);
    expect(isLocalFile(file3, patterns)).toBe(true);
    expect(isLocalFile(file4, patterns)).toBe(true);
    expect(isLocalFile(file5, patterns)).toBe(true);
    expect(isLocalFile(file6, patterns)).toBe(true);
    expect(isLocalFile(file8, patterns)).toBe(true);
  });

  test('02/invalid patterns', async () => {
    const file2 = '__tests__/locales/invalid.txt';
    const file7 = '__tests__/locales/sample.yml';

    const patterns = [
      'locale.json',
      'locale.yml',
      'locale.yaml',
      '*.locale.json',
      '*.locale.yml',
      '*.locale.yaml',
    ];
    expect(isLocalFile(file2, patterns)).toBe(false);
    expect(isLocalFile(file7, patterns)).toBe(false);
  });

  test('03/not exist', async () => {
    const file1 = '__tests__/locales/abc.txt';
    const file2 = '__tests__/locales/test.locale.json';
    const file3 = '__tests__/locales/test.locale.json';
    const file4 = '__tests__/locales/test.locale.yaml';
    const file5 = '__tests__/locales/test.locale.yml';
    const file6 = '__tests__/locales/test.locale.yaml';

    const patterns = [
      'locale.json',
      'locale.yml',
      'locale.yaml',
      '*.locale.json',
      '*.locale.yml',
      '*.locale.yaml',
    ];

    expect(isLocalFile(file1, patterns)).toBe(false);
    expect(isLocalFile(file2, patterns)).toBe(false);
    expect(isLocalFile(file3, patterns)).toBe(false);
    expect(isLocalFile(file4, patterns)).toBe(false);
    expect(isLocalFile(file5, patterns)).toBe(false);
    expect(isLocalFile(file6, patterns)).toBe(false);
  })
});
