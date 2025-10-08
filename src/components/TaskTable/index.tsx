/** @format */

import {CustomTableHead} from '../UI/Table/CustomTableHead';
import {Modal, Table, TableBody, TableRow} from '@mui/material';
import {CustomTableHeadCell} from '../UI/Table/CustomTableHeadCell';
import type {TaskData} from '../../types.ts';
import {useAppContext} from '../../context/appContext.tsx';
import {Clear} from '@mui/icons-material';
import {ResetButton} from './styles.ts';
import {useState} from 'react';
import {TaskRow} from './TaskRow.tsx';
import {ModalContent} from '../modals/ModalRemove';
import {getTaskDescription} from '../../helpers/getTaskDescription.ts';

interface Props {
  taskData: TaskData[];
  onConfirmContinuing: () => void;
}

const TaskTable = ({taskData, onConfirmContinuing}: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [taskToRemoveId, setTaskToRemoveId] = useState<string | null>(null);

  const {savedTasks, onClearTasks, onRemoveTask} = useAppContext();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleClear = (id: string | null) => {
    setTaskToRemoveId(id);
    handleOpenModal();
  };

  const handleConfirmRemove = () => {
    if (taskToRemoveId) {
      onRemoveTask(taskToRemoveId);
    } else {
      onClearTasks();
    }
    handleCloseModal();
  };

  const getTaskToRemoveText = () => {
    const task = savedTasks.find(task => task.id === taskToRemoveId);
    if (!task) return '';
    return getTaskDescription(task.title, task.taskNumber);
  };

  return (
    <>
      <Table sx={{tableLayout: 'fixed'}}>
        <CustomTableHead>
          <TableRow>
            <CustomTableHeadCell>Описание</CustomTableHeadCell>
            <CustomTableHeadCell width='130px'>Длительность</CustomTableHeadCell>
            <CustomTableHeadCell width='130px'>Продлить</CustomTableHeadCell>
            <CustomTableHeadCell width='32px' />
            <CustomTableHeadCell width='32px'>
              {taskData.length > 0 && (
                <ResetButton
                  disableRipple
                  onClick={() => handleClear(null)}
                  title='Очистить список'
                >
                  <Clear />
                </ResetButton>
              )}
            </CustomTableHeadCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {taskData.map(data => (
            <TaskRow
              key={data.id}
              data={data}
              onClear={handleClear}
              onConfirmContinuing={onConfirmContinuing}
            />
          ))}
        </TableBody>
      </Table>

      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalContent
          taskToRemoveId={taskToRemoveId}
          taskToRemoveText={getTaskToRemoveText()}
          onConfirm={handleConfirmRemove}
          onClose={handleCloseModal}
          question='задачу'
        />
      </Modal>
    </>
  );
};

export {TaskTable};
