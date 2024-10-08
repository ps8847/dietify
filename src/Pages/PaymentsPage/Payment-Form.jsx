import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { MAIN_URL } from "../../Configs/Urls";

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

// Utility function to format today's date
const getFormattedDate = (date) => {

  if(date){
    const today = new Date(date);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
    
  } else {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;

  }
};

export default function PaymentFormPage({paymentId,onCloseForm}) {

  const [PaymentData, setPaymentData] = useState({
    payerName: "",
    amount: 1,
    paymentDate: getFormattedDate(null),
    paymentType: "",
    purpose: ""
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // For Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // For Snackbar severity
  const [errors, setErrors] = useState({});
console.log("errors is : " , errors);

  const [loading  ,  setLoading] = useState(false)

  
  useEffect(() => {
    if (paymentId) {
      axios
        .get(`${MAIN_URL}payments/${paymentId}`)
        .then((response) => {

          // make that array empty if 
response.data.paymentDate = getFormattedDate(response.data.paymentDate)
          setPaymentData(response.data);
        })
        .catch((error) => {
          setSnackbarMessage("Error fetching payment data.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  }, [paymentId]);


  const handleInputChange = (event) => {
    setErrors({})
    const { name, value } = event.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const validate = () => {
    const newErrors = {};

    if (!PaymentData.payerName) newErrors.payerName = "PayerName is required.";
    if (!PaymentData.amount || PaymentData.amount < 1)
      newErrors.amount = "Amount must be a positive number.";
   
    if (!PaymentData.paymentType)
      newErrors.paymentType = "Payment Type is required.";

    if (!PaymentData.purpose)
      newErrors.purpose = "Purpose is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    PaymentData.paymentDate = new Date(PaymentData.paymentDate)

    const method = paymentId ? "put" : "post";
    const url = paymentId
      ? `${MAIN_URL}payments/${paymentId}`
      : `${MAIN_URL}payments`

    setLoading(true)
    
    axios[method](url, PaymentData)
    .then(() => {
        setSnackbarMessage(
          paymentId
          ? "Payment updated successfully!"
          : "Payment added successfully!"
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };



  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
      <form onSubmit={handleSubmit}>
        {/* Payment Type */}
        <FormControl fullWidth sx={{ marginTop: "15px" }}>
          <InputLabel id="payment-type-label" sx={{
            background: "#f5f6fa",
            paddingLeft: "5px",
            paddingRight: "5px",
            transform: "translate(14px, 12px) scale(1)",
            '&.MuiInputLabel-shrink': {
              transform: "translate(14px, -6px) scale(0.75)",
            },
          }}>Payment Type</InputLabel>
          <Select
            name="paymentType"
            sx={{
              '& .MuiSelect-select': {
                padding: "12px 14px",
              },
            }}
            labelId="payment-type-label"
            value={PaymentData.paymentType}
            label="Payment Type"
            onChange={handleInputChange}
            required
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        {errors.paymentType && <ErrorHeading errorName={errors.paymentType}/> }


        {/* Date of Payment */}
        <TextField
          fullWidth
          error={!!errors.paymentDate}
          helperText={errors.paymentDate}
          variant="outlined"
          type="date"
          name="paymentDate"
          required
          value={PaymentData.paymentDate}
          onChange={handleInputChange}
          sx={{ marginTop: "15px", ...textFieldStyle }}
          InputLabelProps={{
            shrink: true, // to ensure the label stays in place
          }}
        />

        {/* Purpose/Comment */}
        <TextField
          fullWidth
          error={!!errors.purpose}
          helperText={errors.purpose}
          name="purpose"
          variant="outlined"
          placeholder="Enter the purpose or any comments"
          value={PaymentData.purpose}
          onChange={handleInputChange}
          sx={{ marginTop: "15px", ...textFieldStyle }}
        />

        {/* Payment name*/}
        <TextField
          fullWidth
          error={!!errors.payerName}
          helperText={errors.payerName}
          name="payerName"
          variant="outlined"
          placeholder="Enter the Payer's Name"
          value={PaymentData.payerName}
          onChange={handleInputChange}
          sx={{ marginTop: "15px", ...textFieldStyle }}
        />

        {/* More Payment Details - Amount, Method */}
        <TextField
          fullWidth
          error={!!errors.amount}
          helperText={errors.amount}
          name="amount"
          variant="outlined"
          placeholder="Enter amount"
          type="number"
          value={PaymentData.amount}
          onChange={handleInputChange}
          required
          sx={{ marginTop: "15px", ...textFieldStyle }}
        />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button type="submit" variant="contained" color="primary">
          {paymentId ? `${loading == true ? "Updating" : "Update"} Payment` : `${loading == true ? "Adding" : "Add"} Payment`}
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
