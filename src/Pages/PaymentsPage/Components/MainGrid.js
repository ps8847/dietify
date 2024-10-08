import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Box, Typography, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Grid from "@mui/material/Grid";
import CustomizedDataGrid from "../../Components/CustomizedDataGrid";
import { columns, rows } from "./gridData";
import PaymentFormPage from "../Payment-Form";
import axios from "axios";
import { MAIN_URL } from "../../../Configs/Urls";

const getFormattedDate = (date) => {

  if(date){
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


export default function MainGrid() {
  const [addPayments, setAddPayments] = React.useState(false);
  const [Payments, setPayments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [Deleteloading, setDeleteLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // For Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success"); // For Snackbar severity

  // Fetch Payments from API
  const fetchPayments = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`${MAIN_URL}payments`);
      setPayments(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError("Failed to fetch payments. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch patients on component mount
  React.useEffect(() => {
    fetchPayments();
  }, [addPayments]);

  let [PaymentId, setPaymentId] = React.useState(null);

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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${MAIN_URL}payments/${PaymentId}`);
      setPayments(Payments.filter((payments) => payments.id !== PaymentId)); // Remove deleted payment from state
      setSnackbarMessage("payment Deleted Successfully");
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
      field: "payerName",
      headerName: "Payer Name",
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
      field: "paymentDate",
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
          {getFormattedDate(params.value)}
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

  return (
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
        {addPayments ? (PaymentId !== null ? `Update Payment of Id " ${Payments.filter(item => item.id == PaymentId)[0].id} "` : "Add New Payment") : "Payment List"}
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
      {!loading && !error && Payments.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {addPayments ? (
              <PaymentFormPage paymentId={PaymentId} onCloseForm={onCloseForm} />
            ) : (
              <CustomizedDataGrid rows={Payments} columns={columns} />
            )}
          </Grid>
        </Grid>
      ) : !loading && !error && Payments.length === 0 ? (
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "center", color: "gray" }}
        >
          No Payments Data Available
        </Typography>
      ) : null}

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
