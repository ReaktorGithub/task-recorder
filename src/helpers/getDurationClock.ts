/** @format */

const getDurationClock = (minutes: number): string => {
  const hours = Math.floor((minutes / 60) % 60);
  const minutesInHours = hours * 60;
  const rest = minutes - minutesInHours;
  return `${hours}h ${rest}m`;
};

export {getDurationClock};
