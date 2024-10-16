import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Box,
  Typography,
  Chip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Grid from "@mui/material/Grid";
import CustomizedDataGrid from "../../Components/CustomizedDataGrid";
import { columns, rows } from "./gridData";
import PaymentFormPage from "../Payment-Form";
import axios from "axios";
import { MAIN_URL } from "../../../Configs/Urls";

const calculateTotal = (payments, startDate, endDate) => {
  return payments
    .filter((payment) => {
      const paymentDate = new Date(payment.paymentDate);
      return paymentDate >= startDate && paymentDate <= endDate;
    })
    .reduce((total, payment) => total + +payment.amount, 0);
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

export default function MainGrid() {
  const [Payments, setPayments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [totals, setTotals] = React.useState({ today: 0, week: 0, month: 0 });

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

      // Sort payments by paymentDate in descending order and format the paymentDate
      const paymentsWithFormattedDates = response.data
        .map((payment) => ({
          ...payment,
          formattedDate: formatDate(payment.paymentDate), // Add formattedDate field
        }))
        .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));

      // const sortedPayments = response.data.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));

      setPayments(paymentsWithFormattedDates); // Set sorted payments
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
  }, []);

  let [PaymentId, setPaymentId] = React.useState(null);

  const handleEdit = (row) => {
    console.log("Edit row:", row);
    setPaymentId(row.id);
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
    fetchPayments();
  };

  // Calculate totals when payments data changes
  React.useEffect(() => {
    if (Payments.length > 0) {
      const today = new Date();
      const startOfToday = new Date(today.setHours(0, 0, 0, 0));
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const totalToday = calculateTotal(Payments, startOfToday, new Date());
      const totalThisWeek = calculateTotal(Payments, startOfWeek, new Date());
      const totalThisMonth = calculateTotal(Payments, startOfMonth, new Date());

      setTotals({
        today: totalToday,
        week: totalThisWeek,
        month: totalThisMonth,
      });
    }
  }, [Payments]);

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
      headerName: "Patient's Name",
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
          {/* {getFormattedDate(params.value)} */}
         {params.value}
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

      {PaymentId !== null && openDeleteDialog == false && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => {
            setPaymentId(null);
          }}
        >
          View All Payments
        </Button>
      )}

      {PaymentId === null && (
        <Grid container spacing={3}>
          {/* Today Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Today's Total Payments
                </Typography>
                <Typography variant="h4" component="div" color="primary">
                  Rs. {totals.today}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* This Week Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  This Week's Total Payments
                </Typography>
                <Typography variant="h4" component="div" color="secondary">
                  Rs. {totals.week}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* This Month Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  This Month's Total Payments
                </Typography>
                <Typography variant="h4" component="div" color="success">
                  Rs. {totals.month}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Patients List */}
      <Typography component="h2" variant="h6" sx={{ mb: 2, mt: 2 }}>
        {PaymentId !== null
          ? `Update Payment of Id " ${
              Payments.filter((item) => item.id == PaymentId)[0].id
            } "`
          : "Payment List"}
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
            {PaymentId !== null && openDeleteDialog == false ? (
              <PaymentFormPage
                paymentId={PaymentId}
                onCloseForm={onCloseForm}
              />
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
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setPaymentId(null);
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this patient?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
              setPaymentId(null);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            disabled={Deleteloading}
            variant="contained"
            color="danger"
            size="small"
            sx={{ background: "hsl(0, 90%, 40%)", color: "white" }}
          >
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
