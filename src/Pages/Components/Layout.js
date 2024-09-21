import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideMenu from './SideMenu'; // Common Sidebar
import AppNavbar from './AppNavbar'; // Common Navbar
import Header from './Header'; // Common Header
import AppTheme from "../../Theme/shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  treeViewCustomizations,
} from './DashboardComponents/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...treeViewCustomizations,
};

export default function Layout({ AppnavHeading, HeaderHeading }) {
  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />  {/* Sidebar remains common */}
        <AppNavbar AppnavHeading={AppnavHeading} />  {/* Navbar remains common */}
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
            <Header HeaderHeading={HeaderHeading} />  {/* Header for the current page */}
            <Outlet />  {/* Renders the nested components */}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
