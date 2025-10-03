/** @format */

import {createContext, useContext} from 'react';
import type {NewTaskData, TaskData} from '../types.ts';

export interface AppContextState {
  savedTasks: TaskData[];
  onSetSavedTasks: (value: TaskData[]) => void;
  onClearTasks: () => void;
  onAddTask: (newTask: NewTaskData) => void;
  onRemoveTask: (id: string) => void;
  onUpdateTask: (id: string, data: NewTaskData) => void;
  onReport: () => void;
  onSave: () => void;
}

export const appContextInitial: AppContextState = {
  savedTasks: [],
  onSetSavedTasks: () => undefined,
  onClearTasks: () => undefined,
  onAddTask: () => undefined,
  onRemoveTask: () => undefined,
  onUpdateTask: () => undefined,
  onReport: () => undefined,
  onSave: () => undefined,
};

export const AppContext = createContext<AppContextState>(appContextInitial);

export const useAppContext = () => useContext(AppContext);
