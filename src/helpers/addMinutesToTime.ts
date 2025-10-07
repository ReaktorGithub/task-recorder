/** @format */

import type {Time} from '../types.ts';

const addMinutesToTime = (time: Time, minutesToAdd: number): Time => {
  const newMinutes = time.minutes + minutesToAdd;
  const hoursToAdd = Math.floor(newMinutes / 60);
  const minutesRest = newMinutes - hoursToAdd * 60;
  return {
    hours: time.hours + hoursToAdd,
    minutes: minutesRest,
  };
};

export {addMinutesToTime};
