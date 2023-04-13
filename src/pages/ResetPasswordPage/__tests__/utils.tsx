// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TestWrapper, resetPasswordForm } from '../../../shared/testing';
import { ResetPasswordPage } from '../../index';
import dataIds from '../dataIds';

export const getView = () => {
  const Component = () => {
    return (
      <TestWrapper
        providers={[
          'Intl',
          'Theme',
          ['Context', { scope: ['scope1'], name: 'myApp' }],
          [
            'Router',
            {
              initialEntries: [
                {
                  pathname: '/reset-password',
                  state: {
                    emailAddress: resetPasswordForm.emailAddress,
                    password: resetPasswordForm.password,
                  },
                },
              ],
            },
          ],
        ]}
      >
        <ResetPasswordPage onLogin={() => Promise.resolve()} />
      </TestWrapper>
    );
  };
  return render(<Component />);
};

export const fillInResetPasswordForm = () => {
  const wrapper = getView();
  const { getByTestId } = wrapper;
  const newPassword = getByTestId(dataIds.ResetPasswordPage.newPassword.id);
  const confirmPassword = getByTestId(dataIds.ResetPasswordPage.confirmPassword.id);
  fireEvent.change(newPassword, { target: { value: resetPasswordForm.newPassword } });
  fireEvent.change(confirmPassword, { target: { value: resetPasswordForm.confirmPassword } });
  return wrapper;
};

export const fillInResetPasswordFormMismatched = () => {
  const wrapper = getView();
  const { getByTestId } = wrapper;
  const newPassword = getByTestId(dataIds.ResetPasswordPage.newPassword.id);
  const confirmPassword = getByTestId(dataIds.ResetPasswordPage.confirmPassword.id);
  fireEvent.change(newPassword, { target: { value: resetPasswordForm.newPassword } });
  fireEvent.change(confirmPassword, {
    target: { value: `${resetPasswordForm.confirmPassword}abc` },
  });
  return wrapper;
};
