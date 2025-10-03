/** @format */

import type {TaskData} from '../../types.ts';
import {useState} from 'react';
import {EditButton, Root} from './styles.ts';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {Edit} from '@mui/icons-material';

interface Props {
  data: TaskData;
}

const EditDuration = ({data}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleStartEdit = () => {
    setIsEdit(true);
  };

  return (
    <Root>
      <EditButton onClick={handleStartEdit}>
        <Edit fontSize='small' />
      </EditButton>
      {getDurationClock(data.duration)}
    </Root>
  );
};

export {EditDuration};
