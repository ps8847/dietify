import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";

const ListItemStyled = styled("li")(({ theme }) => ({
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

// Utility function to capitalize the first letter of each word
const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function DietPlanFormPage({ dietPlanId, onCloseForm }) {
  const [dietPlanData, setDietPlanData] = useState({
    category: "",
    values: [],
  });

  const [categoryName, setCategoryName] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track index of editing chip
  const [editValue, setEditValue] = useState(""); // Track value of editing chip
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (dietPlanId) {
      axios
        .get(`https://doctorbackend.mhtm.ca/api/dietplans/${dietPlanId}`)
        .then((response) => {
          setDietPlanData(response.data);
        })
        .catch(() => {
          setSnackbarMessage("Error fetching DietPlan data.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  }, [dietPlanId]);

  const handleDelete = (chipToDelete) => () => {
    setDietPlanData((prevData) => ({
      ...prevData,
      values: prevData.values.filter((chip) => chip !== chipToDelete),
    }));
  };

  const handleChipClick = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleEditConfirm = () => {
    const updatedValues = [...dietPlanData.values];
    // Capitalize the edited value before saving
    updatedValues[editIndex] = capitalizeWords(editValue);
    setDietPlanData((prevData) => ({
      ...prevData,
      values: updatedValues,
    }));
    setEditIndex(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const method = dietPlanId ? "put" : "post";
    const url = dietPlanId
      ? `https://doctorbackend.mhtm.ca/api/dietplans/${dietPlanId}`
      : `https://doctorbackend.mhtm.ca/api/dietplans`;

    setLoading(true);

    axios[method](url, dietPlanData)
      .then(() => {
        setSnackbarMessage(
          dietPlanId
            ? "DietPlan updated successfully!"
            : "DietPlan added successfully!"
        );
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          onCloseForm();
        }, 2000);
        setLoading(false);
      })
      .catch((error) => {
        setSnackbarMessage("Error submitting form.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setLoading(false);
      });
  };

  const addChip = (inputValue) => {
    if (inputValue) {
      // Capitalize the input value before adding
      setDietPlanData((prevData) => ({
        ...prevData,
        values: [...prevData.values, capitalizeWords(inputValue)],
      }));
      setCategoryName("");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!dietPlanData.category) newErrors.category = "Category is required.";
    if (dietPlanData.values.length === 0)
      newErrors.values = "At least one diet should be there.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }} required>
          <InputLabel>Category</InputLabel>
          <Select
            value={dietPlanData.category}
            required
            label="Category"
            name="category"
            onChange={(e) =>
              setDietPlanData((prevData) => ({
                ...prevData,
                category: e.target.value,
              }))
            }
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

        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter Diet item"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={textFieldStyle}
          />
          <Button variant="contained" color="primary" onClick={() => addChip(categoryName)}>
            Add
          </Button>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 2 }}>
          {dietPlanData.values.map((data, index) =>
            editIndex === index ? (
              <TextField
                key={index}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleEditConfirm}
                onKeyPress={(e) => e.key === "Enter" && handleEditConfirm()}
                autoFocus
              />
            ) : (
              <ListItemStyled key={index} sx={{ listStyle: "none" }}>
                <Chip
                  label={data}
                  onClick={() => handleChipClick(index, data)}
                  onDelete={handleDelete(data)}
                  sx={{
                    height: "40px",
                    fontSize: "1rem",
                    padding: "10px 16px",
                  }}
                />
              </ListItemStyled>
            )
          )}
        </Box>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {dietPlanId ? (loading ? "Updating..." : "Update DietPlan") : (loading ? "Adding..." : "Add DietPlan")}
          </Button>
        </Stack>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}
