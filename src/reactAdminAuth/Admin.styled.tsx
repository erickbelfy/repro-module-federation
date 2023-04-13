import React from 'react';
import { styled, GlobalStyles } from '@mui/material';

export const StyledRoot = styled('div')(() => ({
  height: '100%',
}));

export const StyledMain = styled('main')(({ theme }) => {
  return {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    flexDirection: 'column',
  };
});

export const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      'html, body, #root': {
        textSizeAdjust: 'none',
        width: '100%',
        height: '100%',
      },
    }}
  />
);
