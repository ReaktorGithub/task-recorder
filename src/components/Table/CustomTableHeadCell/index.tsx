/** @format */

import {TableCell, useTheme} from '@mui/material';
import type {ReactNode} from 'react';

interface Props {
  children?: ReactNode;
  width?: string;
}

const CustomTableHeadCell = ({children, width, ...props}: Props) => {
  const theme = useTheme();

  return (
    <TableCell
      {...props}
      sx={{
        fontSize: '16px',
        color: '#fff',
        fontWeight: 'bold',
        padding: theme.spacing(1, 2),
        width: width || 'auto',
      }}
    >
      {children}
    </TableCell>
  );
};

export {CustomTableHeadCell};
