import React from 'react';
import { Typography } from '@mui/material';
import { StyledErrorContainer, StyledPaper } from './Error.styled';

export const ErrorFallback = ({ error }) => {
  return (
    <StyledErrorContainer>
      <StyledPaper role="alert">
        <Typography variant="h6" component="h1">
          Something went wrong:
        </Typography>
        <Typography variant="h5">{error.message}</Typography>
      </StyledPaper>
    </StyledErrorContainer>
  );
};
