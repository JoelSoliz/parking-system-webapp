import React, { useMemo, useState } from 'react'
import { Card, Button, TextField, Typography, Box, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es.js'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useSelector } from 'react-redux'
import { reservationsSelector } from '../../store/slices/reservations'
import { useGetDaysBySpotQuery } from '../../api/reservations'

function generateEvents(dayList, startDate, endDate, title, backgroundColor) {
  const dateTimeList = []
  const dayMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  }

  const start = new Date(startDate + ' EST')
  const end = new Date(endDate + 'EST')

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay()
    const dayName =
      Object.keys(dayMap)[Object.values(dayMap).indexOf(dayOfWeek)]
    const day = dayList.find((item) => item.day.toLowerCase() === dayName)

    if (day) {
      const startDateTime = new Date(d)
      const [startHour, startMin, startSec] = day.start_time.split(':')
      startDateTime.setHours(startHour, startMin, startSec)
      const endDateTime = new Date(d)
      const [endHour, endMin, endSec] = day.end_time.split(':')
      endDateTime.setHours(endHour, endMin, endSec)
      dateTimeList.push({
        title,
        start: startDateTime,
        end: endDateTime,
        backgroundColor,
      })
    }
  }

  return dateTimeList
}

const CheckSite = () => {
  const navigate = useNavigate()
  const [isValid, setIsChecked] = useState(false)
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked)
  }
  const { selectedReservation } = useSelector(reservationsSelector)
  console.log(
    generateEvents(
      selectedReservation.days,
      selectedReservation.reservations.start_date,
      selectedReservation.reservations.end_date,
      'Reserva Cliente',
      'blue',
    ),
  )
  console.log(selectedReservation.days)

  const { data } = useGetDaysBySpotQuery({
    id: selectedReservation.parkings_spots.id_spot,
    startDate: selectedReservation.reservations.start_date,
    endDate: selectedReservation.reservations.end_date,
  })
  console.log()

  const otherEvents = useMemo(
    () =>
      data
        ? generateEvents(
            data?.week_days || [],
            selectedReservation.reservations.start_date,
            selectedReservation.reservations.end_date,
            'Reservado',
            'red',
          )
        : [],
    [data],
  )
  console.log(data)
  console.log(otherEvents)

  return (
    <Box width="55%" paddingX="60px" margin={'15px'}>
      <Card
        sx={{
          paddingY: 5,
          paddingX: '60px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          borderRadius: '15px',
          border: 5,
        }}
        style={{ borderColor: '#90b4ce' }}
      >
        <Box>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            align="center"
            fontWeight="bold"
          >
            Verificar sitio
          </Typography>
        </Box>

        <TextField
          label="Código de espacio"
          value={`${selectedReservation?.parkings_spots?.name}`}
          variant="outlined"
          disabled={true}
        />
        <Box display="flex" direction="row" letterSpacing={1}>
          <TextField
            label="Fecha de inicio"
            value={`${new Date(
              selectedReservation?.reservations.start_date + ' EST',
            ).toLocaleDateString('es-ES')}`}
            type={'text'}
            disabled={true}
            style={{ flexGrow: 1, flexShrink: 1, marginRight: '10px' }}
          />
          <TextField
            label="Fecha fin"
            value={`${new Date(
              selectedReservation?.reservations.end_date + ' EST',
            ).toLocaleDateString('es-ES')}`}
            type={'text'}
            disabled={true}
            style={{ flexGrow: 1, flexShrink: 1 }}
          />
        </Box>
        <Card sx={{ width: '100%' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            hiddenDays={[0]}
            height={'auto'}
            contentHeight={2.5 * 50}
            locale={esLocale}
            fixedWeekCount={false}
            headerToolbar={{
              start: 'prev,next today',
              center: 'title',
              end: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            navLinks={true}
            slotMinTime="06:30:00"
            slotMaxTime="22:00:00"
            slotDuration="1:00:00"
            slotLabelFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: 'short',
              omitZeroMinute: false,
              hour12: false,
            }}
            showNonCurrentDates={false}
            nowIndicator={true}
            initialDate={new Date()}
            validRange={() => ({
              start: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1,
              ),
              end: new Date(new Date().getFullYear(), 11, 32),
            })}
            events={generateEvents(
              selectedReservation.days,
              selectedReservation.reservations.start_date,
              selectedReservation.reservations.end_date,
              'Reserva Cliente',
              'blue',
            ).concat(otherEvents)}
          />
        </Card>
        <FormControlLabel
          control={
            <Checkbox
              type="checkbox"
              checked={isValid}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="El sitio está disponible los días y las horas
              solicitadas."
        />
        <Stack direction="row" spacing={2} justifyContent={'center'}>
          <Button
            variant="contained"
            color="secondary"
            disabled={!isValid}
            onClick={() => alert('Asignar sitio')}
          >
            Asignar sitio
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/admin/requests')}
          >
            Volver a solicitud
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default CheckSite
