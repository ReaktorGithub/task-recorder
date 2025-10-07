/** @format */

import {CustomNumberField} from '../UI/CustomNumberField';
import {DividerText, InputsBox} from './styles.ts';

interface Props {
  hour: string;
  minute: string;
  onChangeHour: (hour: string) => void;
  onChangeMinute: (hour: string) => void;
}

const EditTime = ({onChangeHour, onChangeMinute, minute, hour}: Props) => {
  return (
    <InputsBox>
      <CustomNumberField value={hour} onChange={onChangeHour} min={0} max={23} width='55px' />
      <DividerText>:</DividerText>
      <CustomNumberField value={minute} onChange={onChangeMinute} min={0} max={59} width='55px' />
    </InputsBox>
  );
};

export {EditTime};
