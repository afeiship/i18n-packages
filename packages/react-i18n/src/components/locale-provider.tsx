import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import type { i18n as I18n } from 'i18next';
import { InitOptions as I18nextInitOptions } from 'i18next';
import { ReactNode } from 'react';
import { ThirdPartyModule } from './shared';

// modes
import init4backend from './mode/init4backend';
import init4memory from './mode/init4memory';

const LocalContext = React.createContext({});

interface InitOptions extends I18nextInitOptions {
  publicURL?: string;
}

interface OnInitCallbackOptions {
  i18n: I18n;
  lang: string;
  t: TFunction;
}

let initialized = false;

type INIT_MODE = 'backend' | 'memory' | null;
type LocaleProviderProps = {
  children: ReactNode;
  mode?: INIT_MODE;
  options?: InitOptions;
  plugins?: ThirdPartyModule[];
  onInit?: (opts: any) => void;
  locales?: {
    [key in string]: any;
  };
};

const RawLocaleProvider = ({
  children,
  locales,
  mode,
  options,
  plugins,
  onInit = (_: OnInitCallbackOptions) => {},
  ...props
}: LocaleProviderProps) => {
  if (!initialized) {
    switch (mode) {
      case 'backend':
        init4backend(options, plugins);
        break;
      case 'memory':
        init4memory(options, plugins);
        break;
      default:
        console.warn('[LocaleProvider] You need init i18next first!');
    }
    initialized = true;
  }

  const { i18n, t } = useTranslation();
  const lang: string = i18n.language as keyof typeof locales;

  // add onInit method
  onInit!({ i18n, t, lang });

  return (
    <LocalContext.Provider value={lang} {...props}>
      {children}
    </LocalContext.Provider>
  );
};

RawLocaleProvider.defaultProps = {
  mode: 'backend'
};

export default RawLocaleProvider;
