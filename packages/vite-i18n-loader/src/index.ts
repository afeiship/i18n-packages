import { promises as fs, existsSync } from 'fs';
import path from 'path';
import nx from '@jswork/next';
import type { Plugin } from 'vite';
import compact from 'deep-compact';
import { getFileId, isLocaleFile, loadContent, warn } from '@jswork/i18n-loader-utils';
import '@jswork/next-deep-assign';

interface Options {
  /**
   * Show verbose logs.
   * @default false
   */
  verbose?: boolean;
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

interface YamlSchema {
  id?: string;
  mode?: 'merge' | 'yaml-first';
  languages: Record<string, any>;
}

type AnyObject = Record<string, any>;

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
const PLUGIN_NAME = 'vite-i18n-loader';
const MSG_INVALID_LOCALE_FILE = `[${PLUGIN_NAME}] Invalid locale file: %s, languages not found.`;
const MSG_INVALID_ID = `[${PLUGIN_NAME}] Invalid id in file: %s, id not work.`;
const MSG_INVALID_LANGUAGE = `[${PLUGIN_NAME}] Invalid language: %s, file: %s.`;

const getCalcContent = (oldContent: AnyObject, newContent: AnyObject, mode: YamlSchema['mode']) => {
  if (mode === 'yaml-first') {
    return newContent;
  } else {
    return nx.deepAssign(oldContent, newContent);
  }
};

export default (inOptions?: Options) => {
  const { verbose, dest, supportedLanguages, localePattern } = {
    ...defaults,
    ...inOptions,
  } as Required<Options>;

  const isVerbose = verbose || process.env.NODE_ENV === 'development';

  return {
    name: 'vite-i18n-loader',
    handleHotUpdate: async ({ file, server }) => {
      if (isLocaleFile(file, localePattern)) {
        if (isVerbose) console.log(`[${PLUGIN_NAME}] hot update:`, file);

        const fileContent: any = await loadContent(file);
        let { id, languages, mode } = fileContent as YamlSchema;
        const _id = id || getFileId(file);

        if (!languages) return warn(MSG_INVALID_LOCALE_FILE, file);
        if (!_id) return warn(MSG_INVALID_ID, file);

        nx.forIn(languages, async (lang, value) => {
          const _value = compact(value);
          // check if language is valid
          if (!supportedLanguages.includes(lang)) return warn(MSG_INVALID_LANGUAGE, lang, file);

          // create dir if not exists
          const outputFilePath = path.resolve(dest!, `${lang}.json`);
          if (!existsSync(outputFilePath)) {
            await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
            await fs.writeFile(outputFilePath, '{}', 'utf-8');
          }

          // merge old content and new content
          const fileContent = await loadContent(outputFilePath);
          const newContent = nx.set({}, _id, _value);
          const oldContent = nx.get(fileContent, _id);
          const calculatedContent = getCalcContent(oldContent, newContent, mode);
          nx.set(fileContent, _id, calculatedContent)
          await fs.writeFile(outputFilePath, JSON.stringify(fileContent, null, 2), 'utf-8');

          // trigger full reload to update client
          server.ws.send({ type: 'full-reload' });
        });
      }
    },
  } as Plugin;
};
