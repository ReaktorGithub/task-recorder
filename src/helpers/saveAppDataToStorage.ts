/** @format */

import type {AppData} from '../types.ts';
import {STORAGE_KEY} from '../constants.ts';

const saveAppDataToStorage = (dataToSave: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
};

export {saveAppDataToStorage};
