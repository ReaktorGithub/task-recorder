/** @format */

import {type ReactNode, useCallback, useMemo, useState} from 'react';
import type {NewTaskData, TaskData} from '../types.ts';
import {AppContext} from './appContext.tsx';
import {getDurationClock} from '../helpers/getDurationClock.ts';
import {STORAGE_KEY} from '../constants.ts';

interface Props {
  children: ReactNode;
}

const AppProvider = ({children}: Props) => {
  const [savedTasks, setSavedTasks] = useState<TaskData[]>([]);

  const onSetSavedTasks = useCallback((value: TaskData[]) => {
    setSavedTasks(value);
  }, []);

  const onClearTasks = useCallback(() => {
    setSavedTasks([]);
  }, []);

  const onAddTask = useCallback((newTask: NewTaskData) => {
    const id = String(new Date().getTime());
    const newTaskWithId: TaskData = {
      id,
      ...newTask,
    };
    setSavedTasks(prev => [...prev, newTaskWithId]);
  }, []);

  const onRemoveTask = useCallback((id: string) => {
    setSavedTasks(prev => prev.filter(data => data.id !== id));
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTasks));
  }, [savedTasks]);

  const value = useMemo(
    () => ({
      savedTasks,
      onSetSavedTasks,
      onClearTasks,
      onAddTask,
      onRemoveTask,
      onUpdateTask,
      onReport,
      onSave,
    }),
    [
      onAddTask,
      onClearTasks,
      onRemoveTask,
      onSetSavedTasks,
      onUpdateTask,
      savedTasks,
      onReport,
      onSave,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export {AppProvider};
