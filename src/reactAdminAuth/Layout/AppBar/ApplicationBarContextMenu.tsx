/* eslint-disable */
import React, { forwardRef, useCallback, useState } from 'react';
import { Menu, ListItemIcon, ListItemText, Button } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import type { ContextMenu } from './types';
import { StyledMenuItem } from './AppBar.styled'

export const ApplicationBarContextMenu = (props: ContextMenu) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Button
        color="primary"
        onClick={handleClick}
        role="context-menu"
        startIcon={<MoreVert />}
        variant="outlined"
      />

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          variant: 'outlined',
          sx: { paddingTop: 1, paddingBottom:1, width: 230 }
        }}

        transformOrigin={{ horizontal: 230, vertical: 'top' }}
      >
          <MenuItems
            options={props.options }
          />
      </Menu>
    </>
  );
};

const MenuItems = forwardRef(
  ({ options }: ContextMenu, _) => {
    return (
      <>
        {options.map(({label, icon, ...menuItemProps}, idx) => (
          <StyledMenuItem
            key={`${label}-${idx}`}
            {...menuItemProps}
          >
            {icon && (<ListItemIcon>{icon}</ListItemIcon>)}
            <ListItemText>{label}</ListItemText>
          </StyledMenuItem>
        ))}
      </>
    );
  }
);
