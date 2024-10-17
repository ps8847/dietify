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
import { MAIN_URL } from "../../../Configs/Urls";
import { useState } from "react";

export default function MainGrid() {
  let [addPatientsDiet, setaddPatientsDiet] = React.useState(false);
  let [viewPatientsDiet, setviewPatientsDiet] = React.useState(false);
  const [dietPlans, setDietPlans] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [Deleteloading, setDeleteLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // For Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success"); // For Snackbar severity

  // Fetch patients from API
  const fetchDietPlans = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`${MAIN_URL}patientdietplans`);
      setDietPlans(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patients. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch patients on component mount
  React.useEffect(() => {
    fetchDietPlans();
  }, []);

  let [PatientId, setPatientId] = React.useState(null);
  let [PlanId, setPlanId] = React.useState(null);
  let [patientName, setPatientName] = React.useState(null);
  let [selectedWeek, setselectedWeek] = React.useState(null);
  let [allweek , setallweek] = useState([])
  let [updatePlan, setUpdatePlan] = React.useState(false);

  const handleEdit = (row) => {
    console.log("Edit row:", row);
    setPatientId(row.patientId);
    setPlanId(row.id);
    setPatientName(row.patientName)
    setselectedWeek(`${row.weekDateStart} - ${row.weekDateEnd}`);

    // let filteredPlans = dietPlans.filter(item => item.patientId == row.patientId);

    // let weeks = filteredPlans.map(item => `${item.weekDateStart} - ${item.weekDateEnd}`)
    // setallweek(weeks)
    setUpdatePlan(true);
  };

  const handleView = (row) => {
    setviewPatientsDiet(true);
    setPatientId(row.patientId);
    setPlanId(row.id);
  };

  const handleDelete = (row) => {
    setPatientId(row.patientId);
    setPlanId(row.id);
    setOpenDeleteDialog(true); // Open delete confirmation dialog
    console.log("Delete row:", row);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${MAIN_URL}patientdietplans/${PlanId}`);

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
      fetchDietPlans();
    }
  };

  const onCloseForm = () => {
    setPatientId(null);
    setUpdatePlan(false);
    setviewPatientsDiet(false);
    setPlanId(null);
    fetchDietPlans();
  };

  const columns = [
    {
      field: "patientName",
      headerName: "Name",
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
      field: "weekDateStart",
      headerName: "Plan Start Date",
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
      field: "weekDateEnd",
      headerName: "Plan End Date",
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
          <Button
            variant="contained"
            color="danger"
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
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {(viewPatientsDiet == true || updatePlan == true) && (
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
        {updatePlan === true ? `Update Diet Plan of " ${patientName} "` : "Diet Plans"}
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

      {viewPatientsDiet !== true && dietPlans?.length === 0 || error && <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "center", color: "gray" }}
        >
          {error || "No Plans added yet for this Patient"}
        </Typography>}


      {/* Patient Data */}

      <Grid container spacing={2}>
          <Grid item xs={12} mt={2}>
            {viewPatientsDiet ? (
              <PatientDietView
              showPatientInfo={true}
              planId={PlanId}
              onCloseForm={onCloseForm}
              selectedWeekdefault={PlanId == null ? "" : selectedWeek} 
              />
            ) : updatePlan ? (
              <PatientDietForm
              showPatientInfo={true}
                patientId={PatientId}
                onCloseForm={onCloseForm}
                name={patientName}
                planId={PlanId}
                selectedPlansWeeks={allweek}
                selectedWeekdefault={PlanId == null ? "" : selectedWeek} 
              />
            ) : (
              dietPlans.length > 0 && <CustomizedDataGrid rows={dietPlans} columns={columns} />
            )}
          </Grid>
        </Grid>


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
