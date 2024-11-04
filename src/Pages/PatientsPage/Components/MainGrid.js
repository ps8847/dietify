import * as React from "react";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomizedDataGrid from "../../Components/CustomizedDataGrid";
import { columns } from "./gridData"; // Assuming you fetch patients dynamically now
import PatientFormPage from "../Patient-Form";
import axios from "axios";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MAIN_URL } from "../../../Configs/Urls";
import { green, purple } from "@mui/material/colors";
import { AlignHorizontalCenter, Assignment, Paid } from "@mui/icons-material";
import PatientView from "../Patient-View";
import PaymentView from "../Payment-View";
import PatientDietPlan from "../Patient-Diet-Plan";

export default function MainGrid() {
  const [addPatients, setAddPatients] = React.useState(false);
  const [patients, setPatients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [Deleteloading, setDeleteLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // For Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success"); // For Snackbar severity

  const [openEdit, setopenEdit] = React.useState(false);
  const [openView, setopenView] = React.useState(false);
  const [openPayment, setopenPayment] = React.useState(false);
  const [openDietPlans, setopenDietPlans] = React.useState(false);
  // Fetch patients from API
  const fetchPatients = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`${MAIN_URL}patients`);
      setPatients(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patients. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  let [PatientId, setPatientId] = React.useState(null);
  let [PatientName, setPatientName] = React.useState(null);
  let [PatientContact, setPatientContact] = React.useState(null);

  // Fetch patients on component mount
  React.useEffect(() => {
    fetchPatients();
  }, [addPatients]);

  const handleEdit = (row) => {
    setPatientId(row.id);
    setPatientName(row.name);
    setPatientContact(row.contactNumber);
    setopenEdit(true);
    setAddPatients(true);
  };
  const handleView = (row) => {
    setPatientId(row.id);
    setopenView(true);
    setAddPatients(true);
  };
  const handlePayment = (row) => {
    setPatientId(row.id);
    setPatientName(row.name);
    setPatientContact(row.contactNumber);
    setopenPayment(true);
    setAddPatients(true);
  };
  const handleDietPlans = (row) => {
    setPatientId(row.id);
    setPatientName(row.name);
    setPatientContact(row.contactNumber);
    setopenDietPlans(true);
    setAddPatients(true);
  };

  const handleDelete = (row) => {
    setPatientId(row.id);
    setOpenDeleteDialog(true); // Open delete confirmation dialog
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${MAIN_URL}patients/${PatientId}`);
      setPatients(patients.filter((patient) => patient.id !== PatientId)); // Remove deleted patient from state
      setSnackbarMessage("Patient Deleted Successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting patient:", error);
      setError("Failed to delete patient. Please try again.");
      setSnackbarMessage(
        error?.response?.data?.message
          ? error?.response.data.message
          : "Error Deleting Patient. Please try again."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // Show Snackbar on error
    } finally {
      setOpenDeleteDialog(false); // Close the dialog
      setPatientId(null); // Clear patientId
      setDeleteLoading(false);
    }
  };

  const onCloseForm = () => {
    setPatientId(null);
    setAddPatients(false);
    setopenEdit(false);
    setOpenDeleteDialog(false)
    setopenView(false)
    setopenPayment(false)
    setopenDietPlans(false)
    setPatientName(null);
    setPatientContact(null);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",

      minWidth: 200,
      renderCell: (params) => (
        <div
        onClick={(event) => {
          event.stopPropagation();
          handleView(params.row);
        }}
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
      field: "age",
      headerName: "Age",

      minWidth: 20,
      renderCell: (params) => (
        <div
        onClick={(event) => {
          event.stopPropagation();
          handleView(params.row);
        }}
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
      field: "gender",
      headerName: "Gender",

      minWidth: 30,
      renderCell: (params) => (
        <div
        onClick={(event) => {
          event.stopPropagation();
          handleView(params.row);
        }}
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
      field: "contactNumber",
      headerName: "Contact Number",

      minWidth: 180,
      renderCell: (params) => (
        <div
        onClick={(event) => {
          event.stopPropagation();
          handleView(params.row);
        }}
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
      field: "created_at",
      headerName: "Added at",
      minWidth: 230,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = format(date, "MMMM do, yyyy 'at' h:mm a");

        return (
          <div
          onClick={(event) => {
            event.stopPropagation();
            handleView(params.row);
          }}
            style={{
              display: "flex",
              overflowWrap: "anywhere",
              justifyContent: "start",
              alignItems: "center",
              height: "100%",
              flexWrap: "wrap",
            }}
          >
            {formattedDate}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      AlignHorizontalCenter: true,
      width: 500,
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
            color="secondary"
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleView(params.row);
            }}
          >
            View
          </Button>
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
            color="danger"
            size="small"
            sx={{ background: "hsl(0, 90%, 40%)", color: "white" }}
            startIcon={<DeleteIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.row);
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="white"
            size="small"
            sx={{
              backgroundColor: purple[500],
              "&:hover": {
                backgroundColor: purple[700],
              },
              color: "white",
            }}
            startIcon={<Paid />}
            onClick={(event) => {
              event.stopPropagation();
              handlePayment(params.row);
            }}
          >
            Payments
          </Button>
          <Button
            variant="contained"
            color="white"
            size="small"
            sx={{
              backgroundColor: green[500],
              "&:hover": {
                backgroundColor: green[700],
              },
              color: "white",
              textWrap:'nowrap'
            }}
            startIcon={<Assignment />}
            onClick={(event) => {
              event.stopPropagation();
              handleDietPlans(params.row);
            }}
          >
            Diet Plans
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 3 }}>
      {(openEdit == true || openView == true || openPayment == true || openDietPlans == true) &&
        PatientId !== null && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => {
              setAddPatients((prev) => !prev);
              setPatientId(null);
              setopenEdit(false);
              setOpenDeleteDialog(false);
              setopenView(false);
              setopenPayment(false);
              setopenDietPlans(false)
            }}
          >
            View All Patients
          </Button>
        )}


      {/* Title */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {openEdit == true && PatientId !== null
          ? `Update Data of " ${
              patients.filter((item) => item.id == PatientId)[0].name
            } "`
          : (openView == true || openPayment == true || openDietPlans == true) ? "" : "Patients List"}
      </Typography>

      {/* Loading State */}
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

      {/* Patient Data */}
      {!loading && !error && patients.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {openEdit == true && PatientId !== null ? (
              <PatientFormPage
                patientId={PatientId}
                onCloseForm={onCloseForm}
              />
            ) : openView == true && PatientId !== null ? (
              <PatientView PatientId={PatientId} onCloseForm={onCloseForm} />
            ) : openPayment == true && PatientId !== null ? (
              <PaymentView PatientId={PatientId} onCloseForm={onCloseForm} Name={PatientName} ContactNumber={PatientContact} />
            ) : openDietPlans == true && PatientId !== null ? (
              <PatientDietPlan PatientId={PatientId} onCloseForm={onCloseForm} Name={PatientName} ContactNumber={PatientContact}/>
            ) : (
              <CustomizedDataGrid rows={patients} columns={columns} />
            )}
          </Grid>
        </Grid>
      ) : !loading && !error && patients.length === 0 ? (
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "center", color: "gray" }}
        >
          No Patients Data Available
        </Typography>
      ) : null}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setPatientId(null);
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
              setPatientId(null);
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
