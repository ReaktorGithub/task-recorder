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
        display: 'grid',
        gridTemplateColumns: 'minmax(600px, 1fr) max-content',
        gridTemplateRows: '1fr',
        gap: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      }}
    >
      {children}
    </Box>
  );
};

export {ContentLayout};
