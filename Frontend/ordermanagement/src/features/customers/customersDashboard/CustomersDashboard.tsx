import { Grid, Typography } from '@mui/material';
import React from 'react';
import OmAlert from '../../../components/elements/OmAlert';
import OmLoading from '../../../components/elements/OmLoading';
import { Customer, useGetCustomersQuery } from '../../../graphql/generated/schema';
import CustomerList from './CustomerList';

export default function CustomersDashboard() {
    const { data:customersData, loading, error } = useGetCustomersQuery();

    if(loading) {
        return <OmLoading />
    }

    if(error || !customersData){
        return <OmAlert message='Could not load customers data'/>
    }

    const customers = customersData.customers as Customer[]
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="div" variant='h5' display='block' gutterBottom align='center'>
                    Customers List
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CustomerList customers={customers} />
            </Grid>
        </Grid>
    )
}