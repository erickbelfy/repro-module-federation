import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslate, useLocaleState, AdminContext } from 'react-admin';
import enReactAdminMessages from 'ra-language-english';
import frReactAdminMessages from 'ra-language-french';
import { createOspI18nProvider } from '../ospI18nProvider';

const mockMessages = {
  en: {
    'demo.testing.message': 'this is a message',
  },
  fr: {
    'demo.testing.message': 'ceci est un message',
  },
};

const setup = (providers, Component) => {
  return render(
    <AdminContext {...providers}>
      <Component />
    </AdminContext>
  );
};

const Component = ({ translationKey }) => {
  const translate = useTranslate();
  const [, setLocale] = useLocaleState();
  return (
    <div>
      <button type="button" onClick={() => setLocale('fr')}>
        set to french
      </button>
      <p>{translate(translationKey)}</p>
    </div>
  );
};

describe('ospI18nProvider(messages, locale)', () => {
  it('should return I18nProvider', () => {
    const i18nProvider = createOspI18nProvider('en', mockMessages);
    expect(Object.keys(i18nProvider)).toStrictEqual([
      'translate',
      'changeLocale',
      'getLocale',
      'getLocales',
    ]);
  });

  type I18nScenario = { key: string; defaultEnMessage: string; defaultFrMessage: string };

  const localKey = 'demo.testing.message';
  const localMessages: I18nScenario = {
    key: localKey,
    defaultEnMessage: mockMessages.en[localKey],
    defaultFrMessage: mockMessages.fr[localKey],
  };
  const raMessages: I18nScenario = {
    key: 'ra.auth.auth_check_error',
    defaultEnMessage: enReactAdminMessages.ra.auth.auth_check_error,
    defaultFrMessage: frReactAdminMessages.ra.auth.auth_check_error,
  };

  const localeScenarios = [
    ['use local messages', localMessages],
    ['react admin default keys', raMessages],
  ];
  it.each(localeScenarios)(
    'should %s when switching a paragraph to french when setLocale() is called',
    async (scenario, { key, defaultEnMessage, defaultFrMessage }: I18nScenario) => {
      const i18nProvider = createOspI18nProvider('en', mockMessages);
      setup({ i18nProvider }, () => <Component translationKey={key} />);
      expect(screen.getByText(defaultEnMessage)).toHaveTextContent(defaultEnMessage);
      await act(() => userEvent.click(screen.getByText('set to french')));
      expect(screen.getByText(defaultFrMessage)).toHaveTextContent(defaultFrMessage);
    }
  );
});
