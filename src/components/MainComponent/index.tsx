/** @format */

import {Typography} from '@mui/material';
import {useState} from 'react';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {isBefore} from 'date-fns';
import {
  AddButton,
  AddButtonBox,
  EmptyBox,
  OverworkText,
  Root,
  StatsBox,
  WorkTimeText,
} from './styles.ts';
import {AddRounded} from '@mui/icons-material';
import {AddForm} from '../AddForm';
import {calcTotalWorkTime} from '../../helpers/calcTotalWorkTime.ts';
import {TOTAL_WORK_TIME_MINUTES} from '../../constants.ts';
import {useAppContext} from '../../context/appContext.tsx';
import {TaskTable} from '../TaskTable';
import {roundMinutesToStoryPoint} from '../../helpers/roundMinutesToStoryPoint.ts';

const MainComponent = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const {savedTasks, settings} = useAppContext();

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

  return (
    <Root>
      <StatsBox>
        <WorkTimeText>
          <span>Всего отработано:</span> {getDurationClock(totalWorkTime)}
        </WorkTimeText>
        <WorkTimeText>
          <span>До конца рабочего дня:</span> {getDurationClock(restTime)}
        </WorkTimeText>
        {restTime < 0 && <OverworkText>Хватит работать!</OverworkText>}
      </StatsBox>

      <TaskTable taskData={sortedData} />

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
