import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: open ? drawerWidth : theme.spacing(10),
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  [`& .${drawerClasses.paper}`]: {
    width: open ? drawerWidth : theme.spacing(10),
    backgroundColor: '#1E88E5', // Medical-themed blue
    color: '#fff', // White text for contrast
    overflowX: 'hidden',
  },
}));

export default function SideMenu() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile view

  let navigate = useNavigate();
  let adminData = useSelector((state) => state.admin.adminData)

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('auth_token');
  
    // Redirect to login page
    navigate("/auth/SignUp");
  };

  
  return (
    <Box sx={{ display: 'flex' }}>
      {!isMobile && (
        <Drawer variant="permanent" open={open}>
          <Stack
            direction="row"
            sx={{
              p: 2,
              gap: 1,
              alignItems: 'center',
              borderTop: '1px solid',
              borderColor: 'divider',
              color: '#fff', // White text
            }}
          >
            {open && (
              <>
                <Avatar
                  sizes="small"
                  alt={adminData?.name}
                  src="/static/images/avatar/7.jpg"
                  sx={{ width: 36, height: 36 }}
                />
                <Box sx={{ mr: 'auto', width: '100%' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {adminData?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#fff' }}>
                    {adminData?.email}
                  </Typography>
                </Box>
              </>
            )}
            {/* Collapse/Expand Button */}
            <IconButton
              onClick={toggleDrawer}
              sx={{
                color: '#fff', // White color for the icon
                '&:hover': {
                  backgroundColor: 'inherit', // Keep the background the same as before hover
                },
              }}
            >
              {open ? <ChevronLeftIcon /> : <MenuOpenIcon />}
            </IconButton>
          </Stack>
          <MenuContent open={open} />
          <Divider sx={{ borderColor: '#fff' }} />
          <Stack sx={{ p: 1 }}>
            <Button
            onClick={() => handleLogout()}
              variant="outlined"
              fullWidth={open}
              startIcon={<LogoutRoundedIcon />}
              sx={{
                color: '#fff',
                borderColor: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              {open && 'Logout'}
            </Button>
          </Stack>
        </Drawer>
      )}
    </Box>
  );
}
