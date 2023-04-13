/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from '@testing-library/user-event';
import type { ReactElement, JSXElementConstructor } from 'react';
import dataIds from '../../../pages/LoginPage/dataIds';

export const loginUser = async (
  Wrapper: ReactElement<any, string | JSXElementConstructor<any>>
) => {
  render(Wrapper);
  const loginPage = await waitFor(() => screen.getByTestId(dataIds.LoginPage.id));
  const emailInput = screen.getByTestId(dataIds.LoginPage.email.id);
  const passwordInput = screen.getByTestId(dataIds.LoginPage.password.id);
  const submitButton = screen.getByTestId(dataIds.LoginPage.submitButton.id);
  expect(loginPage).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
  await userEvent.type(emailInput, 'mocker-doe@onespan.com');
  await userEvent.type(passwordInput, 'p@ssW0rd');
  expect(submitButton).toBeEnabled();
  await userEvent.click(submitButton);
};

export const getPageNode = () => {
  return waitFor(() => screen.getByText('my component'));
};
