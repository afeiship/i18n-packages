import { promises as fs, existsSync } from 'fs';
import deepmerge from 'deepmerge';
import path from 'path';
import nx from '@jswork/next';
import type { Plugin } from 'vite';
import { getFileId, isLocaleFile, loadContent, warn } from '@jswork/i18n-loader-utils';

interface Options {
  /**
   * The output directory for locales.
   * @default 'public/locales'
   */
  dest?: string;
  /**
   * The supported languages.
   * @default ['zh-CN', 'en-US', 'zh', 'en']
   */
  supportedLanguages?: string[];
  /**
   * The file pattern for locales.
   * @default ['locale.json', 'locale.yml', 'locale.yaml', '*.locale.json', '*.locale.yml', '*.locale.yaml']
   */
  localePattern?: string | string[];
}

const defaults: Options = {
  dest: 'public/locales',
  supportedLanguages: ['zh-CN', 'en-US', 'zh', 'en'],
  localePattern: [
    'locale.json',
    'locale.yml',
    'locale.yaml',
    '*.locale.json',
    '*.locale.yml',
    '*.locale.yaml',
  ],
};

const MSG_INVALID_LOCALE_FILE = `[vite-i18n-loader] Invalid locale file: %s, languages not found.`;
const MSG_INVALID_ID = `[vite-i18n-loader] Invalid id in file: %s, id not work.`;
const MSG_INVALID_LANGUAGE = `[vite-i18n-loader] Invalid language: %s, file: %s.`;

export default (inOptions?: Options) => {
  const { dest, supportedLanguages, localePattern } = {
    ...defaults,
    ...inOptions,
  } as Required<Options>;

  return {
    name: 'vite-i18n-loader',
    handleHotUpdate: async ({ file, server }) => {
      if (isLocaleFile(file, localePattern)) {
        const fileContent: any = await loadContent(file);
        let { id, languages } = fileContent;
        id = id || getFileId(file);
        if (!languages) return warn(MSG_INVALID_LOCALE_FILE, file);
        if (!id) return warn(MSG_INVALID_ID, file);

        nx.forIn(languages, async (lang, value) => {
          // check if language is valid
          if (!supportedLanguages.includes(lang)) return warn(MSG_INVALID_LANGUAGE, lang, file);

          // create dir if not exists
          const outputFilePath = path.resolve(dest!, `${lang}.json`);
          if (!existsSync(outputFilePath)) {
            await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
            await fs.writeFile(outputFilePath, '{}', 'utf-8');
          }

          // merge old content and new content
          const oldFileContent = await loadContent(outputFilePath);
          const newContent = {};
          nx.set(newContent, id, value);
          const mergedContent = deepmerge(oldFileContent, newContent);
          await fs.writeFile(outputFilePath, JSON.stringify(mergedContent, null, 2), 'utf-8');

          // trigger full reload to update client
          server.ws.send({
            type: 'full-reload',
          });
        });
      }
    },
  } as Plugin;
};
