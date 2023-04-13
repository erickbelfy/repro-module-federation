import React from 'react';
import { act, screen } from '@testing-library/react';
import { AbcSharp } from '@mui/icons-material';
import { ListToolbar } from '../ListToolbar';
import type { ActionContentProps } from '../AppBar';
import { PortalAdminId, renderWithPortalAdminId } from '../../../../test/utils';

const mockOnClick = jest.fn();
const handleRender = (listToolbarProps: ActionContentProps, id?: PortalAdminId) =>
  renderWithPortalAdminId<ActionContentProps>(ListToolbar, listToolbarProps, id);

describe('<ListToolbar /> component', () => {
  it('should render context menu', async () => {
    const { user } = handleRender(
      {
        contextMenu: { options: [{ label: 'menu1', icon: <AbcSharp />, onClick: mockOnClick }] },
      },
      'portal-admin-actions'
    );
    await act(async () => user.click(screen.getByRole('context-menu')));
    expect(screen.getByTestId('AbcSharpIcon')).toBeInTheDocument();
    await act(async () => user.click(screen.getByRole('menuitem')));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
