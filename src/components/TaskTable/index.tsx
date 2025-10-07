/** @format */

import {CustomTableHead} from '../UI/Table/CustomTableHead';
import {Modal, Table, TableBody, TableRow} from '@mui/material';
import {CustomTableHeadCell} from '../UI/Table/CustomTableHeadCell';
import {getTaskDescription} from '../../helpers/getTaskDescription.ts';
import type {TaskData} from '../../types.ts';
import {useAppContext} from '../../context/appContext.tsx';
import {Clear, Close} from '@mui/icons-material';
import {
  ButtonsBox,
  CancelButton,
  CloseButton,
  ConfirmButton,
  ModalContent,
  ModalText,
  ResetButton,
} from './styles.ts';
import {useState} from 'react';
import {TaskRow} from './TaskRow.tsx';

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

  const getTaskToRemoveText = (id: string) => {
    const task = savedTasks.find(task => task.id === id);
    if (!task) return '';
    return getTaskDescription(task.title, task.taskNumber);
  };

  const handleConfirmRemove = () => {
    if (taskToRemoveId) {
      onRemoveTask(taskToRemoveId);
    } else {
      onClearTasks();
    }
    handleCloseModal();
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
        <ModalContent>
          {taskToRemoveId ? (
            <>
              <ModalText>Вы действительно хотите удалить эту задачу?</ModalText>
              <ModalText>{getTaskToRemoveText(taskToRemoveId)}</ModalText>
              <ButtonsBox>
                <CancelButton onClick={handleCloseModal}>Отмена</CancelButton>
                <ConfirmButton onClick={handleConfirmRemove}>Да</ConfirmButton>
              </ButtonsBox>
            </>
          ) : (
            <>
              <ModalText>Вы действительно хотите очистить список задач?</ModalText>
              <ButtonsBox>
                <CancelButton onClick={handleCloseModal}>Отмена</CancelButton>
                <ConfirmButton onClick={handleConfirmRemove}>Да</ConfirmButton>
              </ButtonsBox>
            </>
          )}
          <CloseButton onClick={handleCloseModal}>
            <Close />
          </CloseButton>
        </ModalContent>
      </Modal>
    </>
  );
};

export {TaskTable};
