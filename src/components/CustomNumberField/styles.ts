/** @format */

import {styled, TextField} from '@mui/material';

export const Root = styled(TextField)(({theme}) => ({
  background: '#fff',
  height: '40px',
  borderRadius: '8px',

  '.MuiInputBase-input': {
    height: '40px',
    padding: theme.spacing(0, 2),
    fontSize: '18px',
  },

  '& input[type="number"]::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },

  '& input[type="number"]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },

  '& input[type="number"]': {
    MozAppearance: 'textfield',
    appearance: 'textfield',
  },
}));
