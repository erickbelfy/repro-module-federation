import React from 'react';
import { useLogin } from 'react-admin';
import { useLocation } from 'react-router-dom';
import { ResetPasswordPage } from '../pages';

type HandleResetPassword = {
  staticPassword: string;
};
export const RAResetPassword = () => {
  const onLogin = useLogin();
  const location = useLocation();

  const handleLogin = ({ staticPassword }: HandleResetPassword) => {
    const { emailAddress, password } = location.state;
    return onLogin({ emailAddress, password, staticPassword });
  };
  return <ResetPasswordPage onLogin={handleLogin} />;
};
