import React from 'react';
import { act, screen } from '@testing-library/react';
import { Typography } from '@onespan/components';
import { Title } from '../index';
import type { NavigationContentProps } from '../AppBar';
import { PortalAdminId, renderWithPortalAdminId } from '../../../../test/utils';

const mockTitle = 'hello world';
const mockOnClick = jest.fn();
const portalAdminTitleId: PortalAdminId = 'portal-admin-title';
const handleRender = (titleProps: NavigationContentProps, id?: PortalAdminId) => {
  return renderWithPortalAdminId<NavigationContentProps>(Title, titleProps, id);
};

describe('<Title /> component', () => {
  it('should render null in case the id is not defined', () => {
    const { container } = handleRender({ title: mockTitle });
    expect(container).toBeEmptyDOMElement();
  });

  it('should render given title if Title is withing an AppBar', () => {
    handleRender({ title: mockTitle }, portalAdminTitleId);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('should render navigation bar when mode is defined', async () => {
    const { user } = handleRender(
      {
        title: <Typography>{mockTitle}</Typography>,
        mode: 'Navigation',
        clickIconHandler: mockOnClick,
      },
      portalAdminTitleId
    );
    await act(() => user.click(screen.getByRole('button')));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('should render clear button', async () => {
    const { user } = handleRender(
      {
        title: mockTitle,
        clearButtonProps: { label: 'Clear All', onClick: mockOnClick },
      },
      portalAdminTitleId
    );
    const button = screen.getByRole('button', { name: /clear all/i });
    await act(() => user.click(button));
    expect(button).toBeInTheDocument();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
