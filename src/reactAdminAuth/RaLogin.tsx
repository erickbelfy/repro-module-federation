import React from 'react';
import { useLogin } from 'react-admin';
import { LoginPage } from '../pages/LoginPage';

type HandleLogin = {
  url: string;
  emailAddress: string;
  password: string;
};
export const RALogin = () => {
  const onLogin = useLogin();

  const handleLogin = ({ url, emailAddress, password }: HandleLogin) => {
    return onLogin({ url, emailAddress, password });
  };
  return <LoginPage onLogin={handleLogin} />;
};
