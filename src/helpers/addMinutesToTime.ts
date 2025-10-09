/** @format */

import type {Time} from '../types.ts';
import {MINUTES_IN_DAY} from '../constants.ts';

const addMinutesToTime = (time: Time, minutesToAdd: number): Time => {
  // 1. Переводим исходное время в минуты от начала суток
  const initialTotalMinutes = time.hours * 60 + time.minutes;

  // 2. Добавляем нужное количество минут
  const newTotalMinutes = initialTotalMinutes + minutesToAdd;

  // 3. С помощью оператора остатка (%) находим итоговое количество минут в рамках одних суток.
  // Двойной оператор (%) используется для корректной обработки отрицательных newTotalMinutes.
  const finalTotalMinutes = ((newTotalMinutes % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY;

  // 4. Обратно вычисляем часы и минуты
  const finalHours = Math.floor(finalTotalMinutes / 60);
  const finalMinutes = finalTotalMinutes % 60;

  return {
    hours: finalHours,
    minutes: finalMinutes,
  };
};

export {addMinutesToTime};
