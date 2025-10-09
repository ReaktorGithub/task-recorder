/** @format */

import type {TaskData} from '../types.ts';
import {roundMinutesToStoryPoint} from './roundMinutesToStoryPoint.ts';

const calcTotalWorkTimeRounded = (data: TaskData[], storyPoint: number): number => {
  return data.reduce((acc, cur) => {
    return acc + roundMinutesToStoryPoint(cur.duration, storyPoint);
  }, 0);
};

export {calcTotalWorkTimeRounded};
