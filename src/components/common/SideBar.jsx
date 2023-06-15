import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function LinkTab(props) {
  const navigate = useNavigate()
  return (
    <Tab
      onClick={(event) => {
        event.preventDefault()
        navigate(props.to)
      }}
      {...props}
    />
  )
}

export default function SideBar({ children }) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: '#094067',
        display: 'flex',
        height: '100vh',
        marginTop: 8,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 2, borderColor: 'divider', width: '20%', color: '#3da9fc' }}
        style={{ fontWeight: 'bold', color: 'pink' }}
      >
        <LinkTab
          label="Clientes"
          {...a11yProps(0)}
          sx={{
            fontWeight: 'bold',
            color: '#3da9fc',
            '&:hover': {
              backgroundColor: '#3da9fc',
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
          style={{ color: '#fff' }}
          to="/admin"
        />
        <LinkTab
          label="Solicitudes"
          {...a11yProps(1)}
          sx={{
            fontWeight: 'bold',
            color: '#3da9fc',
            '&:hover': {
              backgroundColor: '#3da9fc',
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
          style={{ color: '#fff' }}
          to="/admin/requests"
        />
        <LinkTab
          label="Horarios"
          {...a11yProps(2)}
          sx={{
            fontWeight: 'bold',
            color: '#3da9fc',
            '&:hover': {
              backgroundColor: '#3da9fc',
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
          style={{ color: '#fff' }}
          to="/admin/registerSchedule"
        />
        <LinkTab
          label="Reclamos"
          {...a11yProps(2)}
          sx={{
            fontWeight: 'bold',
            color: '#3da9fc',
            '&:hover': {
              backgroundColor: '#3da9fc',
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
          style={{ color: '#fff' }}
          to="/admin/claim"
        />
        <LinkTab
          label="Registrar empleado"
          {...a11yProps(2)}
          sx={{
            fontWeight: 'bold',
            color: '#3da9fc',
            '&:hover': {
              backgroundColor: '#3da9fc',
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
          style={{ color: '#fff' }}
          to="/admin/employed"
        />
      </Tabs>
      <Box sx={{ p: 1, bgcolor: '#fffffe', width: '100%' }}>{children}</Box>
    </Box>
  )
}
