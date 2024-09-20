import React from "react";
import { Box, Button, TextField, Typography, Stack, Chip, ListItem } from "@mui/material";
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

export default function PatientFormPage() {

    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Sample 1' },
        { key: 1, label: 'Sample 2' },
        { key: 2, label: 'Sample 3' },
        { key: 3, label: 'Sample 4' },
        { key: 4, label: 'Sample 5' },
      ]);
    

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Patient form submitted");
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Add New Patient
      </Typography> */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "5px" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter patient name"
            required
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            placeholder="Enter age"
            required
            sx={textFieldStyle}
          />
        </div>

        <div style={{ display: "flex", gap: "5px", marginTop: "15px" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter gender"
            required
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter contact number"
            required
            sx={textFieldStyle}
          />
        </div>

        <TextField
          fullWidth
          variant="outlined"
          type="email"
          placeholder="Enter email"
          required
          sx={textFieldStyle}
          style={{ marginTop: "15px" }}
        />

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter emergency contact"
          required
          sx={textFieldStyle}
          style={{ marginTop: "15px" }}
        />

        <div style={{ display: "flex", padding: "10px 10px", marginTop: "15px", border: "1px solid hsl(220, 20%, 65%)", borderRadius: "3px", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter medical conditions"
              sx={textFieldStyle}
            />
            <Button variant="contained" color="primary">
              Add
            </Button>
          </div>
          <div style={{display:"flex", overflowY: "auto", maxHeight: "150px", flexWrap: "wrap"}}>
            {chipData.map((data) => (
              <ListItemStyled key={data.key} sx={{listStyle:"none"}}>
                <Chip label={data.label} onDelete={handleDelete(data)} />
              </ListItemStyled>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", padding: "10px 10px", marginTop: "15px", border: "1px solid hsl(220, 20%, 65%)", borderRadius: "3px", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter allergies"
              sx={textFieldStyle}
            />
            <Button variant="contained" color="primary">
              Add
            </Button>
          </div>
          <div style={{display:"flex", overflowY: "auto", maxHeight: "150px", flexWrap: "wrap"}}>
            {chipData.map((data) => (
              <ListItemStyled key={data.key} sx={{listStyle:"none"}}>
                <Chip label={data.label} onDelete={handleDelete(data)} />
              </ListItemStyled>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", padding: "10px 10px", marginTop: "15px", border: "1px solid hsl(220, 20%, 65%)", borderRadius: "3px", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter current meditations"
              sx={textFieldStyle}
            />
            <Button variant="contained" color="primary">
              Add
            </Button>
          </div>
       
        </div>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button type="submit" variant="contained" color="primary">
            Add Traveller
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
