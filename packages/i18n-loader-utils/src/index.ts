import path from 'path';
import yaml from 'js-yaml';
import { promises as fs, existsSync } from 'fs';
import { sprintf } from 'sprintf-js';

// https://github.com/patak-dev/vite-plugin-virtual/blob/master/src/index.ts

export const getFileId = (file: string) => {
  const basedir = path.dirname(file);
  const [_, idpath] = basedir.split('src/');
  return idpath.replace(/\//g, '.');
};

export const loadContent = async (file: string) => {
  const ext = path.extname(file);
  const fileContent = await fs.readFile(file, 'utf-8');

  switch (ext) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
};

// localFile: ['locale.json', 'locale.yml', 'locale.yaml', '*.locale.json', '*.locale.yml', '*.locale.yaml']
export const isLocaleFile = (filepath: string, localeFile: string | string[]): boolean => {
  if (!existsSync(filepath)) return false;
  if (typeof localeFile === 'string') {
    const _localeFile = localeFile.replace('*', '');
    return filepath.endsWith(_localeFile);
  } else {
    return localeFile.some((localeItem) => isLocaleFile(filepath, localeItem));
  }
};

export const warn = (msgTmpl: string, ...args: any[]) => {
  const msg = sprintf(msgTmpl, ...args);
  console.warn(msg);
};

export function invalidateVirtualModule(
  server: any,
  virtualModuleId: string,
  isReload: boolean = false
): void {
  const { moduleGraph, ws } = server;
  const module = moduleGraph.getModuleById(virtualModuleId);
  if (module) {
    moduleGraph.invalidateModule(module);
    if (ws && isReload) {
      ws.send({
        type: 'full-reload',
        path: '*',
      });
    }
  }
}
