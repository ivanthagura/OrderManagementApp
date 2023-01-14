import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

interface OmDatePickerProps {
    name: string,
    otherProps: any
}

export default function OmDatePicker({name, otherProps}: OmDatePickerProps) {
    const [field, meta] = useField(name);

    const configDatePicker = {
        ...field,
        ...otherProps,
        type: 'date',
        fullWidth: true,
        variant: 'outlined',
        InputLabelProps: {
            shrink : true
        }
    };

    if(meta && meta.touched && meta.error) {
        configDatePicker.error = true;
        configDatePicker.helperText = meta.error;
    }

    return (
        <TextField {...configDatePicker} />
    );
}