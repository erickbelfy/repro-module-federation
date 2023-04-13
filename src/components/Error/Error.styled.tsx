import { styled, Paper } from '@mui/material';

export const StyledErrorContainer = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 400,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  height: 'fit-content',
  padding: theme.spacing(3),
}));
