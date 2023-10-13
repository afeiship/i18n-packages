import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'i18nHelper',
  dts: true,
  sourcemap: true
});
