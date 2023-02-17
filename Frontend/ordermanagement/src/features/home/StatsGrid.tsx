import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import OmHeader from '../../components/elements/OmHeader';
import { Stats } from '../../graphql/generated/schema';

interface StatsGridProps {
    stats: Stats
}

export default function StatsGrid({stats}: StatsGridProps) {
    return (
        <Container>
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                    <OmHeader header='Stats'/>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>Total Customers:</Grid>
                <Grid item xs={3}>{stats.totalCustomers}</Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>Total Orders:</Grid>
                <Grid item xs={3}>{stats.totalOrders}</Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>Pending Orders:</Grid>
                <Grid item xs={3}>{stats.pendingOrders}</Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>Draft Orders:</Grid>
                <Grid item xs={3}>{stats.draftOrders}</Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>Comlpeted Orders:</Grid>
                <Grid item xs={3}>{stats.completedOrders}</Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>Shipped Orders:</Grid>
                <Grid item xs={3}>{stats.shippedOrders}</Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </Container>
    );
}