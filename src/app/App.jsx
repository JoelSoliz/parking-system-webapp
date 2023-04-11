import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
import Router from '../components/Router/Router'
import theme from '../theme'
import store, { persistor } from '../store/store'

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate
        loading={<Typography>Cargando...</Typography>}
        persistor={persistor}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
