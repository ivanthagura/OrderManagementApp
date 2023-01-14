import React, { useState } from 'react';
import OmGrid from '../../../components/elements/OmGrid';
import { Customer, Order } from '../../../graphql/generated/schema';

interface OrderListProps {
    orders: Order[]
}

export default function OrderList({orders} : OrderListProps) {
    const [columnDefs] = useState([
        {
            field: 'id',
            width: 50,
            suppressSizeToFit: true
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