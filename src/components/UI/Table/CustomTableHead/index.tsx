/** @format */

import {TableHead} from '@mui/material';
import type {ReactNode} from 'react';

interface Props {
  children?: ReactNode;
}

const CustomTableHead = ({children, ...props}: Props) => {
  return (
    <TableHead
      {...props}
      sx={{
        backgroundColor: '#755844',
      }}
    >
      {children}
    </TableHead>
  );
};

export {CustomTableHead};
