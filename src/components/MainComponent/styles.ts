/** @format */

import {Box, Button, styled, Typography} from '@mui/material';

export const Root = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const StatsBox = styled(Box)(() => ({
  width: '100%',
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
