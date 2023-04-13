import { styled, Paper ,Typography, Button as ButtonProgress, Box } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  margin: theme.spacing(5),
  [theme.breakpoints.up('sm')]: {
    width: 512,
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

export const StyledButtonProgress = styled(ButtonProgress)(({ theme }) => ({
  margin: theme.spacing(0.3),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  textTransform: 'none',
}));
