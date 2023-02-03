import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import OmGrid from '../../../components/elements/OmGrid';
import { Customer, Order } from '../../../graphql/generated/schema';
import LaunchIcon from '@mui/icons-material/Launch';

interface OrderListProps {
    orders: Order[]
}

export default function OrderList({orders} : OrderListProps) {
    const [columnDefs] = useState([
        {
            field: 'id',
            width: 50,
            suppressSizeToFit: true,
            cellRenderer: function(params: any) {
                return (
                    <IconButton onClick={() => window.open(`/orders/${params.value}`, "_black")}>
                        <LaunchIcon fontSize="small" color="secondary"/>
                    </IconButton>
                );
            }
        },
        { 
            field: 'customer', 
            cellRenderer: function(params: any) {
                const customer = params.value as Customer;
                return customer.firstName + ' ' + customer.lastName;
            }
        },
        { 
            field: 'orderDate' 
        },
        { field: 'status' }
    ]);

    return (
        <OmGrid columnDefs={columnDefs} rowData={orders} />
    );
}