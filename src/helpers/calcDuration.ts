/** @format */

import type {Time} from '../types.ts';

const calcDuration = (timeFrom: Time, timeTo: Time): number => {
  const validate = (t: Time, name: string) => {
    if (!Number.isInteger(t.hours) || t.hours < 0 || t.hours > 23) {
      throw new RangeError(`${name}.hours must be integer in [0,23]`);
    }
    if (!Number.isInteger(t.minutes) || t.minutes < 0 || t.minutes > 59) {
      throw new RangeError(`${name}.minutes must be integer in [0,59]`);
    }
  };

  validate(timeFrom, 'timeFrom');
  validate(timeTo, 'timeTo');

  const minutesFrom = timeFrom.hours * 60 + timeFrom.minutes;
  const minutesTo = timeTo.hours * 60 + timeTo.minutes;

  if (minutesTo >= minutesFrom) {
    return minutesTo - minutesFrom;
  }

  // timeTo is earlier => next day
  const minutesPerDay = 24 * 60;
  return minutesPerDay - minutesFrom + minutesTo;
};

export {calcDuration};
