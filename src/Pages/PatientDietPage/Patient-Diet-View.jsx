import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { MAIN_URL } from '../../Configs/Urls';

const defaultOrderedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const categories = [
  "Early Morning",
  "Breakfast",
  "Mid Meal (after 2 hours)",
  "Lunch",
  "Evening",
  "Pre Dinner",
  "Dinner",
  "Post Dinner"
];

let setLocalStorageJSON = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

function PatientDietView({ planId, onCloseForm, showPatientInfo, selectedWeekdefault }) {

  const [patientData, setPatietnData] = useState(null);
  const [DietPlan, setDietPlan] = useState(null);
  const [orderedCategories, setOrderedCategories] = useState([]);
  const [orderedDaysOfWeek, setOrderedDaysOfWeek] = useState(defaultOrderedDays);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const rotateDaysBasedOnStartDate = (startDateStr) => {
    try {
      const [day, month, year] = startDateStr.split('-');
      const startDate = new Date(`${year}-${month}-${day}`);
      const startIndex = startDate.getDay(); // 0 (Sun) - 6 (Sat)
console.log("startIndex is : " , startIndex);

      const rotatedDays = [
        ...defaultOrderedDays.slice(startIndex),
        ...defaultOrderedDays.slice(0, startIndex)
      ];
      console.log("rotatedDays is : " , rotatedDays);
      
      setOrderedDaysOfWeek(rotatedDays);
    } catch (error) {
      console.error("Error parsing week start date:", error);
      setOrderedDaysOfWeek(defaultOrderedDays); // fallback
    }
  };

  let fetchPatientDietData = async () => {
    try {
      const response = await axios.get(`${MAIN_URL}patientdietplans/show/${planId}`);
      const { Patient, DietPlan, CategorisedCategories, weekDateStart } = response.data;

      setPatietnData(Patient);
      setDietPlan(DietPlan);
      setOrderedCategories(CategorisedCategories);

      // Adjust days based on start of week
      rotateDaysBasedOnStartDate(weekDateStart);

    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbarMessage("Error fetching Diet Plan data.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (planId) {
      fetchPatientDietData();
    }
  }, [planId]);

  const getRowColor = (index) => {
    return index % 2 === 0 ? '#f5f5f5' : '#e0f7fa';
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Patient Diet Plan', 14, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${patientData?.name}`, 14, 30);
    doc.text(`Age: ${patientData?.age}`, 14, 35);
    const today = new Date();
    doc.text(`Date of Download: ${today.toLocaleDateString()}`, 14, 40);
    doc.text(`Week: ${selectedWeekdefault}`, 14, 45);

    const tableColumn = ['Day', 'Category', 'Items'];
    const tableRows = [];

    orderedDaysOfWeek.forEach((day) => {
      let isFirstCategoryForDay = true;
      orderedCategories.forEach((category) => {
        const items = DietPlan?.[day]?.[category]?.join(', ') || '---';
        if (isFirstCategoryForDay) {
          tableRows.push([day, category, items]);
          isFirstCategoryForDay = false;
        } else {
          tableRows.push(['', category, items]);
        }
      });
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      didDrawCell: (data) => {
        if (data.column.index === 0 && data.row.index !== 0 && data.row.raw[0] === '') {
          doc.setDrawColor(255, 255, 255);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
        }
      },
    });

    doc.save('diet-plan.pdf');
  };

  const consoleNonEmptyData = () => {
    let filteredPlan = {};
    Object.entries(DietPlan).forEach(([day, meals]) => {
      let nonEmptyMeals = Object.fromEntries(
        Object.entries(meals).filter(([_, items]) => !items.includes("---"))
      );
      if (Object.keys(nonEmptyMeals).length > 0) {
        filteredPlan[day] = nonEmptyMeals;
      }
    });
    setLocalStorageJSON("CopiedPlan", filteredPlan);
    setSnackbarMessage("Plan Copied Successfully");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      {showPatientInfo && (
        <Paper style={{ padding: '16px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>Patient Information</Typography>
          <Typography>Name: {patientData?.name}</Typography>
          <Typography>Age: {patientData?.age}</Typography>
          <Typography>Gender: {patientData?.gender}</Typography>
          <Typography>Contact: {patientData?.contactNumber}</Typography>
          <Typography>Email: {patientData?.email}</Typography>
        </Paper>
      )}

      <Typography variant="h6" mt={2} mb={2}>For The Week: {selectedWeekdefault}</Typography>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Button variant="contained" color="primary" onClick={downloadPDF} style={{ marginBottom: '20px' }}>
          Download as PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={consoleNonEmptyData} style={{ marginBottom: '20px' }}>
          Copy This Diet Plan
        </Button>
      </div>

      <Typography variant="h6" gutterBottom>Diet Plan</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: '1px solid #ccc' }}>Day</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>Category</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedDaysOfWeek.map((day, dayIndex) =>
              categories.map((category, index) => (
                <TableRow key={`${day}-${category}`} style={{ backgroundColor: getRowColor(index) }}>
                  {index === 0 && (
                    <TableCell rowSpan={categories.length} style={{ border: '1px solid #ccc' }}>
                      {day}
                    </TableCell>
                  )}
                  <TableCell style={{ border: '1px solid #ccc' }}>{category}</TableCell>
                  <TableCell style={{ border: '1px solid #ccc' }}>
                    {DietPlan?.[day]?.[category]?.join(', ') || '---'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
    </div>
  );
}

export default PatientDietView;
