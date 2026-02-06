/** @format */

import {Box, Button, styled, Typography} from '@mui/material';

export const Root = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const StatsBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const AddButtonBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

export const AddButton = styled(Button)(() => ({
  borderRadius: '20px',
  width: '60px',
  height: '38px',
  background: '#755844',
  minWidth: 'unset',

  '.MuiSvgIcon-root': {
    path: {
      fill: '#fff',
    },
  },

  '&:hover': {
    background: '#8a6851',
  },
}));

interface WorkTimeTextProps {
  isOverwork?: boolean;
}

export const WorkTimeText = styled(Typography, {
  shouldForwardProp: prop => prop !== 'isOverwork',
})<WorkTimeTextProps>(({isOverwork}) => ({
  fontSize: '18px',
  fontWeight: 'bold',
  color: isOverwork ? '#ff3c3c' : '#dfdfdf',

  span: {
    fontWeight: 400,
    color: '#dfdfdf',
  },
}));

export const EmptyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));
