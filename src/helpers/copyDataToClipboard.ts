/** @format */

import type {TaskData} from '../types.ts';
import {getMaybeRoundedDuration} from './getMaybeRoundedDuration.ts';
import {getDurationClock} from './getDurationClock.ts';

const copyDataToClipboard = async (
  tasks: TaskData[],
  storyPoint: number,
  roundDuration: boolean,
) => {
  let text = '';
  tasks.forEach((data, index, arr) => {
    if (data.taskNumber) {
      text += `${data.taskNumber}: `;
    }
    text += `${data.title} `;
    const durationMaybeRounded = getMaybeRoundedDuration(data.duration, storyPoint, roundDuration);
    const duration = getDurationClock(durationMaybeRounded).replace('0h ', '');
    text += duration;
    if (index !== arr.length - 1) {
      text += '\n';
    }
  });
  return navigator.clipboard.writeText(text);
};

export {copyDataToClipboard};
