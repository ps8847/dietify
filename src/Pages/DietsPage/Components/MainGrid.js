import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  CardActions,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import DietPlanFormPage from "../Diet-Master-Form";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { MAIN_URL } from "../../../Configs/Urls";
import CustomizedDataGrid from "../../Components/CustomizedDataGrid";

export default function MainGrid() {

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [DietPlans, setDietPlans] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [showAddEditDialog, setShowAddEditDialog] = React.useState(false);
  const [dietPlanId, setDietPlanId] = React.useState(null);
  const [dietPlanValue, setDietPlanValue] = React.useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [Deleteloading, setDeleteLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // For Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success"); // For Snackbar severity

  // Fetch dietplans from API
  const fetchDietPlans = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`${MAIN_URL}dietplans`);
     // Sort diet plans based on the category order
     const sortedDietPlans = response.data.sort((a, b) => {
      return a - b;
    });

    setDietPlans(sortedDietPlans);
    } catch (error) {
      console.error("Error fetching DietPlans:", error);
      setError("Failed to fetch DietPlans. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch DietPlans on component mount
  React.useEffect(() => {
    fetchDietPlans();
  }, [showAddForm]);

  const handleToggle = () => setShowAddForm(!showAddForm);

  const handleEdit = (id) => {
    setDietPlanId(id);
  };

  const handleDelete = (id) => {
    setDietPlanId(id);
    setOpenDeleteDialog(true); // Open delete confirmation dialog
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${MAIN_URL}dietplans/${dietPlanId}`);
      setDietPlans(DietPlans.filter((dietPlan) => dietPlan.id !== dietPlanId)); // Remove deleted id from state
      setSnackbarMessage("DietPlan Deleted Successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting DietPlan:", error);
      setError("Failed to delete DietPlan. Please try again.");
      setSnackbarMessage(
        error?.response?.data?.message
          ? error?.response.data.message
          : "Error Deleting DietPlan. Please try again."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // Show Snackbar on error
    } finally {
      setOpenDeleteDialog(false); // Close the dialog
      setDietPlanId(null); // Clear patientId
      setDeleteLoading(false);
    }
  };

  const handleOpenAddDialog = () => {
    setDietPlanId(null);
    setDietPlanValue("");
    setShowAddEditDialog(true);
  };

  const handleOpenEditDialog = (dietPlan) => {
    setDietPlanId(dietPlan.id);
    setDietPlanValue(dietPlan.value);
    setShowAddEditDialog(true);
  };

  const handleSaveDietPlan = async () => {
    try {
      const data = { value: dietPlanValue };
      if (dietPlanId) {
        await axios.put(`${MAIN_URL}dietplans/${dietPlanId}`, data);
        setSnackbarMessage("Diet plan updated successfully.");
      } else {
        await axios.post(`${MAIN_URL}dietplans`, data);
        setSnackbarMessage("Diet plan added successfully.");
      }
      setSnackbarSeverity("success");
      fetchDietPlans(); // Refresh diet plans
    } catch (error) {
      setSnackbarMessage(
        error?.response?.data?.message || "Failed to save diet plan."
      );
      setSnackbarSeverity("error");
    } finally {
      setShowAddEditDialog(false);
      setOpenSnackbar(true);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      minWidth: 30,
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
          {params.id}
        </div>
      ),
    },
    {
      field: "value",
      headerName: "Value",
      flex: 5,
      minWidth: 400,
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
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleOpenEditDialog(params.row);
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
              handleDelete(params.row.id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];


  return (
    <Box sx={{ width: "100%", maxWidth: "1700px" }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleOpenAddDialog}
      >
        Add Diet
      </Button>

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

      {!loading && !error && DietPlans.length > 0 ? (
          <CustomizedDataGrid rows={DietPlans} columns={columns} />
      ): (
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "center", color: "gray" }}
        >
          
          No Diet Masters Added yet
        </Typography>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setDietPlanId(null);
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this DietPlan?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
              setDietPlanId(null);
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


      {/* Add/Edit Dialog */}
      <Dialog open={showAddEditDialog} onClose={() => setShowAddEditDialog(false)}>
        <DialogTitle>{dietPlanId ? "Edit Diet Plan" : "Add Diet Plan"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Value"
            value={dietPlanValue}
            onChange={(e) => setDietPlanValue(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveDietPlan} color="primary" variant="contained">
            Save
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

