/** @format */
import type {Time} from '../types.ts';

const calcMinutesFromTime = (time: Time): number => {
  return time.hours * 60 + time.minutes;
};

export {calcMinutesFromTime};
