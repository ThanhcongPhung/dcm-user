import React from 'react';
import { TextField } from '@material-ui/core';

export default function TextArea(props) {
  const { name, label, value, error = null, onChange, ...other } = props;

  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      multiline
      rows={3}
      // fullWidth={true}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
