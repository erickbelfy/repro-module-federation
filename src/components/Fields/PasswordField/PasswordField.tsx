import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';
import dataIds from './dataIds';
import type { InputFieldProps } from '../InputField/types';
import { MAX_LENGTH_PASSWORD } from '../../../shared/constants';
import { InputField } from '../InputField';
import messages from './messages';
import { StyledIconButton } from './PasswordField.styled';

const ControlledPasswordField = ({
  name,
  testId = dataIds.PasswordField.id,
  maxLength = MAX_LENGTH_PASSWORD,
  ...props
}: InputFieldProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { formatMessage } = useIntl();
  const { control } = useFormContext();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onBlur, onChange }, fieldState: { error, isTouched } }) => {
        return (
          <InputField
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            testId={testId}
            maxLength={maxLength}
            autoComplete="password"
            type={isVisible ? 'text' : 'password'}
            errorMessage={isTouched && error?.message ? error.message : ''}
            endAdornment={
              <InputAdornment position="start">
                <StyledIconButton
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  onClick={() => setIsVisible(!isVisible)}
                  data-testid={dataIds.PasswordField.FieldIconButton.id}
                  aria-label={
                    isVisible
                      ? formatMessage(messages.passwordVisibleAriaLabel)
                      : formatMessage(messages.passwordHiddenAriaLabel)
                  }
                >
                  {isVisible ? (
                    <VisibilityOff data-testid={`${testId}-hide`} />
                  ) : (
                    <Visibility data-testid={`${testId}-show`} />
                  )}
                </StyledIconButton>
              </InputAdornment>
            }
            {...props}
          />
        );
      }}
    />
  );
};

export default ControlledPasswordField;
