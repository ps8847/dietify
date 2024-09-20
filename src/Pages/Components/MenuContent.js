import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { styled } from '@mui/material/styles';

// Define icon size adjustments based on open state
const IconWrapper = styled('div')(({ open }) => ({
  '& svg': {
    fontSize: open ? 'default' : '32px', // Change the size here for collapsed
  },
}));

const mainListItems = [
  { text: 'Patients', icon: <PeopleRoundedIcon /> },
];

export default function MenuContent({ open }) {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton selected={index === 0} sx={{ display: 'flex' , alignItems : "center" , justifyContent:"center" }}>
                <IconWrapper open={open} sx={{ display: 'flex' , alignItems : "center" , justifyContent:"center" }}>
         
                  {item.icon}
                </IconWrapper>
              {/* <ListItemIcon>
              </ListItemIcon> */}
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
