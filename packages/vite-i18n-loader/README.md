# vite-i18n-loader
> Another vite i18n loader.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-i18n-loader
```

## usage
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import i18nLoader from '@jswork/vite-i18n-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), i18nLoader()],
  server: {
    host: '0.0.0.0'
  }
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/vite-i18n-loader/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-i18n-loader
[version-url]: https://npmjs.org/package/@jswork/vite-i18n-loader

[license-image]: https://img.shields.io/npm/l/@jswork/vite-i18n-loader
[license-url]: https://github.com/afeiship/vite-i18n-loader/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-i18n-loader
[size-url]: https://github.com/afeiship/vite-i18n-loader/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-i18n-loader
[download-url]: https://www.npmjs.com/package/@jswork/vite-i18n-loader
