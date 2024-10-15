import React, { useEffect, useState } from 'react';
import { MAIN_URL } from '../../Configs/Urls';
import axios from 'axios';
import { Alert, Chip, Paper, Snackbar, Stack, Typography, Grid, Box } from '@mui/material';
import { format } from 'date-fns';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HeightIcon from '@mui/icons-material/Height';
import WeightIcon from '@mui/icons-material/FitnessCenter';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function PatientView({ PatientId, onCloseForm }) {
    const [FetchedPatientData, setFetchedPatientData] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    let fetchPatientData = async () => {
        await axios
            .get(`${MAIN_URL}patients/${PatientId}`)
            .then((response) => {
                setFetchedPatientData(response.data);
            })
            .catch((error) => {
                setSnackbarMessage("Error fetching patient data.");
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            });
    };

    useEffect(() => {
        if (PatientId) {
            fetchPatientData();
        }
    }, [PatientId]);

    return (
        <Paper style={{ padding: '20px', marginBottom: '20px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>

            <Typography variant="h5" gutterBottom style={{ color: '#00796b' }}>
                Patient Information
            </Typography>
            {
                FetchedPatientData &&
            <Stack direction="column" spacing={1}>
                {/* Name and Contact */}
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <PersonIcon style={{ color: '#00796b' }} />
                    </Grid>
                    <Grid item>
                        <Typography><strong>Name:</strong> {FetchedPatientData?.name}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <LocalPhoneIcon style={{ color: '#00796b' }} />
                    </Grid>
                    <Grid item>
                        <Typography><strong>Contact Number:</strong> {FetchedPatientData?.contactNumber}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <EmailIcon style={{ color: '#00796b' }} />
                    </Grid>
                    <Grid item>
                        <Typography><strong>Email:</strong> {FetchedPatientData?.email}</Typography>
                    </Grid>
                </Grid>

                {/* Address */}
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <LocationOnIcon style={{ color: '#00796b' }} />
                    </Grid>
                    <Grid item>
                        <Typography><strong>Address:</strong> {FetchedPatientData?.address}</Typography>
                    </Grid>
                </Grid>

                {/* Physical Attributes */}
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <HeightIcon style={{ color: '#00796b' }} />
                    </Grid>
                    <Grid item>
                        <Typography><strong>Height:</strong> {FetchedPatientData?.height} ft</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <WeightIcon style={{ color: '#00796b' }} />
                    </Grid>
                    <Grid item>
                        <Typography><strong>Weight:</strong> {FetchedPatientData?.weight} kg</Typography>
                    </Grid>
                </Grid>

                {/* Medical Information */}
                <Typography><strong>Dietary Preference:</strong> {FetchedPatientData?.dietaryPreference}</Typography>
                <Typography><strong>Alcohol:</strong> {FetchedPatientData?.alcohol}</Typography>
                <Typography><strong>Allergy:</strong> {FetchedPatientData?.foodAllergy}</Typography>

                <Typography><strong>Exercise Regime:</strong> {FetchedPatientData?.exerciseRegime?.join(', ')}</Typography>
                <Typography><strong>Lifestyle:</strong> {FetchedPatientData?.lifestyle}</Typography>
                <Typography><strong>Job Specifications:</strong> {FetchedPatientData?.jobSpecifications}</Typography>
                <Typography><strong>Family History:</strong> {FetchedPatientData?.familyHistory}</Typography>
                <Typography><strong>Physiological Conditions:</strong> {FetchedPatientData?.physiologicalConditions?.join(', ')}</Typography>

                <Typography><strong>Surgery:</strong> {FetchedPatientData?.surgery}</Typography>
                <Typography><strong>Medications:</strong> {FetchedPatientData?.medications}</Typography>
                <Typography><strong>Supplements:</strong> {FetchedPatientData?.supplements}</Typography>
                <Typography><strong>Eating Pattern:</strong> {FetchedPatientData?.eatingPattern}</Typography>

                {/* Timestamps */}
                <Typography><strong>Added At:</strong> {format(new Date(FetchedPatientData?.created_at), "MMMM do, yyyy 'at' h:mm a")}</Typography>
                <Typography><strong>Last Updated At:</strong> {format(new Date(FetchedPatientData?.updated_at), "MMMM do, yyyy 'at' h:mm a")}</Typography>
            </Stack>
            }

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
        </Paper>
    );
}

export default PatientView;
