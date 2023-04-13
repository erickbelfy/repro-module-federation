import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Admin } from 'react-admin';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { useAuthProvider } from './authProvider';
import { RALogin as OSRaLogin } from './RaLogin';
import {
  PlatformLayout as OSRaLayout,
  theme as defaultTheme,
  LayoutProvider,
} from './Layout';
import type {
  ContextProvidersProps,
  OSAdminProps,
  OSAdminContextProps,
  OSThemeProviderProps,
} from './types';
import { StyledRoot, StyledMain, inputGlobalStyles } from './Admin.styled';
import { createOspI18nProvider } from './i18nProvider';

/**
 * Theme provider that wraps components outside React admin scopes
 * @param {ThemeOptions} theme @onespan/component theme object
 * @param {ReactNode} children react children
 */

export const OSThemeProvider = ({ children, theme }: OSThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {inputGlobalStyles}
      <StyledRoot>
        <StyledMain>{children}</StyledMain>
      </StyledRoot>
    </ThemeProvider>
  );
};

/**
 *
 * Contexts Required for platform, probably some of them will be
 * deprecated as we develop the Onespan Design System components
 *
 * @param {ReactNode} children
 * @param {String} basename
 * @param {Object} messages
 * @param {String} name
 * @param {String} locale
 * @param {JSX.Element} AppLogo
 * @param {Boolean} isPlatformEKS delegate what cluster this application resides
 */
export const ContextProviders = ({
  children,
  basename,
  messages,
  name,
  locale,
  AppLogo,
  externalCluster,
}: ContextProvidersProps) => {
  return (
    <BrowserRouter basename={basename}>
      <IntlProvider locale={locale} messages={messages}>
        <LayoutProvider name={name} AppLogo={AppLogo}>
          {children}
        </LayoutProvider>
      </IntlProvider>
    </BrowserRouter>
  );
};

/**
 * Onespan React admin provider
 * @param {ThemeOptions} theme @onespan/component theme object
 * @param {string} apiUrl url to fetch resources from an api context
 * @param {ReactNode} children react children
 * @param {AdminProps} props react-admin props
 * @param {SVG} LogoIcon Icon that will be displayed in the app bar
 * @param {string} appName Friendly application name
 * @param {DataProvider} dataProvider
 */
export const AdminContext = ({
  theme,
  apiUrl,
  children,
  name,
  dataProvider,
  i18nProvider,
  messages = {},
  locale = 'en',
  dashboard,
  layout,
  externalCluster = false,
  requireAuth = true,
  ...props
}: OSAdminContextProps) => {
  const { authProvider, dataProvider: defaultDataProvider } = useAuthProvider({
    apiUrl,
    externalCluster,
  });
  const defaultI18nProvider = createOspI18nProvider(locale, messages);
  return (
    <Admin
      dataProvider={dataProvider || defaultDataProvider}
      i18nProvider={i18nProvider || defaultI18nProvider}
      loginPage={OSRaLogin}
      layout={layout || OSRaLayout}
      authProvider={authProvider}
      requireAuth={requireAuth}
      theme={theme}
      title={name}
      dashboard={dashboard}
      {...props}
    >
      {children}
    </Admin>
  );
};

/**
 * Admin Wrapper that contains all providers needed for basic functionality
 *
 * @param {string} basename define if your project needs to start from a sub path e.g (/admin)
 * @param {Object} messages react intl translation strings
 * @param {Object} reactIntl
 * @param {string} locale initial state for your locale
 * @param {OSAdminContextProps} adminProps react-admin props
 * @param {ReactNode} children resources
 * @param {string} name application name, needed to create session storage items
 * @param {string} apiUrl base path of your api calls
 * @param {ThemeOptions}theme onespan components theme
 * @param {SVG} AppLogo Application icon that appears in the appBar
 * @param {Boolean} isPlatformEKS Delegate what cluster the app resides
 * @param {DataProvider} dataProvider create a custom provider
 * @param {I18nProvider} i18nProvider create a custom i18n provider
 */
export const OSAdmin = ({
  children,
  messages,
  basename = '',
  externalCluster = false,
  requireAuth = true,
  locale = 'en',
  adminProps = {},
  name = 'Onespan',
  apiUrl = '',
  theme = defaultTheme,
  /** @deprecated needed for current react intl implementation. To be deprecated it soon */
  reactIntl = {},
  // @fixme logo types are not working properly, revisit it later
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  AppLogo = Logo,
  dataProvider,
  i18nProvider,
  layout,
  dashboard,
}: OSAdminProps) => {
  return (
    <ContextProviders
      name={name}
      AppLogo={AppLogo}
      locale={locale}
      basename={basename}
      messages={reactIntl}
      externalCluster={externalCluster}
    >
      <OSThemeProvider theme={theme}>
        <AdminContext
          messages={messages}
          locale={locale}
          theme={theme}
          apiUrl={apiUrl}
          name={name}
          dataProvider={dataProvider}
          i18nProvider={i18nProvider}
          dashboard={dashboard}
          layout={layout}
          externalCluster={externalCluster}
          requireAuth={requireAuth}
          {...adminProps}
        >
          {children}
        </AdminContext>
      </OSThemeProvider>
    </ContextProviders>
  );
};
