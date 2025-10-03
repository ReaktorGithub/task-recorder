/** @format */

import type {TaskData} from '../types.ts';

const calcTotalWorkTime = (data: TaskData[]): number => {
  return data.reduce((acc, cur) => acc + cur.duration, 0);
};

export {calcTotalWorkTime};
