/** @format */

import {Box, useTheme} from '@mui/material';
import {type ChangeEvent, useState} from 'react';
import {CustomTextField} from './components/CustomTextField';
import {Header} from './components/Header';
import {RootLayout} from './layouts/RootLayout';
import {ContentLayout} from './layouts/ContentLayout';

const App = () => {
  const [value, setValue] = useState<string>('');

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const theme = useTheme();

  return (
    <RootLayout>
      <ContentLayout>
        <Header />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(1),
          }}
        >
          <CustomTextField value={value} onChange={handleSetValue} />
        </Box>
      </ContentLayout>
    </RootLayout>
  );
};

export {App};
