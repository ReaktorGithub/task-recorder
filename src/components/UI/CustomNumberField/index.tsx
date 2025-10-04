/** @format */

import {Root} from './styles.ts';
import type {ChangeEvent} from 'react';

type Props = {
  min?: number;
  max?: number;
  value: string;
  maxLength?: number;
  onChange: (value: string) => void;
  width?: string;
};

const CustomNumberField = ({min, max, value, maxLength, onChange, width}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (Number.isNaN(value)) {
      onChange(String(event.target.value));
      return;
    }
    if (maxLength !== undefined) {
      value = parseInt(String(value).slice(0, maxLength));
    }
    if (min !== undefined && value < min) {
      onChange(String(min));
      return;
    }
    if (max !== undefined && value > max) {
      onChange(String(max));
      return;
    }
    onChange(String(value));
  };

  return (
    <Root
      value={value}
      onChange={handleChange}
      variant='filled'
      type='number'
      sx={{width: width || '100%'}}
      slotProps={{
        input: {
          inputProps: {
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'e' || e.key === 'E') {
                e.preventDefault();
              }
            },
          },
        },
      }}
    />
  );
};

export {CustomNumberField};
