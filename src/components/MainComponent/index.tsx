/** @format */

import {Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {isBefore} from 'date-fns';
import {AddButton, AddButtonBox, EmptyBox, Root, StatsBox, WorkTimeText} from './styles.ts';
import {AddRounded} from '@mui/icons-material';
import {AddForm} from '../AddForm';
import {calcTotalWorkTime} from '../../helpers/calcTotalWorkTime.ts';
import {TOTAL_WORK_TIME_MINUTES} from '../../constants.ts';
import {useAppContext} from '../../context/appContext.tsx';
import {TaskTable} from '../TaskTable';
import {roundMinutesToStoryPoint} from '../../helpers/roundMinutesToStoryPoint.ts';
import {getCurrentTime} from '../../helpers/getCurrentTime.ts';
import {addMinutesToTime} from '../../helpers/addMinutesToTime.ts';

const MainComponent = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const {savedTasks, settings, addingFormData} = useAppContext();

  useEffect(() => {
    if (addingFormData) {
      setIsAdding(true);
    }
  }, [addingFormData]);

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

  const totalWorkTimeFact = calcTotalWorkTime(sortedData);
  const totalWorkTime = settings.roundDuration
    ? roundMinutesToStoryPoint(totalWorkTimeFact, settings.storyPoint)
    : totalWorkTimeFact;
  const restTime = TOTAL_WORK_TIME_MINUTES - totalWorkTime;
  const isOverwork = restTime < 0;
  const targetTime = addMinutesToTime(getCurrentTime(), restTime);

  const handleConfirmContinuing = () => {
    if (settings.startNewAfterDone) {
      setIsAdding(true);
    }
  };

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

        {!isOverwork && (
          <WorkTimeText>
            <span>Закончить в</span> {targetTime.hours}:{targetTime.minutes}
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
