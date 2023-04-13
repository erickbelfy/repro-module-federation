import React from 'react';
import { BoxProps as MuiBoxProps, Box } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { LoginPage } from '../pages/LoginPage';
import { ErrorFallback } from '../components';
import { useLogin } from '../shared/hooks';

const RemoteLoginPage = (props: MuiBoxProps) => {
  const { handleLogin: onLogin } = useLogin();
  const handleLogin = ({ emailAddress, password, staticPassword, confirmPassword }) => {
    return onLogin({ emailAddress, password, staticPassword, confirmPassword });
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box {...props}>
        <LoginPage onLogin={handleLogin} />
      </Box>
    </ErrorBoundary>
  );
};

export default RemoteLoginPage;
