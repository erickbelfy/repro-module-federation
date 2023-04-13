import { render } from '@testing-library/react';
import React from 'react';
import { AppBar } from '../index';
import { remoteAuthContext, TestWrapper } from '../../../shared/testing';

const remoteAuthReducers = {
  useAuthState: () => remoteAuthContext,
};

jest.mock(
  'AuthenticationApp/Routes',

  () => {
    return {
      loginRoutes: [],
    };
  },
  { virtual: true }
);

jest.mock(
  'AuthenticationApp/Interceptors',

  () => {
    return {
      AxiosInterceptor: ({ children }) => children,
    };
  },
  { virtual: true }
);

// while module federation does not have a valid content on how we can mount a remote entry
// the solution is to virtually create the use cases that our app needs
jest.mock(
  'AuthenticationApp/Context',

  () => {
    return remoteAuthReducers;
  },
  { virtual: true }
);

jest.mock(
  'AuthenticationApp/Middlewares',

  () => {
    return {
      RequiredAuth: ({ children }) => {
        return children;
      },
    };
  },
  { virtual: true }
);

const title = 'hello world';
describe('<AppBar /> component', () => {
  it('should render null in case the id is not defined', () => {
    const { container } = render(
      <TestWrapper providers={['Theme']}>
        <AppBar title={title} />
      </TestWrapper>
    );
    expect(container).toBeInTheDocument();
  });
});
