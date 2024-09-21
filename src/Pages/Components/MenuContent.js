import * as React from 'react'; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

// Define icon size adjustments based on open state
const IconWrapper = styled('div')(({ open }) => ({
  // minWidth: '40px',  // Ensure a minimum width for consistent spacing
  display: 'flex',
  justifyContent: open ? 'flex-start' : 'center',
  '& svg': {
    fontSize: open ? '24px' : '32px',  // Adjust size for collapsed view
    transition: 'font-size 0.3s',  // Smooth transition between sizes
  },
}));

const mainListItems = [
  { text: 'Patients', icon: <PeopleRoundedIcon />, route: '/patients' },
  { text: 'Diet Master', icon: <AssignmentIcon />, route: '/diet-master' },
];

export default function MenuContent({ open }) {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get the current location

  const handleNavigation = (route) => {
    navigate(route); // Navigate to the selected route
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton 
              selected={location.pathname === item.route} // Highlight selected route
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: open ? '8px 16px' : '8px 8px',  // Adjust padding based on open state
                justifyContent: open ? 'flex-start' : 'center',
                marginBottom: '12px',  // Add margin between list items
              }} 
              onClick={() => handleNavigation(item.route)} // Add click handler for navigation
            >
              <IconWrapper open={open}>
                {item.icon}
              </IconWrapper>
              {open && <ListItemText primary={item.text} sx={{ ml: 2 }} />}  {/* Add margin between icon and text */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );  
}
