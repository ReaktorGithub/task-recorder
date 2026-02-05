/** @format */

import {createEffect, createEvent, createStore, sample} from 'effector';
import type {AddingFormData, DayReport, NewTaskData, Settings, TaskData} from '../types.ts';
import {DEFAULT_SETTINGS} from '../constants.ts';
import {saveAppDataToStorage} from '../helpers/saveAppDataToStorage.ts';
import {getDayReport} from '../helpers/getDayReport.ts';
import {copyDataToClipboard} from '../helpers/copyDataToClipboard.ts';

// Store

export const $canSave = createStore<boolean>(false);
export const $isAdding = createStore<boolean>(false);
export const $savedTasks = createStore<TaskData[]>([]);
export const $settings = createStore<Settings>(DEFAULT_SETTINGS);
export const $addingFormData = createStore<AddingFormData | null>(null);
export const $reports = createStore<DayReport[]>([]);

// Универсальный effect сохранения

type SavePayload = {
  data: TaskData[];
  settings: Settings;
  addingFormData: AddingFormData | null;
  reports: DayReport[];
};

export const saveToStorageFx = createEffect<SavePayload, void>(payload =>
  saveAppDataToStorage(payload),
);

// Простые setter-события

export const setReports = createEvent<DayReport[]>();
export const setSavedTasks = createEvent<TaskData[]>();
export const setSettings = createEvent<Settings>();
export const setAddingForm = createEvent<AddingFormData | null>();
export const setIsAdding = createEvent<boolean>();

$reports.on(setReports, (_, v) => v);
$savedTasks.on(setSavedTasks, (_, v) => v);
$settings.on(setSettings, (_, v) => v);
$addingFormData.on(setAddingForm, (_, v) => v);
$isAdding.on(setIsAdding, (_, v) => v);

// Обновление addingFormData + autosave (как debounce в React)

export const updateAddingForm = createEvent<AddingFormData | null>();

$addingFormData.on(updateAddingForm, (_, v) => v);
$canSave.on(updateAddingForm, () => true);

sample({
  clock: updateAddingForm,
  source: {
    data: $savedTasks,
    settings: $settings,
    reports: $reports,
  },
  filter: ({settings}) => settings.autosave,
  fn: ({data, settings, reports}, addingFormData) => ({
    data,
    settings,
    addingFormData,
    reports,
  }),
  target: saveToStorageFx,
});

// Добавление задачи (onAddTask)

export const addTask = createEvent<NewTaskData>();

$savedTasks.on(addTask, (state, task) => [...state, {id: String(Date.now()), ...task}]);

$canSave.on(addTask, () => true);

sample({
  clock: addTask,
  source: {
    data: $savedTasks,
    settings: $settings,
    addingFormData: $addingFormData,
    reports: $reports,
  },
  filter: ({settings}) => settings.autosave,
  fn: ({data, settings, addingFormData, reports}) => ({
    data,
    settings,
    addingFormData,
    reports,
  }),
  target: saveToStorageFx,
});

// Удаление / обновление задачи

export const removeTask = createEvent<string>();
export const updateTask = createEvent<TaskData>();

$savedTasks.on(removeTask, (state, id) => state.filter(t => t.id !== id));

$savedTasks.on(updateTask, (state, updated) => state.map(t => (t.id === updated.id ? updated : t)));

$canSave.on([removeTask, updateTask], () => true);

sample({
  clock: [removeTask, updateTask],
  source: {
    data: $savedTasks,
    settings: $settings,
    addingFormData: $addingFormData,
    reports: $reports,
  },
  filter: ({settings}) => settings.autosave,
  fn: ({data, settings, addingFormData, reports}) => ({
    data,
    settings,
    addingFormData,
    reports,
  }),
  target: saveToStorageFx,
});

// Очистка задач

export const clearTasks = createEvent();

$savedTasks.on(clearTasks, () => []);
$canSave.on(clearTasks, () => true);

sample({
  clock: clearTasks,
  source: {
    settings: $settings,
    reports: $reports,
    addingFormData: $addingFormData,
  },
  filter: ({settings}) => settings.autosave,
  fn: ({settings, reports, addingFormData}) => ({
    data: [],
    settings,
    addingFormData,
    reports,
  }),
  target: saveToStorageFx,
});

// Генерация и копирование отчёта

export const reportFx = createEffect<{tasks: TaskData[]; settings: Settings}, void>(
  ({tasks, settings}) => {
    const report = getDayReport(tasks, settings.storyPoint, settings.roundDuration);
    return copyDataToClipboard(report);
  },
);

export const report = createEvent();

sample({
  clock: report,
  source: {
    tasks: $savedTasks,
    settings: $settings,
  },
  target: reportFx,
});
