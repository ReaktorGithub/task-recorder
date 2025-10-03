/** @format */

import {InputsBox, Block, DividerText, FormRow, Root, CancelRecordButton} from './styles.ts';
import {Typography} from '@mui/material';
import {CustomNumberField} from '../CustomNumberField';
import {AddRecordButton} from './styles.ts';
import {useState} from 'react';
import {getCurrentTime} from '../../helpers/getCurrentTime.ts';
import {CustomTextField} from '../CustomTextField';
import {calcDuration} from '../../helpers/calcDuration.ts';
import {useAppContext} from '../../context/appContext.tsx';

interface Props {
  onCancel: () => void;
}

const AddForm = ({onCancel}: Props) => {
  const defaultTime = getCurrentTime();

  const [hourBegin, setHourBegin] = useState<string>(String(defaultTime.hours));
  const [minuteBegin, setMinuteBegin] = useState<string>(String(defaultTime.minutes));
  const [taskNumber, setTaskNumber] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const {onAddTask} = useAppContext();

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
      taskNumber: `AS-${taskNumber}`,
      timeFrom: {
        hours: hourBeginInt,
        minutes: minuteBeginInt,
      },
      timeTo: currentTime,
      duration: calcDuration({hours: hourBeginInt, minutes: minuteBeginInt}, currentTime),
      collectedOn: new Date(),
    });
  };

  return (
    <Root>
      <FormRow>
        <Block>
          <Typography>Дата начала (h:mm)</Typography>
          <InputsBox>
            <CustomNumberField
              value={hourBegin}
              onChange={handleSetHourBegin}
              min={0}
              max={23}
              width='55px'
            />
            <DividerText>:</DividerText>
            <CustomNumberField
              value={minuteBegin}
              onChange={handleSetMinuteBegin}
              min={0}
              max={59}
              width='55px'
            />
          </InputsBox>
        </Block>

        <Block>
          <Typography>Номер</Typography>
          <InputsBox>
            <Typography>AS-</Typography>
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
