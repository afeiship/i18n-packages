// import('i18next').TFunction
type TFunction = (key: string, options?: any) => string;

interface NxStatic {
  t: TFunction;
  i18n: import('i18next').i18n;
  useIntl: (keyPrefix?: string, options?: import('react-i18next').UseTranslationOptions) => string;
}
