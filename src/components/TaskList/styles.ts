/** @format */

import {Box, Button, styled, Typography} from '@mui/material';

export const Root = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const ControlPanelBox = styled(Box)(({theme}) => ({
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

export const StatsBox = styled(Box)(() => ({
  width: '100%',
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

export const ResetButton = styled(Button)(({theme}) => ({
  height: '40px',
  borderRadius: '8px',
  background: '#ae3a3a',
  color: '#1e1e1e',
  flexShrink: 0,
  gap: theme.spacing(1),

  '&:hover': {
    background: '#cf5050',
  },
}));

export const AddButtonBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

export const AddButton = styled(Button)(() => ({
  borderRadius: '20px',
  width: '60px',
  height: '38px',
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

export const WorkTimeText = styled(Typography)(() => ({
  span: {
    fontWeight: 'bold',
  },
}));

export const OverworkText = styled(Typography)(() => ({
  color: '#ff3c3c',
}));

export const EmptyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));
