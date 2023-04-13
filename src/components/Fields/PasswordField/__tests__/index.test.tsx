import { yupResolver } from '@hookform/resolvers/yup';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { PasswordField } from '..';
import { TestWrapper } from '../../../../shared/testing/TestWrapper';
import dataIds from '../dataIds';

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

describe('<PasswordField /> Component', () => {
  it('Clicking on Visibility Icon should make it have opacity: 1', async () => {
    const Component = () => {
      const methods = useForm<FormValues>({
        resolver: yupResolver(mockSchema),
        mode: 'onChange',
      });
      const { control } = methods;
      const props = {
        ...mockProps,
        control,
      };
      return (
        <TestWrapper providers={['Intl', 'Theme']}>
          <FormProvider {...methods}>
            <PasswordField {...props} />
          </FormProvider>
        </TestWrapper>
      );
    };
    const { getByTestId } = render(<Component />);
    const iconButton = getByTestId(dataIds.PasswordField.FieldIconButton.id);
    const visibilityOn = getByTestId(`${dataIds.PasswordField.id}-show`);
    expect(visibilityOn).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await userEvent.click(iconButton);
    const visibilityOff = getByTestId(`${dataIds.PasswordField.id}-hide`);
    expect(visibilityOff).toBeDefined();
  });
});
