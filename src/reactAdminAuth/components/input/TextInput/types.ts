import type { TextInputProps as ReactAdminTextInputProps } from 'react-admin';
import type { TextInputProps as OneSpanTextInputProps } from '@onespan/components';

export type TextInputType = ReactAdminTextInputProps & OneSpanTextInputProps;
export type TextInputStatusType = OneSpanTextInputProps['status'];
