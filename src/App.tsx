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

const App = () => {
  const {onSetSavedTasks, onSetSettings, onSetAddingForm} = useAppContext();

  useLayoutEffect(() => {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return;
    try {
      const saved = JSON.parse(item);
      if (isAppData(saved)) {
        onSetSavedTasks(saved.data);
        onSetSettings(saved.settings);
        onSetAddingForm(saved.addingFormData);
      }
    } catch (error) {
      console.log('Ошибка парсинга json');
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, [onSetSavedTasks, onSetSettings, onSetAddingForm]);

  return (
    <RootLayout>
      <ContentLayout>
        <Header />
        <ControlPanel />
        <MainComponent />
      </ContentLayout>
    </RootLayout>
  );
};

export {App};
