import React, { useState } from 'react';
import {
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Checkbox,
  ListItemText,
} from '@mui/material';


// Sample patient data
const patientData = {
  id: 1,
  name: 'John Doe',
  age: '30',
  gender: 'Male',
  contactNumber: '123-456-7890',
  email: 'john.doe@example.com',
};

// Sample diet data
const data = [
  {
    heading: "Early Morning",
    plans: [
      { label: 'Tea' }, { label: 'Rusk' },
      { label: "Banana" }, { label: "Orange" },
      { label: "Grapes" }, { label: 'Fruits' },
      { label: 'Dry Fruits' }
    ],
  },
  {
    heading: "Breakfast",
    plans: [{ label: 'Oatmeal' }, { label: 'Juice' }],
  },
  {
    heading: "Mid Meal",
    plans: [{ label: 'Fruits' }],
  },
  {
    heading: "Lunch",
    plans: [{ label: 'Rice' }, { label: 'Chicken' }],
  },
  {
    heading: "Mid Evening Snack",
    plans: [{ label: 'Nuts' }],
  },
  {
    heading: "Dinner",
    plans: [{ label: 'Pasta' }],
  },
  {
    heading: "All Day",
    plans: [{ label: 'Water' }],
  }
];

const PatientDietForm = () => {
  const [dietPlan, setDietPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState("Sunday");

  const handlePlanChange = (heading, labels) => {
    setDietPlan((prev) => ({
      ...prev,
      [heading]: labels,
    }));
  };

  const handleSave = () => {
    console.log("Saved Diet Plan:", dietPlan);
    // Add save logic here
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <Paper style={{ padding: 20, backgroundColor: '#f5f8fa' }}>
      {/* User Information Card */}
      <Paper style={{ padding: '16px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Patient Information
          </Typography>
          <Typography>Name: {patientData.name}</Typography>
          <Typography>Age: {patientData.age}</Typography>
          <Typography>Gender: {patientData.gender}</Typography>
          <Typography>Contact: {patientData.contactNumber}</Typography>
          <Typography>Email: {patientData.email}</Typography>
        </Paper>

      {/* Layout for Weekday Selection and Diet Plan Selection */}
      <Box display="flex" >

                {/* Weekday Selection */}
                <Box display="flex" flexDirection="column" marginRight={2} alignItems={'center'} justifyContent={'center'}>
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <Box
              key={day}
              onClick={() => handleDaySelect(day)}
              sx={{
                width: "70px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "2px 0",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: selectedDay === day ? 'lightblue' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <Typography variant="body2">{day}</Typography>
            </Box>
          ))}
        </Box>

        {/* Diet Plan Selection */}
        <Box flexGrow={1}>
          {data.map((meal) => (
            <FormControl fullWidth variant="outlined" margin="normal" key={meal.heading}>
              <InputLabel id={`${meal.heading}-label`}    sx={{
              background: "#f5f6fa",
              paddingLeft: "5px",
              paddingRight: "5px",
              transform: "translate(14px, 12px) scale(1)",
              '&.MuiInputLabel-shrink': {
                transform: "translate(14px, -6px) scale(0.75)",
              },
            }}>{meal.heading}</InputLabel>
              <Select
                labelId={`${meal.heading}-label`}
                multiple
                value={dietPlan[meal.heading] || []}
                onChange={(e) => handlePlanChange(meal.heading, e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                {meal.plans.map((plan) => (
                  <MenuItem key={plan.label} value={plan.label}>
                    <Checkbox checked={dietPlan[meal.heading] && dietPlan[meal.heading].includes(plan.label)} />
                    <ListItemText primary={plan.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Box>


      </Box>

      {/* Save Button */}
      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 20 }}>
        Save Diet Plan
      </Button>


    </Paper>
  );
};

export default PatientDietForm;
