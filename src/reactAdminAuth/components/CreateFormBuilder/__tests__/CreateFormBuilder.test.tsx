import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminContext } from 'react-admin';
import { CreateFormBuilder } from '../CreateFormBuilder';

const handleRender = () =>
  render(
    <AdminContext>
      <CreateFormBuilder createBaseProps={{ resource: 'test' }}>
        <div>test children</div>
      </CreateFormBuilder>
    </AdminContext>
  );

describe('<CreateFormBuilder /> components', () => {
  it('should render by default', () => {
    handleRender();
    expect(screen.getByText(/test children/i)).toBeInTheDocument();
  });
});
