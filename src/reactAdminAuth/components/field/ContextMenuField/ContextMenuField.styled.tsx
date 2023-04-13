import { Menu, styled, MenuItem } from '@mui/material';

export const StyledIcon = {
  height: 20,
  resizeMode: 'contain',
};

export const StyledMenu = styled(Menu)(() => ({
  '.MuiMenu-list': {
    padding: 0,
  },
  '.MuiMenu-paper': {
    width: 136,
    padding: 0,
    boxShadow:
      '0px 0px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px -1px rgba(0, 0, 0, 0.15), 0px 3px 15px -1px rgba(0, 0, 0, 0.1)',
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
}));
