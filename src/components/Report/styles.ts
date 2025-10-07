/** @format */

import {Box, Button, styled, Typography} from '@mui/material';

interface RootProps {
  width: number;
}

export const Root = styled(Box, {
  shouldForwardProp: prop => prop !== 'width',
})<RootProps>(({width}) => ({
  width: `${width}px`,
  transition: '0.2s',
}));

interface OpenButtonProps {
  isOpen: boolean;
}

export const OpenButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'isOpen',
})<OpenButtonProps>(({isOpen}) => ({
  width: '54px',
  height: '54px',
  minWidth: 'unset',
  borderRadius: '50%',
  padding: 0,
  background: '#2d3539',

  '.MuiSvgIcon-root': {
    transform: `rotate(${isOpen ? 90 : 0}deg)`,
    transition: '0.4s',

    path: {
      fill: '#d5d5d5',
    },
  },
}));

export const ButtonLabelText = styled(Typography)(({theme}) => ({
  margin: theme.spacing(1, 0, 0, 0.5),
}));
