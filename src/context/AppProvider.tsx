/** @format */

import {type ReactNode, useCallback, useMemo, useState} from 'react';
import type {NewTaskData, Settings, TaskData} from '../types.ts';
import {AppContext} from './appContext.tsx';
import {DEFAULT_SETTINGS} from '../constants.ts';
import {saveAppDataToStorage} from '../helpers/saveAppDataToStorage.ts';
import {copyDataToClipboard} from '../helpers/copyDataToClipboard.ts';

interface Props {
  children: ReactNode;
}

const AppProvider = ({children}: Props) => {
  const [canSave, setCanSave] = useState<boolean>(false);
  const [savedTasks, setSavedTasks] = useState<TaskData[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const onSetSavedTasks = useCallback((value: TaskData[]) => {
    setSavedTasks(value);
  }, []);

  const onSetSettings = useCallback((value: Settings) => {
    setSettings(value);
  }, []);

  const onClearTasks = useCallback(() => {
    setSavedTasks([]);
    if (settings.autosave) {
      saveAppDataToStorage([], settings);
    }
    setCanSave(true);
  }, [settings]);

  const onAddTask = useCallback(
    (newTask: NewTaskData) => {
      const id = String(new Date().getTime());
      const newTaskWithId: TaskData = {
        id,
        ...newTask,
      };
      setSavedTasks(prev => {
        const saved = [...prev, newTaskWithId];
        if (settings.autosave) {
          saveAppDataToStorage(saved, settings);
        }
        return saved;
      });
      setCanSave(true);
    },
    [settings],
  );

  const onRemoveTask = useCallback(
    (id: string) => {
      setSavedTasks(prev => {
        const saved = prev.filter(data => data.id !== id);
        if (settings.autosave) {
          saveAppDataToStorage(saved, settings);
        }
        return saved;
      });
      setCanSave(true);
    },
    [settings],
  );

  const onUpdateTask = useCallback(
    (updatedTask: TaskData) => {
      setSavedTasks(prev => {
        const saved = prev.map(data => {
          if (data.id === updatedTask.id) {
            return updatedTask;
          }
          return data;
        });
        if (settings.autosave) {
          saveAppDataToStorage(saved, settings);
        }
        return saved;
      });
      setCanSave(true);
    },
    [settings],
  );

  const onReport = useCallback(async () => {
    return copyDataToClipboard(savedTasks, settings.storyPoint, settings.roundDuration);
  }, [savedTasks, settings.roundDuration, settings.storyPoint]);

  const onSave = useCallback(() => {
    saveAppDataToStorage(savedTasks, settings);
    setCanSave(false);
  }, [savedTasks, settings]);

  const onUpdateSettings = useCallback(
    (field: keyof Settings, value: unknown) => {
      const newSettings: Settings = {
        ...settings,
        [field]: value,
      };
      setSettings(newSettings);
      saveAppDataToStorage(savedTasks, newSettings);
    },
    [savedTasks, settings],
  );

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
      onUpdateSettings,
      onSetSettings,
      onSave,
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
      onUpdateSettings,
      onSetSettings,
      onSave,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export {AppProvider};
