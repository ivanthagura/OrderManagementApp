import { useField } from 'formik';
import React from 'react';
import TextField from '@mui/material/TextField';

interface OmTextFieldProps {
    name: string,
    otherProps: any
}

export default function OmTextField({name, otherProps}: OmTextFieldProps) {
    const [field, meta] = useField(name);

    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    if(meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return (
        <TextField {...configTextField} />
    );
}