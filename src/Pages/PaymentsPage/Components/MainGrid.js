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
import PaymentFormPage from "../Payment-Form";


export default function MainGrid() {

  let [addPayments , setaddPayment] = React.useState(false)

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Add Patient Button */}
    

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setaddPayment(!addPayments)}
      >
        {addPayments == false ? "Add Payment" : "View All Payments" }
      </Button>

      {/* Patients List */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
       {addPayments == false ? "Payments" : "Add New Payment"}
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12}>
          {
            addPayments == true ? <PaymentFormPage /> : <CustomizedDataGrid rows={rows} columns={columns}/>
          }
        </Grid>
      </Grid>
    </Box>
  );
}
