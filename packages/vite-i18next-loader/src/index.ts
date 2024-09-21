import type { Plugin, ViteDevServer } from 'vite';
import fg from 'fast-glob';
import nx from '@jswork/next';
import { getFileId, isLocaleFile, loadContent, warn } from '@jswork/i18n-loader-utils';
import deepmerge from 'deepmerge';

interface Options {
  /**
   * Show verbose logs.
   * @default false
   */
  verbose?: boolean;
  /**
   * Specify the file path to include.
   */
  include: string[];
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
  verbose: false,
  include: ['src/**/locale.yml', 'src/**/locale.yaml', 'src/**/locale.json'],
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

const VIRTUAL_ID = 'virtual:i18n-resources';
const PLUGIN_NAME = 'vite-i18n-loader';
const MSG_INVALID_LOCALE_FILE = `[${PLUGIN_NAME}] Invalid locale file: %s, languages not found.`;
const MSG_INVALID_ID = `[${PLUGIN_NAME}] Invalid id in file: %s, id not work.`;
const MSG_INVALID_LANGUAGE = `[vite-i18n-loader] Invalid language: %s, file: %s.`;

const notifyUpdate = (server: ViteDevServer) => {
  const virtualModule = server.moduleGraph.getModuleById(VIRTUAL_ID);
  if (virtualModule) {
    server.moduleGraph.invalidateModule(virtualModule);
  }
};

const plugin = (inOptions?: Options) => {
  const options = { ...defaults, ...inOptions } as Required<Options>;
  const { verbose, include, supportedLanguages, localePattern } = options;
  const isVerbose = verbose || process.env.NODE_ENV === 'development';

  let resources: Record<string, { translation: Record<string, string> }> = {};

  return {
    name: 'vite-i18next-loader',
    buildStart: async () => {
      for (const pattern of include) {
        const matchedFiles = await fg(pattern, { onlyFiles: true, absolute: true });
        for (const file of matchedFiles) {
          const fileId = getFileId(file);
          const fileContent = await loadContent(file);
          const { id, languages } = fileContent;
          const _id = id || getFileId(file);
          if (!languages) return warn(MSG_INVALID_LOCALE_FILE, file);
          if (!_id) return warn(MSG_INVALID_ID, file);
          for (const lang in languages) {
            if (!supportedLanguages.includes(lang)) return warn(MSG_INVALID_LANGUAGE, lang, file);
            const value = languages[lang];
            const currentResource = {};
            nx.set(currentResource, fileId, value);
            resources = deepmerge(resources, { [lang]: { translation: currentResource } });
          }
        }
      }
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return id;
    },
    load(id) {
      if (id === VIRTUAL_ID) {
        return `export const resources = ${JSON.stringify(resources)};`;
      }
    },
    handleHotUpdate: async ({ file, server }) => {
      if (isLocaleFile(file, localePattern)) {
        if (isVerbose) console.log(`[${PLUGIN_NAME}] hot update: ${file}`);
        notifyUpdate(server);
        server.ws.send({ type: 'full-reload' });
      }
    },
  } as Plugin;
};

export default plugin;
