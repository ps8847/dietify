import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

export default function ColorModeToggle() {
  const { mode, setMode } = useColorScheme();

  // Toggle between light and dark mode
  const handleToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  if (!mode) {
    return null; // Avoid rendering if mode isn't set yet
  }

  const icon = mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />;

  return (
    <Box>
      <IconButton onClick={handleToggle} disableRipple size="small">
        {icon}
      </IconButton>
    </Box>
  );
}
