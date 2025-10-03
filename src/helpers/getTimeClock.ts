/** @format */
import type {Time} from '../types.ts';

const getTimeClock = (time: Time): string => {
  const hours = String(time.hours).length < 2 ? '0' + time.hours : time.hours;
  const minutes = String(time.minutes).length < 2 ? '0' + time.minutes : time.minutes;
  return `${hours}:${minutes}`;
};

export {getTimeClock};
