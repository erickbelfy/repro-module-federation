// eslint-disable-next-line import/extensions
import { Divider, Box, Button  } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { StatusCodes } from 'http-status-codes';
import { useIntl } from 'react-intl';
import LoginIcon from '@mui/icons-material/Login';
import { useRedirect } from 'react-admin';
import { defaultValues, errorCodes } from '../../shared/constants';
import dataIds from './dataIds';
import messages from './messages';
import type { FormValues } from './types';
import { InputField, PasswordField } from '../../components';

// style components
import {
  StyledPaper,
  FormContainer,
  StyledTypography,
  StyledBox,
  StyledButtonProgress,
} from './LoginPage.styled';

const LoginForm = ({ onLogin }) => {
  const redirect = useRedirect();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { formatMessage } = useIntl();
  const {
    formState: { isValid },
    getValues,
  } = useFormContext<FormValues>();

  const handleClick = (evt) => {
    evt.preventDefault();
    setLoading(true);
    const [emailAddressInput, password] = getValues(['emailAddress', 'password']);
    const emailAddress = emailAddressInput.toLowerCase();
    onLogin({ emailAddress, password })
      .catch((e) => {
        const { errorCode, status } = e;
        if (errorCode === errorCodes.VALIDATION_FAILED_NEW_PASSWORD_MISSING) {
          redirect('/reset-password', null, null, null, {
            emailAddress,
            password,
          });
        } else if (status === StatusCodes.CONFLICT) {
          // TODO user is locked or disabled, redirect / link
          setError(formatMessage(messages.accountLocked));
        } else if (
          status === StatusCodes.UNAUTHORIZED ||
          status === StatusCodes.NOT_FOUND ||
          status === StatusCodes.BAD_REQUEST
        ) {
          setError(formatMessage(messages.invalidLogin));
        } else {
          setError(e.message);
        }
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
      data-testid={dataIds.LoginPage.id}
      component="section"
    >
      <StyledPaper>
        <form>
          <FormContainer>
            <StyledTypography color="textPrimary" component="h1">
              {formatMessage(messages.title)}
            </StyledTypography>
            <InputField
              name="emailAddress"
              label={formatMessage(messages.emailAddress)}
              testId={dataIds.LoginPage.email.id}
              autoComplete="username"
            />
            <PasswordField
              name="password"
              label={formatMessage(messages.password)}
              testId={dataIds.LoginPage.password.id}
            />
          </FormContainer>
          <Divider />
          <StyledBox display="flex" alignItems="center" justifyContent="flex-end">
            <Button
              data-testid={dataIds.LoginPage.submitButton.id}
              type="submit"
              color="primary"
              variant="contained"
              disabled={!isValid || loading}
              {...(!loading && { startIcon: <LoginIcon /> })}
              onClick={handleClick}
            >
              {loading ? <StyledButtonProgress /> : formatMessage(messages.login)}
            </Button>
          </StyledBox>
        </form>
      </StyledPaper>
    </Box>
  );
};

const LoginPage = ({ onLogin }) => {
  const methods = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <LoginForm onLogin={onLogin} />
    </FormProvider>
  );
};

export default LoginPage;
