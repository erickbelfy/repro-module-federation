import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { defaultTheme as RADefaultTheme } from 'react-admin';
import { merge } from 'lodash';

const mergedTheme = merge({}, RADefaultTheme);
export const theme = createTheme({
  ...mergedTheme,
  palette: {
    ...mergedTheme.palette,
    background: {
      default: grey[100],
    },
  },
});
