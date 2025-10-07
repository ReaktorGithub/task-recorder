/** @format */
import type {Settings} from './types.ts';

export const TOTAL_WORK_TIME_MINUTES = 60 * 8;

export const STORAGE_KEY = 'task-records';

export const DEFAULT_SETTINGS: Settings = {
  autosave: true,
  roundDuration: false,
  prefix: 'AS',
  storyPoint: 10,
  startNewAfterDone: false,
};
