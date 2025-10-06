/** @format */

import type {TaskData} from '../../types.ts';
import {TableRow} from '@mui/material';
import {CustomTableCell} from '../UI/Table/CustomTableCell';
import {getTimeClock} from '../../helpers/getTimeClock.ts';
import {CancelEditButton, ConfirmEditButton, EditTitleBox} from './styles.ts';
import {CheckCircleOutline, Close} from '@mui/icons-material';
import {EditTime} from '../AddForm/EditTime.tsx';
import {CustomTextField} from '../UI/CustomTextField';
import {useState} from 'react';
import {getTimeFromMinutes} from '../../helpers/getTimeFromMinutes.ts';
import {calcMinutesFromTime} from '../../helpers/calcMinutesFromTime.ts';

interface Props {
  data: TaskData;
  onCancelEdit: () => void;
  onConfirmEdit: (newData: TaskData) => void;
}

const RowEdit = ({data, onCancelEdit, onConfirmEdit}: Props) => {
  const [innerData, setInnerData] = useState<TaskData>(data);
  const {title, timeTo, timeFrom, taskNumber, duration} = innerData;

  const updateInnerValue = (field: keyof TaskData, value: unknown) => {
    setInnerData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    onConfirmEdit(innerData);
  };

  const {hours, minutes} = getTimeFromMinutes(duration);

  return (
    <TableRow>
      <CustomTableCell>
        <EditTitleBox>
          <CustomTextField
            value={taskNumber}
            onChange={value => updateInnerValue('taskNumber', value)}
          />
          <CustomTextField value={title} onChange={value => updateInnerValue('title', value)} />
        </EditTitleBox>
      </CustomTableCell>
      <CustomTableCell>
        <EditTime
          hour={String(hours)}
          minute={String(minutes)}
          onChangeHour={value => {
            const myValue = value ? value : '0';
            updateInnerValue('duration', calcMinutesFromTime({hours: parseInt(myValue), minutes}));
          }}
          onChangeMinute={value => {
            const myValue = value ? value : '0';
            updateInnerValue('duration', calcMinutesFromTime({hours, minutes: parseInt(myValue)}));
          }}
        />
      </CustomTableCell>
      <CustomTableCell>+</CustomTableCell>
      <CustomTableCell>
        <ConfirmEditButton onClick={handleConfirm} title='Подтвердить изменения'>
          <CheckCircleOutline />
        </ConfirmEditButton>
      </CustomTableCell>
      <CustomTableCell>
        <CancelEditButton onClick={onCancelEdit} title='Отменить изменения'>
          <Close />
        </CancelEditButton>
      </CustomTableCell>
    </TableRow>
  );
};

export {RowEdit};
