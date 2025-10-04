/** @format */

import {Root} from './styles.ts';
import type {ChangeEvent} from 'react';

type Props = {
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
};

const CustomTextField = ({maxLength, onChange, value, ...props}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (maxLength !== undefined && value.length > maxLength) {
      onChange(value.slice(0, maxLength));
      return;
    }
    onChange(value);
  };

  return <Root onChange={handleChange} value={value} {...props} variant='filled' />;
};

export {CustomTextField};
