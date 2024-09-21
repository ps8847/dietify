import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getSignInSideTheme from './theme/getSignInSideTheme';
import SignInCard from './SignInCard';
import Content from './Content';
import { Box } from '@mui/material';

export default function SignInSide() {
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  
  const defaultTheme = createTheme({ palette: { mode: 'light' } });
  const SignInSideTheme = createTheme(getSignInSideTheme('light'));

  return (
    <Box
      sx={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, rgba(173, 216, 230, 0.3) 0%, rgba(255, 255, 255, 1) 100%)', // Light doctor-themed gradient
        animation: 'fadeIn 1.5s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }}
    >
      {/* Use the default theme with light mode */}
      <ThemeProvider theme={showCustomTheme ? SignInSideTheme : defaultTheme}>
        <CssBaseline />
        <Stack
          direction="column"
          component="main"
          sx={{
            justifyContent: 'space-between',
            height: { xs: 'auto', md: '100%' },
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: 2,
              m: 'auto',
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </ThemeProvider>
    </Box>
  );
}
