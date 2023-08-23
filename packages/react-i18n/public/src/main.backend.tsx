import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { LocaleProvider } from '../../src/main';
import LngDetect from './lng-detect';
import App from './app';

// fix for vite
import 'moment/dist/locale/zh-cn';

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <LocaleProvider mode="backend" plugins={[LngDetect]}>
      <App />
    </LocaleProvider>
  </Suspense>,
  document.getElementById('root')
);
