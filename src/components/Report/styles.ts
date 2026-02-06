/** @format */

import {Box, Button, styled, Typography} from '@mui/material';

interface WidthProps {
  width: number;
}

export const Root = styled(Box, {
  shouldForwardProp: prop => prop !== 'width',
})<WidthProps>(({width}) => ({
  width: `${width}px`,
  transition: '0.2s',
  position: 'relative',
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
  position: 'absolute',
  top: 0,
  left: '8px',

  '.MuiSvgIcon-root': {
    transform: `rotate(${isOpen ? 90 : 0}deg)`,
    transition: '0.4s',

    path: {
      fill: '#d5d5d5',
    },
  },
}));

export const ButtonLabelText = styled(Typography)(() => ({
  position: 'absolute',
  top: '68px',
  left: '12px',
  userSelect: 'none',
}));

export const ReportContainer = styled(Box, {
  shouldForwardProp: prop => prop !== 'width',
})<WidthProps>(({theme, width}) => ({
  width: `${width}px`,
  overflow: 'hidden',
  transition: '0.2s',
  borderLeft: '2px solid #555',
  paddingTop: theme.spacing(6),
}));

export const ReportList = styled(Box)(({theme}) => ({
  width: '350px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  padding: theme.spacing(4, 2),
  background: '#3b444c',
  marginTop: theme.spacing(2),
  borderRadius: '0 8px 8px 0',
  color: '#dfdfdf',
}));

export const DateText = styled(Typography)(() => ({
  fontWeight: 'bold',
}));

export const ReportText = styled(Typography)(() => ({
  whiteSpace: 'pre-line',
}));

export const ReportContentBox = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

export const CopyButton = styled(Button)(() => ({
  width: '32px',
  height: '32px',
  minWidth: 'unset',
  borderRadius: '8px',
  padding: 0,
  background: '#737652',
  flexShrink: 0,

  '&:hover': {
    background: '#979a6f',
  },

  '.MuiSvgIcon-root': {
    path: {
      fill: '#d5d5d5',
    },
  },
}));

export const ReportHeaderBox = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

export const RemoveButton = styled(Button)(() => ({
  width: '32px',
  height: '32px',
  minWidth: 'unset',
  borderRadius: '8px',
  padding: 0,
  flexShrink: 0,

  '.MuiSvgIcon-root': {
    path: {
      fill: '#c65656',
    },
  },
}));
