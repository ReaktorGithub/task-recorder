/** @format */

import {Typography} from '@mui/material';
import {useEffect} from 'react';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {isBefore} from 'date-fns';
import {AddButton, AddButtonBox, EmptyBox, Root, StatsBox, WorkTimeText} from './styles.ts';
import {AddRounded} from '@mui/icons-material';
import {AddForm} from '../AddForm';
import {calcTotalWorkTime} from '../../helpers/calcTotalWorkTime.ts';
import {TOTAL_WORK_TIME_MINUTES} from '../../constants.ts';
import {useAppContext} from '../../context/appContext.tsx';
import {TaskTable} from '../TaskTable';
import {getCurrentTime} from '../../helpers/getCurrentTime.ts';
import {addMinutesToTime} from '../../helpers/addMinutesToTime.ts';
import {calcTotalWorkTimeRounded} from '../../helpers/calcTotalWorkTimeRounded.ts';
import {useFavicon} from '../../features/useFavicon.tsx';

const MainComponent = () => {
  const {savedTasks, settings, addingFormData, isAdding, onIsAdding} = useAppContext();
  const {onRecord} = useFavicon();

  useEffect(() => {
    if (addingFormData) {
      onRecord(true);
      onIsAdding(true);
    }
  }, [addingFormData, onIsAdding, onRecord]);

  const handleAdd = () => {
    onRecord(true);
    onIsAdding(true);
  };

  const handleCancel = () => {
    const isSomeContinuing = savedTasks.some(task => task.isContinuing);
    onRecord(isSomeContinuing);
    onIsAdding(false);
  };

  const sortedData = [...savedTasks].sort((a, b) => {
    if (isBefore(a.collectedOn, b.collectedOn)) return -1;
    if (isBefore(b.collectedOn, a.collectedOn)) return 1;
    return 0;
  });

  const totalWorkTime = settings.roundDuration
    ? calcTotalWorkTimeRounded(sortedData, settings.storyPoint)
    : calcTotalWorkTime(sortedData);
  const restTime = TOTAL_WORK_TIME_MINUTES - totalWorkTime;
  const isOverwork = restTime < 0;
  const targetTime = addMinutesToTime(getCurrentTime(), restTime);

  const handleConfirmContinuing = () => {
    if (settings.startNewAfterDone) {
      handleAdd();
    }
  };

  const targetMinutesFormatted =
    String(targetTime.minutes).length < 2 ? `0${targetTime.minutes}` : targetTime.minutes;

  return (
    <Root>
      <StatsBox>
        <WorkTimeText>
          <span>Всего отработано:</span> {getDurationClock(totalWorkTime)}
        </WorkTimeText>
        {isOverwork ? (
          <WorkTimeText isOverwork>
            <span>Переработка:</span> {getDurationClock(Math.abs(restTime))}
          </WorkTimeText>
        ) : (
          <WorkTimeText>
            <span>Осталось отработать:</span> {getDurationClock(restTime)}
          </WorkTimeText>
        )}

        {!isOverwork && sortedData.length > 0 && (
          <WorkTimeText>
            <span>Закончить в</span> {targetTime.hours}:{targetMinutesFormatted}{' '}
            <span>(без учёта перерывов)</span>
          </WorkTimeText>
        )}
      </StatsBox>

      <TaskTable taskData={sortedData} onConfirmContinuing={handleConfirmContinuing} />

      {sortedData.length === 0 && (
        <EmptyBox>
          <Typography>нет задач</Typography>
        </EmptyBox>
      )}

      {isAdding ? (
        <AddForm onCancel={handleCancel} onAdded={handleCancel} />
      ) : (
        <AddButtonBox>
          <AddButton onClick={handleAdd} title='Добавить задачу'>
            <AddRounded fontSize='large' />
          </AddButton>
        </AddButtonBox>
      )}
    </Root>
  );
};

export {MainComponent};
