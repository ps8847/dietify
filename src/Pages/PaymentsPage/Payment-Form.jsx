import React, { useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";

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

// Utility function to format today's date
const getFormattedDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export default function PaymentFormPage() {
  const [paymentType, setPaymentType] = useState("");
  const [paymentDate, setPaymentDate] = useState(getFormattedDate()); // Set today's date by default
  const [purpose, setPurpose] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const paymentData = {
      paymentType,
      paymentDate,
      purpose,
    };
    console.log("Payment form submitted", paymentData);
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
      <form onSubmit={handleSubmit}>
        {/* Payment Type */}
        <FormControl fullWidth sx={{ marginTop: "15px" }}>
          <InputLabel id="payment-type-label"    sx={{
              background: "#f5f6fa",
              paddingLeft: "5px",
              paddingRight: "5px",
              transform: "translate(14px, 12px) scale(1)",
              '&.MuiInputLabel-shrink': {
                transform: "translate(14px, -6px) scale(0.75)",
              },
            }}>Payment Type</InputLabel>
          <Select
                      sx={{
                        '& .MuiSelect-select': {
                          padding: "12px 14px",
                        },
                      }}
            labelId="payment-type-label"
            value={paymentType}
            label="Payment Type"
            onChange={(e) => setPaymentType(e.target.value)}
            required
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="online">Online</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Date of Payment */}
        <TextField
          fullWidth
          variant="outlined"
          type="date"
          required
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          sx={{ marginTop: "15px", ...textFieldStyle }}
          InputLabelProps={{
            shrink: true, // to ensure the label stays in place
          }}
        />

        {/* Purpose/Comment */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter the purpose or any comments"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          sx={{ marginTop: "15px", ...textFieldStyle }}
        />

        {/* More Payment Details - Amount, Method */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter amount"
          type="number"
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
            Submit Payment
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
