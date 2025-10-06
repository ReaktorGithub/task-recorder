/** @format */
import type {TaskData} from '../../types.ts';
import {useState} from 'react';
import {RowEdit} from './RowEdit.tsx';
import {RowDisplay} from './RowDisplay.tsx';
import {RowContinuing} from './RowContinuing.tsx';
import {useAppContext} from '../../context/appContext.tsx';

interface Props {
  data: TaskData;
  onClear: (id: string) => void;
}

const TaskRow = ({data, onClear}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isContinuing, setIsContinuing] = useState<boolean>(false);

  const {onUpdateTask} = useAppContext();

  const startEdit = () => {
    setIsEdit(true);
  };

  const stopEdit = () => {
    setIsEdit(false);
  };

  const startContinuing = () => {
    setIsContinuing(true);
  };

  const stopContinuing = () => {
    setIsContinuing(false);
  };

  const handleConfirmUpdate = (newData: TaskData) => {
    onUpdateTask(newData);
    setIsEdit(false);
    setIsContinuing(false);
  };

  if (isContinuing) {
    return <RowContinuing data={data} onCancel={stopContinuing} onConfirm={handleConfirmUpdate} />;
  }

  if (isEdit) {
    return <RowEdit data={data} onCancel={stopEdit} onConfirm={handleConfirmUpdate} />;
  }

  return (
    <RowDisplay
      data={data}
      onClear={onClear}
      onStartEdit={startEdit}
      onStartContinuing={startContinuing}
    />
  );
};

export {TaskRow};
