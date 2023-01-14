import React from 'react';
import { useField, useFormikContext } from 'formik';
import { MenuItem, TextField } from '@mui/material';

interface OmSelectProps {
    name: string,
    options: any,
    otherProps: any
}

export default function OmSelect({name, options, otherProps}: OmSelectProps) {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    function handleChange(event: any) {
        const { value } = event.target;
        setFieldValue(name, value);
    }

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        fullWidth: true,
        variant: 'outlined',
        onChange: handleChange
    }

    if(meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect}>
            {Object.keys(options).map((item, pos) => {
                return (
                    <MenuItem key={pos} value={item}>
                        {options[item]}
                    </MenuItem>
                )
            })}
        </TextField>
    );
}