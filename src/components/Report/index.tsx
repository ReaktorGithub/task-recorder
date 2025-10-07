/** @format */

import {ButtonLabelText, OpenButton, Root} from './styles.ts';
import {useState} from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Report = () => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleOpen = () => {
    setOpen(prev => !prev);
  };

  return (
    <Root width={open ? 300 : 32}>
      <OpenButton onClick={toggleOpen} isOpen={open}>
        <ArrowCircleRightOutlinedIcon fontSize='large' />
      </OpenButton>
      {!open && <ButtonLabelText>Отчёт</ButtonLabelText>}
    </Root>
  );
};

export {Report};
