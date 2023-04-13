import { Backdrop, Button, styled } from '@mui/material';

export const DRAWER_WIDTH_COLLAPSED = 64;
export const DRAWER_WIDTH_EXPANDED = 360;

export const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer - 1,
}));

export const StyledMenuContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
  },
}));

export const StyledMenuFooter = styled('div')(() => ({
  margin: 0,
  padding: 0,
}));

export const StyledSidebarSwitcher = styled(Button)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 2.5),
  textDecoration: 'none',
  '& .MuiButton-root.Mui-focusVisible': {
    textDecoration: 'none',
  },
}));
