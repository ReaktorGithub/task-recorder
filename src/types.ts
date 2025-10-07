/** @format */

export type Time = {
  hours: number;
  minutes: number;
};

export type TaskData = {
  id: string;
  taskNumber: string;
  title: string;
  duration: number;
  continuing: Time | null;
  collectedOn: Date;
};

export type NewTaskData = Omit<TaskData, 'id'>;

export type Settings = {
  autosave: boolean;
  roundDuration: boolean;
  prefix: string;
  storyPoint: number;
  startNewAfterDone: boolean;
};

export type AddingFormData = {
  timeFrom: Time;
  taskNumber: string;
  title: string;
};

export type AppData = {
  data: TaskData[];
  settings: Settings;
  addingFormData: AddingFormData | null;
};
