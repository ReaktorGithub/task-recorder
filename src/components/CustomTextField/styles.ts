/** @format */

import {styled, TextField} from '@mui/material';

export const Root = styled(TextField)(({theme}) => ({
  background: '#fff',
  height: '40px',
  width: '100%',

  '.MuiInputBase-input': {
    height: '40px',
    padding: theme.spacing(0, 2),
  },
}));
