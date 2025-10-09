/** @format */

import {type ReactNode, useCallback, useMemo, useState} from 'react';
import type {AddingFormData, DayReport, NewTaskData, Settings, TaskData} from '../types.ts';
import {AppContext} from './appContext.tsx';
import {DEFAULT_SETTINGS} from '../constants.ts';
import {saveAppDataToStorage} from '../helpers/saveAppDataToStorage.ts';
import {copyDataToClipboard} from '../helpers/copyDataToClipboard.ts';
import {useDebounce} from '../helpers/useDebounce.ts';
import {getDayReport} from '../helpers/getDayReport.ts';

interface Props {
  children: ReactNode;
}

const AppProvider = ({children}: Props) => {
  const [canSave, setCanSave] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [savedTasks, setSavedTasks] = useState<TaskData[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [addingFormData, setAddingFormData] = useState<AddingFormData | null>(null);
  const [reports, setReports] = useState<DayReport[]>([]);

  const debounceSaveAddingToStorage = useCallback(
    (updated: AddingFormData | null) => {
      if (settings.autosave) {
        saveAppDataToStorage({data: savedTasks, settings, addingFormData: updated, reports});
      }
    },
    [reports, savedTasks, settings],
  );

  const {onChange: onSaveAdding} = useDebounce(debounceSaveAddingToStorage, 600);

  const onSetReports = useCallback((value: DayReport[]) => {
    setReports(value);
  }, []);

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
      saveAppDataToStorage({data: [], settings, addingFormData, reports});
    }
    setCanSave(true);
  }, [addingFormData, reports, settings]);

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
          saveAppDataToStorage({data: saved, settings, addingFormData, reports});
        }
        return saved;
      });
      setCanSave(true);
    },
    [addingFormData, reports, settings],
  );

  const onRemoveTask = useCallback(
    (id: string) => {
      setSavedTasks(prev => {
        const saved = prev.filter(data => data.id !== id);
        if (settings.autosave) {
          saveAppDataToStorage({data: saved, settings, addingFormData, reports});
        }
        return saved;
      });
      setCanSave(true);
    },
    [addingFormData, reports, settings],
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
          saveAppDataToStorage({data: saved, settings, addingFormData, reports});
        }
        return saved;
      });
      setCanSave(true);
    },
    [addingFormData, reports, settings],
  );

  const onReport = useCallback(async () => {
    const report = getDayReport(savedTasks, settings.storyPoint, settings.roundDuration);
    return copyDataToClipboard(report);
  }, [savedTasks, settings.roundDuration, settings.storyPoint]);

  const onSave = useCallback(() => {
    saveAppDataToStorage({data: savedTasks, settings, addingFormData, reports});
    setCanSave(false);
  }, [addingFormData, reports, savedTasks, settings]);

  const onUpdateSettings = useCallback(
    (field: keyof Settings, value: unknown) => {
      const newSettings: Settings = {
        ...settings,
        [field]: value,
      };
      setSettings(newSettings);
      saveAppDataToStorage({data: savedTasks, settings: newSettings, addingFormData, reports});
    },
    [addingFormData, reports, savedTasks, settings],
  );

  const onUpdateAddingForm = useCallback(
    (updated: AddingFormData | null) => {
      setAddingFormData(updated);
      setCanSave(true);
      onSaveAdding(updated);
    },
    [onSaveAdding],
  );

  const onAddReport = useCallback(() => {
    const {storyPoint, roundDuration, autosave} = settings;
    const report = getDayReport(savedTasks, storyPoint, roundDuration);
    const id = String(new Date().getTime());
    const newReport: DayReport = {
      id,
      report,
      collectedOn: new Date(),
    };
    setReports(prev => {
      const newReportsState = [...prev, newReport];
      if (autosave) {
        saveAppDataToStorage({data: [], settings, addingFormData: null, reports: newReportsState});
      }
      return newReportsState;
    });
    setSavedTasks([]);
    setAddingFormData(null);
  }, [savedTasks, settings]);

  const onRemoveReport = useCallback(
    (id: string) => {
      setReports(prev => {
        const newReportsState = prev.filter(report => report.id !== id);
        if (settings.autosave) {
          saveAppDataToStorage({
            data: [],
            settings,
            addingFormData: null,
            reports: newReportsState,
          });
        }
        return newReportsState;
      });
    },
    [settings],
  );

  const onIsAdding = useCallback((value: boolean) => {
    setIsAdding(value);
  }, []);

  const value = useMemo(
    () => ({
      savedTasks,
      canSave,
      settings,
      reports,
      isAdding,
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
      onSetReports,
      onAddReport,
      onRemoveReport,
      onIsAdding,
    }),
    [
      savedTasks,
      canSave,
      settings,
      reports,
      isAdding,
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
      onSetReports,
      onAddReport,
      onRemoveReport,
      onIsAdding,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export {AppProvider};
