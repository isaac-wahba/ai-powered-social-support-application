import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

export const createAppTheme = (direction: 'ltr' | 'rtl') => {
  const themeOptions: ThemeOptions = {
    direction,
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: direction === 'rtl' 
        ? '"Cairo", "Arial", sans-serif'
        : '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            direction,
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

