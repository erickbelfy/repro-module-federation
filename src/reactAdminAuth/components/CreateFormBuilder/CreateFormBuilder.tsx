import React, { PropsWithChildren } from 'react';
import { CreateBase, Form } from 'react-admin';
import type { CreateFormBuilderType } from './types';

export const CreateFormBuilder: React.FC<PropsWithChildren<CreateFormBuilderType>> = React.memo(
  ({ children, createBaseProps, formProps }) => {
    return (
      <CreateBase {...createBaseProps}>
        <Form {...formProps}>{children}</Form>
      </CreateBase>
    );
  }
);
