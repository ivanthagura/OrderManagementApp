import { Alert } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

interface OmAlertProps {
    message: string;
}

export default function OmAlert({message} : OmAlertProps) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Alert severity='error'>{message}</Alert>
        </Box>
    );
}