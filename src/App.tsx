/** @format */

import {Header} from './components/Header';
import {RootLayout} from './layouts/RootLayout';
import {ContentLayout} from './layouts/ContentLayout';
import {MainComponent} from './components/MainComponent';
import {useLayoutEffect} from 'react';
import {STORAGE_KEY} from './constants.ts';
import {isAppData} from './helpers/isAppData.ts';
import {useAppContext} from './context/appContext.tsx';
import {ControlPanel} from './components/ControlPanel';
import {Box} from '@mui/material';
import {Report} from './components/Report';

const App = () => {
  const {onSetSavedTasks, onSetSettings, onSetAddingForm, onSetReports} = useAppContext();

  useLayoutEffect(() => {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return;
    try {
      const saved = JSON.parse(item);
      if (isAppData(saved)) {
        onSetSavedTasks(saved.data);
        onSetSettings(saved.settings);
        onSetAddingForm(saved.addingFormData);
        onSetReports(saved.reports);
      }
    } catch (error) {
      console.log('Ошибка парсинга json');
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, [onSetSavedTasks, onSetSettings, onSetAddingForm, onSetReports]);

  return (
    <RootLayout>
      <Header />
      <ContentLayout>
        <Box>
          <ControlPanel />
          <MainComponent />
        </Box>
        <Report />
      </ContentLayout>
    </RootLayout>
  );
};

export {App};
