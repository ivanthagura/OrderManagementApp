import { Box, CircularProgress } from '@mui/material';
import React from 'react'

export default function OmLoading() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}