/** @format */

const roundMinutesToStoryPoint = (minutes: number, storyPoint: number): number => {
  if (!Number.isFinite(minutes) || !Number.isFinite(storyPoint)) {
    throw new Error('value and step must be finite numbers');
  }
  if (storyPoint <= 0 || minutes <= 0) {
    return 0;
  }

  // Защита от погрешностей с плавающей точкой:
  const ratio = minutes / storyPoint;
  const roundedRatio = Math.round(ratio);
  const raw = roundedRatio * storyPoint;

  // Избавляемся от очень мелких дробных ошибок (например, 74.9999999998)
  const result = Math.round(raw * 1e12) / 1e12;

  return result < 0 ? 0 : result;
};

export {roundMinutesToStoryPoint};
