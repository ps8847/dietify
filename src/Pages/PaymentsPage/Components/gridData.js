import * as React from 'react';
import { Chip, Stack, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const handleEdit = (row) => {
    console.log('Edit row:', row);
};

const handleDelete = (row) => {
    console.log('Delete row:', row);
};

export const columns = [
    {
        field: 'paymentId',
        headerName: 'Payment ID',
        flex: 1,
        minWidth: 120,
        renderCell: (params) => (
            <div style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                whiteSpace: "normal",
                overflowWrap: "anywhere"
            }}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'payerName',
        headerName: 'Payer Name',
        flex: 1.5,
        minWidth: 150,
        renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'amount',
        headerName: 'Amount ($)',
        flex: 1,
        minWidth: 100,
        renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'paymentDate',
        headerName: 'Payment Date',
        flex: 1.5,
        minWidth: 150,
        renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'paymentType',
        headerName: 'Payment Type',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => (
          <div style={{display:"flex" , alignItems : "center" , justifyContent:"start" , height:"100%"}}> 

<Chip
    label={params.value}
    color={params.value === 'Credit Card' ? 'primary' : 'secondary'}
    variant="outlined"
    style={{ marginBottom: '4px' }}
/>
          </div>
        ),
    },
    {
        field: 'purpose',
        headerName: 'Purpose',
        flex: 1.5,
        minWidth: 200,
        renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 180,
        sortable: false,
        renderCell: (params) => (
            <div style={{ display: 'flex', gap: '8px', padding: '5px', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleEdit(params.row);
                    }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(params.row);
                    }}
                >
                    Delete
                </Button>
            </div>
        ),
    },
];

export const rows = [
    {
        id: 1,
        paymentId: 'P001',
        payerName: 'John Doe',
        amount: '200.00',
        paymentDate: '2024-09-01',
        paymentType: 'Credit Card',
        purpose: 'Consultation Fee',
    },
    {
        id: 2,
        paymentId: 'P002',
        payerName: 'Emily Smith',
        amount: '150.00',
        paymentDate: '2024-09-03',
        paymentType: 'Bank Transfer',
        purpose: 'Medication Fee',
    },
    {
        id: 3,
        paymentId: 'P003',
        payerName: 'Michael Johnson',
        amount: '100.00',
        paymentDate: '2024-09-05',
        paymentType: 'Cash',
        purpose: 'Diet Plan Fee',
    },
    {
        id: 4,
        paymentId: 'P004',
        payerName: 'Sophia Williams',
        amount: '250.00',
        paymentDate: '2024-09-06',
        paymentType: 'Credit Card',
        purpose: 'Surgery Fee',
    },
    {
        id: 5,
        paymentId: 'P005',
        payerName: 'David Brown',
        amount: '180.00',
        paymentDate: '2024-09-07',
        paymentType: 'PayPal',
        purpose: 'Follow-up Visit',
    },
];
