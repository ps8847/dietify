import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ColorModeIconDropdown from '../../Theme/shared-theme/ColorModeIconDropdown';
import MenuButton from './MenuButton';
import MenuContent from './MenuContent';

function SideMenuMobile({ open, toggleDrawer }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: '#1E88E5', // Medical blue background
          color: '#fff', // White text color for contrast
        },
      }}
    >
      <Stack sx={{ maxWidth: '70dvw', height: '100%' }}>
        {/* Header */}
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 , alignItems:'center'}}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center' , justifyContent:'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="Riley Carter"
              src="/static/images/avatar/7.jpg"
              sx={{ width: 36, height: 36 }}
            />
            <Typography component="p" variant="h6" sx={{ color: '#fff' }}>
              Riley Carter
            </Typography>
          </Stack>
          {/* <MenuButton>
            <ColorModeIconDropdown />
          </MenuButton> */}
        </Stack>
        <Divider sx={{ borderColor: '#fff' }} />
        {/* Menu Content */}
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent open={true} />
          <Divider sx={{ borderColor: '#fff' }} />
        </Stack>
        {/* Logout Button */}
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            sx={{
              color: '#fff',
              borderColor: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
