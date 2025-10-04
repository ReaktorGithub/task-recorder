/** @format */

import {Box, useTheme} from '@mui/material';
import type {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

const ContentLayout = ({children}: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: '900px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
      }}
    >
      {children}
    </Box>
  );
};

export {ContentLayout};
