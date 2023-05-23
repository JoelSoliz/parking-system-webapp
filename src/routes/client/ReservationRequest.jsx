import React, { useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SelectSchedule from './components/SelectSchedule'
import FormGroup from '@mui/material/FormGroup'
import CalendarPicker from './components/CalendarPicker'
import { useRegisterReservationMutation } from '../../api/reservations'
import { toast } from 'sonner'

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

function toLists(schedule) {
  const days = []
  const startTimes = []
  const endTimes = []

  for (const key in schedule) {
    const day = schedule[key]
    if (day !== null) {
      days.push(day.day)
      startTimes.push(day.start_time.toISOString().split('T')[1].split('.')[0])
      endTimes.push(day.end_time.toISOString().split('T')[1].split('.')[0])
    }
  }

  return { day: days, start_time: startTimes, end_time: endTimes }
}

const ReservationRequest = () => {
  const { spotId } = useParams()
  const [error, setError] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
  })
  const [days, setDays] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
  })
  const [selectedDateStart, setSelectedDateStart] = React.useState(null)
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(null)

  const weekdays = React.useMemo(
    () => getUniqueDaysInRange(selectedDateStart, selectedDateEnd),
    [selectedDateStart, selectedDateEnd],
  )
  const isValid = React.useMemo(
    () =>
      !error.monday &&
      !error.tuesday &&
      !error.wednesday &&
      !error.thursday &&
      !error.friday &&
      !error.saturday &&
      toLists(days).day.length > 0,
    [error],
  )

  function handleDateChangeStart(date) {
    setSelectedDateStart(date)
  }

  function handleDateChangeEnd(date) {
    setSelectedDateEnd(date)
  }
  const [
    registerReservation,
    { data, error: errorRR, isLoading, isError, isSuccess, reset },
  ] = useRegisterReservationMutation()

  const { user } = useSelector(sessionSelector)
  const navigate = useNavigate()

  const handleSubmit = () => {
    registerReservation({
      start_date: selectedDateStart.toISOString().split('T')[0],
      end_date: selectedDateEnd.toISOString().split('T')[0],
      id_price: 'PRIC',
      id_spot: spotId,
      ...toLists(days),
    })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(`La solicitud fue registrada correctamente.`)
      navigate('/')
    } else if (isError) {
      toast.error(
        `Solicitud no registrado. ${errorRR.data?.detail || errorRR.data}`,
      )
    }
    return () => reset()
  }, [data, errorRR])

  return (
    <Layout title="Solicitud de reserva">
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
        <TextField
          label="Código de Sitio"
          variant="outlined"
          value={spotId}
          disabled={true}
        />
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
              <SelectSchedule
                id="monday"
                label="Lunes"
                onChange={setDays}
                onError={setError}
                value={days.monday}
              />
            )}
            {weekdays.includes('Tuesday') && (
              <SelectSchedule
                id="tuesday"
                label="Martes"
                onChange={setDays}
                onError={setError}
                value={days.tuesday}
              />
            )}
            {weekdays.includes('Wednesday') && (
              <SelectSchedule
                id="wednesday"
                label="Miércoles"
                onChange={setDays}
                onError={setError}
                value={days.wednesday}
              />
            )}
            {weekdays.includes('Thursday') && (
              <SelectSchedule
                id="thursday"
                label="Jueves"
                onChange={setDays}
                onError={setError}
                value={days.thursday}
              />
            )}
            {weekdays.includes('Friday') && (
              <SelectSchedule
                id="friday"
                label="Viernes"
                onChange={setDays}
                onError={setError}
                value={days.friday}
              />
            )}
            {weekdays.includes('Saturday') && (
              <SelectSchedule
                id="saturday"
                label="Sábado"
                onChange={setDays}
                onError={setError}
                value={days.saturday}
              />
            )}
          </FormGroup>
        </Box>
        {isError && (
          <Typography color={'error'} textAlign={'center'}>
            Error, verifique los datos ingresados.
          </Typography>
        )}
        {isLoading ? (
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
            <Button
              variant="contained"
              color="secondary"
              disabled={!isValid}
              onClick={() => handleSubmit()}
            >
              Enviar Solicitud
            </Button>
          </Stack>
        )}
      </Card>
    </Layout>
  )
}

export default ReservationRequest
