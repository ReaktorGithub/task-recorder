/** @format */

import {ButtonsBox, CancelButton, ConfirmButton, ModalText, Root, CloseButton} from '../styles.ts';
import {Close} from '@mui/icons-material';

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const CloseDayModal = ({onClose, onConfirm}: Props) => {
  return (
    <Root>
      <ModalText>Закончить день?</ModalText>
      <ModalText>Все записи о задачах будут перенесены в отчёт.</ModalText>
      <ButtonsBox>
        <CancelButton onClick={onClose}>Отмена</CancelButton>
        <ConfirmButton onClick={onConfirm}>Да</ConfirmButton>
      </ButtonsBox>
      <CloseButton onClick={onClose}>
        <Close />
      </CloseButton>
    </Root>
  );
};

export {CloseDayModal};
