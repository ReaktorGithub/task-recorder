/** @format */

const getTaskDescription = (title: string, taskNumber?: string): string => {
  if (taskNumber) {
    return `${taskNumber}: ${title}`;
  }
  return title;
};

export {getTaskDescription};
