/** @format */

import {type ReactNode, useCallback, useMemo, useState} from 'react';
import type {AppData, NewTaskData, Settings, TaskData} from '../types.ts';
import {AppContext} from './appContext.tsx';
import {getDurationClock} from '../helpers/getDurationClock.ts';
import {DEFAULT_SETTINGS, STORAGE_KEY} from '../constants.ts';

interface Props {
  children: ReactNode;
}

const AppProvider = ({children}: Props) => {
  const [canSave, setCanSave] = useState<boolean>(false);
  const [savedTasks, setSavedTasks] = useState<TaskData[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const onSetSavedTasks = useCallback((value: TaskData[], skipSaveCheck?: boolean) => {
    setSavedTasks(value);
    if (!skipSaveCheck) {
      setCanSave(true);
    }
  }, []);

  const onClearTasks = useCallback(() => {
    setSavedTasks([]);
    setCanSave(true);
  }, []);

  const onAddTask = useCallback((newTask: NewTaskData) => {
    const id = String(new Date().getTime());
    const newTaskWithId: TaskData = {
      id,
      ...newTask,
    };
    setSavedTasks(prev => [...prev, newTaskWithId]);
    setCanSave(true);
  }, []);

  const onRemoveTask = useCallback((id: string) => {
    setSavedTasks(prev => prev.filter(data => data.id !== id));
    setCanSave(true);
  }, []);

  const onUpdateTask = useCallback((id: string, updatedTask: NewTaskData) => {
    setSavedTasks(prev => {
      const found = prev.find(data => data.id === id);
      if (found) {
        return [
          ...prev,
          {
            ...found,
            ...updatedTask,
          },
        ];
      }
      return prev;
    });
    setCanSave(true);
  }, []);

  const onReport = useCallback(() => {
    let text = '';
    savedTasks.forEach((data, index, arr) => {
      if (data.taskNumber !== undefined) {
        text += `${data.taskNumber}: `;
      }
      text += `${data.title} `;
      const duration = getDurationClock(data.duration).replace('0h ', '');
      text += duration;
      if (index !== arr.length - 1) {
        text += '\n';
      }
    });
    navigator.clipboard.writeText(text);
  }, [savedTasks]);

  const onSave = useCallback(() => {
    const dataToSave: AppData = {
      data: savedTasks,
      settings,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    setCanSave(false);
  }, [savedTasks, settings]);

  const onUpdateSettings = useCallback(
    (field: keyof Settings, value: unknown) => {
      const newSettings: Settings = {
        ...settings,
        [field]: value,
      };
      setSettings(newSettings);
      const dataToSave: AppData = {
        data: savedTasks,
        settings: newSettings,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    },
    [savedTasks, settings],
  );

  const onSetSettings = useCallback((value: Settings) => {
    setSettings(value);
  }, []);

  const value = useMemo(
    () => ({
      savedTasks,
      canSave,
      settings,
      onSetSavedTasks,
      onClearTasks,
      onAddTask,
      onRemoveTask,
      onUpdateTask,
      onReport,
      onSave,
      onUpdateSettings,
      onSetSettings,
    }),
    [
      savedTasks,
      canSave,
      settings,
      onSetSavedTasks,
      onClearTasks,
      onAddTask,
      onRemoveTask,
      onUpdateTask,
      onReport,
      onSave,
      onUpdateSettings,
      onSetSettings,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export {AppProvider};
