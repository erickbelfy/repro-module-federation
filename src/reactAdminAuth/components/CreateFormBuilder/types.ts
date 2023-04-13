import type { RaRecord, FormProps, CreateControllerProps } from 'react-admin';

export type CreateFormBuilderType = {
  createBaseProps?: Omit<CreateControllerProps<RaRecord>, 'children'>;
  formProps?: Omit<FormProps, 'children'>;
};
