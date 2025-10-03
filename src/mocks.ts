/** @format */

import type {TaskData} from './types.ts';

export const MOCKED_TABLE_DATA: TaskData[] = [
  {
    id: '1',
    taskNumber: 'AS-1025',
    title: 'Очень хорошая задача',
    timeFrom: {
      hours: 12,
      minutes: 15,
    },
    timeTo: {
      hours: 13,
      minutes: 30,
    },
    duration: 75,
    collectedOn: new Date(2025, 5, 1, 12, 1, 0),
  },
  {
    id: '2',
    taskNumber: '',
    title: 'Дейлик',
    timeFrom: {
      hours: 13,
      minutes: 30,
    },
    timeTo: {
      hours: 14,
      minutes: 0,
    },
    duration: 30,
    collectedOn: new Date(2025, 5, 1, 9, 0, 0),
  },
  {
    id: '3',
    taskNumber: 'AS-2300',
    title: 'Супер задача',
    timeFrom: {
      hours: 14,
      minutes: 0,
    },
    timeTo: {
      hours: 18,
      minutes: 0,
    },
    duration: 240,
    collectedOn: new Date(2025, 5, 1, 12, 0, 0),
  },
];
