// remove this when hookform/resolvers bumps to latest
// follow this thread https://github.com/react-hook-form/resolvers/issues/396
// eslint-disable-next-line import/extensions
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { render } from '@testing-library/react';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { ControlledInputField } from '..';
import { TestWrapper } from '../../../../shared/testing/TestWrapper';

type FormValues = {
  emailAddress: string;
  password: string;
};

const mockSchema = yup
  .object({
    emailAddress: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

const mockProps = {
  errorMessage: 'Test Error Message',
  label: 'Test Label',
  name: 'Test name',
};

describe('<SelectField /> Component', () => {
  it('Should have the errormessage shown when errormessage is passed as a prop', () => {
    const Component = () => {
      const methods = useForm<FormValues>({
        resolver: yupResolver(mockSchema),
        mode: 'onBlur',
      });
      const props = {
        ...mockProps,
      };
      return (
        <TestWrapper providers={['Intl', 'Theme']}>
          <FormProvider {...methods}>
            <ControlledInputField {...props} />
          </FormProvider>
        </TestWrapper>
      );
    };
    const { getByText } = render(<Component />);
    const errormessage = getByText(mockProps.errorMessage);
    expect(errormessage.innerHTML).toBe(mockProps.errorMessage);
  });
});
