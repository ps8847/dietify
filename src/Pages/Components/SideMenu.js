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

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: open ? drawerWidth : theme.spacing(9),
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  // transition: theme.transitions.create('width', {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.enteringScreen,
  // }),
  [`& .${drawerClasses.paper}`]: {
    width: open ? drawerWidth : theme.spacing(9),
    backgroundColor: 'background.paper',
    overflowX: 'hidden',
  },
}));

export default function SideMenu() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile view

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Hide Drawer on mobile view */}
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
            }}
          >
            {/* Show avatar and details only when sidebar is open */}
            {open && (
              <>
                <Avatar
                  sizes="small"
                  alt="Riley Carter"
                  src="/static/images/avatar/7.jpg"
                  sx={{ width: 36, height: 36 }}
                />
                <Box sx={{ mr: 'auto', width: '100%' }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, lineHeight: '16px' }}
                  >
                    Riley Carter
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    riley@email.com
                  </Typography>
                </Box>
              </>
            )}
            {/* Collapse/Expand button */}
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <MenuOpenIcon />}
            </IconButton>
          </Stack>
          <MenuContent open={open} />
          <Divider />
          <Stack sx={{ p: 2 }}>
            <Button
              variant="outlined"
              fullWidth={open}
              startIcon={<LogoutRoundedIcon />}
              // sx={{
              //   justifyContent: open ? 'flex-start' : 'center',
              //   paddingLeft: open ? 2 : 0,
              // }}
            >
              {open && 'Logout'}
            </Button>
          </Stack>
        </Drawer>
      )}
    </Box>
  );
}
