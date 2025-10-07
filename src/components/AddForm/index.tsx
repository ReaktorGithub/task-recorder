/** @format */

import {Block, FormRow, Root, CancelRecordButton, InputsBox} from './styles.ts';
import {Typography} from '@mui/material';
import {AddRecordButton} from './styles.ts';
import {useEffect, useState} from 'react';
import {getCurrentTime} from '../../helpers/getCurrentTime.ts';
import {CustomTextField} from '../UI/CustomTextField';
import {calcDuration} from '../../helpers/calcDuration.ts';
import {useAppContext} from '../../context/appContext.tsx';
import {CustomNumberField} from '../UI/CustomNumberField';
import {EditTime} from '../EditTime';

interface Props {
  onCancel: () => void;
  onAdded: () => void;
}

const AddForm = ({onCancel, onAdded}: Props) => {
  const {onAddTask, settings, onUpdateAddingForm, addingFormData} = useAppContext();

  let hourDefault = '';
  let minuteDefault = '';
  let taskNumberDefault = '';
  let titleDefault = '';
  if (addingFormData) {
    hourDefault = String(addingFormData.timeFrom.hours);
    minuteDefault = String(addingFormData.timeFrom.minutes);
    taskNumberDefault = addingFormData.taskNumber;
    titleDefault = addingFormData.title;
  } else {
    const {hours, minutes} = getCurrentTime();
    hourDefault = String(hours);
    minuteDefault = String(minutes);
  }

  const [hourBegin, setHourBegin] = useState<string>(hourDefault);
  const [minuteBegin, setMinuteBegin] = useState<string>(minuteDefault);
  const [taskNumber, setTaskNumber] = useState<string>(taskNumberDefault);
  const [title, setTitle] = useState<string>(titleDefault);

  useEffect(() => {
    onUpdateAddingForm({
      title,
      timeFrom: {
        hours: parseInt(hourBegin),
        minutes: parseInt(minuteBegin),
      },
      taskNumber,
    });

    return () => {
      onUpdateAddingForm(null);
    };
  }, [hourBegin, minuteBegin, onUpdateAddingForm, taskNumber, title]);

  const handleSetHourBegin = (value: string) => {
    setHourBegin(value);
  };

  const handleSetMinuteBegin = (value: string) => {
    setMinuteBegin(value);
  };

  const handleSetTaskNumber = (value: string) => {
    setTaskNumber(value);
  };

  const handleSetTitle = (value: string) => {
    setTitle(value);
  };

  const handleAddTask = () => {
    const currentTime = getCurrentTime();
    const hourBeginInt = parseInt(hourBegin);
    const minuteBeginInt = parseInt(minuteBegin);

    onAddTask({
      title,
      taskNumber: taskNumber ? `${settings.prefix}-${taskNumber}` : '',
      duration: calcDuration({hours: hourBeginInt, minutes: minuteBeginInt}, currentTime),
      continuing: null,
      collectedOn: new Date(),
    });

    if (settings.startNewAfterDone) {
      const {hours, minutes} = getCurrentTime();
      setHourBegin(String(hours));
      setMinuteBegin(String(minutes));
      setTitle('');
      setTaskNumber('');
    } else {
      onAdded();
    }
  };

  return (
    <Root>
      <FormRow>
        <Block>
          <Typography>Время начала (h:mm)</Typography>
          <EditTime
            hour={hourBegin}
            minute={minuteBegin}
            onChangeHour={handleSetHourBegin}
            onChangeMinute={handleSetMinuteBegin}
          />
        </Block>

        <Block>
          <Typography>Номер</Typography>
          <InputsBox>
            {settings.prefix ? <Typography>{settings.prefix}-</Typography> : null}
            <CustomNumberField value={taskNumber} onChange={handleSetTaskNumber} maxLength={5} />
          </InputsBox>
        </Block>

        <Block>
          <Typography>Описание</Typography>
          <CustomTextField value={title} onChange={handleSetTitle} />
        </Block>

        <AddRecordButton onClick={handleAddTask}>Записать</AddRecordButton>
      </FormRow>
      <CancelRecordButton onClick={onCancel}>Отмена</CancelRecordButton>
    </Root>
  );
};

export {AddForm};
