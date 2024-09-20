import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Chip, Stack, Button, Tooltip } from '@mui/material';
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
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
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
      field: 'age',
      headerName: 'Age',
      flex: 1,
      minWidth: 100,
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
      minWidth: 150,
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
      minWidth: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'medicalConditions',
      headerName: 'Medical Conditions',
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <Stack direction="column" pacing={1} sx={{p:1}} spacing={1} wrap="wrap">
          {params.value.map((condition, index) => (
            <Chip 
              key={index}
              label={condition} 
              color="primary" 
              variant="outlined" 
              style={{ marginBottom: '4px' }}
            />
          ))}
        </Stack>
      ),
    },
    {
      field: 'allergies',
      headerName: 'Allergies',
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => (
        <Stack direction="column" pacing={1} sx={{p:1}} spacing={1} wrap="wrap">
          {params.value.map((allergy, index) => (
            <Chip 
              key={index}
              label={allergy} 
              color="secondary" 
              variant="outlined" 
              style={{ marginBottom: '4px' }}
            />
          ))}
        </Stack>
      ),
    },
    {
      field: 'currentMedications',
      headerName: 'Current Medications',
      flex: 1.5,
      minWidth: 180,
      renderCell: (params) => (
        <Stack direction="column" spacing={1} sx={{p:1}} wrap="wrap">
          {params.value.map((medication, index) => (
            <Chip 
              key={index}
              label={medication} 
              color="success" 
              variant="outlined" 
              style={{ marginBottom: '4px' }}
            />
          ))}
        </Stack>
      ),
    },
    {
      field: 'emergencyContact',
      headerName: 'Emergency Contact',
      flex: 1.5,
      minWidth: 180,
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
        <div style={{ display: 'flex', gap: '8px', padding: '5px', alignItems: 'center', justifyContent: 'center' , height:'100%' }}>
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
            color="danger"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.row)
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
      name: 'Doe',
      age: '25',
      gender: 'Male',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
      medicalConditions: ['Diabetes', 'Hypertension', 'Asthma', 'ill'],
      allergies: ['Peanuts'],
      currentMedications: ['Metformin', 'Lisinopril'],
      emergencyContact: 'Jane Doe (123-555-7890)',
    },
    {
      id: 2,
      name: 'Smith',
      age: '24',
      gender: 'Female',
      contactNumber: '555-123-4567',
      email: 'emily.smith@example.com',
      medicalConditions: ['Asthma'],
      allergies: ['Dust', 'Pollen'],
      currentMedications: ['Albuterol'],
      emergencyContact: 'Jack Smith (555-987-6543)',
    },
    {
      id: 3,
      name: 'Johnson',
      age: '21',
      gender: 'Male',
      contactNumber: '987-654-3210',
      email: 'michael.j@example.com',
      medicalConditions: ['High Cholesterol'],
      allergies: ['None'],
      currentMedications: ['Atorvastatin'],
      emergencyContact: 'Linda Johnson (987-321-6540)',
    },
    {
      id: 4,
      name: 'Williams',
      age: '35',
      gender: 'Female',
      contactNumber: '321-654-9870',
      email: 'sophia.w@example.com',
      medicalConditions: ['None'],
      allergies: ['Gluten'],
      currentMedications: ['None'],
      emergencyContact: 'None',
    },
    {
      id: 5,
      name: 'Brown',
      age: '40',
      gender: 'Male',
      contactNumber: '777-888-9999',
      email: 'david.b@example.com',
      medicalConditions: ['Arthritis'],
      allergies: ['None'],
      currentMedications: ['Ibuprofen'],
      emergencyContact: 'Emma Brown (777-999-8888)',
    },
    {
      id: 6,
      name: 'Jones',
      age: '45',
      gender: 'Female',
      contactNumber: '444-555-6666',
      email: 'ava.j@example.com',
      medicalConditions: ['Thyroid Disorder'],
      allergies: ['Lactose'],
      currentMedications: ['Levothyroxine'],
      emergencyContact: 'None',
    },
    {
      id: 7,
      name: 'Miller',
      age: '56',
      gender: 'Male',
      contactNumber: '999-111-2222',
      email: 'james.m@example.com',
      medicalConditions: ['Hypertension'],
      allergies: ['None'],
      currentMedications: ['Lisinopril'],
      emergencyContact: 'Nancy Miller (999-222-1111)',
    },
    {
      id: 8,
      name: 'Taylor',
      age: '14',
      gender: 'Female',
      contactNumber: '222-333-4444',
      email: 'olivia.t@example.com',
      medicalConditions: ['None'],
      allergies: ['Penicillin'],
      currentMedications: ['None'],
      emergencyContact: 'Chris Taylor (222-444-3333)',
    },
    {
      id: 9,
      name: 'Anderson',
      age: '89',
      gender: 'Male',
      contactNumber: '555-666-7777',
      email: 'william.a@example.com',
      medicalConditions: ['Migraines'],
      allergies: ['Shellfish'],
      currentMedications: ['Sumatriptan'],
      emergencyContact: 'Rachel Anderson (555-777-6666)',
    },
    {
      id: 10,
      name: 'Moore',
      age: '44',
      gender: 'Female',
      contactNumber: '888-999-0000',
      email: 'isabella.m@example.com',
      medicalConditions: ['Anxiety'],
      allergies: ['Latex'],
      currentMedications: ['Sertraline'],
      emergencyContact: 'Oliver Moore (888-000-9999)',
    },
    {
      id: 11,
      name: 'Clark',
      age: '31',
      gender: 'Female',
      contactNumber: '111-222-3333',
      email: 'laura.c@example.com',
      medicalConditions: ['None'],
      allergies: ['None'],
      currentMedications: ['None'],
      emergencyContact: 'None',
    },
    {
      id: 12,
      name: 'Martinez',
      age: '29',
      gender: 'Male',
      contactNumber: '222-333-4444',
      email: 'carlos.m@example.com',
      medicalConditions: ['Kidney Stones'],
      allergies: ['Sulfa Drugs'],
      currentMedications: ['Tamsulosin'],
      emergencyContact: 'Elena Martinez (222-444-5555)',
    },
    {
      id: 13,
      name: 'Garcia',
      age: '33',
      gender: 'Female',
      contactNumber: '333-444-5555',
      email: 'maria.g@example.com',
      medicalConditions: ['Diabetes'],
      allergies: ['None'],
      currentMedications: ['Insulin'],
      emergencyContact: 'Juan Garcia (333-555-6666)',
    },
    {
      id: 14,
      name: 'Rodriguez',
      age: '38',
      gender: 'Male',
      contactNumber: '444-555-6666',
      email: 'luis.r@example.com',
      medicalConditions: ['Hypertension'],
      allergies: ['None'],
      currentMedications: ['Amlodipine'],
      emergencyContact: 'Isabella Rodriguez (444-666-7777)',
    },
    {
      id: 15,
      name: 'Martins',
      age: '52',
      gender: 'Female',
      contactNumber: '555-666-7777',
      email: 'susan.m@example.com',
      medicalConditions: ['Osteoporosis'],
      allergies: ['None'],
      currentMedications: ['Calcium Supplements'],
      emergencyContact: 'Henry Martins (555-777-8888)',
    },
    {
      id: 16,
      name: 'Thompson',
      age: '62',
      gender: 'Male',
      contactNumber: '666-777-8888',
      email: 'george.t@example.com',
      medicalConditions: ['COPD'],
      allergies: ['None'],
      currentMedications: ['Inhalers'],
      emergencyContact: 'Lisa Thompson (666-888-9999)',
    },
    {
      id: 17,
      name: 'White',
      age: '47',
      gender: 'Female',
      contactNumber: '777-888-9999',
      email: 'rachel.w@example.com',
      medicalConditions: ['Arthritis'],
      allergies: ['None'],
      currentMedications: ['Ibuprofen'],
      emergencyContact: 'Michael White (777-999-0000)',
    },
    {
      id: 18,
      name: 'King',
      age: '28',
      gender: 'Male',
      contactNumber: '888-999-0000',
      email: 'henry.k@example.com',
      medicalConditions: ['None'],
      allergies: ['Bee Stings'],
      currentMedications: ['None'],
      emergencyContact: 'Emily King (888-000-1111)',
    },
    {
      id: 19,
      name: 'Scott',
      age: '33',
      gender: 'Male',
      contactNumber: '999-000-1111',
      email: 'daniel.s@example.com',
      medicalConditions: ['Migraines'],
      allergies: ['None'],
      currentMedications: ['Sumatriptan'],
      emergencyContact: 'Sara Scott (999-111-2222)',
    },
    {
      id: 20,
      name: 'Green',
      age: '39',
      gender: 'Female',
      contactNumber: '111-222-3333',
      email: 'sophia.g@example.com',
      medicalConditions: ['PCOS'],
      allergies: ['None'],
      currentMedications: ['Metformin'],
      emergencyContact: 'John Green (111-333-4444)',
    },
  ];