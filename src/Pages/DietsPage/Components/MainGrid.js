import * as React from "react";
import { Box, Button, Typography, Grid, Card, CardContent, Stack, Chip, CardActions } from "@mui/material";
import DietPlanFormPage from "../Diet-Master-Form";

let data = [
  {
    heading: "Early Morning",
    plans: [
      { label: 'Tea' }, { label: 'Rusk' }, 
      { label: "Banana" }, { label: "Orange" }, 
      { label: "Grapes" }, { label: 'Fruits' }, 
      { label: 'Dry Fruits' }
    ],
  },
  {
    heading: "Breakfast",
    plans: [{ label: 'Oatmeal' }, { label: 'Juice' }],
  },
  {
    heading: "Mid Meal",
    plans: [{ label: 'Fruits' }],
  },
  {
    heading: "Lunch",
    plans: [{ label: 'Rice' }, { label: 'Chicken' }],
  },
  {
    heading: "Mid Evening Snack",
    plans: [{ label: 'Nuts' }],
  },
  {
    heading: "Dinner",
    plans: [{ label: 'Pasta' }],
  },
  {
    heading: "All Day",
    plans: [{ label: 'Water' }],
  }
];

export default function MainGrid() {
  const [showAddForm, setShowAddForm] = React.useState(false);

  const handleToggle = () => setShowAddForm(!showAddForm);

  const handleEdit = (id) => {
    console.log(`Edit plan with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete plan with id: ${id}`);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1700px" }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleToggle}
      >
        {showAddForm ? "View Diet Plans" : "Add Diet Plan"}
      </Button>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {showAddForm ? "Add New Diet Plan" : "Diet Plans List"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {showAddForm ? (
            <DietPlanFormPage />
          ) : (
            <Grid container spacing={2}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {item.heading}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" mt={1} mb={1}>
                        {item.plans.map((plan, planIndex) => (
                          <Chip key={planIndex} label={plan.label} sx={{ margin: '4px !important' }} />
                        ))}
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="primary" 
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleDelete(index)}
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
    </Box>
  );
}
