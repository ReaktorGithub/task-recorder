/** @format */

import {Box} from '@mui/material';
import type {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

const ContentLayout = ({children}: Props) => {
  return (
    <Box
      sx={{
        maxWidth: '800px',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};

export {ContentLayout};
