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
        height: '100%',
        margin: '0 auto',
        maxWidth: '1200px',
        padding: theme.spacing(0, 4),
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '72px 1fr',
      }}
    >
      {children}
    </Box>
  );
};

export {RootLayout};
