import { styled, Paper, Typography, Box, Button as ButtonProgress } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(5),
  [theme.breakpoints.up('sm')]: {
    width: 512,
  },
}));

export const FormContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  textTransform: 'none',
}));

export const StyledButtonProgress = styled(ButtonProgress)(({ theme }) => ({
  margin: theme.spacing(0.3),
}));
