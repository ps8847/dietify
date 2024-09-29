import * as React from "react";
import { Box, Button, TextField, Typography, Stack, Chip, MenuItem, Select, InputLabel, FormControl ,  Snackbar,
  Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ListItemStyled = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const textFieldStyle = {
  "& .MuiInputLabel-root": {
    color: "#9e9e9e",
    fontSize: "0.75rem",
    marginTop: "12px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#bdbdbd",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#90caf9",
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px",
  },
};

const ErrorHeading = ({ errorName }) => {
  return (
    <Typography
      color="hsl(0, 90%, 40%)"
      sx={{
        fontSize: "0.75rem",
        fontWeight: 400,
        fontFamily: "Roboto",
        lineHeight: 1.66,
        textAlign: "left",
        marginTop: "3px",
        marginLeft: "14px",
        marginRight: "14px",
      }}
    >
      {errorName}
    </Typography>
  );
};

export default function DietPlanFormPage({ dietPlanId , onCloseForm}) {

  const [dietPlanData, setdietPlanData] = useState({
    category: "",
    values: [],
  });

  const [categoryName, setcategoryName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // For Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // For Snackbar severity
  const [errors, setErrors] = useState({});

  const [loading  ,  setLoading] = useState(false)


  useEffect(() => {
    if (dietPlanId) {
      axios
        .get(`http://127.0.0.1:8000/api/dietplans/${dietPlanId}`)
        .then((response) => {
        
          setdietPlanData(response.data);
        })
        .catch((error) => {
          setSnackbarMessage("Error fetching DietPlan data.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  }, [dietPlanId]);

  const handleDelete = (chipToDelete, type) => () => {
    setdietPlanData((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((chip) => chip !== chipToDelete),
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setdietPlanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!dietPlanData.category) newErrors.category = "Category is required.";
    if (dietPlanData.values.length == 0) newErrors.values = "Atleast One Diet Should be there";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

// console.log(errors);
// console.log(dietPlanData);


  const handleSubmit = (event) => {

    // alert("here")
    event.preventDefault();

    if (!validate()) return;

    const method = dietPlanId ? "put" : "post";
    const url = dietPlanId
      ? `http://127.0.0.1:8000/api/dietplans/${dietPlanId}`
      : `http://127.0.0.1:8000/api/dietplans`

    setLoading(true)
    
    axios[method](url, dietPlanData)
    .then(() => {
        setSnackbarMessage(
          dietPlanId
          ? "DietPlan updated successfully!"
          : "DietPlan added successfully!"
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

  const addChip = (type, inputValue) => {
    if (inputValue) {
      setdietPlanData((prevData) => ({
        ...prevData,
        [type]: [...prevData[type], inputValue],
      }));
      switch (type) {
        case "categoryName":
          setcategoryName("");
          break;
        default:
          break;
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
      <form onSubmit={handleSubmit}>
        {
          dietPlanId == null &&
        <FormControl fullWidth sx={{ marginBottom: 2 }} required>
          <InputLabel
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
            Category
          </InputLabel>
          <Select
          disabled={dietPlanId !== null}
            value={dietPlanData.category}
            required
            label="Category"
            name="gender"
            onChange={handleInputChange}
            sx={{
              '& .MuiSelect-select': {
                padding: "12px 14px",
              },
            }}
          >

            <MenuItem value="earlyMorning">Early Morning</MenuItem>
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="midMeal">Mid Meal</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="MidEveningMeal">Mid Evening Meal</MenuItem>
            <MenuItem value="Dinner">Dinner</MenuItem>
            <MenuItem value="allDay">All Day</MenuItem>
          </Select>
        </FormControl>
        }

        {errors.category && <ErrorHeading errorName={errors.category}/> }

        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter Diet item"
            value={categoryName}
            onChange={(e) => setcategoryName(e.target.value)}
            sx={textFieldStyle}
          />
          <Button variant="contained" color="primary" onClick={() => addChip("categoryName", categoryName)}>
            Add
          </Button>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 2 }}>
          {dietPlanData.values.map((data) => (
            <ListItemStyled key={data.key} sx={{ listStyle: "none" }}>
              <Chip 
                label={data} 
                onDelete={handleDelete(data, "values")}
                sx={{ 
                  height: '40px', 
                  fontSize: '1rem', 
                  padding: '10px 16px' 
                }} 
              />
            </ListItemStyled>
          ))}
        </Box>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>

        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {dietPlanId ? `${loading == true ? "Updating" : "Update"} DietPlan` : `${loading == true ? "Adding" : "Add"} DietPlan`}
        </Button>
        </Stack>
      </form>

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
            backgroundColor:
              snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
            fontWeight: 600,
            "& .MuiAlert-icon": {
              color: "#fff", // Set icon color to white
            },
            "& .MuiAlert-action svg": {
              color: "#fff", // Set the close (cross) icon color to white
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
