/** @format */

import {Box, IconButton, styled} from '@mui/material';

export const Root = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

export const EditButton = styled(IconButton)(({theme}) => ({
  padding: theme.spacing(0, 1),

  '.MuiSvgIcon-root': {
    path: {
      fill: '#fff',
    },
  },
}));
