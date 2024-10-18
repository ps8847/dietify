import React, { useEffect, useState } from 'react';
import { MAIN_URL } from '../../Configs/Urls';
import axios from 'axios';
import { Alert, Chip, Paper, Snackbar, Stack, Typography, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions , CircularProgress, Button } from '@mui/material';
import { format } from 'date-fns';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from '@mui/icons-material/Email';
import HeightIcon from '@mui/icons-material/Height';
import WeightIcon from '@mui/icons-material/FitnessCenter';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentFormPage from '../PaymentsPage/Payment-Form';
import CustomizedDataGrid from '../Components/CustomizedDataGrid';

const getFormattedDate = (date) => {

  if (date) {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${dd}-${mm}-${yyyy}`;

  } else {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${dd}-${mm}-${yyyy}`;

  }
};

const formatDate = (dateString) => {
  const today = new Date(dateString);
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const dd = String(today.getDate()).padStart(2, "0");
  return `${dd}-${mm}-${yyyy}`;
  // const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  // return  new Date(dateString).toLocaleDateString("en-GB", options); // e.g., 03-10-2024
};

function PaymentView({ PatientId , Name  , ContactNumber}) {

  const [FetchedPaymentsData, setFetchedPaymentsData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  const [addPayments, setAddPayments] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [Deleteloading, setDeleteLoading] = React.useState(false);

  let [PaymentId, setPaymentId] = React.useState(null);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  let fetchPaymentsData = async () => {
    await axios
      .get(`${MAIN_URL}payments/patient/${PatientId}`)
      .then((response) => {

      // Sort payments by paymentDate in descending order and format the paymentDate
      const paymentsWithFormattedDates = response.data
      .map((payment) => ({
        ...payment,
        formattedDate: formatDate(payment.paymentDate), // Add formattedDate field
      }))

    setFetchedPaymentsData(paymentsWithFormattedDates == null ? [] : paymentsWithFormattedDates); // Set sorted payments

        setLoading(false)
      })
      .catch((error) => {
        // setSnackbarMessage("Error fetching patient data.");
        // setSnackbarSeverity("error");
        // setOpenSnackbar(true);
        setLoading(false)
      });
  };

  useEffect(() => {
    if (PatientId) {
      fetchPaymentsData()
    }
  }, [PatientId]);

  React.useEffect(() => {
    fetchPaymentsData();
  }, [addPayments]);

  // about poayment's data

  const handleEdit = (row) => {
    console.log("Edit row:", row);
    setPaymentId(row.id);
    setAddPayments(true);
  };

  const handleDelete = (row) => {
    setPaymentId(row.id);
    setOpenDeleteDialog(true); // Open delete confirmation dialog
    console.log("Delete row:", row);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${MAIN_URL}payments/${PaymentId}`);
      setFetchedPaymentsData(FetchedPaymentsData.filter((payments) => payments.id !== PaymentId)); // Remove deleted payment from state
      setSnackbarMessage("Payment Deleted Successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting payments:", error);
      setError("Failed to delete payments. Please try again.");
      setSnackbarMessage(
        error?.response?.data?.message
          ? error?.response.data.message
          : "Error Deleting payments. Please try again."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // Show Snackbar on error
    } finally {
      setOpenDeleteDialog(false); // Close the dialog
      setPaymentId(null); // Clear patientId
      setDeleteLoading(false);
    }
  };

  const onCloseForm = () => {
    setPaymentId(null);
    setAddPayments(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "Payment ID",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            whiteSpace: "normal",
            overflowWrap: "anywhere",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "formattedDate",
      headerName: "Payment Date",
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
          {/* {getFormattedDate(params.value)} */}
        </div>
      ),
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            height: "100%",
          }}
        >
          <Chip
            label={params.value}
            color={params.value === "Cash" ? "primary" : "secondary"}
            variant="outlined"
            style={{ marginBottom: "4px" }}
          />
        </div>
      ),
    },
    {
      field: "purpose",
      headerName: "Purpose",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "5px",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleEdit(params.row);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.row);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

console.log("FetchedPaymentsData is :" , FetchedPaymentsData);


  return (
    <>


{/* // Patient's information  */}
      <Paper style={{ padding: '20px', marginBottom: '20px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>

        <Typography variant="h5" gutterBottom style={{ color: '#00796b' }}>
          Patient Information
        </Typography>
        
          <Stack direction="row" spacing={1}>
            {/* Name and Contact */}
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <PersonIcon style={{ color: '#00796b' }} />
              </Grid>
              <Grid item>
                <Typography><strong>Name:</strong> {Name}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <LocalPhoneIcon style={{ color: '#00796b' }} />
              </Grid>
              <Grid item>
                <Typography><strong>Contact Number:</strong> {ContactNumber}</Typography>
              </Grid>
            </Grid>


          </Stack>
      

      </Paper>

{/* // Paytient's Payments  */}
      <Typography variant="h4" gutterBottom style={{ color: 'blue' }}>
        Patient's Payments
      </Typography>

      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Add Patient Button */}

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => {setAddPayments(!addPayments); setPaymentId(null)}}
      >
        {addPayments == false ? "Add Payment" : "View All Payments"}
      </Button>

      {/* Patients List */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {addPayments ? (PaymentId !== null ? `Update Payment of Id " ${FetchedPaymentsData.filter(item => item.id == PaymentId)[0].id} "` : "Add New Payment") : "Payments List"}
      </Typography>

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading... Please wait
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography component="h2" variant="h6" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Payment Data */}
    
 
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {addPayments ? (
              <PaymentFormPage patientId={PatientId} paymentId={PaymentId} name={Name} onCloseForm={onCloseForm} />
            ) : 
              FetchedPaymentsData?.length > 0 && <CustomizedDataGrid rows={FetchedPaymentsData} columns={columns} /> }
            
          </Grid>
        </Grid>
     
        {FetchedPaymentsData?.length === 0 && <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "center", color: "gray" }}
        >
          No Payments Data Found for this Patient
        </Typography>}
     

       {/* Delete Confirmation Dialog */}
       <Dialog open={openDeleteDialog} onClose={() => {setOpenDeleteDialog(false); setPaymentId(null)}}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this patient?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpenDeleteDialog(false); setPaymentId(null)}} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} disabled={Deleteloading}  variant="contained"
            color="danger"
            size="small"
            sx={{background:"hsl(0, 90%, 40%)" , color:'white'}}>
           {Deleteloading ? "Deleting ..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>


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
            backgroundColor: snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
            fontWeight: 600,
            "& .MuiAlert-icon": { color: "#fff" },
            "& .MuiAlert-action svg": { color: "#fff" },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>


    </>

  )
}

export default PaymentView