import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Checkbox,
  ListItemText,
  Alert,
  Snackbar,
} from '@mui/material';
import axios from 'axios';

const PatientDietForm = ({ patientId, onCloseForm }) => {
  const [FetchedPatientData, setFetchedPatientData] = useState(null);
  const [FetchedDietPlan, setFetchedDietPlans] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  let fetchPatientData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/patients/${patientId}`)
      .then((response) => {
        setFetchedPatientData(response.data);
      })
      .catch((error) => {
        setSnackbarMessage("Error fetching patient data.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const fetchDietPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/dietplans");
      setFetchedDietPlans(response.data);
    } catch (error) {
      setSnackbarMessage("Failed to fetch DietPlans. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientData();
      fetchDietPlans();
    }
  }, [patientId]);

  const [selectedDay, setSelectedDay] = useState("Sunday");

  const [mainDietPlans, setmainDietPlans] = useState({
    Sunday: {},
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
  });

  const handlePlanChange = (category, labels) => {

    setmainDietPlans((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [category]: labels,
      },
    }));
  };

  console.log("mainDietPlans is : " , mainDietPlans);
  

  const handleSave = () => {
    let isValid = true;
    let missingCategories = [];

    Object.entries(mainDietPlans[selectedDay]).forEach(([category, values]) => {
      if (!values || values.length === 0) {
        isValid = false;
        missingCategories.push(category);
      }
    });

    if (!isValid) {
      setSnackbarMessage(`Please select at least one value for: ${missingCategories.join(', ')}`);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // If all categories are valid, proceed with saving
    const finalPlan = Object.entries(mainDietPlans).reduce((acc, [day, plans]) => {
      if (Object.keys(plans).length > 0) {
        acc[day] = plans;
      }
      return acc;
    }, {});

    console.log("Final Diet Plan:", finalPlan);

    alert("Diet Plan saved successfully");
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <Paper style={{ padding: 20, backgroundColor: '#f5f8fa' }}>
      <Paper style={{ padding: '16px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Patient Information
        </Typography>
        <Typography>Name: {FetchedPatientData?.name}</Typography>
        <Typography>Age: {FetchedPatientData?.age}</Typography>
        <Typography>Gender: {FetchedPatientData?.gender}</Typography>
        <Typography>Contact: {FetchedPatientData?.contactNumber}</Typography>
        <Typography>Email: {FetchedPatientData?.email}</Typography>
      </Paper>

      <Box display="flex">
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

        <Box flexGrow={1}>
          {FetchedDietPlan?.map((meal) => (
            <FormControl fullWidth variant="outlined" margin="normal" key={meal.category}>
              <InputLabel
                id={`${meal.category}-label`}
                sx={{
                  background: "#f5f6fa",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  transform: "translate(14px, 12px) scale(1)",
                  '&.MuiInputLabel-shrink': {
                    transform: "translate(14px, -6px) scale(0.75)",
                  },
                }}
              >
                {meal.category}
              </InputLabel>
              <Select
                labelId={`${meal.category}-label`}
                multiple
                value={mainDietPlans[selectedDay][meal.category] || []}
                onChange={(e) => handlePlanChange(meal.category, e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                {meal.values.map((plan) => (
                  <MenuItem key={plan} value={plan}>
                    <Checkbox
                      checked={mainDietPlans[selectedDay][meal.category]?.includes(plan)}
                    />
                    <ListItemText primary={plan} />
                  </MenuItem>
                ))}
               
              </Select>
            </FormControl>
          ))}
        </Box>
      </Box>

      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 20 }}>
        Save Diet Plan
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            backgroundColor: snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
            fontWeight: 600,
            "& .MuiAlert-icon": {
              color: "#fff",
            },
            "& .MuiAlert-action svg": {
              color: "#fff",
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PatientDietForm;
