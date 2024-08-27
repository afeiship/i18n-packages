type TFunction = import('i18next').TFunction | ((key: string, options?: any) => string);
interface NxStatic {
  t: TFunction;
  i18n: import('i18next').i18n;
  useIntl: typeof import('react-i18next').useTranslation;
}
