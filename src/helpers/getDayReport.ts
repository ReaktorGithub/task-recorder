/** @format */
import {getMaybeRoundedDuration} from './getMaybeRoundedDuration.ts';
import {getDurationClock} from './getDurationClock.ts';
import type {TaskData} from '../types.ts';

const getDayReport = (tasks: TaskData[], storyPoint: number, isRound: boolean): string => {
  let text = '';

  tasks.forEach((data, index, arr) => {
    if (data.taskNumber) {
      text += `${data.taskNumber}: `;
    }
    text += `${data.title} `;
    const durationMaybeRounded = getMaybeRoundedDuration(data.duration, storyPoint, isRound);
    const duration = getDurationClock(durationMaybeRounded).replace('0h ', '');
    text += duration;
    if (index !== arr.length - 1) {
      text += '\n';
    }
  });

  return text;
};

export {getDayReport};
