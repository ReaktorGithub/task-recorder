/** @format */

import {roundMinutesToStoryPoint} from './roundMinutesToStoryPoint.ts';

const getMaybeRoundedDuration = (raw: number, storyPoint: number, isRound: boolean) => {
  if (!isRound) {
    return raw;
  }
  return roundMinutesToStoryPoint(raw, storyPoint);
};

export {getMaybeRoundedDuration};
