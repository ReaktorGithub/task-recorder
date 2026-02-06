/** @format */

import type {TaskData} from '../../types.ts';
import {TableRow, Typography} from '@mui/material';
import {CustomTableCell} from '../UI/Table/CustomTableCell';
import {CancelEditButton, ConfirmEditButton} from './styles.ts';
import {CheckCircleOutline, Close} from '@mui/icons-material';
import {useEffect} from 'react';
import {getTaskDescription} from '../../helpers/getTaskDescription.ts';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {getMaybeRoundedDuration} from '../../helpers/getMaybeRoundedDuration.ts';
import {calcDuration} from '../../helpers/calcDuration.ts';
import {getCurrentTime} from '../../helpers/getCurrentTime.ts';
import {EditTime} from '../EditTime';
import {useUnit} from 'effector-react';
import {$settings, updateTask} from '../../store/store.ts';

interface Props {
  data: TaskData;
  onCancel: () => void;
  onConfirm: (newData: TaskData) => void;
}

const RowContinuing = ({data, onCancel, onConfirm}: Props) => {
  const [settings, onUpdateTask] = useUnit([$settings, updateTask]);

  useEffect(() => {
    if (!data.continuing) {
      const {hours: currentHour, minutes: currentMinutes} = getCurrentTime();
      onUpdateTask({
        ...data,
        continuing: {
          hours: currentHour,
          minutes: currentMinutes,
        },
      });
    }
  }, [data, onUpdateTask]);

  const {taskNumber, title, duration} = data;

  const handleUpdateHour = (value: string) => {
    const parsed = parseInt(value);
    onUpdateTask({
      ...data,
      continuing: {
        hours: parsed,
        minutes: data.continuing?.minutes ?? 0,
      },
    });
  };

  const handleUpdateMinutes = (value: string) => {
    const parsed = parseInt(value);
    onUpdateTask({
      ...data,
      continuing: {
        minutes: parsed,
        hours: data.continuing?.hours ?? 0,
      },
    });
  };

  const handleConfirm = () => {
    const currentTime = getCurrentTime();
    if (!data.continuing) {
      throw new Error('На момент сохранения объект continuing не должен быть null.');
    }
    const hours = data.continuing.hours;
    const minutes = data.continuing.minutes;
    const durationPlus = calcDuration({hours, minutes}, currentTime);
    const newData: TaskData = {
      ...data,
      duration: data.duration + durationPlus,
      continuing: null,
      isContinuing: false,
    };
    onConfirm(newData);
  };

  const displayHour = String(data.continuing?.hours ?? '');
  const displayMinutes = String(data.continuing?.minutes ?? '');

  return (
    <TableRow>
      <CustomTableCell>{getTaskDescription(title, taskNumber)}</CustomTableCell>
      <CustomTableCell>
        {getDurationClock(
          getMaybeRoundedDuration(duration, settings.storyPoint, settings.roundDuration),
        )}
      </CustomTableCell>
      <CustomTableCell>
        <Typography>Время начала</Typography>
        <EditTime
          hour={displayHour}
          minute={displayMinutes}
          onChangeHour={handleUpdateHour}
          onChangeMinute={handleUpdateMinutes}
        />
      </CustomTableCell>
      <CustomTableCell>
        <ConfirmEditButton onClick={handleConfirm} title='Подтвердить добавление'>
          <CheckCircleOutline />
        </ConfirmEditButton>
      </CustomTableCell>
      <CustomTableCell>
        <CancelEditButton onClick={onCancel} title='Отменить'>
          <Close />
        </CancelEditButton>
      </CustomTableCell>
    </TableRow>
  );
};

export {RowContinuing};
