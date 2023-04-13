import polyglotI18nProvider from 'ra-i18n-polyglot';
import type { I18nProvider } from 'react-admin';
// @todo add other default messages potentially
import enReactAdminMessages from 'ra-language-english';
import frReactAdminMessages from 'ra-language-french';
import type { IntlMessage } from '../types';

/**
 * Create i18n provider instance
 * @param {string} initialLocale default locale of a given application
 * @param {object} messages list of translation messages
 */
export const createOspI18nProvider = (
  initialLocale: string,
  { en, fr, ...messages }: IntlMessage
): I18nProvider => {
  const polyglotMessages = {
    ...messages,
    en: {
      ...enReactAdminMessages,
      ...en,
    },
    fr: {
      ...frReactAdminMessages,
      ...fr,
    },
  };
  return polyglotI18nProvider(
    (locale) => polyglotMessages[locale],
    initialLocale,
    Object.keys(messages)
  );
};
