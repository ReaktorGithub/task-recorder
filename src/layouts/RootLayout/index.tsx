/** @format */

import {Box, useTheme} from '@mui/material';
import type {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

const RootLayout = ({children}: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(0, 4),
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export {RootLayout};
