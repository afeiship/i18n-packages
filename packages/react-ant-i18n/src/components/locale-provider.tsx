import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { TFunction, useTranslation } from 'react-i18next';
import type { i18n as I18n } from 'i18next';
import { InitOptions as I18nextInitOptions } from 'i18next';
import { Locale } from 'antd/es/locale-provider';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { ReactNode } from 'react';
import { ThirdPartyModule } from './shared';
import useIntl from './use-intl';

// modes
import init4backend from './mode/init4backend';
import init4memory from './mode/init4memory';

import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import ruRU from 'antd/es/locale/ru_RU';

interface InitOptions extends I18nextInitOptions {
  publicURL?: string;
}

interface OnInitCallbackOptions {
  i18n: I18n;
  t: TFunction;
}

const locales = { 'en-US': enUS, 'zh-CN': zhCN, 'ru-RU': ruRU };
const momentHook = { 'ru-RU': 'ru' };

let initialized = false;

type INIT_MODE = 'backend' | 'memory' | null;
type LocaleProviderProps = {
  moment?: any;
  children: ReactNode;
  mode?: INIT_MODE;
  harmony?: boolean;
  routerType?: 'hash' | 'browser';
  options?: InitOptions;
  plugins?: ThirdPartyModule[];
  onInit?: (opts: any) => void;
  onLanguageChanged?: (lang: string) => void;
  locales?: {
    [key in string]: Locale;
  };
} & ConfigProviderProps;

const LocaleProvider = ({
  children,
  locales,
  mode,
  harmony,
  moment,
  routerType,
  options,
  plugins,
  onInit,
  onLanguageChanged,
  ...props
}: LocaleProviderProps) => {
  const computedOptions = { routerType, ...options };

  if (!initialized) {
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

  // @ts-ignore
  const { i18n, t } = useTranslation();
  const lang: string = i18n.language as keyof typeof locales;
  const lowerLocale = momentHook[lang] || lang.toLowerCase();
  const ctx:any = typeof nx !== 'undefined' ? nx: null;

  if (harmony && ctx) {
    ctx?.mix(ctx, { t, i18n });
    ctx.useIntl = useIntl;
  }

  // Only low version antd need this
  moment?.updateLocale(lowerLocale, null);

  // onInit
  onInit!({ i18n, t });

  useEffect(() => {
    // onLanguageChanged
    i18n.on('languageChanged', onLanguageChanged!);

    return () => {
      i18n.off('languageChanged', onLanguageChanged!);
    };
  }, []);

  return (
    <ConfigProvider locale={locales![lang]} {...props}>
      {children}
    </ConfigProvider>
  );
};

LocaleProvider.defaultProps = {
  mode: 'backend',
  moment: null,
  locales,
  routerType: 'hash',
  harmony: false,
  onInit: (_: OnInitCallbackOptions) => {},
  onLanguageChanged: () => {}
};

export default LocaleProvider;
