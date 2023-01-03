import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Order, useGetOrdersQuery } from '../../../graphql/generated/schema';
import OrderList from './OrderList';

export default function OrdersDashboard() {
    const { data: ordersData, loading, error } = useGetOrdersQuery();

    if(loading) {
        return <div>Loading...</div>
    }

    if(error || !ordersData){
        return <div>Error...</div>
    }

    const orders = ordersData.orders as Order[]
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="div" variant='h5' display='block' gutterBottom align='center'>
                    Orders List
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <OrderList orders={orders} />
            </Grid>
        </Grid>
    )
}