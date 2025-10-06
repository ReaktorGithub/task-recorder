/** @format */

import {TableCell, useTheme} from '@mui/material';
import type {ReactNode} from 'react';

interface Props {
  children?: ReactNode;
}

const CustomTableCell = ({children, ...props}: Props) => {
  const theme = useTheme();

  return (
    <TableCell
      {...props}
      sx={{
        fontSize: '18px',
        color: '#dfdfdf',
        padding: theme.spacing(1, 2),
      }}
    >
      {children}
    </TableCell>
  );
};

export {CustomTableCell};
