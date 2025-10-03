/** @format */

import type {TaskData} from '../types.ts';

const isTaskData = (value: unknown): value is TaskData[] => {
  return Array.isArray(value as TaskData[]);
};

export {isTaskData};
