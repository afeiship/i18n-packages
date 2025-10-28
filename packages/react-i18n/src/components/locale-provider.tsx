import React, { useEffect } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import type { i18n as I18n } from 'i18next';
import { InitOptions as I18nextInitOptions } from 'i18next';
import { ReactNode } from 'react';
import { ThirdPartyModule } from './shared';
import useIntl from './use-intl';

// modes
import init4backend from './mode/init4backend';
import init4memory from './mode/init4memory';

const LocalContext = React.createContext({});

interface InitOptions extends I18nextInitOptions {
  publicURL?: string;
  version?: string;
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
  routerType?: 'hash' | 'browser';
  harmony?: boolean;
  options?: InitOptions;
  plugins?: ThirdPartyModule[];
  onInit?: (opts: any) => void;
  onLanguageChanged?: (lang: string) => void;
  locales?: {
    [key in string]: any;
  };
};

const defaultProps: Partial<LocaleProviderProps> = {
  mode: 'backend',
  routerType: 'hash',
  onInit: (_: OnInitCallbackOptions) => {},
  onLanguageChanged: () => {}
};

const RawLocaleProvider = (props: LocaleProviderProps) => {
  const {
    children,
    locales,
    mode,
    routerType,
    harmony,
    options,
    plugins,
    onInit,
    onLanguageChanged,
    ...rest
  } = { ...defaultProps, ...props };
  if (!initialized) {
    const computedOptions = { routerType, ...options };
    switch (mode) {
      case 'backend':
        init4backend(computedOptions, plugins);
        break;
      case 'memory':
        init4memory(computedOptions, plugins);
        break;
      default:
        console.warn('[LocaleProvider] You need init i18next first!');
    }
    initialized = true;
  }

  const { i18n, t } = useTranslation();
  const lang: string = i18n.language as keyof typeof locales;
  const ctx = window['nx'];

  // onInit
  onInit!({ i18n, t });

  if (harmony && ctx) {
    ctx.mix(ctx, { t, i18n, useIntl });
  }

  useEffect(() => {
    // onLanguageChanged
    i18n.on('languageChanged', onLanguageChanged!);

    return () => {
      i18n.off('languageChanged', onLanguageChanged!);
    };
  }, []);

  return (
    <LocalContext.Provider value={lang} {...rest}>
      {children}
    </LocalContext.Provider>
  );
};

export default RawLocaleProvider;
