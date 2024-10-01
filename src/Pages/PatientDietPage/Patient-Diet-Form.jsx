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
  const [isForAdd, setisForAdd] = useState(true);
  const [planId, setPlanId] = useState(null);
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
      .get(`https://doctorbackend.mhtm.ca/api/patients/${patientId}`)
      .then((response) => {
        setFetchedPatientData(response.data);
        if (response.data.hasPlan == true) {
          setisForAdd(false)
          setPlanId(response.data.planId)
        }
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
      const response = await axios.get("https://doctorbackend.mhtm.ca/api/dietplans");
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

  console.log("mainDietPlans is : " , mainDietPlans);
  

  let fetchPatientDietData = async () => {
    await axios
      .get(`https://doctorbackend.mhtm.ca/api/patientdietplans/${planId}`)
      .then((response) => {
        console.log("the response here is : ", response);

        setmainDietPlans((prev) => ({
          ...prev,  // Spread the previous state
          ...response.data.DietPlan.DietPlan,  // Spread the fetched diet plan data, which should overwrite the relevant days
        }));

      })
      .catch((error) => {
        setSnackbarMessage("Error fetching Diet Plan data.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  useEffect(() => {
    if (isForAdd == false) {
      fetchPatientDietData()
    }
  }, [isForAdd])


  const handlePlanChange = (category, labels) => {
    // Capitalize the first letter of each word and remove duplicates (case-insensitive)
    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  
    const uniqueLabels = Array.from(
      new Set(labels.map(label => label.toLowerCase()))
    ).map(capitalizeFirstLetter);
  
    // Update the mainDietPlans state
    setmainDietPlans((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [category]: uniqueLabels,
      },
    }));
  };
  
  

  const handleSave = () => {

    console.log("Final Diet Plan:", mainDietPlans);
    console.log("planId is : ", planId);

    // Check if all days are empty
    const allDaysEmpty = Object.values(mainDietPlans).every(dayPlan => {
      // Check if the dayPlan is empty or all categories inside it are empty arrays
      return Object.values(dayPlan).every(categoryValues => categoryValues.length === 0);
    });

    if (allDaysEmpty) {
      setSnackbarMessage("Select at least one Diet Rule for the Patient");
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // Show Snackbar on error
      setLoading(false);
      return;
    }


    let mainRequestStruc = {
      patientId,
      DietPlan: mainDietPlans
    }

    const method = planId ? "put" : "post";
    const url = planId
      ? `https://doctorbackend.mhtm.ca/api/patientdietplans/${planId}`
      : `https://doctorbackend.mhtm.ca/api/patientdietplans`

    setLoading(true)

    axios[method](url, mainRequestStruc)
      .then((res) => {
        console.log(res);

        setSnackbarMessage(
          planId
            ? "Patient's Diet Plan updated successfully!"
            : "Patient's Diet Plan added successfully!"
        );
        setSnackbarSeverity("success");
        setOpenSnackbar(true); // Show Snackbar on success

        // Set a timeout for 2 seconds (2000 ms) before calling setAddPatients(false)
        setTimeout(() => {
          onCloseForm();
        }, 2000); // 2 seconds delay
        setLoading(false)

      })
      .catch((error) => {
        setSnackbarMessage(error?.response?.data?.message ? error?.response.data.message : "Error submitting form. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true); // Show Snackbar on error
        console.error("Error submitting form:", error);
        setLoading(false)
      });

  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  console.log("FetchedDietPlan is : " , FetchedDietPlan);
  
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
        checked={mainDietPlans[selectedDay][meal.category]?.some(
          (selectedPlan) => selectedPlan.toLowerCase() === plan.toLowerCase()
        )}
      />
      <ListItemText primary={plan} />
    </MenuItem>
  ))}
</Select>

  </FormControl>
))}

        </Box>
      </Box>

      <Button variant="contained" color="primary" disabled={loading} onClick={handleSave} style={{ marginTop: 20 }}>
        {planId ? "Update" : "Save"} Diet Plan
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
