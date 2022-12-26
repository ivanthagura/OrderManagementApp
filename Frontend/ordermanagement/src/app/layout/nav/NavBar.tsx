import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <AppBar position='static'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <Link to="/">Order Management App</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
                        <Button
                            key="Customers"
                            sx={{ my: 2, color: 'white', display: 'block '}}>
                            <Link to="/customers">Customers</Link>    
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}