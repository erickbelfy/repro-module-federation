import { styled, TextField as TextInput } from '@mui/material';

export const StyledTextInput = styled(TextInput)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(1),
}));
