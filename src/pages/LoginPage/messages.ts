import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    defaultMessage: 'Log in',
    id: 'login.form.title',
  },
  isRequired: {
    defaultMessage: '{field} is a required field',
    id: 'login.form.isRequired',
  },
  minCharacters: {
    defaultMessage: '{field} must be at least {number} characters',
    id: 'login.form.minCharacters',
  },
  emailAddress: {
    defaultMessage: 'Email',
    id: 'login.form.emailAddress',
  },
  emailAddressError: {
    defaultMessage: 'Email must be a valid email',
    id: 'login.form.emailAddressError',
  },
  password: {
    defaultMessage: 'Password',
    id: 'login.form.password',
  },
  passwordError: {
    defaultMessage:
      'Password should have at least {minLengthPassword} characters, at least one uppercase letter, one lowercase letter, one number and a special character',
    id: 'login.form.passwordError',
  },
  login: {
    defaultMessage: 'Log in',
    id: 'login.form.button.text',
  },
  forgotPassword: {
    defaultMessage: 'Forgot password?',
    id: 'login.form.forgotPassword',
  },
  accountLocked: {
    defaultMessage:
      'Your account has been locked or disabled. Please contact support to resolve this, then try again.',
    id: 'login.form.accountLocked',
  },
  invalidLogin: {
    defaultMessage: 'The user id and password you entered is invalid.',
    id: 'login.form.invalidLogin',
  },
  internalError: {
    defaultMessage: 'An internal error occurred.',
    id: 'login.form.internalError',
  },
});
