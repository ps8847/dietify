import * as React from "react";
import { styled } from '@mui/material/styles';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomizedDataGrid from "./CustomizedDataGrid";
import Chip from '@mui/material/Chip';
import TagFacesIcon from '@mui/icons-material/TagFaces';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Adjust for mobile view
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  "@media (min-width:600px)": {
    // Breakpoint for larger screens
    width: 600,
  },
};

const textFieldStyle = {
  "& .MuiInputLabel-root": {
    color: "#9e9e9e", // Dimmed label color
    fontSize: "0.75rem", // Smaller font size for the label
    marginTop: "12px", // Space between label and input
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e0e0e0", // Light border color
    },
    "&:hover fieldset": {
      borderColor: "#bdbdbd", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#90caf9", // Border color when focused
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px", // Padding inside the input
  },
};

export default function MainGrid() {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission goes here
    console.log("Patient form submitted");
    handleClose();
  };

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };


  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Add Patient Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Add Patient
      </Button>

      {/* Patient Form Modal */}
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add New Patient
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <TextField
                fullWidth
                variant="outlined"
                // label="Patient Name"
                placeholder="Enter patient name"
                required
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                variant="outlined"
                // label="Age"
                type="number"
                placeholder="Enter age"
                required
                sx={textFieldStyle}
              />
            </div>

            <div style={{ display: "flex", gap: "5px" }}>
              <TextField
                fullWidth
                variant="outlined"
                // label="Gender"
                placeholder="Enter gender"
                required
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                variant="outlined"
                // label="Contact Number"
                placeholder="Enter contact number"
                required
                sx={textFieldStyle}
              />
            </div>

            <TextField
              fullWidth
              variant="outlined"
              // label="Email"
              type="email"
              placeholder="Enter email"
              required
              sx={textFieldStyle}
            />

            
<TextField
              fullWidth
              variant="outlined"
              // label="Emergency Contact"
              placeholder="Enter emergency contact"
              required
              sx={textFieldStyle}
            />

            <div style={{ display: "flex", padding: "10px 10px" , border:"1px solid hsl(220, 20%, 65%)" , flexDirection:"column" , gap:"10px" , borderRadius:"3px"}}>
              <div style={{ display: "flex", gap: "15px" , width:"100%"}}>
                <TextField
                  fullWidth
                  variant="outlined"
                  // label="Medical Conditions"
                  placeholder="Enter medical conditions"
                  sx={textFieldStyle}
                />
                <Button variant="contained" color="primary">
                  Add
                </Button>
              </div>
{
  chipData.length > 0 &&
<div style={{display:"flex" }}>
      {chipData.map((data) => {
        let icon;

        return (
          <ListItem key={data.key} sx={{listStyle:"none"}}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}

</div>
}
 
            </div>

            <div style={{ display: "flex", padding: "10px 10px" , border:"1px solid hsl(220, 20%, 65%)" , borderRadius:"3px"}}>
              <div style={{ display: "flex", gap: "15px" , width:"100%"}}>
                <TextField
                  fullWidth
                  variant="outlined"
                  // label="Medical Conditions"
                  placeholder="Enter allergies"
                  sx={textFieldStyle}
                />
                <Button variant="contained" color="primary">
                  Add
                </Button>
              </div>
            </div>

            <div style={{ display: "flex", padding: "10px 10px" , border:"1px solid hsl(220, 20%, 65%)" , borderRadius:"3px"}}>
              <div style={{ display: "flex", gap: "15px" , width:"100%"}}>
                <TextField
                  fullWidth
                  variant="outlined"
                  // label="Medical Conditions"
                  placeholder="Enter current medications"
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>

      {/* Patients List */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Patients List
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>
    </Box>
  );
}
