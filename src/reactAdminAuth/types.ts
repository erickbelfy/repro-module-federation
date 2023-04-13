import type { ThemeOptions } from '@mui/material';
import type { AdminChildren, AdminProps, DataProvider, I18nProvider, StringMap } from 'react-admin';
import type { ReactNode } from 'react';

type ReactIntl = { [key: string]: string };
export type IntlMessage = { [key: string]: StringMap };

export type OSThemeProviderProps = {
  theme: ThemeOptions;
  children: ReactNode;
};

export type ContextProvidersProps = {
  children: ReactNode;
  basename: string;
  messages: ReactIntl;
  name: string;
  locale: string;
  AppLogo: JSX.Element;
  externalCluster: boolean;
};

export type OSAdminContextProps = Omit<AdminProps, 'theme'> & {
  name?: string;
  apiUrl?: string;
  theme?: ThemeOptions;
  locale?: string;
  messages?: IntlMessage;
  externalCluster?: boolean;
};

export type OSAdminProps = OSAdminContextProps & {
  basename?: string;
  locale?: string;
  name?: string;
  apiUrl?: string;
  messages?: IntlMessage;
  reactIntl?: ReactIntl;
  adminProps?: OSAdminContextProps;
  children: AdminChildren;
  theme?: ThemeOptions;
  AppLogo?: JSX.Element;
  externalCluster?: boolean;
  dataProvider?: DataProvider;
  i18nProvider?: I18nProvider;
};

export type DomainType = {
  url: string;
};
export type RequestOptions = {
  headers?: { [key: string]: string };
  domain?: string;
};

export type UserPayload = {
  accountId: string;
  realmId: string;
  userId: string;
};

export type LoginPayload = {
  emailAddress: string;
  password: string;
  staticPassword: string;
  accountUuid: string;
  realmId: string;
  clientId: string;
};
