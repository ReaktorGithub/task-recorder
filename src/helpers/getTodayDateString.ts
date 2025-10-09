/** @format */

import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

const getTodayDateString = (date = new Date()) => {
  return format(date, 'd MMMM yyyy, iiiiii.', {locale: ru});
};

export {getTodayDateString};
