import React, { useState, useMemo } from 'react';
import { Customer, Address } from '../../../graphql/generated/schema';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface CustomerListProps {
    customers: Customer[]
}

export default function CustomerList({customers}: CustomerListProps) {
    const [columnDefs] = useState([
        {
            field: 'id',
            width: 50,
            suppressSizeToFit: true
        },
        { field: 'firstName' },
        { field: 'LastName' },
        { field: 'contactNumber' },
        { field: 'email' },
        { 
            field: 'address',
            cellRenderer: function(params: any) {
                const address = params.value as Address
                return address.addressLine1
                    + ', ' + address.addressLine2
                    + ', ' + address.city
                    + ', ' + address.state
                    + ', ' + address.country
            } 
        }
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true
    }), []);

    return (
        <div className='ag-theme-alpine' style={{ height: 500, width: '100%'}}>
            <AgGridReact 
                rowData={customers}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    );
}