/** @format */

import type {AppData, Settings, TaskData} from '../types.ts';
import {STORAGE_KEY} from '../constants.ts';

const saveAppDataToStorage = (savedTasks: TaskData[], settings: Settings) => {
  const dataToSave: AppData = {
    data: savedTasks,
    settings,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
};

export {saveAppDataToStorage};
