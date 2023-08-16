import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { LocaleApp } from './locale-app';

// fix for vite
import 'moment/dist/locale/zh-cn';

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <LocaleApp />
  </Suspense>,
  document.getElementById('root')
);
