/** @format */

import type {AppData} from '../types.ts';

const isAppData = (value: unknown): value is AppData => {
  const typed = value as AppData;
  return (
    typed.data !== undefined &&
    typed.settings !== undefined &&
    typed.addingFormData !== undefined &&
    typed.reports !== undefined
  );
};

export {isAppData};
