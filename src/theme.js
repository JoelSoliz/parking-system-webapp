import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#d5e8f5',
    },
    secondary: {
      main: '#094067',
    },
  },
  typography: {
    fontFamily: ['sans-serif'].join(','),
    fontSize: 12,
  },
})
export default theme
