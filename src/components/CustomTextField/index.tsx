/** @format */

import {type TextFieldProps} from '@mui/material';
import {Root} from './styles.ts';

const CustomTextField = (props: TextFieldProps) => {
  return <Root {...props} variant='filled' />;
};

export {CustomTextField};
