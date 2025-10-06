/** @format */

import {useCallback, useRef} from 'react';

const useDebounce = <T>(
  setValue: (value: T) => void,
  debounce: number = 300,
): {onChange: (value: T) => void} => {
  const timeoutId = useRef<number | undefined>(undefined);

  const onChange = useCallback(
    (value: T) => {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        setValue(value);
      }, debounce);
    },
    [debounce, setValue],
  );

  return {
    onChange,
  };
};

export {useDebounce};
