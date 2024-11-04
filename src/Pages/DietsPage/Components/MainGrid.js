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
} from "@mui/material";
import DietPlanFormPage from "../Diet-Master-Form";
import axios from "axios";
import { MAIN_URL } from "../../../Configs/Urls";

// // List of available categories
const categories = [
  "Early Morning",
  "Breakfast",
  "Mid Meal (after 2 hours)",
  "Lunch",
  "Evening",
  "Pre Dinner",
  "Dinner",
  'Post Dinner'
];

const categoryOrder = categories.reduce((acc, category, index) => {
  acc[category] = index;
  return acc;
}, {});

export default function MainGrid() {
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [DietPlans, setDietPlans] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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
      return categoryOrder[a.category] - categoryOrder[b.category];
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

  let [DietPlanId, setDietPlanId] = React.useState(null);

  const handleEdit = (id) => {
    setDietPlanId(id);
    setShowAddForm(true);
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
      await axios.delete(`${MAIN_URL}dietplans/${DietPlanId}`);
      setDietPlans(DietPlans.filter((dietPlan) => dietPlan.id !== DietPlanId)); // Remove deleted id from state
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

  const onCloseForm = () => {
    setDietPlanId(null);
    setShowAddForm(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1700px" }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => {
          setShowAddForm(!showAddForm);
          setDietPlanId(null);
        }}
      >
        {showAddForm ? "View Diet Plans" : "Add Diet Plan"}
      </Button>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {showAddForm
          ? DietPlanId !== null
            ? `Update DietPlan for " ${
                DietPlans.filter((item) => item.id == DietPlanId)[0].category
              } "`
            : "Add New Diet Plan"
          : "Diet Plans List"}
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

      {!loading && !error && DietPlans.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {showAddForm ? (
              <DietPlanFormPage
              allAddedCategories={DietPlans?.map(item => item.category)}
                dietPlanId={DietPlanId}
                onCloseForm={onCloseForm}
              />
            ) : (
              <Grid container spacing={2}>
                {DietPlans.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {item.category}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          mt={1}
                          mb={1}
                        >
                          {item.values.map((plan, planIndex) => (
                            <Chip
                              key={planIndex}
                              label={plan}
                              sx={{ margin: "4px !important" }}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      ) : !loading && !error && DietPlans.length === 0 ? (
        showAddForm ? (
          <DietPlanFormPage
          allAddedCategories={DietPlans?.map(item => item.category)}
            dietPlanId={DietPlanId}
            onCloseForm={onCloseForm}
          />
        ) :
        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, textAlign: "center", color: "gray" }}
        >
          
          No DietPlans Data Available
        </Typography>
      ) : null}

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
