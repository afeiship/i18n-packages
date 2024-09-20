import { getFileId, loadContent } from '../src/utils';

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
