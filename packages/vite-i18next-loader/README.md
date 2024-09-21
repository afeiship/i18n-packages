# vite-i18next-loader
> Vite plugin for i18n resources.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-i18next-loader
```

## usage
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePlugin from '@jswork/vite-i18next-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePlugin()],
  server: {
    host: '0.0.0.0'
  }
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/vite-i18next-loader/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-i18next-loader
[version-url]: https://npmjs.org/package/@jswork/vite-i18next-loader

[license-image]: https://img.shields.io/npm/l/@jswork/vite-i18next-loader
[license-url]: https://github.com/afeiship/vite-i18next-loader/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-i18next-loader
[size-url]: https://github.com/afeiship/vite-i18next-loader/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-i18next-loader
[download-url]: https://www.npmjs.com/package/@jswork/vite-i18next-loader
