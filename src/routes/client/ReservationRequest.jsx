import React, { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Box,
} from '@mui/material'
import Layout from '../../components/Layout/Layout'
import { useSelector } from 'react-redux'
import { sessionSelector } from '../../store/slices/session'
import { useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SelectSchedule from './SelectSchedule'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import CalendarPicker from './CalendarPicker'

function daysBetweenDates(date1, date2) {
  const oneDayMs = 24 * 60 * 60 * 1000
  const diffMs = Math.abs(date2 - date1)
  return Math.floor(diffMs / oneDayMs)
}
function getUniqueDaysInRange(startDate, endDate) {
  if (!startDate || !endDate) {
    return []
  }
  const days = new Set() // eslint-disable-line no-undef
  let currentDate = new Date(startDate)
  endDate = new Date(endDate)
  endDate =
    daysBetweenDates(currentDate, endDate) > 7
      ? new Date(startDate).setDate(currentDate.getDate() + 7)
      : endDate
  while (currentDate <= endDate) {
    const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' })
    days.add(day)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return Array.from(days)
}
const ReservationRequest = () => {
  const [isCheckedMonday, setIsCheckedMonday] = useState(false)
  const [isCheckedTuesday, setIsCheckedTuesday] = useState(false)
  const [isCheckedWednesday, setIsCheckedWednesday] = useState(false)
  const [isCheckedThursday, setIsCheckedThrusday] = useState(false)
  const [isCheckedFriday, setIsCheckedFriday] = useState(false)
  const [isCheckedSaturday, setIsCheckedSaturday] = useState(false)

  const [isValid, setIsChecked] = useState(false)

  const [selectedDateStart, setSelectedDateStart] = React.useState(null)
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(null)

  const weekdays = React.useMemo(
    () => getUniqueDaysInRange(selectedDateStart, selectedDateEnd),
    [selectedDateStart, selectedDateEnd],
  )

  function handleDateChangeStart(date) {
    setSelectedDateStart(date)
  }

  function handleDateChangeEnd(date) {
    setSelectedDateEnd(date)
  }

  const handleCheckboxChangeMonday = (event) => {
    setIsCheckedMonday(event.target.checked)
    setIsChecked(event.target.checked)
  }
  const handleCheckboxChangeTuesday = (event) => {
    setIsCheckedTuesday(event.target.checked)
    setIsChecked(event.target.checked)
  }
  const handleCheckboxChangeWednesday = (event) => {
    setIsCheckedWednesday(event.target.checked)
    setIsChecked(event.target.checked)
  }
  const handleCheckboxChangeThrusday = (event) => {
    setIsCheckedThrusday(event.target.checked)
    setIsChecked(event.target.checked)
  }
  const handleCheckboxChangeFriday = (event) => {
    setIsCheckedFriday(event.target.checked)
    setIsChecked(event.target.checked)
  }
  const handleCheckboxChangeSaturday = (event) => {
    setIsCheckedSaturday(event.target.checked)
    setIsChecked(event.target.checked)
  }

  const { user } = useSelector(sessionSelector)
  const navigate = useNavigate()
  const { loading } = useSelector(sessionSelector)
  return (
    <Layout title="Registrar Usuario">
      <Card
        sx={{
          p: 10,
          py: 5,
          maxWidth: '50px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          borderRadius: '15px',
          marginY: 8,
          border: 5,
        }}
        style={{ borderColor: '#90b4ce' }}
      >
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" align="center">
            Solicitud de reserva
          </Typography>
        </CardContent>
        <TextField label="Código de Sitio" variant="outlined" disabled={true} />

        <TextField
          value={user?.name}
          label="Nombre(s)"
          variant="outlined"
          type={'text'}
          disabled={true}
        />

        <TextField
          value={user?.last_name}
          label="Apellido(s)"
          variant="outlined"
          type={'text'}
          disabled={true}
        />

        <TextField
          value={user?.ci}
          label="CI"
          variant="outlined"
          type={'number'}
          disabled={true}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CalendarPicker
            style={{ marginTop: '-8px' }}
            selectedDateStart={selectedDateStart}
            selectedDateEnd={selectedDateEnd}
            onDateChangeStart={handleDateChangeStart}
            onDateChangeEnd={handleDateChangeEnd}
          />
        </LocalizationProvider>

        {((weekdays.includes('Sunday') && weekdays.length > 1) ||
          weekdays.length > 0) && (
          <Typography
            gutterBottom
            variant="h8"
            component="div"
            marginX={'-25px'}
          >
            Seleccione día(s) y horario(s):
          </Typography>
        )}
        <Box paddingLeft="-10px">
          <FormGroup sx={{ m: -3 }}>
            {weekdays.includes('Monday') && (
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    checked={isCheckedMonday}
                    onChange={handleCheckboxChangeMonday}
                  />
                }
                label={
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    paddingY={'12px'}
                  >
                    Lunes
                    <Box paddingLeft="22px">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {isCheckedMonday && <SelectSchedule />}
                      </LocalizationProvider>
                    </Box>
                  </Box>
                }
              ></FormControlLabel>
            )}
            {weekdays.includes('Tuesday') && (
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    checked={isCheckedTuesday}
                    onChange={handleCheckboxChangeTuesday}
                  />
                }
                label={
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    paddingY={'12px'}
                  >
                    Martes
                    <Box paddingLeft="17px">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {isCheckedTuesday && <SelectSchedule />}
                      </LocalizationProvider>
                    </Box>
                  </Box>
                }
              ></FormControlLabel>
            )}
            {weekdays.includes('Wednesday') && (
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    checked={isCheckedWednesday}
                    onChange={handleCheckboxChangeWednesday}
                  />
                }
                label={
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    paddingY={'12px'}
                  >
                    Miércoles
                    <Box paddingLeft="0px">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {isCheckedWednesday && <SelectSchedule />}
                      </LocalizationProvider>
                    </Box>
                  </Box>
                }
              ></FormControlLabel>
            )}
            {weekdays.includes('Thursday') && (
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    checked={isCheckedThursday}
                    onChange={handleCheckboxChangeThrusday}
                  />
                }
                label={
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    paddingY={'12px'}
                  >
                    Jueves
                    <Box paddingLeft="16px">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {isCheckedThursday && <SelectSchedule />}
                      </LocalizationProvider>
                    </Box>
                  </Box>
                }
              ></FormControlLabel>
            )}
            {weekdays.includes('Friday') && (
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    checked={isCheckedFriday}
                    onChange={handleCheckboxChangeFriday}
                  />
                }
                label={
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    paddingY={'12px'}
                  >
                    Viernes
                    <Box paddingLeft="13px">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {isCheckedFriday && <SelectSchedule />}
                      </LocalizationProvider>
                    </Box>
                  </Box>
                }
              ></FormControlLabel>
            )}
            {weekdays.includes('Saturday') && (
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    checked={isCheckedSaturday}
                    onChange={handleCheckboxChangeSaturday}
                  />
                }
                label={
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="12px"
                    paddingY={'12px'}
                  >
                    Sábado
                    <Box paddingLeft="12px">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {isCheckedSaturday && <SelectSchedule />}
                      </LocalizationProvider>
                    </Box>
                  </Box>
                }
              ></FormControlLabel>
            )}
          </FormGroup>
        </Box>
        {loading === 'failed' && (
          <Typography color={'error'} textAlign={'center'}>
            Error, verifique los datos ingresados.
          </Typography>
        )}
        {loading === 'pending' ? (
          <Typography>Enviando solicitud...</Typography>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            sx={{ m: 2.5 }}
            justifyContent={'center'}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="secondary" disabled={!isValid}>
              Enviar Solicitud
            </Button>
          </Stack>
        )}
      </Card>
    </Layout>
  )
}

export default ReservationRequest
