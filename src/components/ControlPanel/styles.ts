/** @format */

import {Box, Button, styled, Typography} from '@mui/material';

export const Root = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(4),
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ControlButtonsBox = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(2),
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
  padding: theme.spacing(8, 6),
  width: '400px',
  maxWidth: '50vw',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),

  [`${theme.breakpoints.down('md')}`]: {
    maxWidth: 'unset',
    width: '100vw',
    padding: theme.spacing(6, 4),
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
