/** @format */

import {CustomTableCell} from '../UI/Table/CustomTableCell';
import {getTaskDescription} from '../../helpers/getTaskDescription.ts';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {getMaybeRoundedDuration} from '../../helpers/getMaybeRoundedDuration.ts';
import {AddButton, EditButton, ResetButton} from './styles.ts';
import {AddRounded, Clear, Edit} from '@mui/icons-material';
import {TableRow} from '@mui/material';
import type {TaskData} from '../../types.ts';
import {useAppContext} from '../../context/appContext.tsx';

interface Props {
  data: TaskData;
  onClear: (id: string) => void;
  onStartEdit: () => void;
  onStartContinuing: () => void;
}

const RowDisplay = ({data, onClear, onStartEdit, onStartContinuing}: Props) => {
  const {id, title, taskNumber, duration} = data;
  const {settings} = useAppContext();

  const handleClear = () => {
    onClear(id);
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
        <AddButton onClick={onStartContinuing} title='Продлить задачу'>
          <AddRounded />
        </AddButton>
      </CustomTableCell>
      <CustomTableCell>
        <EditButton disableRipple onClick={onStartEdit} title='Изменить задачу'>
          <Edit />
        </EditButton>
      </CustomTableCell>
      <CustomTableCell>
        <ResetButton disableRipple onClick={handleClear} title='Удалить задачу'>
          <Clear />
        </ResetButton>
      </CustomTableCell>
    </TableRow>
  );
};

export {RowDisplay};
