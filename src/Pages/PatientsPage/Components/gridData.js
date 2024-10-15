// const columns = [
//     {
//       field: "name",
//       headerName: "Name",
      
//       minWidth: 150,
//       renderCell: (params) => (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "start",
//             alignItems: "center",
//             height: "100%",
//             whiteSpace: "normal",
//             overflowWrap: "anywhere",
//           }}
//         >
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "contactInfo",
//       headerName: "Contact Information",
  
//       minWidth: 250,
//       renderCell: (params) => (
//         <div style={{ display: "flex", flexDirection: "column", whiteSpace: "pre-wrap" }}>
//           <strong>Address:</strong> {params.row.address}
//           <strong>Email:</strong> {params.row.email}
//           <strong>Contact No:</strong> {params.row.contactNumber}
//         </div>
//       ),
//     },
//     {
//       field: "gender",
//       headerName: "Gender",
//       flex: 0.8,
//       minWidth: 100,
//       renderCell: (params) => (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "start",
//             alignItems: "center",
//             height: "100%",
//           }}
//         >
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "age",
//       headerName: "Age",
   
//       minWidth: 70,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "height",
//       headerName: "Height",
    
//       minWidth: 70,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value} ft
//         </div>
//       ),
//     },
//     {
//       field: "weight",
//       headerName: "Weight",
    
//       minWidth: 70,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value} kg
//         </div>
//       ),
//     },
//     {
//       field: "dietaryPreference",
//       headerName: "Dietary Preference",
   
//       minWidth: 150,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "alcohol",
//       headerName: "Alcohol",
      
//       minWidth: 80,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "exerciseRegime",
//       headerName: "Exercise Regime",
     
//       minWidth: 150,
//       renderCell: (params) => (
//         <Stack direction="column" spacing={1} alignItems={'center'} justifyContent={'center'} height={'100%'}>
//           {params.value?.map((exercise, index) => (
//             <Chip key={index} label={exercise} color="primary" variant="outlined" />
//           ))}
//         </Stack>
//       ),
//     },
//     {
//       field: "lifestyle",
//       headerName: "Lifestyle",
     
//       minWidth: 120,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "jobSpecifications",
//       headerName: "Job Specifications",
    
//       minWidth: 150,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "familyHistory",
//       headerName: "Family History",
     
//       minWidth: 150,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "physiologicalConditions",
//       headerName: "Physiological Conditions",
  
//       minWidth: 200,
//       renderCell: (params) => (
  
//         <Stack direction="column" spacing={1} alignItems={'center'} justifyContent={'center'} height={'100%'}>
//         {params.value?.map((condtion, index) => (
//           <Chip key={index} label={condtion} color="primary" variant="outlined" />
//         ))}
//       </Stack>
  
       
//       ),
//     },
//     {
//       field: "surgery",
//       headerName: "Surgery",
     
//       minWidth: 120,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//         {params.value}
//       </div>
//       ),
//     },
//     {
//       field: "medications",
//       headerName: "Medications",
    
//       minWidth: 80,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value}
//         </div>
//       ),
//     },
//     {
//       field: "supplements",
//       headerName: "Supplements",
   
//       minWidth: 100,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//         {params.value}
//       </div>
//       ),
//     },
    
//     {
//       field: "eatingPattern",
//       headerName: "Eating Pattern",
    
//       minWidth: 150,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
//           {params.value}
//         </div>
//       ),
//     },
  
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 180,
//       sortable: false,
//       renderCell: (params) => (
//         <div style={{ display: "flex", gap: "8px", padding: "5px", alignItems: "center", justifyContent: "center", height: "100%" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             size="small"
//             startIcon={<EditIcon />}
//             onClick={(event) => {
//               event.stopPropagation();
//               handleEdit(params.row);
//             }}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="contained"
//             color="danger"
//             size="small"
//             sx={{ background: "hsl(0, 90%, 40%)", color: 'white' }}
//             startIcon={<DeleteIcon />}
//             onClick={(event) => {
//               event.stopPropagation();
//               handleDelete(params.row);
//             }}
//           >
//             Delete
//           </Button>
//         </div>
//       ),
//     },
//   ];