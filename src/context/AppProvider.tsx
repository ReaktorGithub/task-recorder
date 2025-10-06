/** @format */

import {type ReactNode, useCallback, useMemo, useState} from 'react';
import type {AddingFormData, NewTaskData, Settings, TaskData} from '../types.ts';
import {AppContext} from './appContext.tsx';
import {DEFAULT_SETTINGS} from '../constants.ts';
import {saveAppDataToStorage} from '../helpers/saveAppDataToStorage.ts';
import {copyDataToClipboard} from '../helpers/copyDataToClipboard.ts';
import {useDebounce} from '../helpers/useDebounce.ts';

interface Props {
  children: ReactNode;
}

const AppProvider = ({children}: Props) => {
  const [canSave, setCanSave] = useState<boolean>(false);
  const [savedTasks, setSavedTasks] = useState<TaskData[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [addingFormData, setAddingFormData] = useState<AddingFormData | null>(null);

  const debounceSaveAddingToStorage = useCallback(
    (updated: AddingFormData | null) => {
      if (settings.autosave) {
        saveAppDataToStorage({data: savedTasks, settings, addingFormData: updated});
      }
    },
    [savedTasks, settings],
  );

  const {onChange: onSaveAdding} = useDebounce(debounceSaveAddingToStorage, 600);

  const onSetSavedTasks = useCallback((value: TaskData[]) => {
    setSavedTasks(value);
  }, []);

  const onSetSettings = useCallback((value: Settings) => {
    setSettings(value);
  }, []);

  const onSetAddingForm = useCallback((value: AddingFormData | null) => {
    setAddingFormData(value);
  }, []);

  const onClearTasks = useCallback(() => {
    setSavedTasks([]);
    if (settings.autosave) {
      saveAppDataToStorage({data: [], settings, addingFormData});
    }
    setCanSave(true);
  }, [addingFormData, settings]);

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
          saveAppDataToStorage({data: saved, settings, addingFormData});
        }
        return saved;
      });
      setCanSave(true);
    },
    [addingFormData, settings],
  );

  const onRemoveTask = useCallback(
    (id: string) => {
      setSavedTasks(prev => {
        const saved = prev.filter(data => data.id !== id);
        if (settings.autosave) {
          saveAppDataToStorage({data: saved, settings, addingFormData});
        }
        return saved;
      });
      setCanSave(true);
    },
    [addingFormData, settings],
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
          saveAppDataToStorage({data: saved, settings, addingFormData});
        }
        return saved;
      });
      setCanSave(true);
    },
    [addingFormData, settings],
  );

  const onReport = useCallback(async () => {
    return copyDataToClipboard(savedTasks, settings.storyPoint, settings.roundDuration);
  }, [savedTasks, settings.roundDuration, settings.storyPoint]);

  const onSave = useCallback(() => {
    saveAppDataToStorage({data: savedTasks, settings, addingFormData});
    setCanSave(false);
  }, [addingFormData, savedTasks, settings]);

  const onUpdateSettings = useCallback(
    (field: keyof Settings, value: unknown) => {
      const newSettings: Settings = {
        ...settings,
        [field]: value,
      };
      setSettings(newSettings);
      saveAppDataToStorage({data: savedTasks, settings: newSettings, addingFormData});
    },
    [addingFormData, savedTasks, settings],
  );

  const onUpdateAddingForm = useCallback(
    (updated: AddingFormData | null) => {
      setAddingFormData(updated);
      setCanSave(true);
      onSaveAdding(updated);
    },
    [onSaveAdding],
  );

  const value = useMemo(
    () => ({
      savedTasks,
      canSave,
      settings,
      addingFormData,
      onSetSavedTasks,
      onClearTasks,
      onAddTask,
      onRemoveTask,
      onUpdateTask,
      onReport,
      onUpdateSettings,
      onSetSettings,
      onSave,
      onUpdateAddingForm,
      onSetAddingForm,
    }),
    [
      savedTasks,
      canSave,
      settings,
      addingFormData,
      onSetSavedTasks,
      onClearTasks,
      onAddTask,
      onRemoveTask,
      onUpdateTask,
      onReport,
      onUpdateSettings,
      onSetSettings,
      onSave,
      onUpdateAddingForm,
      onSetAddingForm,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export {AppProvider};
