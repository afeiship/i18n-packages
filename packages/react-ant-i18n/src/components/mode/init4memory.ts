import { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getInstance4Modules, SHARED_INIT_OPTIONS, ThirdPartyModule } from '../shared';

export default (inInitOptions?: InitOptions, inModules?: ThirdPartyModule[]) => {
  const modules = [initReactI18next, ...(inModules || [])];
  const instance = getInstance4Modules(modules);
  const options = { ...SHARED_INIT_OPTIONS, ...inInitOptions };
  return instance.init(options);
};
