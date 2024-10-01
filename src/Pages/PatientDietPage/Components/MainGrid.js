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
import { columns, rows } from "./gridData";
import PatientDietForm from "../Patient-Diet-Form";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import PatientDietView from "../Patient-Diet-View";
import axios from "axios";

export default function MainGrid() {
  let [addPatientsDiet, setaddPatientsDiet] = React.useState(false);
  let [viewPatientsDiet, setviewPatientsDiet] = React.useState(false);
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
      const response = await axios.get("https://doctorbackend.mhtm.ca/api/patients");
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
  }, [addPatientsDiet]);

  let [PatientId, setPatientId] = React.useState(null);
  let [PlanId, setPlanId] = React.useState(null);

  let [updatePlan  , setUpdatePlan] = React.useState(false)
  
  const handleEdit = (row) => {
    console.log("Edit row:", row);
    setPatientId(row.id);
    setaddPatientsDiet(true);
    setUpdatePlan(true)
  };

  const handleView = (row) => {
    setviewPatientsDiet(true);
    setPatientId(row.id);
    setPlanId(row.planId)
  };

  const handleDelete = (row) => {
    setPatientId(row.id);
    setPlanId(row.planId);
    setOpenDeleteDialog(true); // Open delete confirmation dialog
    console.log("Delete row:", row);
  };

  const handleadd = (row) => {
    setPatientId(row.id);
    setaddPatientsDiet(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(
        `https://doctorbackend.mhtm.ca/api/patientdietplans/${PlanId}`
      );

      setSnackbarMessage("Patient's Diet Plan Successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting patient:", error);
      // setError("Failed to delete patient's Diet Plan. Please try again.");
      setSnackbarMessage(
        error?.response?.data?.message
          ? error?.response.data.message
          : "Error Deleting patient's Diet Plan. Please try again."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // Show Snackbar on error
    } finally {
      setOpenDeleteDialog(false); // Close the dialog
      setPatientId(null); // Clear patientId
      setDeleteLoading(false);
      fetchPatients();
    }
  };

  const onCloseForm = () => {
    setPatientId(null);
    setaddPatientsDiet(false);
    setUpdatePlan(false)
    setviewPatientsDiet(false)
    setPlanId(null)
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
      minWidth: 50,
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
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 100,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            overflow: "wrap",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            flexWrap: "wrap",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "5px",
            alignItems: "center",
            justifyContent: "start",
            height: "100%",
          }}
        >
          {params.row.hasPlan ? (
            <>
              <Button
                variant="contained"
                color="danger"
                size="small"
                startIcon={<VisibilityIcon />}
                onClick={(event) => {
                  event.stopPropagation();
              handleView(params.row)
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
                color="secondary"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(params.row);
                }}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddCircleIcon />}
                onClick={(event) => {
                  event.stopPropagation();
                  handleadd(params.row);
                }}
              >
                Add Diet Plan
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {(addPatientsDiet == true || viewPatientsDiet == true) && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => onCloseForm()}
        >
          View All Patients Diet Plans
        </Button>
      )}

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {addPatientsDiet == true
          ? `${updatePlan === true ? "Update" : "Add"} Diet Plan of " ${patients
              ?.filter((item) => item.id == PatientId)[0]
              ?.name?.toUpperCase()} "`
          : "Patients Diet List"}
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
            {viewPatientsDiet ? (
              <PatientDietView
                planId={PlanId}
                onCloseForm={onCloseForm}
              />
            ) : addPatientsDiet ? (
              <PatientDietForm
                patientId={PatientId}
                onCloseForm={onCloseForm}
              />
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
