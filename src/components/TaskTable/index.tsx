/** @format */

import {CustomTableHead} from '../Table/CustomTableHead';
import {Table, TableBody, TableRow} from '@mui/material';
import {CustomTableHeadCell} from '../Table/CustomTableHeadCell';
import {CustomTableCell} from '../Table/CustomTableCell';
import {getTaskDescription} from '../../helpers/getTaskDescription.ts';
import {EditDuration} from '../EditDuration';
import {getTimeClock} from '../../helpers/getTimeClock.ts';
import type {TaskData} from '../../types.ts';

interface Props {
  taskData: TaskData[];
}

const TaskTable = ({taskData}: Props) => {
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
              <EditDuration data={data} />
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
