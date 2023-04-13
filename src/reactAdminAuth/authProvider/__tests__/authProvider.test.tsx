import React from 'react';
import { Resource, usePermissions } from 'react-admin';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import jwt from 'jsonwebtoken';
import { IntlProvider } from 'react-intl';
import { OSThemeProvider, AdminContext } from '../../Admin';
import messages from '../../../shared/i18n/en.json';
import { getPageNode, loginUser } from './utils';
import { tokenBody } from './fixtures';
import { theme as defaultTheme } from '../../Layout';
import { AuthProvider } from '../../../contexts';

// @todo organize the tests whenever we have time

const mockUserPool = {
  accountUuid: 'accountUuidMock',
  realmId: 'realmIdMock',
  solutionInstanceInfos: [{ solutionInstanceUuid: 'solutionInstanceUuidMock' }],
  clientId: 'clientIdMock',
};

const mockLogin = {
  accessToken: 'accessTokenMock',
  idToken: 'idTokenMock',
  tokenType: 'tokenTypeMock',
};

const mockTokenExchange = {
  access_token: jwt.sign(tokenBody, 'dummy', { expiresIn: '1h' }),
  issued_token_type: 'issued_token_type_mock',
  scope: 'scope_mock',
};

const mockPermissions = [
  'ospn:platform:subscriptions:update',
  'ospn:platform:users:self-update',
  'ospn:platform:signup:invite',
  'ospn:platform:realms:read',
  'ospn:platform:plans:query',
  'ospn:platform:subscriptions:solution-instances:read',
  'ospn:platform:groups:query',
  'ospn:platform:subscriptions:read',
  'ospn:platform:users:read',
  'ospn:platform:plans:solution-placements:query',
  'ospn:platform:accounts:read',
  'ospn:platform:groups:read',
  'ospn:platform:realms:query',
  'ospn:platform:subscriptions:solution-instances:query',
  'ospn:platform:users:query',
  'ospn:platform:plans:read',
  'ospn:platform:subscriptions:solution-instances:update',
  'ospn:platform:subscriptions:query',
  'ospn:platform:plans:update',
  'ospn:daas:digipass:devices:logs:query',
  'ospn:daas:digipass:devices:logs:report:query',
  'ospn:daas:digipass:devices:logs:report:sub-resource:query',
  'ospn:daas:digipass:devices:logs:report:sub-resource:sub-2:query',
  'ospn:daas:digipass:devices:logs:report:sub-resource:sub-2:sub-3:query',
];

jest.mock('../../services', () => ({
  getUserPool: () => {
    return mockUserPool;
  },
  login: () => {
    return mockLogin;
  },
  tokenExchange: () => {
    return mockTokenExchange;
  },
  getPermissions: () => {
    return mockPermissions;
  },
}));

const MyComponent = () => {
  const { permissions, isLoading } = usePermissions();
  return (
    <div>
      <span>my component</span>
      {!isLoading && (
        <div>
          <span>permissions loaded</span>
          <span>{permissions.accounts[0].resource}</span>
        </div>
      )}
    </div>
  );
};

const Wrapper = () => {
  return (
    <OSThemeProvider theme={defaultTheme}>
      <IntlProvider locale="en" messages={messages}>
        <AuthProvider name="testing-app">
          <AdminContext name="testing-app" messages={{ en: messages }} locale="en">
            <Resource name="test" list={MyComponent} />
          </AdminContext>
        </AuthProvider>
      </IntlProvider>
    </OSThemeProvider>
  );
};

describe('useAuthProvider', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should login', async () => {
    await loginUser(
      <MemoryRouter>
        <Wrapper />
      </MemoryRouter>
    );
    const pageNode = await getPageNode();
    expect(pageNode).toBeInTheDocument();
    const withPermissions = await waitFor(() => screen.getByText('permissions loaded'));
    expect(withPermissions).toBeInTheDocument();
    const accountResource = await waitFor(() => screen.getByText('accounts'));
    expect(accountResource).toBeInTheDocument();
  });
  it('should bypass login', async () => {
    // Somehow react-admin does not recognize Memory router
    // initial entries object, this is the workaround if you want to
    // set default routes for testing
    // double check this test once you have time
    global.window = Object.create(window);
    const pathname = 'http://localhost/test';
    const search = `?token=${mockTokenExchange.access_token}&tokenType=Bearer`;
    Object.defineProperty(window, 'location', {
      value: {
        pathname,
        search,
      },
      writable: true, // possibility to override
    });
    const initialEntries = [
      '/test',
      { pathname: '/test', search, hash: 'test', state: { from: '/' } },
    ];
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Wrapper />
      </MemoryRouter>
    );
    const pageNode = await getPageNode();
    expect(pageNode).toBeInTheDocument();
  });
});
