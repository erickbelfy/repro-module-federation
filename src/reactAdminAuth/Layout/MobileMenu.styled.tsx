import { styled, IconButton } from '@mui/material';

export const StyledIconButton = styled(IconButton)(({ theme }) => {
  return {
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'transparent',
    },
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});
