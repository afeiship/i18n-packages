import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next';

// This is a custom hook that wraps the useTranslation hook and adds the i18n instance and the ready state to the response.
const useIntl = (keyPrefix?: string, options?: UseTranslationOptions) => {
  const { t, i18n, ready } = keyPrefix
    ? useTranslation('translation', { keyPrefix, ...options })
    : useTranslation();

  return {
    t: (key: string, options?: any) => t(key, options),
    i18n,
    ready
  } as UseTranslationResponse<any>;
};

export default useIntl;
