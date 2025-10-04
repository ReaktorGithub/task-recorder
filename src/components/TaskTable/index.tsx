/** @format */

import {CustomTableHead} from '../UI/Table/CustomTableHead';
import {Modal, Table, TableBody, TableRow} from '@mui/material';
import {CustomTableHeadCell} from '../UI/Table/CustomTableHeadCell';
import {CustomTableCell} from '../UI/Table/CustomTableCell';
import {getTaskDescription} from '../../helpers/getTaskDescription.ts';
import {getTimeClock} from '../../helpers/getTimeClock.ts';
import type {TaskData} from '../../types.ts';
import {getDurationClock} from '../../helpers/getDurationClock.ts';
import {useAppContext} from '../../context/appContext.tsx';
import {getMaybeRoundedDuration} from '../../helpers/getMaybeRoundedDuration.ts';
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

interface Props {
  taskData: TaskData[];
}

const TaskTable = ({taskData}: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [taskToRemoveId, setTaskToRemoveId] = useState<string | null>(null);

  const {settings, savedTasks, onClearTasks, onRemoveTask} = useAppContext();

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
            <CustomTableHeadCell width='120px'>Длительность</CustomTableHeadCell>
            <CustomTableHeadCell width='60px'>Начато</CustomTableHeadCell>
            <CustomTableHeadCell width='90px'>Завершено</CustomTableHeadCell>
            <CustomTableHeadCell width='32px'>
              {taskData.length > 0 && (
                <ResetButton disableRipple onClick={() => handleClear(null)}>
                  <Clear />
                </ResetButton>
              )}
            </CustomTableHeadCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {taskData.map(data => (
            <TableRow key={data.id}>
              <CustomTableCell>{getTaskDescription(data.title, data.taskNumber)}</CustomTableCell>
              <CustomTableCell>
                {getDurationClock(
                  getMaybeRoundedDuration(
                    data.duration,
                    settings.storyPoint,
                    settings.roundDuration,
                  ),
                )}
              </CustomTableCell>
              <CustomTableCell>{getTimeClock(data.timeFrom)}</CustomTableCell>
              <CustomTableCell>{getTimeClock(data.timeTo)}</CustomTableCell>
              <CustomTableCell>
                <ResetButton disableRipple onClick={() => handleClear(data.id)}>
                  <Clear />
                </ResetButton>
              </CustomTableCell>
            </TableRow>
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
