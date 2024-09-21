import React from 'react';
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
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin for jsPDF

const data = [
    {
      Day: "Sunday",
      Data: [
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
      ],
    },
    {
      Day: "Monday",
      Data: [
        {
          heading: "Early Morning",
          plans: [{ label: 'Green Tea' }, { label: 'Toast' }],
        },
        {
          heading: "Breakfast",
          plans: [{ label: 'Pancakes' }, { label: 'Milk' }],
        },
        {
          heading: "Mid Meal",
          plans: [{ label: 'Apple' }],
        },
        {
          heading: "Lunch",
          plans: [{ label: 'Quinoa' }, { label: 'Salmon' }],
        },
        {
          heading: "Mid Evening Snack",
          plans: [{ label: 'Yogurt' }],
        },
        {
          heading: "Dinner",
          plans: [{ label: 'Stir Fry Vegetables' }],
        },
        {
          heading: "All Day",
          plans: [{ label: 'Herbal Tea' }],
        }
      ],
    },
    {
      Day: "Tuesday",
      Data: [
        {
          heading: "Early Morning",
          plans: [{ label: 'Coffee' }, { label: 'Biscuit' }],
        },
        {
          heading: "Breakfast",
          plans: [{ label: 'Smoothie' }, { label: 'Cereal' }],
        },
        {
          heading: "Mid Meal",
          plans: [{ label: 'Orange' }],
        },
        {
          heading: "Lunch",
          plans: [{ label: 'Pasta' }, { label: 'Caesar Salad' }],
        },
        {
          heading: "Mid Evening Snack",
          plans: [{ label: 'Chips' }],
        },
        {
          heading: "Dinner",
          plans: [{ label: 'Steak' }, { label: 'Mashed Potatoes' }],
        },
        {
          heading: "All Day",
          plans: [{ label: 'Lemonade' }],
        }
      ],
    },
    {
      Day: "Wednesday",
      Data: [
        {
          heading: "Early Morning",
          plans: [{ label: 'Milk' }, { label: 'Muffin' }],
        },
        {
          heading: "Breakfast",
          plans: [{ label: 'French Toast' }, { label: 'Fruit Salad' }],
        },
        {
          heading: "Mid Meal",
          plans: [{ label: 'Nuts' }],
        },
        {
          heading: "Lunch",
          plans: [{ label: 'Chicken Wrap' }],
        },
        {
          heading: "Mid Evening Snack",
          plans: [{ label: 'Granola Bar' }],
        },
        {
          heading: "Dinner",
          plans: [{ label: 'Baked Fish' }],
        },
        {
          heading: "All Day",
          plans: [{ label: 'Water' }],
        }
      ],
    },
    {
      Day: "Thursday",
      Data: [
        {
          heading: "Early Morning",
          plans: [{ label: 'Herbal Tea' }, { label: 'Bagel' }],
        },
        {
          heading: "Breakfast",
          plans: [{ label: 'Oatmeal' }, { label: 'Peach' }],
        },
        {
          heading: "Mid Meal",
          plans: [{ label: 'Cucumber Slices' }],
        },
        {
          heading: "Lunch",
          plans: [{ label: 'Tacos' }],
        },
        {
          heading: "Mid Evening Snack",
          plans: [{ label: 'Popcorn' }],
        },
        {
          heading: "Dinner",
          plans: [{ label: 'Vegetable Curry' }],
        },
        {
          heading: "All Day",
          plans: [{ label: 'Fruit Juice' }],
        }
      ],
    },
    {
      Day: "Friday",
      Data: [
        {
          heading: "Early Morning",
          plans: [{ label: 'Black Coffee' }, { label: 'Scone' }],
        },
        {
          heading: "Breakfast",
          plans: [{ label: 'Eggs' }, { label: 'Bacon' }],
        },
        {
          heading: "Mid Meal",
          plans: [{ label: 'Protein Shake' }],
        },
        {
          heading: "Lunch",
          plans: [{ label: 'Sushi' }],
        },
        {
          heading: "Mid Evening Snack",
          plans: [{ label: 'Fruit Smoothie' }],
        },
        {
          heading: "Dinner",
          plans: [{ label: 'Pizza' }],
        },
        {
          heading: "All Day",
          plans: [{ label: 'Sparkling Water' }],
        }
      ],
    },
    {
      Day: "Saturday",
      Data: [
        {
          heading: "Early Morning",
          plans: [{ label: 'Chai' }, { label: 'Cookies' }],
        },
        {
          heading: "Breakfast",
          plans: [{ label: 'Waffles' }, { label: 'Yogurt' }],
        },
        {
          heading: "Mid Meal",
          plans: [{ label: 'Mixed Berries' }],
        },
        {
          heading: "Lunch",
          plans: [{ label: 'Pasta Salad' }],
        },
        {
          heading: "Mid Evening Snack",
          plans: [{ label: 'Cheese' }],
        },
        {
          heading: "Dinner",
          plans: [{ label: 'BBQ Chicken' }],
        },
        {
          heading: "All Day",
          plans: [{ label: 'Iced Tea' }],
        }
      ],
    }
  ];
  
const patientData = {
  id: 1,
  name: 'John Doe',
  age: '30',
  gender: 'Male',
  contactNumber: '123-456-7890',
  email: 'john.doe@example.com',
};

function PatientDietView() {
    const getRowColor = (index) => {
      return index % 2 === 0 ? '#f5f5f5' : '#e0f7fa'; // Alternating colors
    };
    const downloadPDF = () => {
        const doc = new jsPDF();
        
        // Set font size for the title
        doc.setFontSize(18);
        doc.text('Patient Diet Plan', 14, 20);
        
        // Set font size for the patient information
        doc.setFontSize(12);
        
        // Patient Information
        doc.text(`Name: ${patientData.name}`, 14, 30);
        doc.text(`Age: ${patientData.age}`, 14, 35);
        
        // Get today's date
        const today = new Date();
        const dateString = today.toLocaleDateString(); // Format the date as needed
        doc.text(`Date: ${dateString}`, 14, 40);
        
        // Create the table
        const tableColumn = ['Day', 'Heading', 'Plans'];
        const tableRows = [];
      
        data.forEach((dayData) => {
          dayData.Data.forEach((diet) => {
            const plans = diet.plans.map(plan => plan.label).join(', ');
            tableRows.push([dayData.Day, diet.heading, plans]);
          });
        });
      
        // Start the table after the header
        doc.autoTable(tableColumn, tableRows, { startY: 50 });
        
        // Save the PDF
        doc.save('diet-plan.pdf');
      };

      
    // const downloadPDF = () => {
    //   const doc = new jsPDF();
    //   doc.setFontSize(12);
    //   doc.text('Patient Diet Plan', 14, 20);
  
    //   const tableColumn = ['Day', 'Heading', 'Plans'];
    //   const tableRows = [];
  
    //   data.forEach((dayData) => {
    //     dayData.Data.forEach((diet) => {
    //       const plans = diet.plans.map(plan => plan.label).join(', ');
    //       tableRows.push([dayData.Day, diet.heading, plans]);
    //     });
    //   });
  
    //   doc.autoTable(tableColumn, tableRows, { startY: 30 });
    //   doc.save('diet-plan.pdf');
    // };
  
    return (
      <div style={{ padding: '20px' }}>
        <Paper style={{ padding: '16px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Patient Information
          </Typography>
          <Typography>Name: {patientData.name}</Typography>
          <Typography>Age: {patientData.age}</Typography>
          <Typography>Gender: {patientData.gender}</Typography>
          <Typography>Contact: {patientData.contactNumber}</Typography>
          <Typography>Email: {patientData.email}</Typography>
        </Paper>
  
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
                <TableCell style={{ border: '1px solid #ccc' }}>Heading</TableCell>
                <TableCell style={{ border: '1px solid #ccc' }}>Plans</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((dayData) => (
                dayData.Data.map((diet, index) => (
                  <TableRow key={`${dayData.Day}-${diet.heading}`} style={{ backgroundColor: getRowColor(index), border: '1px solid #ccc' }}>
                    {index === 0 && (
                      <TableCell rowSpan={dayData.Data.length} style={{ border: '1px solid #ccc' }}>
                        {dayData.Day}
                      </TableCell>
                    )}
                    <TableCell style={{ border: '1px solid #ccc' }}>{diet.heading}</TableCell>
                    <TableCell style={{ border: '1px solid #ccc' }}>
                      {diet.plans.map((plan, idx) => (
                        <span key={idx}>
                          {plan.label}{idx < diet.plans.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  
  export default PatientDietView;