import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Box, Typography } from "@mui/material";
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

export default function MainGrid() {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission goes here
    console.log("Patient form submitted");
    handleClose();
  };

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Sample 1" },
    { key: 1, label: "Sample 2" },
    { key: 2, label: "Sample 3" },
    { key: 3, label: "Sample 4" },
    { key: 4, label: "Sample 5" },
    { key: 5, label: "Sample 5" },
    { key: 6, label: "Sample 5" },
    { key: 7, label: "Sample 5" },
  ]);

  let [addPatientsDiet, setaddPatientsDiet] = React.useState(false);
  let [viewPatientsDiet, setviewPatientsDiet] = React.useState(false);

  const handleEdit = (row) => {
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete row:", row);
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
            justifyContent: "center",
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
                  setviewPatientsDiet(true)
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
                  setaddPatientsDiet(true);
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

{
  (addPatientsDiet == true || viewPatientsDiet == true) &&
<Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setaddPatientsDiet(false)}
      >
        View All Patients Diet Plans
      </Button>
}

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {addPatientsDiet == false ? "Patients Diet List" : "Add Patient's Diet"}
      </Typography>
      <Grid container spacing={2} columns={12}>
      <Grid item xs={12}>
  {
    viewPatientsDiet ? (
      <PatientDietView />
    ) : addPatientsDiet ? (
      <PatientDietForm />
    ) : (
      <CustomizedDataGrid rows={rows} columns={columns} />
    )
  }
</Grid>

      </Grid>
    </Box>
  );
}
