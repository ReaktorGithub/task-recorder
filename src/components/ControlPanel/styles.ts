/** @format */

import {Box, Button, styled, Typography} from '@mui/material';

export const Root = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(4),
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ControlButtons = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
}));

export const ControlButtonsBlock = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

export const RoundBox = styled(Box)(({theme}) => ({
  background: '#2d3539',
  borderRadius: '8px',
  padding: theme.spacing(1, 2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const MenuButton = styled(Button)(() => ({
  minWidth: '40px',
  width: '40px',
  height: '40px',
  borderRadius: '30%',
  background: 'transparent',
  flexShrink: 0,
  padding: 0,

  '.MuiSvgIcon-root': {
    path: {
      fill: '#fff',
    },
  },
}));

export const ReportButton = styled(Button)(({theme}) => ({
  height: '40px',
  borderRadius: '8px',
  background: '#747753',
  color: '#dfdfdf',
  textTransform: 'none',
  flexShrink: 0,
  gap: theme.spacing(1),

  '&:hover': {
    background: '#979a6f',
  },
}));

export const SaveButton = styled(Button)(({theme}) => ({
  height: '40px',
  borderRadius: '8px',
  background: '#38882b',
  color: '#dfdfdf',
  textTransform: 'none',
  flexShrink: 0,
  gap: theme.spacing(1),

  '&:hover': {
    background: '#51ae42',
  },
}));

export const MenuBox = styled(Box)(({theme}) => ({
  padding: theme.spacing(12, 6, 8, 6),
  width: '500px',
  maxWidth: '50vw',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  boxSizing: 'border-box',
  position: 'relative',

  [`${theme.breakpoints.down('md')}`]: {
    maxWidth: 'unset',
    width: '100vw',
    padding: theme.spacing(10, 4, 6, 4),
  },
}));

export const MenuItem = styled(Box)(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 150px',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

export const ControllerBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

export const MenuText = styled(Typography)(() => ({
  color: '#1e1e1e',
  fontSize: '18px',
}));

export const DescriptionText = styled(Typography)(() => ({
  color: '#1e1e1e',
  fontStyle: 'italic',
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
