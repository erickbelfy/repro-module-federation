import { AppBar, MenuItem, styled, Toolbar, Box, TextField as TextInput } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  '&.MuiAppBar-colorPrimary': {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    borderBottom: `solid 1px ${theme.palette.grey.A200}`,
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  '&.MuiBox-root > *': {
    marginLeft: theme.spacing(1),
    height: theme.spacing(5.5),
    boxShadow: 'none',
  },
}));

export const StyledPortalAdminTitle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

export const StyledTextInput = styled(TextInput)(({ theme }) => ({
  '&.MuiInputBase-root': {
    minWidth: 320,
    borderColor: theme.palette.grey[400],
    '&:hover': {
      boxShadow: 'initial',
      '&:not(.Mui-focused)': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    '&.Mui-focused': {
      outline: `1px solid ${theme.palette.primary.main}`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const StyledContentBox = styled(Box)(() => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': { cursor: 'pointer' },
}));

export const StyledLogoAndTitleSection = styled(Box)(() => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  minHeight: theme.spacing(5.5),
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    paddingLeft: 0,
  },
  paddingLeft: 0,
  position: 'inherit',
  justifyContent: 'space-between',
}));
