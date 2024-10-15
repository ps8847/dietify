import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Stack,
    FormControlLabel,
    FormControl,
    RadioGroup,
    Radio,
    Checkbox,
    Typography,
    Grid,
    CssBaseline,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material';
import getCustomTheme from "../../Theme/CustomTheme";
import styled from "@emotion/styled";
import axios from "axios";
import { MAIN_URL } from "../../Configs/Urls";

const ListItemStyled = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function PatientAddFormOpen() {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); // For Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // For Snackbar severity

    const customTheme = createTheme(getCustomTheme('light'));

    const [patientData, setPatientData] = useState({
        name: "",
        age: "",
        height: "",
        weight: "",
        dietaryPreference: "",
        alcohol: "",
        gender:"",
        foodAllergy: "",
        exerciseRegime: [],
        lifestyle: "",
        jobSpecifications: "",
        familyHistory: "",
        physiologicalConditions: [],
        otherPhysiologicalCondition: "",
        surgery: "",

        medications: "",
        supplements: "",
        eatingPattern: "",
        contactNumber: "",
        email: "",
        address: "",
    });

    const [errors, setErrors] = useState({});

    const exerciseOptions = [
        "Light exercise (yoga, stretching)",
        "Walk (light, brisk, jog)",
        "Weight/resistance training",
        "None",
    ];

    const physiologicalOptions = [
        "Obesity",
        "Hypothyroid",
        "Diabetes mellitus",
        "Hypertension",
        "Dyslipidemia",
        "Acidity",
        "Constipation",
        "Any deficiency",
        "Arthritis",
        "Other",
    ];

    const handleInputChange = (event) => {
        setErrors({})
        const { name, value } = event.target;
        setPatientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event, type) => {
        setErrors({})
        const { checked, value } = event.target;
        setPatientData((prevData) => ({
            ...prevData,
            [type]: checked
                ? [...prevData[type], value]
                : prevData[type].filter((item) => item !== value),
        }));
    };

    const validateForm = () => {

        let formErrors = {};
        if (!patientData.name) formErrors.name = "Name is required";
        if (!patientData.age || isNaN(patientData.age) || patientData.age <= 0) formErrors.age = "Valid age is required";
        if (!patientData.height || isNaN(patientData.height) || patientData.height <= 0) formErrors.height = "Valid height is required";
        if (!patientData.weight || isNaN(patientData.weight) || patientData.weight <= 0) formErrors.weight = "Valid weight is required";
        if (!patientData.dietaryPreference) formErrors.dietaryPreference = "Dietary preference is required";
        if (!patientData.alcohol) formErrors.alcohol = "Alcohol consumption choice is required";
        if (!patientData.gender) formErrors.gender = "Gender is required";
        if (!patientData.foodAllergy) formErrors.foodAllergy = "Food Allergy is required field";
        if (patientData.exerciseRegime.length == 0) formErrors.exerciseRegime = "Please Select atleast one Exercise Regime";
        if (!patientData.lifestyle) formErrors.lifestyle = "LifeStyle choice is required";
        if (!patientData.jobSpecifications) formErrors.jobSpecifications = "Job Specifications is required";
        if (!patientData.familyHistory) formErrors.familyHistory = "Family History is required";
        if (patientData.physiologicalConditions.includes("Other") && !patientData.otherPhysiologicalCondition)
            formErrors.otherPhysiologicalCondition = "Please specify the other condition";
        if (!patientData.surgery) formErrors.surgery = "Surgery is required filed";
        if (!patientData.medications) formErrors.medications = "Medications is required filed";
        if (!patientData.supplements) formErrors.supplements = "Supplements is required filed";
        if (!patientData.eatingPattern) formErrors.eatingPattern = "Please Mention your Eating Pattern";
        if (!patientData.contactNumber) formErrors.contactNumber = "Contact number is required";
        if (!patientData.email) formErrors.email = "Email is required";
        if (!patientData.address) formErrors.address = "Address is required";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const method = "post";
            const url = `${MAIN_URL}patients`

            setLoading(true)

            axios[method](url, patientData)
                .then((res) => {
                    console.log("reached here : " , res);
                    
                    setSnackbarMessage("Data Added successfully!");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true); // Show Snackbar on success
                    // Set a timeout for 2 seconds (2000 ms) before calling setAddPatients(false)
                 
                        setOpenDialog(true)

                
                    setLoading(false)

                })
                .catch((error) => {
                    console.log("error here : " , error);
                    setOpenDialog(false)
                    setSnackbarMessage(error?.response?.data?.message ? error?.response.data.message : "Error submitting form. Please try again.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true); // Show Snackbar on error
                    console.error("Error submitting form:", error);
                    setLoading(false)
                });

        } else {
            setSnackbarMessage("Form Not Filled Properly , Please Check and Tru Again");
            setSnackbarSeverity("error");
            setOpenSnackbar(true); // Show Snackbar on success
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline enableColorScheme />
            <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    {/* Name */}
                                    <TextField
                                        fullWidth
                                        name="name"
                                        variant="outlined"
                                        label="Patient Name"
                                        value={patientData.name}
                                        onChange={handleInputChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        required
                                    />

                                    {/* Contact Details */}
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            fullWidth
                                            name="email"
                                            variant="outlined"
                                            label="Email"
                                            type="email"
                                            value={patientData.email}
                                            onChange={handleInputChange}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            required
                                        />
                                        <TextField
                                            fullWidth
                                            name="contactNumber"
                                            variant="outlined"
                                            label="Contact Number"
                                            value={patientData.contactNumber}
                                            onChange={handleInputChange}
                                            error={!!errors.contactNumber}
                                            helperText={errors.contactNumber}
                                            required
                                        />
                                    </Stack>

                                    {/* Address */}
                                    <TextField
                                        fullWidth
                                        name="address"
                                        variant="outlined"
                                        label="Address"
                                        value={patientData.address}
                                        onChange={handleInputChange}
                                        error={!!errors.address}
                                        helperText={errors.address}
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        name="foodAllergy"
                                        variant="outlined"
                                        label={`Any Food Allergy ( Type "No" if have No Allergy Currently )`}
                                        value={patientData.foodAllergy}
                                        onChange={handleInputChange}
                                        error={!!errors.foodAllergy}
                                        helperText={errors.foodAllergy}
                                        required
                                    />

                                    {/* Age, Height, Weight */}
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            fullWidth
                                            name="age"
                                            variant="outlined"
                                            label="Age"
                                            type="number"
                                            value={patientData.age}
                                            onChange={handleInputChange}
                                            error={!!errors.age}
                                            helperText={errors.age}
                                            required
                                        />
                                        <TextField
                                            fullWidth
                                            name="height"
                                            variant="outlined"
                                            label="Height"
                                            type="number"
                                            value={patientData.height}
                                            onChange={handleInputChange}
                                            error={!!errors.height}
                                            helperText={errors.height}
                                            required
                                        />
                                        <TextField
                                            fullWidth
                                            name="weight"
                                            variant="outlined"
                                            label="Weight (kg)"
                                            type="number"
                                            value={patientData.weight}
                                            onChange={handleInputChange}
                                            error={!!errors.weight}
                                            helperText={errors.weight}
                                            required
                                        />
                                    </Stack>

                                    {/* Dietary Preference */}
                                    <FormControl>
                                        <Typography>Dietary Preference</Typography>
                                        <RadioGroup
                                            name="dietaryPreference"
                                            value={patientData.dietaryPreference}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel
                                                value="Pure vegetarian"
                                                control={<Radio />}
                                                label="Pure vegetarian"
                                            />
                                            <FormControlLabel
                                                value="Vegetarian + eggs"
                                                control={<Radio />}
                                                label="Vegetarian + eggs"
                                            />
                                            <FormControlLabel
                                                value="Non vegetarian"
                                                control={<Radio />}
                                                label="Non vegetarian"
                                            />
                                            <FormControlLabel
                                                value="Vegan"
                                                control={<Radio />}
                                                label="Vegan"
                                            />
                                        </RadioGroup>
                                        {errors.dietaryPreference && <Typography color="error">{errors.dietaryPreference}</Typography>}
                                    </FormControl>

                                    {/* Alcohol */}
                                    <FormControl>
                                        <Typography>Alcohol Consumption</Typography>
                                        <RadioGroup
                                            name="alcohol"
                                            value={patientData.alcohol}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {errors.alcohol && <Typography color="error">{errors.alcohol}</Typography>}
                                    </FormControl>

                                    <FormControl>
                                        <Typography>Gender</Typography>
                                        <RadioGroup
                                            name="gender"
                                            value={patientData.gender}
                                            onChange={handleInputChange}
                                        >
                                           <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                        {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                                    </FormControl>

                                    <TextField
                                        fullWidth
                                        name="foodAllergy"
                                        variant="outlined"
                                        label={`Any Food Allergy ( If No then Type "No" )`}
                                        value={patientData.foodAllergy}
                                        onChange={handleInputChange}
                                        error={!!errors.foodAllergy}
                                        helperText={errors.foodAllergy}
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        name="jobSpecifications"
                                        variant="outlined"
                                        label={`Job Specifications ( If No then Type "No" )`}
                                        value={patientData.jobSpecifications}
                                        onChange={handleInputChange}
                                        error={!!errors.jobSpecifications}
                                        helperText={errors.jobSpecifications}
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        name="familyHistory"
                                        variant="outlined"
                                        label={`Family History of Any LifeStyle Disease ( If No then Type "No" )`}
                                        value={patientData.familyHistory}
                                        onChange={handleInputChange}
                                        error={!!errors.familyHistory}
                                        helperText={errors.familyHistory}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        name="surgery"
                                        variant="outlined"
                                        label={`Any Surgery ( If No then Type "No" )`}
                                        value={patientData.surgery}
                                        onChange={handleInputChange}
                                        error={!!errors.surgery}
                                        helperText={errors.surgery}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        name="medications"
                                        variant="outlined"
                                        label={`Medications ( If No then Type "No" )`}
                                        value={patientData.medications}
                                        onChange={handleInputChange}
                                        error={!!errors.medications}
                                        helperText={errors.medications}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        name="supplements"
                                        variant="outlined"
                                        label={`Supplements ( If No then Type "No" )`}
                                        value={patientData.supplements}
                                        onChange={handleInputChange}
                                        error={!!errors.supplements}
                                        helperText={errors.supplements}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        name="eatingPattern"
                                        variant="outlined"
                                        label={`Your Basic Eating Pattern , Food Habits and Timings`}
                                        value={patientData.eatingPattern}
                                        multiline
                                        onChange={handleInputChange}
                                        error={!!errors.eatingPattern}
                                        helperText={errors.eatingPattern}
                                        required
                                    />

                                    {/* Exercise Regime */}
                                    <FormControl>
                                        <Typography>Exercise Regime</Typography>
                                        {exerciseOptions.map((exercise) => (
                                            <FormControlLabel
                                                key={exercise}
                                                control={
                                                    <Checkbox
                                                        value={exercise}
                                                        onChange={(e) => handleCheckboxChange(e, "exerciseRegime")}
                                                    />
                                                }
                                                label={exercise}
                                            />
                                        ))}
                                        {errors.exerciseRegime && <Typography color="error">{errors.exerciseRegime}</Typography>}
                                    </FormControl>

                                    {/* Lifestyle */}
                                    <FormControl>
                                        <Typography>Lifestyle</Typography>
                                        <RadioGroup
                                            name="lifestyle"
                                            value={patientData.lifestyle}
                                            onChange={handleInputChange}
                                        >
                                            <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                            <FormControlLabel value="Sedentary" control={<Radio />} label="Sedentary" />
                                        </RadioGroup>

                                        {errors.lifestyle && <Typography color="error">{errors.lifestyle}</Typography>}
                                    </FormControl>

                                    {/* Physiological Conditions */}
                                    <FormControl>
                                        <Typography>Physiological Conditions</Typography>
                                        {physiologicalOptions.map((condition) => (
                                            <FormControlLabel
                                                key={condition}
                                                control={
                                                    <Checkbox
                                                        value={condition}
                                                        onChange={(e) => handleCheckboxChange(e, "physiologicalConditions")}
                                                    />
                                                }
                                                label={condition}
                                            />
                                        ))}
                                        {patientData.physiologicalConditions.includes("Other") && (
                                            <TextField
                                                fullWidth
                                                name="otherPhysiologicalCondition"
                                                variant="outlined"
                                                label="Please specify"
                                                value={patientData.otherPhysiologicalCondition}
                                                onChange={handleInputChange}
                                                error={!!errors.otherPhysiologicalCondition}
                                                helperText={errors.otherPhysiologicalCondition}
                                                required
                                            />
                                        )}

                                        {errors.physiologicalConditions && <Typography color="error">{errors.physiologicalConditions}</Typography>}

                                    </FormControl>

                                    {/* Submit Button */}
                                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                    {loading == true ? "Submitting" : "Submit"}
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Grid>
                </Grid>

                {/* Snackbar for success message */}
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


                <Dialog open={openDialog}>
                    <DialogTitle>Data Submitted</DialogTitle>
                    <DialogContent>
                        <Typography color="success">Your Data is Submitted Successfully ! </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setOpenDialog(false); setPatientData({
                                name: "",
                                age: "",
                                height: "",
                                weight: "",
                                dietaryPreference: "",
                                alcohol: "",
                                foodAllergy: "",
                                exerciseRegime: [],
                                lifestyle: "",
                                jobSpecifications: "",
                                familyHistory: "",
                                physiologicalConditions: [],
                                otherPhysiologicalCondition: "",
                                surgery: "",

                                medications: "",
                                supplements: "",
                                eatingPattern: "",
                                contactNumber: "",
                                email: "",
                                address: "",
                            })
                        }} color="secondary">
                            Submit Another Detail ?
                        </Button>
                      

                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}