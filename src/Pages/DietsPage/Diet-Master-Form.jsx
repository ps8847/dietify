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
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { MAIN_URL } from "../../Configs/Urls";

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

// Utility function to capitalize the first letter of each word
const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// // List of available categories
const categories = [
  "Early Morning",
  "Breakfast",
  "Mid Meal",
  "Lunch",
  "Mid Evening Meal",
  "Dinner",
  "All Day",
];

export default function DietPlanFormPage({ dietPlanId, onCloseForm, allAddedCategories }) {

  console.log("allAddedCategories is : ", allAddedCategories);

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
        .get(`${MAIN_URL}dietplans/${dietPlanId}`)
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
    setErrors({})
    setDietPlanData((prevData) => ({
      ...prevData,
      values: prevData.values.filter((chip) => chip !== chipToDelete),
    }));
  };

  const handleChipClick = (index, value) => {
    setErrors({})
    setEditIndex(index);
    setEditValue(value);
  };

  const handleEditConfirm = () => {
    setErrors({})
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
      ? `${MAIN_URL}dietplans/${dietPlanId}`
      : `${MAIN_URL}dietplans`;

    setLoading(true);

    axios[method](url, dietPlanData)
      .then((res) => {
        console.log("res is : ", res);

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
    setErrors({})
    if (inputValue) {
      // Capitalize the input value before adding
      setDietPlanData((prevData) => ({
        ...prevData,
        values: [...prevData.values, capitalizeWords(inputValue)],
      }));
      setCategoryName("");
    }
  };

  console.log("dietPlanData is : " , dietPlanData)

  const validate = () => {
    const newErrors = {};
    if (!dietPlanData.category) newErrors.category = "Category is required.";
    if (dietPlanData.values.length === 0)
      newErrors.values = "At least one diet should be there.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log("errors is : " , errors);
  

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }} required>
          <InputLabel>Category</InputLabel>
          <Select
            disabled={dietPlanId !== null}
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
            {
              categories.map((item, id) => {
                return <MenuItem value={item} disabled={allAddedCategories?.includes(item)}>{item}</MenuItem>
              })
            }

          </Select>
        </FormControl>
        {errors.category && <ErrorHeading errorName={errors.category}/> }

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
            +
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

        {errors.values && <ErrorHeading errorName={errors.values}/> }

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {dietPlanId ? (loading ? "Updating..." : "Update Diet Plan") : (loading ? "Adding..." : "Add Diet Plan")}
          </Button>
        </Stack>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}