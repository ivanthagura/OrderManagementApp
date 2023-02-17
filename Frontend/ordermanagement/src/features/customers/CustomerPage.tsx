import { Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OmAlert from '../../components/elements/OmAlert';
import OmHeader from '../../components/elements/OmHeader';
import OmLoading from '../../components/elements/OmLoading';
import { Customer, Order, useGetCustomerByIdQuery, useDeleteCustomerMutation } from '../../graphql/generated/schema';
import OrderList from '../orders/ordersDashboard/OrderList';
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
    const [deleteCustomer, {loading: deleteCustomerLoading, error: deleteCustomerError}] = useDeleteCustomerMutation();

    async function deleteCustomerDetails() {
        const response = await deleteCustomer({
            variables: {
                id: customerId
            }
        });

        if(!response.errors) {
            navigate('/customers');
        }
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    if(customerLoading || deleteCustomerLoading) {
        return <OmLoading/>
    }

    if(customerError || !customerData || !customerData.customers)
    {
        return <OmAlert message='Error retreiving customer data' />
    }

    if(deleteCustomerError)
    {
        return <OmAlert message='Error deleting customer data' />
    }

    const customer = customerData.customers[0] as Customer
    const customerOrders = customer.orders as Order[];
    return (
        <Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {"Delete Customer Details?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        You are about to remove this customer and all related orders. Confirm to continue or cancel
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteCustomerDetails} color='error' autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OmHeader header='Customer Details' />
                </Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' color='error' startIcon={<Delete />}
                        onClick={handleClickOpen}
                    >
                        Delete
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
                <Grid item xs={12}>
                    <OmHeader header='Customer Orders' />
                </Grid>
                <Grid item xs={12}>
                    <OrderList orders={customerOrders} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' fullWidth={true} href={`/customers/${customer.id}/neworder`}>
                        Add New Order
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}