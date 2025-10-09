/** @format */

import {Box, styled, Typography} from '@mui/material';

export const InputsBox = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const DividerText = styled(Typography)(() => ({
  fontSize: '22px',
  fontWeight: 'bold',
}));
