/** @format */

import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

const getTodayInfo = () => {
  return format(new Date(), 'd MMMM yyyy, iiiiii.', {locale: ru});
};

export {getTodayInfo};
