import { promises as fs, existsSync } from 'fs';
import deepmerge from 'deepmerge';
import yaml from 'js-yaml';
import path from 'path';
import nx from '@jswork/next';

interface Options {
  dest?: string;
  localeFile?: string;
}

const defaults: Options = {
  dest: 'public/locales',
  localeFile: 'locale.yml',
};

// /Users/ap7/aric-notes/i18next-notes/src/components/abc-comp/locale.yml -> 'components.abc-comp'
const getId = (filePath: string) => {
  const id = filePath.replace(path.resolve('src'), '').replace(path.extname(filePath), '');
  return id.replace(/\/|\\/g, '.');
};

export default (inOptions?: Options) => {
  const { dest, localeFile } = { ...defaults, ...inOptions };

  return {
    name: 'vite-i18n-loader',
    handleHotUpdate: async ({ file, server }) => {
      if (file.endsWith(localeFile)) {
        const MSG_INVALID_LOCALE_FILE = `[vite-i18n-loader] Invalid locale file: ${file}, languages not found.`;
        const fileContent = yaml.load(await fs.readFile(file));
        let { id, languages } = fileContent;
        id = id || getId(file);
        if (!languages) return console.warn(MSG_INVALID_LOCALE_FILE);

        nx.forIn(languages, async (lang, value) => {
          const outputFilePath = path.resolve(dest!, `${lang}.json`);

          // create dir if not exists
          if (!existsSync(outputFilePath)) {
            await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
            await fs.writeFile(outputFilePath, '{}', 'utf-8');
          }

          // merge old content and new content
          const oldFileContent = JSON.parse(await fs.readFile(outputFilePath, 'utf-8'));
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
  };
};
