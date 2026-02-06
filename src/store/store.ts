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

export const setCanSave = createEvent<boolean>();
export const setReports = createEvent<DayReport[]>();
export const setSavedTasks = createEvent<TaskData[]>();
export const setSettings = createEvent<Settings>();
export const setAddingForm = createEvent<AddingFormData | null>();
export const setIsAdding = createEvent<boolean>();

$canSave.on(setCanSave, (_, v) => v);
$reports.on(setReports, (_, v) => v);
$savedTasks.on(setSavedTasks, (_, v) => v);
$settings.on(setSettings, (_, v) => v);
$addingFormData.on(setAddingForm, (_, v) => v);
$isAdding.on(setIsAdding, (_, v) => v);

// Обновление addingFormData + autosave

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

// Сохранение

export const saveState = createEvent();

sample({
  clock: saveState,
  source: {
    data: $savedTasks,
    settings: $settings,
    addingFormData: $addingFormData,
    reports: $reports,
  },
  fn: ({data, settings, addingFormData, reports}) => ({
    data,
    settings,
    addingFormData,
    reports,
  }),
  target: saveToStorageFx,
});

// Обновление настроек (аналог onUpdateSettings)

export const updateSettings = createEvent<{field: keyof Settings; value: unknown}>();

$settings.on(updateSettings, (settings, {field, value}) => {
  const newSettings: Settings = {
    ...settings,
    [field]: value,
  };
  return newSettings;
});

sample({
  clock: updateSettings,
  source: {
    data: $savedTasks,
    settings: $settings,
    addingFormData: $addingFormData,
    reports: $reports,
  },
  fn: ({data, settings, addingFormData, reports}, {field, value}) => {
    const newSettings: Settings = {
      ...settings,
      [field]: value,
    };

    return {
      data,
      settings: newSettings,
      addingFormData,
      reports,
    };
  },
  target: saveToStorageFx,
});

// Копирование отчёта (аналог onReport)

type ReportPayload = {
  data: TaskData[];
  settings: Settings;
};

export const report = createEvent();

const copyReportFx = createEffect<ReportPayload, void>(({data, settings}) => {
  const reportText = getDayReport(data, settings.storyPoint, settings.roundDuration);
  return copyDataToClipboard(reportText);
});

sample({
  clock: report,
  source: {
    data: $savedTasks,
    settings: $settings,
  },
  fn: ({data, settings}) => ({
    data,
    settings,
  }),
  target: copyReportFx,
});

// Работа с дневными отчётами (аналог onAddReport / onRemoveReport)

export const addReport = createEvent();
export const removeReport = createEvent<string>();

// Внутреннее событие изменения списка отчётов

const reportsChanged = createEvent<DayReport[]>();

$reports.on(reportsChanged, (_, next) => next);

// Добавление отчёта дня + очистка задач и формы

const clearAddingForm = updateAddingForm.prepend(() => null);

sample({
  clock: addReport,
  source: {
    data: $savedTasks,
    settings: $settings,
    reports: $reports,
  },
  fn: ({data, settings, reports}) => {
    const {storyPoint, roundDuration} = settings;
    const reportText = getDayReport(data, storyPoint, roundDuration);
    const id = String(new Date().getTime());
    const newReport: DayReport = {
      id,
      report: reportText,
      collectedOn: new Date(),
    };

    return [...reports, newReport];
  },
  target: [reportsChanged, clearTasks, clearAddingForm],
});

// Удаление отчёта

sample({
  clock: removeReport,
  source: $reports,
  fn: (reports, id) => reports.filter(report => report.id !== id),
  target: reportsChanged,
});

// Автосохранение при изменении отчётов (как в onAddReport/onRemoveReport)

sample({
  clock: reportsChanged,
  source: {
    settings: $settings,
  },
  filter: ({settings}) => settings.autosave,
  fn: ({settings}, reports) => ({
    data: [],
    settings,
    addingFormData: null,
    reports,
  }),
  target: saveToStorageFx,
});
