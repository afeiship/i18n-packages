import LngDetect from '@jswork/i18n-language-detect';
import App from './app';
import { LocaleProvider } from '../../src/main';
import React from 'react';
import styled from 'styled-components';

// @ts-ignore
import enUSLocale from '../locales/en-US.json';

// @ts-ignore
import zhCNLocale from '../locales/zh-CN.json';

const ChangeContainer = styled.div`
  margin: 10px 0;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 10px;
  border-radius: 5px;
`;

const resources = {
  'en-US': { translation: enUSLocale },
  'zh-CN': { translation: zhCNLocale }
};

export const LocaleApp = () => {
  const qs = new URL(document.URL).searchParams;
  const mode = qs.get('mode') || 'backend';
  return (
    <>
      <ChangeContainer>MODE: {mode}</ChangeContainer>
      {mode === 'backend' && (
        <LocaleProvider
          mode="backend"
          options={{ publicURL: '/' }}
          plugins={[LngDetect]}
          onInit={(opts) => {
            console.log('on init opts:', opts);
            // nx.t = opts.t;
          }}>
          <App />
        </LocaleProvider>
      )}

      {mode === 'memory' && (
        <LocaleProvider mode="memory" options={{ resources }} plugins={[LngDetect]}>
          <App />
        </LocaleProvider>
      )}
    </>
  );
};
