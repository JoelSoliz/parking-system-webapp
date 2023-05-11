import React, { useState } from 'react'
import { Card, Button, TextField, Typography, Box, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es.js'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const CheckSite = () => {
  const navigate = useNavigate()
  const [isValid, setIsChecked] = useState(false)
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked)
  }
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
          value={'DOC117'}
          variant="outlined"
          disabled={true}
        />
        <Box display="flex" direction="row" letterSpacing={1}>
          <TextField
            label="Fecha de inicio"
            value={'9/May/2023'}
            type={'text'}
            disabled={true}
            style={{ flexGrow: 1, flexShrink: 1, marginRight: '10px' }}
          />
          <TextField
            label="Fecha fin"
            value={'16/May/2023'}
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
            events={[
              {
                title: 'Reserva 1',
                start: '2023-05-01T09:00:00',
                end: '2023-05-01T11:00:00',
                backgroundColor: 'green',
              },
              {
                title: 'Reserva 1',
                start: '2023-05-08T09:00:00',
                end: '2023-05-08T11:00:00',
                backgroundColor: 'green',
              },
              {
                title: 'Reserva 1',
                start: '2023-05-15T09:00:00',
                end: '2023-05-15T11:00:00',
                backgroundColor: 'green',
              },
              {
                title: 'Event 10',
                start: '2023-06-01T10:00:00',
                end: '2023-06-01T12:00:00',
                backgroundColor: 'blue',
              },
              {
                title: 'Event 3',
                start: '2023-05-11T14:00:00',
                end: '2023-05-11T16:00:00',
                backgroundColor: 'red',
              },
            ]}
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
          <Button variant="contained" color="secondary" disabled={!isValid}>
            Asignar sitio
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/')}
          >
            Volver a solicitud
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default CheckSite
