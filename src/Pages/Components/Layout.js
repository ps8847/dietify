import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // Import Outlet for nested routes
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideMenu from './SideMenu'; // Common Sidebar
import AppNavbar from './AppNavbar'; // Common Navbar
import Header from './Header'; // Common Header
import { createTheme, ThemeProvider } from '@mui/material';
import getCustomTheme from '../../Theme/CustomTheme';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setadminData } from '../../Redux/Slices/Admin_Slice';

export default function Layout({ AppnavHeading, HeaderHeading }) {

  // const defaultTheme = createTheme({ palette: { mode: 'dark' } });
  const customTheme = createTheme(getCustomTheme('light'));


  const navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');

    // If token exists, verify it by making an API call
    if (token) {
      axios.post('https://doctorbackend.mhtm.ca/api/admin/verify-token', { token })
        .then(response => {
          // If token is valid, navigate to the /patients page
          if (response.status === 200) {
            dispatch(setadminData(response.data.user))
            // navigate('/patients');
          }
        })
        .catch(error => {
          // Handle error, such as token being invalid
          navigate("/auth/SignUp");
        });
      } else {
      navigate("/auth/SignUp");

    }
  }, [navigate]);


  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar AppnavHeading={AppnavHeading} /> 
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : theme.palette.background.default,
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header HeaderHeading={HeaderHeading} /> 
            <Outlet /> 
          </Stack>
        </Box>
      </Box>
    
    </ThemeProvider>
  );
}
