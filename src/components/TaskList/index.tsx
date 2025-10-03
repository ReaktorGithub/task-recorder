/** @format */

import {Table, TableBody, TableRow, Typography} from '@mui/material';
import {useState} from 'react';
import {CustomTableCell} from '../Table/CustomTableCell';
import {CustomTableHeadCell} from '../Table/CustomTableHeadCell';
import {CustomTableHead} from '../Table/CustomTableHead';
import {getTaskDescription} from '../../helpers/getTaskDescription.ts';
import {getTimeClock} from '../../helpers/getTimeClock.ts';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {isBefore} from 'date-fns';
import {
  AddButton,
  AddButtonBox,
  ControlButtonsBox,
  ControlPanelBox,
  EmptyBox,
  OverworkText,
  ReportButton,
  ResetButton,
  Root,
  SaveButton,
  StatsBox,
  WorkTimeText,
} from './styles.ts';
import {AddRounded, Clear, ContentCopy, Save} from '@mui/icons-material';
import {AddForm} from '../AddForm';
import {calcTotalWorkTime} from '../../helpers/calcTotalWorkTime.ts';
import {TOTAL_WORK_TIME_MINUTES} from '../../constants.ts';
import {EditDuration} from '../EditDuration';
import {useAppContext} from '../../context/appContext.tsx';

const TaskList = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const {savedTasks, onClearTasks, onReport, onSave} = useAppContext();

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const sortedData = [...savedTasks].sort((a, b) => {
    if (isBefore(a.collectedOn, b.collectedOn)) return -1;
    if (isBefore(b.collectedOn, a.collectedOn)) return 1;
    return 0;
  });

  const totalWorkTime = calcTotalWorkTime(sortedData);
  const restTime = TOTAL_WORK_TIME_MINUTES - totalWorkTime;

  return (
    <Root>
      <ControlPanelBox>
        <ControlButtonsBox>
          <SaveButton onClick={onSave}>
            <Save /> Сохранить
          </SaveButton>
          <ReportButton onClick={onReport}>
            <ContentCopy />
          </ReportButton>
        </ControlButtonsBox>

        <StatsBox>
          <WorkTimeText>
            <span>Всего отработано:</span> {getDurationClock(totalWorkTime)}
          </WorkTimeText>
          <WorkTimeText>
            <span>До конца рабочего дня:</span> {getDurationClock(restTime)}
          </WorkTimeText>
          {restTime < 0 && <OverworkText>Хватит работать!</OverworkText>}
        </StatsBox>

        <ResetButton onClick={onClearTasks}>
          <Clear />
        </ResetButton>
      </ControlPanelBox>

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
          {sortedData.map(data => (
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

      {sortedData.length === 0 && (
        <EmptyBox>
          <Typography>нет задач</Typography>
        </EmptyBox>
      )}

      {isAdding ? (
        <AddForm onCancel={handleCancel} />
      ) : (
        <AddButtonBox>
          <AddButton onClick={handleAdd}>
            <AddRounded fontSize='large' />
          </AddButton>
        </AddButtonBox>
      )}
    </Root>
  );
};

export {TaskList};
