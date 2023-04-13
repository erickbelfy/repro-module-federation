import { styled, Box, Typography } from '@mui/material';

export const StyledLogoWrapper = styled(Box)(() => ({
  width: 42,
  height: 40,
}));
export const StyledApplicationName = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 800,
}));

export const StyledLogoContainer = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: theme.spacing(2.5),
    paddingLeft: theme.spacing(1.3),
    paddingRight: theme.spacing(2),
    borderRight: `solid 1px ${theme.palette.grey.A200}`,
    zIndex: theme.zIndex.drawer,

    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1.3),
      paddingRight: theme.spacing(1.3),
    },

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  };
});
