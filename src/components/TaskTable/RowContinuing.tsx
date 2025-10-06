/** @format */

import type {TaskData} from '../../types.ts';
import {TableRow, Typography} from '@mui/material';
import {CustomTableCell} from '../UI/Table/CustomTableCell';
import {CancelEditButton, ConfirmEditButton} from './styles.ts';
import {CheckCircleOutline, Close} from '@mui/icons-material';
import {EditTime} from '../AddForm/EditTime.tsx';
import {useEffect, useState} from 'react';
import {getTaskDescription} from '../../helpers/getTaskDescription.ts';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {getMaybeRoundedDuration} from '../../helpers/getMaybeRoundedDuration.ts';
import {useAppContext} from '../../context/appContext.tsx';
import {calcDuration} from '../../helpers/calcDuration.ts';
import {getCurrentTime} from '../../helpers/getCurrentTime.ts';

interface Props {
  data: TaskData;
  onCancel: () => void;
  onConfirm: (newData: TaskData) => void;
}

const RowContinuing = ({data, onCancel, onConfirm}: Props) => {
  const [hours, setHour] = useState<string>('');
  const [minutes, setMinute] = useState<string>('');

  useEffect(() => {
    const {hours: currentHour, minutes: currentMinutes} = getCurrentTime();
    setHour(String(currentHour));
    setMinute(String(currentMinutes));
  }, []);

  const {settings} = useAppContext();

  const {taskNumber, title, duration} = data;

  const handleConfirm = () => {
    const currentTime = getCurrentTime();
    const durationPlus = calcDuration(
      {hours: parseInt(hours), minutes: parseInt(minutes)},
      currentTime,
    );
    const newData = {
      ...data,
      duration: data.duration + durationPlus,
    };
    onConfirm(newData);
  };

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
        <EditTime hour={hours} minute={minutes} onChangeHour={setHour} onChangeMinute={setMinute} />
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
