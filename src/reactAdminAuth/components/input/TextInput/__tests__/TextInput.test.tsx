import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminContext, maxLength } from 'react-admin';
import userEvent from '@testing-library/user-event';
import { CreateFormBuilder } from '../../../CreateFormBuilder';
import DataIds from '../dataIds';
import { TextInput } from '../TextInput';
import type { TextInputType } from '../types';

const defaultProps: TextInputType = {
  source: 'default-test-source',
};

const handleRender = (textFieldProps?: Partial<TextInputType>) => ({
  user: userEvent.setup(),
  ...render(
    <AdminContext>
      <CreateFormBuilder createBaseProps={{ resource: 'test' }}>
        <TextInput {...defaultProps} {...textFieldProps} />
      </CreateFormBuilder>
    </AdminContext>
  ),
});

describe('<TextField /> component', () => {
  it('should render a <FormFieldLabel /> component', () => {
    handleRender({ label: 'test-label' });
    expect(screen.getByTestId(DataIds.TextInput.FormFieldLabel.id)).toHaveTextContent('test-label');
  });

  it('should render a <TextField /> placeholder', () => {
    handleRender({ placeholder: 'test-placeholder' });
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'test-placeholder');
  });

  it('should render as invalid during validation error', async () => {
    const { user } = handleRender({ validate: [maxLength(3)] });
    const textBox = screen.getByRole('textbox');
    await user.type(textBox, 'AAAAAAAA');
    await user.type(textBox, '{enter}');
    expect(textBox).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render "name" property if provided', () => {
    handleRender({ name: 'test-name' });
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test-name');
  });

  it('should render "source" property as "name" property if source is not provided', () => {
    handleRender({ source: 'test-source' });
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test-source');
  });

  it('should call onChange and onBlur handlers', async () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const { user } = handleRender({ onBlur, onChange });
    const textBox = screen.getByRole('textbox');
    await user.type(textBox, 'AAA');
    await user.tab();
    expect(onChange).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });
});
