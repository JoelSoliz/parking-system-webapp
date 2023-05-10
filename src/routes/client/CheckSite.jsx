import React from 'react'
import {
  Grid,
  Card,
  Button,
  TextField,
  Typography,
  Box,
  Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Map from '../../components/map/Map.jsx'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es.js'

const CheckSite = () => {
  const navigate = useNavigate()

  return (
    <Box width="98%">
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        align="center"
        marginTop={-2}
        fontWeight="bold"
      >
        Verificar Sitio
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Grid container spacing={1}>
          <Grid item xs={10} sm={7}>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                overflow: 'auto',
              }}
            >
              <Map />
            </Card>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card
              sx={{
                p: 3,
                py: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: '15px',
                border: 5,
                px: 5,
              }}
              style={{ borderColor: '#90b4ce' }}
            >
              <Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                  fontWeight="bold"
                >
                  Datos de solicitud
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
                    end: 'title',
                    start:
                      'dayGridMonth,timeGridWeek,timeGridDay prev,next today',
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
                  validRange={() => ({
                    start: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1,
                    ),
                    end: new Date(new Date().getFullYear(), 6, 32),
                  })}
                  events={[
                    {
                      title: 'Event 1',
                      start: '2023-05-08T09:00:00',
                      end: '2023-05-08T11:00:00',
                      backgroundColor: 'green',
                    },
                    {
                      title: 'Event 2',
                      start: '2023-05-10T10:00:00',
                      end: '2023-05-10T12:00:00',
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
              <Stack direction="row" spacing={2} justifyContent={'center'}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/')}
                >
                  Asignar
                </Button>
                <Button variant="contained" color="secondary">
                  Volver
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default CheckSite
