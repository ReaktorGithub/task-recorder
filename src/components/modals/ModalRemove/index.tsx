/** @format */

import {Close} from '@mui/icons-material';
import {ButtonsBox, CancelButton, CloseButton, ConfirmButton, ModalText, Root} from '../styles.ts';

interface Props {
  taskToRemoveId: string | null;
  taskToRemoveText: string;
  onConfirm: () => void;
  onClose: () => void;
  question: string;
}

const ModalContent = ({taskToRemoveId, taskToRemoveText, onConfirm, onClose, question}: Props) => {
  return (
    <Root>
      {taskToRemoveId ? (
        <>
          <ModalText>Вы действительно хотите удалить эту {question}?</ModalText>
          <ModalText>{taskToRemoveText}</ModalText>
          <ButtonsBox>
            <CancelButton onClick={onClose}>Отмена</CancelButton>
            <ConfirmButton onClick={onConfirm}>Да</ConfirmButton>
          </ButtonsBox>
        </>
      ) : (
        <>
          <ModalText>Вы действительно хотите очистить список задач?</ModalText>
          <ButtonsBox>
            <CancelButton onClick={onClose}>Отмена</CancelButton>
            <ConfirmButton onClick={onConfirm}>Да</ConfirmButton>
          </ButtonsBox>
        </>
      )}
      <CloseButton onClick={onClose}>
        <Close />
      </CloseButton>
    </Root>
  );
};

export {ModalContent};
