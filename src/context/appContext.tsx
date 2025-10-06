/** @format */

import {createContext, useContext} from 'react';
import type {AddingFormData, NewTaskData, Settings, TaskData} from '../types.ts';
import {DEFAULT_SETTINGS} from '../constants.ts';

export interface AppContextState {
  savedTasks: TaskData[];
  canSave: boolean;
  settings: Settings;
  addingFormData: AddingFormData | null;
  onSetSavedTasks: (value: TaskData[]) => void;
  onClearTasks: () => void;
  onAddTask: (newTask: NewTaskData) => void;
  onRemoveTask: (id: string) => void;
  onUpdateTask: (data: TaskData) => void;
  onReport: () => void;
  onSave: () => void;
  onSetSettings: (value: Settings) => void;
  onUpdateSettings: (field: keyof Settings, value: unknown) => void;
  onUpdateAddingForm: (value: AddingFormData | null) => void;
  onSetAddingForm: (value: AddingFormData | null) => void;
}

export const appContextInitial: AppContextState = {
  savedTasks: [],
  canSave: false,
  settings: DEFAULT_SETTINGS,
  addingFormData: null,
  onSetSavedTasks: () => undefined,
  onClearTasks: () => undefined,
  onAddTask: () => undefined,
  onRemoveTask: () => undefined,
  onUpdateTask: () => undefined,
  onReport: () => undefined,
  onSave: () => undefined,
  onUpdateSettings: () => undefined,
  onSetSettings: () => undefined,
  onUpdateAddingForm: () => undefined,
  onSetAddingForm: () => undefined,
};

export const AppContext = createContext<AppContextState>(appContextInitial);

export const useAppContext = () => useContext(AppContext);
