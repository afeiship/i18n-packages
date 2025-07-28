import { useTranslation, UseTranslationOptions } from 'react-i18next';

// This is a custom hook that wraps the useTranslation hook and adds the i18n instance and the ready state to the response.
const useIntl = (keyPrefix?: string, options?: Omit<UseTranslationOptions, 'ns'>) => {
  // @ts-ignore
  return keyPrefix ? useTranslation('translation', { keyPrefix, ...options }) : useTranslation();
};

export default useIntl;
