import React, { useEffect, useMemo } from 'react'
import { generateEvents } from '../../../utils/events'
import { useGetDaysBySpotQuery } from '../../../api/reservations'
import { Box, Card, TextField, Typography } from '@mui/material'
import Calendar from '../../../components/common/Calendar'

const CheckForm = ({ reservation, onCollision }) => {
  const { data } = useGetDaysBySpotQuery({
    id: reservation?.parkings_spots.id_spot,
    startDate: reservation?.reservations.start_date,
    endDate: reservation?.reservations.end_date,
  })

  const otherEvents = useMemo(
    () =>
      data
        ? generateEvents(
            data?.week_days || [],
            reservation?.reservations.start_date,
            reservation?.reservations.end_date,
            'Ocupado',
            'red',
          )
        : [],
    [data],
  )

  const reservationEvents = generateEvents(
    reservation?.days,
    reservation?.reservations.start_date,
    reservation?.reservations.end_date,
    'Reserva Cliente',
    'blue',
  )

  const hasCollision = useMemo(() => {
    for (const reservationEvent of reservationEvents) {
      for (const otherEvent of otherEvents) {
        if (
          reservationEvent.start < otherEvent.end &&
          reservationEvent.end > otherEvent.start
        ) {
          return true
        }
      }
    }
    return false
  }, [reservationEvents, otherEvents])

  useEffect(() => {
    onCollision(hasCollision)
  }, [hasCollision])

  return (
    <>
      <Box
        sx={{
          marginBottom: '-15px',
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          align="center"
          fontWeight="bold"
        >
          Verificar disponibilidad de estacionamiento
        </Typography>
      </Box>
      <TextField
        label="Código de espacio"
        value={`${
          reservation?.parkings_spots?.name ||
          reservation?.parkings_spots?.id_spot
        }`}
        variant="outlined"
        disabled={true}
      />
      <Box display="flex" direction="row" letterSpacing={1}>
        <TextField
          label="Fecha de inicio"
          value={`${new Date(
            reservation?.reservations.start_date + ' EST',
          ).toLocaleDateString('es-ES')}`}
          type={'text'}
          disabled={true}
          style={{ flexGrow: 1, flexShrink: 1, marginRight: '10px' }}
        />
        <TextField
          label="Fecha fin"
          value={`${new Date(
            reservation?.reservations.end_date + ' EST',
          ).toLocaleDateString('es-ES')}`}
          type={'text'}
          disabled={true}
          style={{ flexGrow: 1, flexShrink: 1 }}
        />
      </Box>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Calendar events={reservationEvents.concat(otherEvents)} />
      </Card>
      {hasCollision ? (
        <Typography variant="body1" color="error" align="center">
          El sitio está ocupado en el horario solicitado.
        </Typography>
      ) : (
        <Typography variant="body1" color="success" align="center">
          El sitio está disponible en el horario solicitado.
        </Typography>
      )}
    </>
  )
}

export default CheckForm
