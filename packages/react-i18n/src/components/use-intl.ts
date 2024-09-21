import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next';

const useIntl = (keyPrefix?: string, options?: UseTranslationOptions) => {
  const { t, i18n, ready } = useTranslation('translation', { keyPrefix, ...options });

  return {
    t: (key: string, options?: any) => t(key, options),
    i18n,
    ready,
  } as UseTranslationResponse<any>;
};

export default useIntl;
