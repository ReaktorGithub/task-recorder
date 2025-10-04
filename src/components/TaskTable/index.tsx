/** @format */

import {CustomTableHead} from '../UI/Table/CustomTableHead';
import {Table, TableBody, TableRow} from '@mui/material';
import {CustomTableHeadCell} from '../UI/Table/CustomTableHeadCell';
import {CustomTableCell} from '../UI/Table/CustomTableCell';
import {getTaskDescription} from '../../helpers/getTaskDescription.ts';
import {getTimeClock} from '../../helpers/getTimeClock.ts';
import type {TaskData} from '../../types.ts';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {useAppContext} from '../../context/appContext.tsx';
import {getMaybeRoundedDuration} from '../../helpers/getMaybeRoundedDuration.ts';

interface Props {
  taskData: TaskData[];
}

const TaskTable = ({taskData}: Props) => {
  const {settings} = useAppContext();

  return (
    <Table sx={{tableLayout: 'fixed'}}>
      <CustomTableHead>
        <TableRow>
          <CustomTableHeadCell>Описание</CustomTableHeadCell>
          <CustomTableHeadCell width='120px'>Длительность</CustomTableHeadCell>
          <CustomTableHeadCell width='60px'>Начато</CustomTableHeadCell>
          <CustomTableHeadCell width='90px'>Завершено</CustomTableHeadCell>
        </TableRow>
      </CustomTableHead>
      <TableBody>
        {taskData.map(data => (
          <TableRow key={data.id}>
            <CustomTableCell>{getTaskDescription(data.title, data.taskNumber)}</CustomTableCell>
            <CustomTableCell>
              {getDurationClock(
                getMaybeRoundedDuration(data.duration, settings.storyPoint, settings.roundDuration),
              )}
            </CustomTableCell>
            <CustomTableCell>{getTimeClock(data.timeFrom)}</CustomTableCell>
            <CustomTableCell>{getTimeClock(data.timeTo)}</CustomTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export {TaskTable};
