import React from 'react';
import { BoxProps as MuiBoxProps, Box } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { ErrorFallback } from '../components';
import { useLogin } from '../shared/hooks';

const RemoteResetPasswordPage = (props: MuiBoxProps) => {
  const { handleLogin } = useLogin();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box {...props}>
        <ResetPasswordPage onLogin={handleLogin} />
      </Box>
    </ErrorBoundary>
  );
};

export default RemoteResetPasswordPage;
