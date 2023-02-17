import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OmAlert from '../../components/elements/OmAlert';
import OmLoading from '../../components/elements/OmLoading';
import { Customer, Order, useGetOrderByIdQuery, useDeleteOrderMutation } from '../../graphql/generated/schema';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { Container } from '@mui/system';
import OrderForm from './orderForm/OrderForm';
import OmHeader from '../../components/elements/OmHeader';
import { Delete } from '@mui/icons-material';

export default function OrderPage() {
    const params = useParams();
    const orderId = parseInt(params.orderId || '0');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const { data: orderData, loading: orderLoading, error: orderError } = useGetOrderByIdQuery({
        variables: {
            id: orderId
        }
    });
    const [deleteOrder, {loading: deleteOrderLoading, error: deleteOrderError}] = useDeleteOrderMutation();

    async function deleteOrderDetails() {
        const response = await deleteOrder({
            variables: {
                id: orderId
            }
        });

        if(!response.errors) {
            navigate('/orders');
        }
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    if(orderLoading || deleteOrderLoading) {
        return <OmLoading/>
    }

    if(orderError || !orderData || !orderData.orders)
    {
        return <OmAlert message='Error retreiving order data' />
    }

    if(deleteOrderError)
    {
        return <OmAlert message='Error deleting order data' />
    }

    const order = orderData.orders[0] as Order;
    const customer = order.customer as Customer;
    return (
        <Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {"Delete Order Details?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        You are about to remove this order. Confirm to continue or cancel
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteOrderDetails} color='error' autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OmHeader header={`Order Details - ${customer.firstName} ${customer.lastName}`} />
                </Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' color='error' startIcon={<Delete />}
                        onClick={handleClickOpen}
                    >
                        Delete
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <OrderForm order={order} />
                </Grid>
            </Grid>
        </Container>
    );
}