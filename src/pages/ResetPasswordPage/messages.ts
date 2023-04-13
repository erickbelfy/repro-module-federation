import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    defaultMessage: 'Reset your password',
    id: 'resetPassword.form.title',
  },
  isRequired: {
    defaultMessage: '{field} is a required field',
    id: 'resetPassword.form.isRequired',
  },
  minCharacters: {
    defaultMessage: '{field} must be at least {number} characters',
    id: 'resetPassword.form.minCharacters',
  },
  newPassword: {
    defaultMessage: 'New password',
    id: 'resetPassword.form.newPassword',
  },
  confirmPassword: {
    defaultMessage: 'Confirm password',
    id: 'resetPassword.form.confirmPassword',
  },
  doNotMatch: {
    defaultMessage: 'Passwords do not match',
    id: 'resetPassword.form.doNotMatch',
  },
  passwordError: {
    defaultMessage:
      'Password should have at least {minLengthPassword} characters, at least one uppercase letter, one lowercase letter, one number and a special character',
    id: 'resetPassword.form.passwordError',
  },
  resetPasswordButton: {
    defaultMessage: 'Reset password',
    id: 'resetPassword.form.button.text',
  },
});
