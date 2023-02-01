import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OmAlert from '../../components/elements/OmAlert';
import OmLoading from '../../components/elements/OmLoading';
import { Customer, useGetCustomerByIdQuery } from '../../graphql/generated/schema';
import CustomerForm from './customerForms/CustomerForm';

export default function CustomerPage() {
    const params = useParams();
    const customerId = parseInt(params.customerId || '0');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const { data: customerData, loading: customerLoading, error: customerError} = useGetCustomerByIdQuery({
        variables: {
            id: customerId
        }
    });

    if(customerLoading) {
        return <OmLoading/>
    }

    if(customerError || !customerData || !customerData.customers)
    {
        return <OmAlert message='Error retreiving customer data' />
    }

    const customer = customerData.customers[0] as Customer
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Typography component='div' variant='h5' display='block' gutterBottom align='center'>
                        Customer Details
                    </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
            </Grid>
        </Container>
    );
}