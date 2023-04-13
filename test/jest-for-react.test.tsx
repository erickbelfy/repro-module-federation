import 'jest-extended';
import React from 'react';
import { render } from '@testing-library/react';

const CustomComponent = () => <div>testing</div>;
describe('test setup for react and .tsx', () => {
  it('is defined correctly', () => {
    render(<CustomComponent />);
    expect(true).toEqual(true);
  });
});
