import React from 'react';
import { ConfigProvider } from 'antd';
import { TFunction, useTranslation } from 'react-i18next';
import type { i18n as I18n } from 'i18next';
import { InitOptions as I18nextInitOptions } from 'i18next';
import { Locale } from 'antd/es/locale-provider';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { ReactNode } from 'react';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import { ThirdPartyModule } from './shared';

// modes
import init4backend from './mode/init4backend';
import init4memory from './mode/init4memory';

import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

interface InitOptions extends I18nextInitOptions {
  publicURL?: string;
}

interface OnInitCallbackOptions {
  i18n: I18n;
  lang: string;
  t: TFunction;
}

const locales = { 'en-US': enUS, 'zh-CN': zhCN };
let initialized = false;

type INIT_MODE = 'backend' | 'memory' | null;
type LocaleProviderProps = {
  children: ReactNode;
  mode?: INIT_MODE;
  options?: InitOptions;
  plugins?: ThirdPartyModule[];
  onInit?: (opts: any) => void;
  locales?: {
    [key in string]: Locale;
  };
} & ConfigProviderProps;

const LocaleProvider = ({
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
  const lowerLocale = lang.toLowerCase();

  moment.updateLocale(lowerLocale, null);

  // add onInit method
  onInit!({ i18n, t, lang });

  return (
    <ConfigProvider locale={locales![lang]} {...props}>
      {children}
    </ConfigProvider>
  );
};

LocaleProvider.defaultProps = {
  locales,
  mode: 'backend'
};

export default LocaleProvider;
