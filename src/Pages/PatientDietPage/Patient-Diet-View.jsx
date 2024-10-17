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
  Grid,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin for jsPDF
import axios from 'axios';
import { MAIN_URL } from '../../Configs/Urls';

// Ordered days of the week and meal categories
const orderedDaysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' , 'Sunday'];

const categories = [
  "Early Morning",
  "Breakfast",
  "Mid Meal",
  "Lunch",
  "Mid Evening Meal",
  "Dinner",
  "All Day",
];

const categoryOrder = categories.reduce((acc, category, index) => {
  acc[category] = index;
  return acc;
}, {});

function PatientDietView({ planId, onCloseForm , showPatientInfo , selectedWeekdefault}) {

  const [patientData, setPatietnData] = useState(null);
  const [DietPlan, setDietPlan] = useState(null);
  const [orderedCategories, setOrderedCategories] = useState([])

  console.log("orderedCategories is : ", orderedCategories);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  let fetchPatientDietData = async () => {
    await axios
      .get(`${MAIN_URL}patientdietplans/show/${planId}`)
      .then((response) => {
        console.log("the response here is : ", response);
        setPatietnData(response.data.Patient)
        setDietPlan(response.data.DietPlan)

        // Sort diet plans based on the category order
        const CategorisedCategories = response.data.CategorisedCategories.sort((a, b) => {
          return categoryOrder[a] - categoryOrder[b];
        });

        console.log("CategorisedCategories is : ", CategorisedCategories);
        setOrderedCategories(CategorisedCategories)

      })
      .catch((error) => {
        setSnackbarMessage("Error fetching Diet Plan data.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  useEffect(() => {
    if (planId) {
      fetchPatientDietData()
    }
  }, [planId])


  const getRowColor = (index) => {
    return index % 2 === 0 ? '#f5f5f5' : '#e0f7fa'; // Alternating colors
  };
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Patient Diet Plan', 14, 20);

    // Patient Information
    doc.setFontSize(12);
    doc.text(`Name: ${patientData?.name}`, 14, 30);
    doc.text(`Age: ${patientData?.age}`, 14, 35);

    const today = new Date();
    const dateString = today.toLocaleDateString();
    doc.text(`Date of Download: ${dateString}`, 14, 40);
    doc.text(`Week: ${selectedWeekdefault}`, 14, 45);

    const tableColumn = ['Day', 'Category', 'Items'];
    const tableRows = [];

    orderedDaysOfWeek?.forEach((day) => {
      let isFirstCategoryForDay = true;

      orderedCategories?.forEach((category) => {
        const items = DietPlan?.[day]?.[category]?.join(', ') || '---';

        // If this is the first category for the day, add the day to the first row and leave it blank for the rest
        if (isFirstCategoryForDay) {
          tableRows.push([day, category, items]);
          isFirstCategoryForDay = false; // Set flag to false so the day won't repeat
        } else {
          tableRows.push(['', category, items]); // Empty day for subsequent categories
        }
      });
    });

    // Generate the table in the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      didDrawCell: (data) => {
        // Check if this is the first column (Day column)
        if (data.column.index === 0 && data.row.index !== 0) {
          // Remove borders from the empty cells for subsequent categories
          if (data.row.raw[0] === '') {
            doc.setDrawColor(255, 255, 255); // Set draw color to white to remove the border
            doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'S');
          }
        }
      },
    });

    // Save the PDF
    doc.save('diet-plan.pdf');
  };



  return (
    <div style={{ padding: '20px' }}>

      {
        showPatientInfo == true &&
      <Paper style={{ padding: '16px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Patient Information
        </Typography>
        <Typography>Name: {patientData?.name}</Typography>
        <Typography>Age: {patientData?.age}</Typography>
        <Typography>Gender: {patientData?.gender}</Typography>
        <Typography>Contact: {patientData?.contactNumber}</Typography>
        <Typography>Email: {patientData?.email}</Typography>
      </Paper>
      }

<Typography variant="h6" mt={2} mb={2}>
            For The Week: {selectedWeekdefault}
          </Typography>

      <Button variant="contained" color="primary" onClick={downloadPDF} style={{ marginBottom: '20px' }}>
        Download as PDF
      </Button>

      <Typography variant="h6" gutterBottom>
        Diet Plan
      </Typography>
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
            {orderedDaysOfWeek?.map((day, dayIndex) => (
              orderedCategories?.map((category, index) => (
                <TableRow key={`${day}-${category}`} style={{ backgroundColor: getRowColor(index), border: '1px solid #ccc' }}>
                  {index === 0 && (
                    <TableCell rowSpan={orderedCategories.length} style={{ border: '1px solid #ccc' }}>
                      {day}
                    </TableCell>
                  )}
                  <TableCell style={{ border: '1px solid #ccc' }}>{category}</TableCell>
                  <TableCell style={{ border: '1px solid #ccc' }}>
                    {DietPlan?.[day]?.[category]?.join(', ') || '---'}
                  </TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            "& .MuiAlert-icon": {
              color: "#fff",
            },
            "& .MuiAlert-action svg": {
              color: "#fff",
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default PatientDietView;