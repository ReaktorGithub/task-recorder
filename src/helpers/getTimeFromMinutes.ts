/** @format */

import type {Time} from '../types.ts';

const getTimeFromMinutes = (minutes: number): Time => {
  const hours = Math.floor((minutes / 60) % 60);
  const minutesInHours = hours * 60;
  const rest = minutes - minutesInHours;
  return {
    hours,
    minutes: rest,
  };
};

export {getTimeFromMinutes};
