/** @format */

import {Box, Button, styled, Typography} from '@mui/material';

export const Root = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FormRow = styled(Box)(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: '160px 150px 1fr 105px',
  gridTemplateRows: '1fr',
  gap: theme.spacing(2),
}));

export const AddRecordButton = styled(Button)(() => ({
  borderRadius: '8px',
  height: '100%',
  background: '#cb5900',
  color: '#fff',
  fontWeight: 'bold',

  '&:hover': {
    background: '#ff7700',
  },
}));

export const CancelRecordButton = styled(Button)(() => ({
  width: '150px',
  borderRadius: '8px',
  background: '#ae3a3a',
  color: '#1e1e1e',

  '&:hover': {
    background: '#cf5050',
  },
}));

export const Block = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const InputsBox = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const DividerText = styled(Typography)(() => ({
  fontSize: '22px',
  fontWeight: 'bold',
}));
