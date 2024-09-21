import * as React from "react";
import { Box, Button, TextField, Typography, Stack, Chip, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export default function DietPlanFormPage() {
  const [category, setCategory] = React.useState('');
  const [items, setItems] = React.useState('');
  const [dietPlans, setDietPlans] = React.useState([]);
  const [chipData, setChipData] = React.useState([]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleItemAdd = () => {
    if (items) {
      setChipData([...chipData, { key: chipData.length, label: items }]);
      setItems(''); // Clear the input field after adding
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDietPlan = {
      category,
      items: chipData,
    };
    setDietPlans([...dietPlans, newDietPlan]);
    setCategory('');
    setChipData([]);
    console.log("Diet Plan submitted", newDietPlan);
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
            value={category}
            onChange={handleCategoryChange}
            required
            label="Category"
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

        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter Diet item"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            sx={textFieldStyle}
          />
          <Button variant="contained" color="primary" onClick={handleItemAdd}>
            Add
          </Button>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 2 }}>
          {chipData.map((data) => (
            <ListItemStyled key={data.key} sx={{ listStyle: "none" }}>
              <Chip 
                label={data.label} 
                onDelete={handleDelete(data)} 
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
          <Button type="submit" variant="contained" color="primary">
            Save Diet Plan
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
