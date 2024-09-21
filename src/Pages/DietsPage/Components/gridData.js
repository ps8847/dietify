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
 
  
  // Sample columns with customized rendering to display chips
  export const columns = [
    {
      field: 'morningRoutine',
      headerName: 'Morning Routine',
      width: 250,
      renderCell: (params) => (
        <Stack direction="column" spacing={1}>
          {params.value.map((chip, index) => (
            <Chip key={index} label={chip.label} />
          ))}
        </Stack>
      ),
    },
    {
      field: 'breakfast',
      headerName: 'Breakfast',
      width: 250,
      renderCell: (params) => (
        <Stack direction="column" spacing={1}>
          {params.value.map((chip, index) => (
            <Chip key={index} label={chip.label} />
          ))}
        </Stack>
      ),
    },
    {
      field: 'lunch',
      headerName: 'Lunch',
      width: 250,
      renderCell: (params) => (
        <Stack direction="column" spacing={1}>
          {params.value.map((chip, index) => (
            <Chip key={index} label={chip.label} />
          ))}
        </Stack>
      ),
    },
    {
      field: 'dinner',
      headerName: 'Dinner',
      width: 250,
      renderCell: (params) => (
        <Stack direction="column" spacing={1}>
          {params.value.map((chip, index) => (
            <Chip key={index} label={chip.label} />
          ))}
        </Stack>
      ),
    },
  ];
  
  // Sample rows with chip values for each meal period
  export const rows = [
    {
      id: 1,
      morningRoutine: [{ label: 'Yoga' }, { label: 'Meditation' }],
      breakfast: [{ label: 'Oatmeal' }, { label: 'Fruits' }],
      lunch: [{ label: 'Salad' }, { label: 'Chicken' }],
      dinner: [{ label: 'Soup' }, { label: 'Bread' }],
    },
    {
      id: 2,
      morningRoutine: [{ label: 'Jogging' }, { label: 'Stretching' }],
      breakfast: [{ label: 'Smoothie' }, { label: 'Eggs' }],
      lunch: [{ label: 'Rice' }, { label: 'Fish' }],
      dinner: [{ label: 'Steak' }, { label: 'Vegetables' }],
    },
  ];
  


  let data =[
    {
    heading : "Early Morning",
    plans : [{ label: 'Tea' }, { label: 'Rusk' }],
  },
    {
    heading : "BreakFast",
    plans : [{ label: 'Tea' }, { label: 'Rusk' }],
  },
    {
    heading : "Mid Meal",
    plans : [{ label: 'Tea' }, { label: 'Rusk' }],
  },
    {
    heading : "Lunch",
    plans : [{ label: 'Tea' }, { label: 'Rusk' }],
  },
    {
    heading : "Mid Evening Lunch",
    plans : [{ label: 'Tea' }, { label: 'Rusk' }],
  },
    {
    heading : "Dinner",
    plans : [{ label: 'Tea' }, { label: 'Rusk' }],
  },
    {
    heading : "AllDay",
    plans : [{ label: 'Tea' }, { label: 'Rusk' }],
  }
]