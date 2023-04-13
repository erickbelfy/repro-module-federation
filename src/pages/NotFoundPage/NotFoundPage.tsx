import React from 'react';
import { Typography } from '@mui/material';
import dataIds from './dataIds';

const NotFoundPage = () => {
  return (
    <Typography data-testid={dataIds.NotFoundPage.id} variant="h1" gutterBottom>
      Not Found
    </Typography>
  );
};

export default NotFoundPage;
