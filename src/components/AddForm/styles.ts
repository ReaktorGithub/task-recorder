/** @format */

import {Box, Button, styled} from '@mui/material';

export const Root = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FormRow = styled(Box)(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: '170px 150px 1fr 105px',
  gridTemplateRows: '1fr',
  gap: theme.spacing(2),
  borderBottom: '1px solid #444',
  borderTop: '1px solid #444',
  padding: theme.spacing(2, 0),
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
  background: '#606060',
  color: '#dfdfdf',

  '&:hover': {
    background: '#787878',
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
