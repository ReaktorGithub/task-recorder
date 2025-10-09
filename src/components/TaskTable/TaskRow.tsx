/** @format */
import type {TaskData} from '../../types.ts';
import {useEffect, useState} from 'react';
import {RowEdit} from './RowEdit.tsx';
import {RowDisplay} from './RowDisplay.tsx';
import {RowContinuing} from './RowContinuing.tsx';
import {useAppContext} from '../../context/appContext.tsx';
import {useFavicon} from '../../features/useFavicon.tsx';

interface Props {
  data: TaskData;
  onClear: (id: string) => void;
  onConfirmContinuing: () => void;
}

const TaskRow = ({data, onClear, onConfirmContinuing}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {onUpdateTask, isAdding} = useAppContext();
  const {onRecord} = useFavicon();

  useEffect(() => {
    if (data.isContinuing) {
      onRecord(true);
    }
  }, [data, onRecord]);

  const startEdit = () => {
    setIsEdit(true);
  };

  const stopEdit = () => {
    setIsEdit(false);
  };

  const startContinuing = () => {
    onRecord(true);
    onUpdateTask({
      ...data,
      isContinuing: true,
    });
  };

  const stopContinuing = () => {
    onRecord(isAdding);
    onUpdateTask({
      ...data,
      isContinuing: false,
    });
  };

  const handleConfirmUpdate = (newData: TaskData) => {
    onUpdateTask(newData);
    stopEdit();
    onRecord(isAdding);
    onConfirmContinuing();
  };

  if (data.isContinuing) {
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
