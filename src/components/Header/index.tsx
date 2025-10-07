/** @format */

import {Box, Typography} from '@mui/material';
import {getTodayInfo} from '../../helpers/getTodayInfo.ts';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      <Typography component='h1' sx={{fontSize: '24px', fontWeight: 600}}>
        Отчет по задачам
      </Typography>
      <Typography sx={{fontSize: '20px', fontWeight: 400}}>({getTodayInfo()})</Typography>
    </Box>
  );
};

export {Header};
