import { InitOptions, TFunction } from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { ThirdPartyModule, SHARED_INIT_OPTIONS, getInstance4Modules } from '../shared';

type BackendInitOptions = {
  version?: string;
  publicURL?: string;
} & Omit<InitOptions, 'resources'>;

declare var process: any;

export default (
  inInitOptions?: BackendInitOptions,
  inModules?: ThirdPartyModule[]
): Promise<TFunction> => {
  const modules = [Backend, initReactI18next, ...(inModules || [])];
  const instance = getInstance4Modules(modules);
  const { version, publicURL, ...initOptions } = inInitOptions || {};
  const root = publicURL || '';
  const options = {
    ...SHARED_INIT_OPTIONS,
    backend: {
      loadPath: `${root}locales/{{lng}}.json`,
      queryStringParams: { v: version || Date.now() }
    },
    ...initOptions
  };

  return instance.init(options);
};
