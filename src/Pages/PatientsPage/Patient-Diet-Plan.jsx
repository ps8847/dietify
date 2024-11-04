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
  Paper,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { format } from 'date-fns';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HeightIcon from '@mui/icons-material/Height';
import WeightIcon from '@mui/icons-material/FitnessCenter';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useState } from "react";
import axios from "axios";
import { MAIN_URL } from "../../Configs/Urls";
import PatientDietView from "../PatientDietPage/Patient-Diet-View";
import PatientDietForm from "../PatientDietPage/Patient-Diet-Form";
import CustomizedDataGrid from "../Components/CustomizedDataGrid";

function PatientDietPlan({ PatientId, Name, ContactNumber }) {

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  let [addPatientsDiet, setaddPatientsDiet] = React.useState(false);
  let [viewPatientsDiet, setviewPatientsDiet] = React.useState(false);
  const [plans, setPlans] = React.useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [Deleteloading, setDeleteLoading] = React.useState(false);

  let [PlanId, setPlanId] = React.useState(null);
  let [selectedWeek, setselectedWeek] = React.useState(null);
  let [allWeeks, setAllWeeks] = React.useState(null);

  let [updatePlan, setUpdatePlan] = React.useState(false)

  // Fetch patients from API
  const fetchPatientsDiet = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`${MAIN_URL}patientdietplans/showall/${PatientId}`);
      setPlans(response?.data?.sort((a, b) => b.id - a.id));
      let allweeks = response?.data?.map(item => `${item.weekDateStart} - ${item.weekDateEnd}`);
      setAllWeeks(allweeks || []);

    } catch (error) {
      console.error("Error deleting patient:", error);
      setError(error?.response?.data?.message || "Failed to fetch Diet Plans. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch patients on component mount
  React.useEffect(() => {
    fetchPatientsDiet();
  }, [addPatientsDiet]);

  const handleEdit = (row) => {
    console.log("Edit row:", row);
    setselectedWeek(`${row.weekDateStart} - ${row.weekDateEnd}`)
    setaddPatientsDiet(true);
    setPlanId(row.id)
    setUpdatePlan(true)
  };

  const handleView = (row) => {
    setviewPatientsDiet(true);
    setPlanId(row.id)
    setselectedWeek(`${row.weekDateStart} - ${row.weekDateEnd}`)
  };

  const handleDelete = (row) => {
    setPlanId(row.id);
    setOpenDeleteDialog(true); // Open delete confirmation dialog
    console.log("Delete row:", row);
  };

  const handleadd = () => {
    setaddPatientsDiet(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(
        `${MAIN_URL}patientdietplans/${PlanId}`
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
      setDeleteLoading(false);
    }
  };

  const onCloseForm = () => {
    setaddPatientsDiet(false);
    setUpdatePlan(false)
    setviewPatientsDiet(false)
    setPlanId(null)
    setselectedWeek(null)
    setAllWeeks(null)
  };

  const columns = [
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


        </div>
      ),
    },
  ];

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
      {/* // patient deit management  */}

      <Typography variant="h4" gutterBottom style={{ color: 'blue' }}>
        Patient's Diet Plans
      </Typography>

      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        {(addPatientsDiet == true || viewPatientsDiet == true) && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => onCloseForm()}
          >
            View All Diet Plans
          </Button>
        )}

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

        {
          addPatientsDiet !== true && viewPatientsDiet !== true &&
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddCircleIcon />}
            onClick={() => {
              handleadd();
            }}
          >
            Add Diet Plan
          </Button>
        }

        {
          addPatientsDiet == true &&

          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Add new Diet Plan
          </Typography>

        }

        {/* Error State */}

        {viewPatientsDiet !== true && addPatientsDiet !== true && (plans?.length === 0 || error) && <Typography
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
              showPatientInfo={false}
              planId={PlanId}
              onCloseForm={onCloseForm}
              selectedWeekdefault={PlanId == null ? "" : selectedWeek} 
              />
            ) : addPatientsDiet ? (
              <PatientDietForm
              showPatientInfo={false}
                patientId={PatientId}
                onCloseForm={onCloseForm}
                name={Name}
                planId={PlanId}
                selectedPlansWeeks={allWeeks}
                selectedWeekdefault={PlanId == null ? "" : selectedWeek} 
              />
            ) : (
              plans.length > 0 && <CustomizedDataGrid rows={plans} columns={columns} />
            )}
          </Grid>
        </Grid>


        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => {
            setOpenDeleteDialog(false);
          }}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this diet Plan?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDeleteDialog(false);

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

export default PatientDietPlan