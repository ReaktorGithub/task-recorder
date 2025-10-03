/** @format */

import {Box, Typography} from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '72px',
      }}
    >
      <Typography component='h1' sx={{fontSize: '24px', fontWeight: 600, color: '#dfdfdf'}}>
        Отчет по задачам
      </Typography>
    </Box>
  );
};

export {Header};
