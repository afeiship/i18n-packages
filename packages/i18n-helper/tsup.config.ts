import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['cjs'],
  globalName: 'i18nHelper',
  dts: true,
  clean: true,
  sourcemap: true,
});
