/** @format */

import type {TaskData} from '../types.ts';
import {getDayReport} from './getDayReport.ts';

const copyDataToClipboard = async (tasks: TaskData[], storyPoint: number, isRound: boolean) => {
  const report = getDayReport(tasks, storyPoint, isRound);
  return navigator.clipboard.writeText(report);
};

export {copyDataToClipboard};
