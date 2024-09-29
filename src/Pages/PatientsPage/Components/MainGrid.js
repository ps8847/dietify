import * as React from "react";
import { styled } from "@mui/material/styles";
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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

  // Fetch patients from API
  const fetchPatients = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get("http://127.0.0.1:8000/api/patients");
      setPatients(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patients. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch patients on component mount
  React.useEffect(() => {
    fetchPatients();
  }, [addPatients]);

  let [PatientId , setPatientId] = React.useState(null)

const handleEdit = (row) => {
  console.log("Edit row:", row);
  setPatientId(row.id)
  setAddPatients(true)
};

const handleDelete = (row) => {
  setPatientId(row.id);
  setOpenDeleteDialog(true); // Open delete confirmation dialog
  console.log("Delete row:", row);
};

const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
};

const confirmDelete = async () => {
  setDeleteLoading(true)
  try {
    await axios.delete(`http://127.0.0.1:8000/api/patients/${PatientId}`);
    setPatients(patients.filter((patient) => patient.id !== PatientId)); // Remove deleted patient from state
    setSnackbarMessage("Patient Deleted Successfully");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  } catch (error) {
    console.error("Error deleting patient:", error);
    setError("Failed to delete patient. Please try again.");
    setSnackbarMessage(error?.response?.data?.message ? error?.response.data.message : "Error Deleting Patient. Please try again.");
    setSnackbarSeverity("error");
    setOpenSnackbar(true); // Show Snackbar on error
  } finally {
    setOpenDeleteDialog(false); // Close the dialog
    setPatientId(null); // Clear patientId
    setDeleteLoading(false)
  }
};

const onCloseForm = () => {
  setPatientId(null);
  setAddPatients(false);
};

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
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
      field: "age",
      headerName: "Age",
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
      field: "gender",
      headerName: "Gender",
      flex: 0.8,
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
      field: "contactNumber",
      headerName: "Contact Number",
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
      field: "email",
      headerName: "Email",
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
      field: "medicalConditions",
      headerName: "Medical Conditions",
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <Stack
          direction="column"
          pacing={1}
          sx={{ p: 1 }}
          spacing={1}
          wrap="wrap"
        >
          {params.value.map((condition, index) => (
            <Chip
              key={index}
              label={condition}
              color="primary"
              variant="outlined"
              style={{ marginBottom: "4px" }}
            />
          ))}
        </Stack>
      ),
    },
    {
      field: "allergies",
      headerName: "Allergies",
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => (
        <Stack
          direction="column"
          pacing={1}
          sx={{ p: 1 }}
          spacing={1}
          wrap="wrap"
        >
          {params.value.map((allergy, index) => (
            <Chip
              key={index}
              label={allergy}
              color="secondary"
              variant="outlined"
              style={{ marginBottom: "4px" }}
            />
          ))}
        </Stack>
      ),
    },
    {
      field: "currentMedications",
      headerName: "Current Medications",
      flex: 1.5,
      minWidth: 180,
      renderCell: (params) => (
        <Stack direction="column" spacing={1} sx={{ p: 1 }} wrap="wrap">
          {params.value.map((medication, index) => (
            <Chip
              key={index}
              label={medication}
              color="success"
              variant="outlined"
              style={{ marginBottom: "4px" }}
            />
          ))}
        </Stack>
      ),
    },
    {
      field: "emergencyContact",
      headerName: "Emergency Contact",
      flex: 1.5,
      minWidth: 180,
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
            color="danger"
            size="small"
            sx={{background:"hsl(0, 90%, 40%)" , color:'white'}}
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
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 3 }}>
      {/* Add Patient Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setAddPatients((prev) => !prev)}
      >
        {addPatients ? "View All Patients" : "Add Patient"}
      </Button>

      {/* Title */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {addPatients ? (PatientId !== null ? `Update Data of " ${patients.filter(item => item.id == PatientId)[0].name} "` : "Add New Patient") : "Patients List"}
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
            {addPatients ? (
              <PatientFormPage patientId={PatientId} onCloseForm={onCloseForm} />
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
       <Dialog open={openDeleteDialog} onClose={() => {setOpenDeleteDialog(false); setPatientId(null)}}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this patient?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpenDeleteDialog(false); setPatientId(null)}} color="primary">
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
