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
