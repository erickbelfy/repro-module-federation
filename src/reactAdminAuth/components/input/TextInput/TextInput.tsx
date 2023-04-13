import React, { useMemo } from 'react';
import { useInput } from 'react-admin';
import type { TextInputType } from './types';
import { StyledTextInput } from './TextInput.styled';
import DataIds from './dataIds';

export const TextInput: React.FC<TextInputType> = React.memo((props) => {
  const { fullWidth, id, label, onBlur, onChange, ...rest } = props;
  const {
    field,
    fieldState: { invalid, isDirty, isTouched },
    formState: { isSubmitted },
    isRequired,
  } = useInput({
    // Pass the event handlers to the hook but not the component as the field property already has them.
    // useInput will call the provided onChange and onBlur in addition to the default needed by react-hook-form.
    onBlur,
    onChange,
    ...props,
  });

  const errorStateMatcher = useMemo<boolean>(
    () => invalid && (isDirty || isTouched || isSubmitted),
    [invalid, isDirty, isSubmitted, isTouched]
  );

  return (
    <StyledTextInput
      {...field}
      data-testid={DataIds.TextInput.id}
      error={errorStateMatcher}
      required={isRequired}
      {...rest}
    />
  );
});
