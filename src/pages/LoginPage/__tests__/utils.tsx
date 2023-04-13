// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios, { AxiosInstance } from 'axios';
import { TestWrapper } from '../../../shared/testing/TestWrapper';

import { LoginPage } from '../..';
import dataIds from '../dataIds';
import { userCredentials } from '../../../shared/testing/mocks/login';
import { AxiosInterceptor } from '../../../Interceptors';
import ResetPasswordPage from '../../ResetPasswordPage/ResetPasswordPage';
import type { ProvidersType } from '../../../shared/testing/types';

const addHours = (numOfHours, date = new Date()) => {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
};

export const apiInstance = axios.create();
export const defaultProviders: ProvidersType = [
  'Intl',
  'Theme',
  [
    'Context',
    {
      initialState: { isSessionExpired: false, expiresIn: new Date().getTime() * 1000 },
      scope: ['scope1'],
      name: 'myApp',
    },
  ],
  ['Router', { initialEntries: ['/'] }],
];

const interceptorDefaultProviders: ProvidersType = [
  'Intl',
  'Theme',
  'Router',
  [
    'Context',
    {
      initialState: {
        isSessionExpired: false,
        expiresIn: addHours(1).getTime(),
        isLoggedIn: true,
        token: 'testing-token',
        tokenType: 'Bearer',
      },
      scope: ['scope1'],
      name: 'myApp',
    },
  ],
  [
    'Notification',
    {
      message: '',
      snackbarProps: {},
    },
  ],
];

export const getView = (onLoginHandler, providers = defaultProviders) => {
  const Component = () => {
    return (
      <TestWrapper providers={providers}>
        <AxiosInterceptor instance={apiInstance} />

        <Routes>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Route path="/" element={<LoginPage onLogin={onLoginHandler} />} />
          <Route path="/reset-password" element={<ResetPasswordPage onLogin={onLoginHandler} />} />
        </Routes>
      </TestWrapper>
    );
  };
  return render(<Component />);
};

// this method returns a simple instance of TestWrapper with AxiosInterceptor
// this allows us to test tiny parts of the AxiosInterceptor component
export const getAxiosInterceptorComponent = (
  axiosInstance: AxiosInstance,
  providers = interceptorDefaultProviders
) => {
  const Component = () => {
    return (
      <TestWrapper providers={providers}>
        <AxiosInterceptor instance={axiosInstance} />
      </TestWrapper>
    );
  };
  return render(<Component />);
};

export const fillLoginForm = async (onLoginHandler, providers = defaultProviders) => {
  const wrapper = getView(onLoginHandler, providers);
  const { getByTestId } = wrapper;
  const username = getByTestId(dataIds.LoginPage.email.id);
  const password = getByTestId(dataIds.LoginPage.password.id);
  fireEvent.change(username, { target: { value: userCredentials.emailAddress } });
  fireEvent.change(password, { target: { value: userCredentials.password } });
  await waitFor(() => expect(getByTestId(dataIds.LoginPage.submitButton.id)).toBeEnabled());
  return wrapper;
};
