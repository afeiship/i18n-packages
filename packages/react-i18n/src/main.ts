import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import LocaleProvider from './components/locale-provider';
import init4backend from './components/mode/init4backend';
import init4memory from './components/mode/init4memory';

export const useIntl = useTranslation;
export { LocaleProvider, i18next, init4memory, init4backend };
