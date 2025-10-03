/** @format */

import type {Time} from '../types.ts';

const getCurrentTime = (): Time => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return {
    hours,
    minutes,
  };
};

export {getCurrentTime};
