import path from 'path';
import yaml from 'js-yaml';
import { promises as fs } from 'fs';

// /Users/ap7/aric-notes/i18next-notes/src/components/abc-comp/locale.yml -> 'components.abc-comp'
export const getFileId = (file: string) => {
  const basedir = path.dirname(file);
  const [_, idpath] = basedir.split('/src/');
  return idpath.replace('/', '.');
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
