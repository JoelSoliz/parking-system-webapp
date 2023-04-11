import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from '../components/Router/Router'
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from '../theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>

  )
}



export default App
