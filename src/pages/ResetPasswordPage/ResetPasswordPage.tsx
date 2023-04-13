// eslint-disable-next-line import/extensions
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Save } from '@mui/icons-material';
import { useRedirect } from 'react-admin';
import { PasswordField } from '../../components/Fields';
import dataIds from './dataIds';
import messages from './messages';
import type { FormValues } from './types';
import {
  StyledPaper,
  StyledTypography,
  StyledButtonProgress,
  StyledBox,
} from './ResetPasswordPage.styled';

const ResetPasswordPage = ({ onLogin }) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState({
    message: undefined,
  });
  const location = useLocation();
  const redirect = useRedirect();
  const {
    getValues,
    formState: { isValid },
  } = useFormContext();
  const onResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const [confirmPassword, staticPassword] = getValues(['confirmPassword', 'staticPassword']);
    onLogin({ staticPassword })
      .then(() => {
        if (!!confirmPassword && window.location.pathname.includes('dashboard')) {
          redirect('/complete-profile');
        }
      })
      .catch((error) => {
        setAuthError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="center"
      data-testid={dataIds.ResetPasswordPage.id}
      component="section"
    >
      <StyledPaper>
        <Box sx={{ marginBottom: 2 }}>
        </Box>
        <form>
          <StyledTypography color="textPrimary">{formatMessage(messages.title)}</StyledTypography>
          {/* Ensure browser password managers associate new password with email address */}
          <input type="hidden" name="emailAddress" value={location.state.emailAddress} readOnly />
          <PasswordField
            name="staticPassword"
            label={formatMessage(messages.newPassword)}
            testId={dataIds.ResetPasswordPage.newPassword.id}
            autoComplete="new-password"
          />
          <PasswordField
            name="confirmPassword"
            label={formatMessage(messages.confirmPassword)}
            testId={dataIds.ResetPasswordPage.confirmPassword.id}
            autoComplete="new-password"
          />
          <StyledBox display="flex" alignItems="center" justifyContent="flex-end">
            <Button
              data-testid={dataIds.ResetPasswordPage.submitButton.id}
              type="submit"
              color="primary"
              variant="contained"
              disabled={!isValid || loading}
              {...(!loading && { startIcon: <Save /> })}
              onClick={onResetPassword}
            >
              {loading ? <StyledButtonProgress /> : formatMessage(messages.resetPasswordButton)}
            </Button>
          </StyledBox>
        </form>
      </StyledPaper>
      {authError?.message && (
        <Typography color="error" data-testid={dataIds.ResetPasswordPage.authError.id}>
          {authError?.message}
        </Typography>
      )}
    </Box>
  );
};

const ResetPasswordForm = ({ onLogin }) => {

  const methods = useForm<FormValues>({
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <ResetPasswordPage onLogin={onLogin} />
    </FormProvider>
  );
};

export default ResetPasswordForm;
