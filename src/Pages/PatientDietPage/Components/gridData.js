import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Chip, Stack, Button, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

const handleEdit = (row) => {
    console.log('Edit row:', row);
  };
  
  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };
  
  export const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%", whiteSpace: "normal", overflowWrap: "anywhere" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'age',
      headerName: 'Age',
      flex: 1,
      minWidth: 50,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      flex: 1.5,
      minWidth: 100,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.5,
      minWidth: 100,
      renderCell: (params) => (
        <div style={{ display: 'flex', overflow:"wrap", justifyContent: 'start', alignItems: 'center', height: '100%' , flexWrap:"wrap" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px', padding: '5px', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {params.row.hasPlan ? (
            <>
              <Button
                variant="contained"
                color="danger"
                size="small"
                startIcon={<VisibilityIcon />}
                onClick={(event) => {
                  event.stopPropagation();
                  handleEdit(params.row);
                }}
              >
                View
              </Button>
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
                color="secondary"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(params.row);
                }}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
            
            {/* <div style={{ textAlign: 'center' }}>
              <span>❌</span><br />
              <span>No Plan Assigned</span>
            </div> */}

<Button
variant="contained"
color="primary"
size="small"
startIcon={<AddCircleIcon />}
onClick={(event) => {
  event.stopPropagation();
  handleEdit(params.row);
}}
>
Add Diet Plan
</Button>
            </>

          )}
        </div>
      ),
    },
  ];
  
  
  const generateRandomData = () => {
    const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis', 'Emma Wilson', 'Michael Taylor', 'Sophia Martinez', 'Daniel Anderson', 'Olivia Thomas'];
    const genders = ['Male', 'Female'];
    const randomRows = Array.from({ length: 10 }, (_, index) => {
      const name = names[Math.floor(Math.random() * names.length)];
      const age = Math.floor(Math.random() * (50 - 20 + 1)) + 20; // Age between 20 and 50
      const gender = genders[Math.floor(Math.random() * genders.length)];
      const contactNumber = `123-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
      const email = `${name.split(' ').join('.').toLowerCase()}@example.com`;
      const hasPlan = Math.random() < 0.5; // 50% chance of having a plan
  
      return {
        id: index + 1,
        name,
        age: age.toString(),
        gender,
        contactNumber,
        email,
        hasPlan,
      };
    });
  
    return randomRows;
  };
  
  export const rows = generateRandomData();
  