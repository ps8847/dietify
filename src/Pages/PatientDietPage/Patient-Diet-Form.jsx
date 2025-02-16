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
  Autocomplete,
  TextField,
  Chip,
} from '@mui/material';
import axios from 'axios';
import { MAIN_URL } from '../../Configs/Urls';
import dayjs from "dayjs";

const categories = [
  "Early Morning",
  "Breakfast",
  "Mid Meal (after 2 hours)",
  "Lunch",
  "Evening",
  "Pre Dinner",
  "Dinner",
  'Post Dinner'
];

let setLocalStorageJSON = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
let getLocalStorageJSON = (key) => {
  let dd = localStorage.getItem(key);
  return JSON.parse(dd);
};

let removeLocalStorageJSON = (key) => {
  localStorage.removeItem(key);
};

const generateWeeklyRanges = () => {
  const weeks = [];
  const today = dayjs(); // Current date using dayjs
  const startOfWeek = today.startOf('week').add(1, 'day'); // Adjust to Monday
  const oneYearFromToday = today.add(1, 'year');

  let currentStartOfWeek = startOfWeek;

  while (currentStartOfWeek.isBefore(oneYearFromToday)) {
    const startDate = currentStartOfWeek.format("DD-MM-YYYY");
    const endDate = currentStartOfWeek.add(6, 'days').format("DD-MM-YYYY");
    weeks.push({ date1: startDate, date2: endDate });
    currentStartOfWeek = currentStartOfWeek.add(7, 'days'); // Move to the next week
  }

  return weeks;
};


const categoryOrder = categories.reduce((acc, category, index) => {
  acc[category] = index;
  return acc;
}, {});


const PatientDietForm = ({ name, patientId, planId, selectedPlansWeeks, selectedWeekdefault, onCloseForm, showPatientInfo }) => {

  const [FetchedPatientData, setFetchedPatientData] = useState(null);
  const [FetchedDietPlan, setFetchedDietPlans] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [currentSelections, setCurrentSelections] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(selectedWeekdefault || "");

  useEffect(() => {

    if (planId == null) {

      let dataOfPreSave = getLocalStorageJSON(`patient_plan_${patientId}`);

      if (dataOfPreSave) {
        setSelectedDay(dataOfPreSave.dayOfWeek)
        setCurrentSelections(dataOfPreSave.currentSelections)
        setSelectedWeek(dataOfPreSave.selectedWeek)
      }

    }
  }, [])

  console.log("FetchedDietPlan is : ", FetchedDietPlan);

  const [mainDietPlans, setmainDietPlans] = useState({
    Sunday: {},
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
  });

  let pastePlan = () => {

    let dd = getLocalStorageJSON("CopiedPlan");

    setCurrentSelections(dd)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const weeklyRanges = generateWeeklyRanges();

  const handleWeekChange = (event) => {

    let week = event.target.value;

    let dataOfPreSave = getLocalStorageJSON(`patient_plan_${patientId}`);

    if (dataOfPreSave) {

      let dd = {
        ...dataOfPreSave,
        selectedWeek: week
      }

      setLocalStorageJSON(`patient_plan_${patientId}`, dd);

    } else {

      let dd = {
        dayOfWeek: "Sunday",
        currentSelections: {},
        selectedWeek: week
      }

      setLocalStorageJSON(`patient_plan_${patientId}`, dd)

    }

    setSelectedWeek(week);
  };

  let fetchPatientData = async () => {
    await axios
      .get(`${MAIN_URL}patients/${patientId}`)
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
      const response = await axios.get(`${MAIN_URL}dietplans`);

      // Sort diet plans based on the category order
      const sortedDietPlans = response.data.sort((a, b) => {
        return categoryOrder[a.category] - categoryOrder[b.category];
      });

      setFetchedDietPlans(sortedDietPlans);
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
      fetchDietPlans();
      fetchPatientData();
    }
  }, [patientId]);

  let fetchPatientDietData = async () => {
    await axios
      .get(`${MAIN_URL}patientdietplans/${planId}`)
      .then((response) => {

        console.log("the response is ");

        setmainDietPlans((prev) => ({
          ...prev,
          ...response.data.DietPlan.DietPlan,
        }));
        setCurrentSelections((prev) => ({
          ...prev,
          ...response.data.DietPlan.DietPlan,
        }));
      })
      .catch((error) => {
        setSnackbarMessage("Error fetching Diet Plan data.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  useEffect(() => {
    if (planId) {
      fetchPatientDietData();
    }
  }, [planId]);

  const handlePlanChange = (category, labels) => {

    const uniqueLabels = Array.from(
      new Set(labels)
    )

    let currentSelectionsCopy = { ...currentSelections };
    let newlyUpdated = {
      ...currentSelectionsCopy,
      [selectedDay]: {
        ...currentSelectionsCopy[selectedDay],
        [category]: uniqueLabels,
      },
    };

    let dataOfPreSave = getLocalStorageJSON(`patient_plan_${patientId}`);

    if (dataOfPreSave) {

      let dd = {
        ...dataOfPreSave,
        currentSelections: newlyUpdated
      }

      setLocalStorageJSON(`patient_plan_${patientId}`, dd);

    } else {

      let dd = {
        dayOfWeek: "Sunday",
        currentSelections: newlyUpdated,
        selectedWeek: ""
      }

      setLocalStorageJSON(`patient_plan_${patientId}`, dd)

    }


    setCurrentSelections(newlyUpdated);
  };

  const handleSave = () => {
    const allDaysEmpty = Object.values(currentSelections).every(dayPlan =>
      Object.values(dayPlan).every(categoryValues => categoryValues.length === 0)
    );

    if (selectedWeek == "") {
      setSnackbarMessage("Please Select the week for The Diet Plan");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    if (allDaysEmpty) {
      setSnackbarMessage("Select at least one Diet Rule for the Patient");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    setmainDietPlans(currentSelections);

    let mainRequestStruc = {
      patientName: name,
      patientId,
      DietPlan: currentSelections,
      weekDateStart: selectedWeek.split(" - ")[0],
      weekDateEnd: selectedWeek.split(" - ")[1],

    };

    const method = planId ? "put" : "post";
    const url = planId
      ? `${MAIN_URL}patientdietplans/${planId}`
      : `${MAIN_URL}patientdietplans`;

    setLoading(true);

    axios[method](url, mainRequestStruc)
      .then((res) => {
        removeLocalStorageJSON(`patient_plan_${patientId}`)
        setSnackbarMessage(planId
          ? "Patient's Diet Plan updated successfully!"
          : "Patient's Diet Plan added successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTimeout(() => {
          onCloseForm();
        }, 2000);
        setLoading(false);
      })
      .catch((error) => {
        setSnackbarMessage(error?.response?.data?.message || "Error submitting form. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setLoading(false);
      });
  };

  const handleDaySelect = (day) => {

    let dataOfPreSave = getLocalStorageJSON(`patient_plan_${patientId}`);

    if (dataOfPreSave) {

      let dd = {
        ...dataOfPreSave,
        dayOfWeek: day
      }

      setLocalStorageJSON(`patient_plan_${patientId}`, dd)
    } else {

      let dd = {
        currentSelections: {},
        dayOfWeek: day,
        selectedWeek: ""
      }

      setLocalStorageJSON(`patient_plan_${patientId}`, dd)

    }

    setSelectedDay(day);
  };

  const [editingChip, setEditingChip] = useState(null);
  const [editValue, setEditValue] = useState("");

  console.log("FetchedDietPlan is : ", FetchedDietPlan);
  console.log("currentSelections is : ", currentSelections);
  console.log("selectedDay is : ", selectedDay);

  return (
    <Paper style={{ padding: 20, backgroundColor: '#f5f8fa' }}>

      {
        showPatientInfo == true &&
        <Paper style={{ padding: '16px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>Patient Information</Typography>
          <Typography>Name: {FetchedPatientData?.name}</Typography>
          <Typography>Age: {FetchedPatientData?.age}</Typography>
          <Typography>Gender: {FetchedPatientData?.gender}</Typography>
          <Typography>Contact: {FetchedPatientData?.contactNumber}</Typography>
          <Typography>Email: {FetchedPatientData?.email}</Typography>
        </Paper>
      }

      <Box display="flex" flexDirection="row" justifyContent={"space-between"} alignItems={"center"}>

        {
          planId == null &&
          <FormControl fullWidth variant="outlined" sx={{ maxWidth: 400, marginBottom: 2 }}>
            <InputLabel id="weekly-range-label">Select Week</InputLabel>
            <Select
              labelId="weekly-range-label"
              value={selectedWeek}
              onChange={handleWeekChange}

              label="Select Week"
              sx={{
                background: "#fff",
                borderRadius: "8px",
                '& .MuiSelect-select': {
                  padding: "10px",
                },
              }}
            >
              {weeklyRanges.map((week, index) => (
                <MenuItem disabled={selectedPlansWeeks?.includes(`${week.date1} - ${week.date2}`)} key={index} value={`${week.date1} - ${week.date2}`}>
                  <Typography variant="body2" color="textPrimary">
                    {`${week.date1} - ${week.date2}`}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }


        <Button variant="contained" color="secondary" onClick={pastePlan} style={{ marginBottom: '20px' }}>
          Paste The Plan
        </Button>
        {/* {selectedWeek && (
          <Typography variant="h6" mt={2} mb={2}>
            Selected Week: {selectedWeek}
          </Typography>
        )} */}
      </Box>

      <Box display="flex">
        <Box display="flex" flexDirection="column" marginRight={2} alignItems={'center'} justifyContent={'center'}>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
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
                paddingLeft: '10px',
                paddingRight: '10px',
                cursor: "pointer",
                backgroundColor: selectedDay === day ? 'lightblue' : 'transparent',
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              <Typography variant="body2">{day}</Typography>
            </Box>
          ))}
        </Box>

        <Box flexGrow={1}>
          {categories?.map((category) => (
            <FormControl fullWidth variant="outlined" margin="normal" key={category}>
              <Autocomplete
                disableCloseOnSelect
                multiple
                options={Array.from(
                  new Set([
                    ...(FetchedDietPlan?.map((item) => item.value) || []),
                    ...(currentSelections[selectedDay]?.[category] || []),
                  ])
                )}
                value={currentSelections[selectedDay]?.[category] || []}
                onChange={(event, newValue) => handlePlanChange(category, newValue)}
                renderOption={(props, option, { selected }) => (
                  <MenuItem {...props} key={option} value={option}>
                    <Checkbox checked={selected} />
                    <ListItemText primary={option} />
                  </MenuItem>
                )}
                renderTags={(tagValues, getTagProps) =>
                  tagValues.map((option, index) => {
                    const isEditing = editingChip === option;
                    return isEditing ? (
                      <TextField
                        key={option}
                        size="small"
                        value={editValue}
                        autoFocus
                        onBlur={() => {
                          setEditingChip(null);
                          handlePlanChange(category, [
                            ...tagValues.filter((tag) => tag !== option),
                            editValue,
                          ]);
                        }}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setEditingChip(null);
                            handlePlanChange(category, [
                              ...tagValues.filter((tag) => tag !== option),
                              editValue,
                            ]);
                          }
                        }}
                      />
                    ) : (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={option}
                        onDoubleClick={() => {
                          setEditingChip(option);
                          setEditValue(option);
                        }}
                      />
                    );
                  })
                }
                renderInput={(params) => <TextField {...params} label={category} placeholder="Search..." />}
              />
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
            "& .MuiAlert-icon": { color: "#fff" },
            "& .MuiAlert-action svg": { color: "#fff" },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PatientDietForm;


