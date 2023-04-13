import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { TestWrapper } from '../../../shared/testing/TestWrapper';
import dataIds from '../dataIds';
import { NotFoundPage } from '..';

const getComponent = () => {
  return (
    <TestWrapper providers={['Intl', 'Theme']}>
      <NotFoundPage />
    </TestWrapper>
  );
};
const getWrapper = () => render(getComponent());

describe('<NotFoundPage /> Component', () => {
  it('Should render component', async () => {
    const wrapper = getWrapper();
    const { getByTestId } = wrapper;

    const title = await waitFor(() => getByTestId(dataIds.NotFoundPage.id));
    const innerText = title.innerHTML;
    expect(innerText).toBe('Not Found');
  });
});
