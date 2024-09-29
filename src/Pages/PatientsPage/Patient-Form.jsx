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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListItemStyled = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ErrorHeading = ({ errorName }) => {
  return (
    <Typography
      color="hsl(0, 90%, 40%)"
      sx={{
        fontSize: "0.75rem",
        fontWeight: 400,
        fontFamily: "Roboto",
        lineHeight: 1.66,
        textAlign: "left",
        marginTop: "3px",
        marginLeft: "14px",
        marginRight: "14px",
      }}
    >
      {errorName}
    </Typography>
  );
};

const textFieldStyle = {
  "& .MuiInputLabel-root": {
    fontSize: "0.75rem",
    marginTop: "12px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
  "& .MuiInputBase-input": {
    padding: "10px",
  },
};

export default function PatientFormPage({ patientId , onCloseForm}) {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    emergencyContact: "",
    medicalConditions: [],
    allergies: [],
    currentMedications: [],
  });

  const [conditionInput, setConditionInput] = useState("");
  const [allergyInput, setAllergyInput] = useState("");
  const [medicationInput, setMedicationInput] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // For Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // For Snackbar severity
  const [errors, setErrors] = useState({});

  const [loading  ,  setLoading] = useState(false)

  useEffect(() => {
    if (patientId) {
      axios
        .get(`http://127.0.0.1:8000/api/patients/${patientId}`)
        .then((response) => {

          // make that array empty if 

          if(response.data.medicalConditions.length == 1 && response.data.medicalConditions[0] == "None"){
            response.data.medicalConditions = []
          }
          if(response.data.allergies.length == 1 && response.data.allergies[0] == "None"){
            response.data.allergies = []
          }
          if(response.data.currentMedications.length == 1 && response.data.currentMedications[0] == "None"){
            response.data.currentMedications = []
          }
          setPatientData(response.data);
        })
        .catch((error) => {
          setSnackbarMessage("Error fetching patient data.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  }, [patientId]);

  const handleDelete = (chipToDelete, type) => () => {
    setPatientData((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((chip) => chip !== chipToDelete),
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!patientData.name) newErrors.name = "Name is required.";
    if (!patientData.age || patientData.age < 0)
      newErrors.age = "Age must be a positive number.";
    if (!patientData.gender) newErrors.gender = "Gender is required.";
    if (!patientData.contactNumber)
      newErrors.contactNumber = "Contact number is required.";
    if (!patientData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(patientData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!patientData.emergencyContact)
      newErrors.emergencyContact = "Emergency contact is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const method = patientId ? "put" : "post";
    const url = patientId
      ? `http://127.0.0.1:8000/api/patients/${patientId}`
      : `http://127.0.0.1:8000/api/patients`

    if (patientData.medicalConditions.length == 0) {
      patientData.medicalConditions.push("None");
    }
    if (patientData.allergies.length == 0) {
      patientData.allergies.push("None");
    }
    if (patientData.currentMedications.length == 0) {
      patientData.currentMedications.push("None");
    }
    setLoading(true)
    
    axios[method](url, patientData)
    .then(() => {
        setSnackbarMessage(
          patientId
          ? "Patient updated successfully!"
          : "Patient added successfully!"
        );
        setSnackbarSeverity("success");
        setOpenSnackbar(true); // Show Snackbar on success
        
        // Set a timeout for 2 seconds (2000 ms) before calling setAddPatients(false)
       setTimeout(() => {
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
  };

  const addChip = (type, inputValue) => {
    if (inputValue) {
      setPatientData((prevData) => ({
        ...prevData,
        [type]: [...prevData[type], inputValue],
      }));
      switch (type) {
        case "medicalConditions":
          setConditionInput("");
          break;
        case "allergies":
          setAllergyInput("");
          break;
        case "currentMedications":
          setMedicationInput("");
          break;
        default:
          break;
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "5px" }}>
         
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            name="name"
            variant="outlined"
            placeholder="Enter patient name"
            value={patientData.name}
            onChange={handleInputChange}
            required
            sx={textFieldStyle}
          />
         
          <TextField
            fullWidth
            error={!!errors.age}
            helperText={errors.age}
            name="age"
            variant="outlined"
            type="number"
            placeholder="Enter age"
            value={patientData.age}
            onChange={handleInputChange}
            required
            sx={textFieldStyle}
          />
          
        </div>

        <div style={{ marginTop: "15px" }}>
          <FormControl
            fullWidth
            required
            variant="outlined">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={patientData.gender}
              onChange={handleInputChange}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {errors.gender && <ErrorHeading errorName={errors.gender}/> }

        </div>

        <div style={{ display: "flex", gap: "5px", marginTop: "15px" }}>
          <TextField
            fullWidth
            name="contactNumber"
            variant="outlined"
            placeholder="Enter contact number"
            value={patientData.contactNumber}
            onChange={handleInputChange}
            required
            error={!!errors.contactNumber}
            helperText={errors.contactNumber}
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            name="email"
            variant="outlined"
            type="email"
            placeholder="Enter email"
            value={patientData.email}
            onChange={handleInputChange}
            required
            error={!!errors.email}
            helperText={errors.email}
            sx={textFieldStyle}
          />
        </div>

        <TextField
          fullWidth
          name="emergencyContact"
          variant="outlined"
          placeholder="Enter emergency contact"
          value={patientData.emergencyContact}
          onChange={handleInputChange}
          required
          error={!!errors.emergencyContact}
          helperText={errors.emergencyContact}
          sx={textFieldStyle}
          style={{ marginTop: "15px" }}
        />

        {/* Medical Conditions Section */}
        <div style={{ display: "flex", padding: "10px 10px", marginTop: "15px", border: "1px solid hsl(220, 20%, 65%)", borderRadius: "3px", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter medical conditions"
              value={conditionInput}
              onChange={(e) => setConditionInput(e.target.value)}
              sx={textFieldStyle}
            />
            <Button variant="contained" color="primary" onClick={() => addChip("medicalConditions", conditionInput)}>
              Add
            </Button>
          </div>
          <div style={{ display: "flex", overflowY: "auto", maxHeight: "150px", flexWrap: "wrap" }}>
            {patientData.medicalConditions.map((condition, index) => (
              <ListItemStyled key={index} sx={{ listStyle: "none" }}>
                <Chip label={condition} onDelete={handleDelete(condition, "medicalConditions")} />
              </ListItemStyled>
            ))}
          </div>
        </div>
        {errors.gender && <ErrorHeading errorName={errors.gender}/> }
        
        {/* Allergies Section */}
        <div style={{ display: "flex", padding: "10px 10px", marginTop: "15px", border: "1px solid hsl(220, 20%, 65%)", borderRadius: "3px", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter allergies"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              sx={textFieldStyle}
            />
            <Button variant="contained" color="primary" onClick={() => addChip("allergies", allergyInput)}>
              Add
            </Button>
          </div>
          <div style={{ display: "flex", overflowY: "auto", maxHeight: "150px", flexWrap: "wrap" }}>
            {patientData.allergies.map((allergy, index) => (
              <ListItemStyled key={index} sx={{ listStyle: "none" }}>
                <Chip label={allergy} onDelete={handleDelete(allergy, "allergies")} />
              </ListItemStyled>
            ))}
          </div>
        </div>

        {/* Current Medications Section */}
        <div style={{ display: "flex", padding: "10px 10px", marginTop: "15px", border: "1px solid hsl(220, 20%, 65%)", borderRadius: "3px", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter current medications"
              value={medicationInput}
              onChange={(e) => setMedicationInput(e.target.value)}
              sx={textFieldStyle}
            />
            <Button variant="contained" color="primary" onClick={() => addChip("currentMedications", medicationInput)}>
              Add
            </Button>
          </div>
          <div style={{ display: "flex", overflowY: "auto", maxHeight: "150px", flexWrap: "wrap" }}>
            {patientData.currentMedications.map((medication, index) => (
              <ListItemStyled key={index} sx={{ listStyle: "none" }}>
                <Chip label={medication} onDelete={handleDelete(medication, "currentMedications")} />
              </ListItemStyled>
            ))}
          </div>
        </div>

        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }} disabled={loading}>
          {patientId ? `${loading == true ? "Updating" : "Update"} Patient` : `${loading == true ? "Adding" : "Add"} Patient`}
        </Button>
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
  );
}
