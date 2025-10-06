/** @format */

import {Box, Button, styled, Typography} from '@mui/material';

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

export const ModalContent = styled(Box)(({theme}) => ({
  position: 'absolute',
  boxSizing: 'border-box',
  top: '50%',
  left: '50%',
  width: '100%',
  maxWidth: '600px',
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(4, 6, 2, 6),
  borderRadius: '16px',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(2),

  [`${theme.breakpoints.down('md')}`]: {
    width: 'calc(100vw - 64px)',
    maxWidth: 'unset',
  },
}));

export const ButtonsBox = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
}));

export const CloseButton = styled(Button)(() => ({
  height: '32px',
  minWidth: '32px',
  width: '32px',
  borderRadius: '50%',
  position: 'absolute',
  top: '16px',
  right: '16px',

  '.MuiSvgIcon-root': {
    path: {
      fill: '#000',
    },
  },
}));

export const ModalText = styled(Typography)(() => ({
  color: '#1e1e1e',
  fontSize: '18px',
  textAlign: 'center',
}));

export const ConfirmButton = styled(Button)(() => ({
  height: '40px',
  width: '120px',
  borderRadius: '8px',
  background: '#ff0000',
  color: '#dfdfdf',
  fontWeight: 'bold',
  fontSize: '18px',

  '&:hover': {
    background: '#ff5454',
  },
}));

export const CancelButton = styled(Button)(() => ({
  height: '40px',
  width: '120px',
  borderRadius: '8px',
  background: '#737373',
  fontSize: '16px',
  color: '#dfdfdf',
  textTransform: 'none',

  '&:hover': {
    background: '#959595',
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
