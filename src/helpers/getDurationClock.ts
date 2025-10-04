/** @format */
import {getTimeFromMinutes} from './getTimeFromMinutes.ts';

const getDurationClock = (minutes: number): string => {
  const {hours, minutes: rest} = getTimeFromMinutes(minutes);
  return `${hours}h ${rest}m`;
};

export {getDurationClock};
