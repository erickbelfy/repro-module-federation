import React from 'react';
import { OssUiFormField } from './FormField,styled';

const FormField = ({ errorMessage, helperMessage = '', label, children, ...props }) => {
  return (
    <OssUiFormField id={label} fullWidth {...props}>
      {children}
    </OssUiFormField>
  );
};

export default FormField;
