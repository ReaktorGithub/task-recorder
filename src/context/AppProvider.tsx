/** @format */

import {type ReactNode, useCallback, useMemo, useState} from 'react';
import type {AppData, NewTaskData, Settings, TaskData} from '../types.ts';
import {AppContext} from './appContext.tsx';
import {getDurationClock} from '../helpers/getDurationClock.ts';
import {DEFAULT_SETTINGS, STORAGE_KEY} from '../constants.ts';
import {getMaybeRoundedDuration} from '../helpers/getMaybeRoundedDuration.ts';
import {saveAppDataToStorage} from '../helpers/saveAppDataToStorage.ts';

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
    (id: string, updatedTask: NewTaskData) => {
      setSavedTasks(prev => {
        const found = prev.find(data => data.id === id);
        if (!found) {
          return prev;
        }
        const saved = [
          ...prev,
          {
            ...found,
            ...updatedTask,
          },
        ];
        if (settings.autosave) {
          saveAppDataToStorage(saved, settings);
        }
        return saved;
      });
      setCanSave(true);
    },
    [settings],
  );

  const onReport = useCallback(() => {
    let text = '';
    savedTasks.forEach((data, index, arr) => {
      if (data.taskNumber !== undefined) {
        text += `${data.taskNumber}: `;
      }
      text += `${data.title} `;
      const durationMaybeRounded = getMaybeRoundedDuration(
        data.duration,
        settings.storyPoint,
        settings.roundDuration,
      );
      const duration = getDurationClock(durationMaybeRounded).replace('0h ', '');
      text += duration;
      if (index !== arr.length - 1) {
        text += '\n';
      }
    });
    navigator.clipboard.writeText(text);
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
      const dataToSave: AppData = {
        data: savedTasks,
        settings: newSettings,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
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
