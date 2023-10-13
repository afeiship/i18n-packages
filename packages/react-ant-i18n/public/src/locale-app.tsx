import LngDetect from '@jswork/i18n-language-detect';
import lngDetectLocal from './lng-detect';
import App from './app';
import { LocaleProvider } from '../../src/main';
import React from 'react';
import styled from 'styled-components';
import nx from '@jswork/next';

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
  'en-US': { translation: require('../locales/en-US.json') },
  'zh-CN': { translation: require('../locales/zh-CN.json') }
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
          routerType="browser"
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
