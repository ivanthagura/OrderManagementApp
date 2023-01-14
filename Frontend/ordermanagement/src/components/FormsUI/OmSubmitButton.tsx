import React from 'react';
import { useFormikContext } from 'formik';
import { Button } from '@mui/material';

interface OmSubmitButtonProps {
    children: any,
    otherProps: any
}

export default function OmSubmitButton({children, otherProps}: OmSubmitButtonProps) {
    const { submitForm } = useFormikContext();

    function handleSubmit() {
        submitForm();
    }

    const configButton = {
        ...otherProps,
        color: 'primary',
        variant: 'contained',
        fullWidth: true,
        onClick: handleSubmit
    }

    return (
        <Button {...configButton}>
            {children}
        </Button>
    );
}