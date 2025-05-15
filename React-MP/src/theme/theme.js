// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // también puedes usar 'dark' si quieres modo oscuro
    primary: {
      main: '#FFCC33', // amarillo
    },
    secondary: {
      main: '#f50057', // rosado
    },
    background: {
      default: '#f5f5f5', // fondo general
      paper: '#ffffff', // fondo de tarjetas, appbar, etc.
    },
    text: {
      primary: '#222', // texto principal oscuro
      secondary: '#555', // texto secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
export default theme;
