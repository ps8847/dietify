import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Stack,
    Chip,
    ListItem,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Snackbar,
    Alert,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MAIN_URL } from "../../Configs/Urls";

function PatientAddPrivate({ onCloseForm }) {



    const [patientData, setPatientData] = useState({
        name: "",
        age: "",
        gender: "",
        contactNumber: "",
    });

    console.log("patientData is : ", patientData);

    const [openSnackbar, setOpenSnackbar] = useState(false); // For Snackbar visibility
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // For Snackbar severity
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false)

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
        if (!patientData.gender) formErrors.gender = "Gender is required";
        if (!patientData.contactNumber) formErrors.contactNumber = "Contact number is required";

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
                    setSnackbarMessage("Patient Added successfully!");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true); // Show Snackbar on success
                    // Set a timeout for 2 seconds (2000 ms) before calling setAddPatients(false)

                    // Set a timeout for 2 seconds (2000 ms) before calling setAddPatients(false)
                    setTimeout(() => {
                        setPatientData({
                            name: "",
                            age: "",
                            gender: "",
                            contactNumber: "",
                        });
                        onCloseForm();
                    }, 2000); // 2 seconds delay
                    setLoading(false)

                })
                .catch((error) => {
                    setSnackbarMessage(error?.response?.data?.message ? error?.response.data.message : "Error submitting form. Please try again.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true); // Show Snackbar on error
                    console.error("Error submitting form:", error);
                    setLoading(false)
                });
        } else {
            setSnackbarMessage("Form Not Filled Properly , Please Check and Try Again");
            setSnackbarSeverity("error");
            setOpenSnackbar(true); // Show Snackbar on success
        }

    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


    return (

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




                    {/* Age, Height, Weight */}
                    <Stack direction="row" spacing={2}>
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

                    </Stack>





                    {/* Submit Button */}
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading == true ? "Submitting" : "Submit"}
                    </Button>
                </Stack>
            </form>
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



    )
}

export default PatientAddPrivate