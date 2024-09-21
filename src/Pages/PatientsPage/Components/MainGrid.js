import * as React from "react";
import { styled } from '@mui/material/styles';
import {
  Button,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomizedDataGrid from "../../Components/CustomizedDataGrid";
import { columns, rows } from "./gridData";
import PatientFormPage from "../Patient-Form";


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
    { key: 0, label: 'Sample 1' },
    { key: 1, label: 'Sample 2' },
    { key: 2, label: 'Sample 3' },
    { key: 3, label: 'Sample 4' },
    { key: 4, label: 'Sample 5' },
    { key: 5, label: 'Sample 5' },
    { key: 6, label: 'Sample 5' },
    { key: 7, label: 'Sample 5' },
  ]);

  let [addPatients , setaddPatients] = React.useState(false)

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Add Patient Button */}
    

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setaddPatients(!addPatients)}
      >
        {addPatients == false ? "Add Patient" : "View All Patients" }
      </Button>



      {/* Patients List */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
       {addPatients == false ? "Patients List" : "Add New Patient"}
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12}>
          {
            addPatients == true ? <PatientFormPage /> : <CustomizedDataGrid rows={rows} columns={columns}/>
          }
        </Grid>
      </Grid>
    </Box>
  );
}
