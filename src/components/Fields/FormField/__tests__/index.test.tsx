import { render } from '@testing-library/react';
import React from 'react';
import { FormField } from '..';
import { TestWrapper } from '../../../../shared/testing/TestWrapper';

const getComponent = (props) => {
  return (
    <TestWrapper providers={['Intl', 'Theme']}>
      <FormField {...props} />
    </TestWrapper>
  );
};
const getWrapper = (props) => render(getComponent(props));

const mock = {
  errorMessage: 'Test Error Message',
  helperMessage: 'Test Helper Message',
  label: 'Test Label',
};

describe('<FormField /> Component', () => {
  it('Should show Error message', () => {
    const wrapper = getWrapper(mock);
    const { getByText } = wrapper;
    expect(getByText('Test Error Message')).toBeDefined();
  });
});
