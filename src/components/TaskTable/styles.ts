/** @format */

import {Box, Button, styled} from '@mui/material';

export const ResetButton = styled(Button)(() => ({
  height: '32px',
  minWidth: '32px',
  width: '32px',
  borderRadius: '8px',
  background: '#ffffff',
  flexShrink: 0,

  '.MuiSvgIcon-root': {
    path: {
      fill: '#ff0000',
    },
  },
}));

export const EditButton = styled(Button)(() => ({
  height: '32px',
  minWidth: '32px',
  width: '32px',
  borderRadius: '8px',
  flexShrink: 0,

  '.MuiSvgIcon-root': {
    path: {
      fill: '#ffffff',
    },
  },
}));

export const CancelEditButton = styled(Button)(() => ({
  height: '32px',
  minWidth: '32px',
  width: '32px',
  flexShrink: 0,

  '.MuiSvgIcon-root': {
    path: {
      fill: '#ff0000',
    },
  },
}));

export const ConfirmEditButton = styled(Button)(() => ({
  height: '32px',
  minWidth: '32px',
  width: '32px',
  flexShrink: 0,

  '.MuiSvgIcon-root': {
    path: {
      fill: '#56ff00',
    },
  },
}));

export const EditTitleBox = styled(Box)(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: theme.spacing(2),
}));

export const AddButton = styled(Button)(() => ({
  borderRadius: '14px',
  width: '40px',
  height: '30px',
  background: '#cb5900',
  minWidth: 'unset',

  '.MuiSvgIcon-root': {
    path: {
      fill: '#fff',
    },
  },

  '&:hover': {
    background: '#ff7700',
  },
}));
