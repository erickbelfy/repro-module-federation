import type { Ref } from 'react';
import type { TextInputProps } from '@onespan/components';

export type InputFieldProps = TextInputProps & {
  label: string;
  errorMessage?: string;
  helperMessage?: string;
  testId?: string;
  name: string;
  maxLength?: number;
  hidden?: boolean;
  ref?: Ref<HTMLInputElement>;
};
