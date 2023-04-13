import React, { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormField } from '../FormField';
import dataIds from './dataIds';
import type { InputFieldProps } from './types';
import { MAX_LENGTH } from '../../../shared/constants';
import { StyledTextInput } from './InputField.styled';

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { testId, maxLength = MAX_LENGTH, errorMessage, helperMessage, label, inputProps, ...props },
    ref
  ) => {
    return (
      <FormField errorMessage={errorMessage} helperMessage={helperMessage} label={label}>
        <StyledTextInput
          slotProps={undefined}
          slots={undefined}
          inputRef={ref}
          autoComplete="off"
          status={errorMessage ? 'error' : null}
          inputProps={{
            'data-testid': testId || dataIds.InputField.id,
            maxLength,
            ...inputProps,
          }}
          {...props}
        />
      </FormField>
    );
  }
);

export const ControlledInputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ name, errorMessage = '', ...props }, ref) => {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, onChange }, fieldState: { error, isTouched } }) => {
          return (
            <InputField
              onBlur={onBlur}
              onChange={onChange}
              name={name}
              ref={ref}
              errorMessage={(isTouched && error?.message ? error.message : '') || errorMessage}
              {...props}
            />
          );
        }}
      />
    );
  }
);

export default ControlledInputField;
