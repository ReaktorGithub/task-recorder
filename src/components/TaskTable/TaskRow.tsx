/** @format */
import type {TaskData} from '../../types.ts';
import {useState} from 'react';
import {RowEdit} from './RowEdit.tsx';
import {RowDisplay} from './RowDisplay.tsx';

interface Props {
  data: TaskData;
  onClear: (id: string) => void;
  onConfirm: (newData: TaskData) => void;
}

const TaskRow = ({data, onClear, onConfirm}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isContinuing, setIsContinuing] = useState<boolean>(false);

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

  const handleConfirmEdit = (newData: TaskData) => {
    onConfirm(newData);
    setIsEdit(false);
  };

  if (isEdit) {
    return <RowEdit data={data} onCancelEdit={stopEdit} onConfirmEdit={handleConfirmEdit} />;
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
