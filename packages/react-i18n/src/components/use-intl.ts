import { useTranslation, UseTranslationOptions } from 'react-i18next';

const useIntl = (keyPrefix?: string, options?: UseTranslationOptions) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix, ...options });

  return {
    t: (key: string, options?: any) => t(key, options),
    i18n
  };
};

export default useIntl;
