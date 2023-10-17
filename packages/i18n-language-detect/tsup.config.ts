import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['cjs'],
  target: 'es5',
  clean: true,
  dts: true,
  sourcemap: true,
});
