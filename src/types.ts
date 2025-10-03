/** @format */

export type Time = {
  hours: number;
  minutes: number;
};

export type TaskData = {
  id: string;
  taskNumber: string;
  title: string;
  timeFrom: Time;
  timeTo: Time;
  duration: number;
  collectedOn: Date;
};

export type NewTaskData = Omit<TaskData, 'id'>;
