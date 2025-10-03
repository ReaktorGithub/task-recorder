/** @format */

import {Header} from './components/Header';
import {RootLayout} from './layouts/RootLayout';
import {ContentLayout} from './layouts/ContentLayout';
import {TaskList} from './components/TaskList';
import {useEffect} from 'react';
import {STORAGE_KEY} from './constants.ts';
import {isTaskData} from './helpers/isTaskData.ts';
import {useAppContext} from './context/appContext.tsx';

const App = () => {
  const {onSetSavedTasks} = useAppContext();

  useEffect(() => {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return;
    try {
      const saved = JSON.parse(item);
      if (isTaskData(saved)) {
        onSetSavedTasks(saved);
      }
    } catch (error) {
      console.log('Ошибка парсинга json');
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, [onSetSavedTasks]);

  return (
    <RootLayout>
      <ContentLayout>
        <Header />
        <TaskList />
      </ContentLayout>
    </RootLayout>
  );
};

export {App};
