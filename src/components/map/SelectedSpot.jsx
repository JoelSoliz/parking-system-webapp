import React from 'react'
import { Close } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useGetSpotQuery } from '../../api/parking'
import Calendar from '../common/Calendar'
import { generateEvents } from '../../utils/events'

const backgroundColors = ['#0D0221', '#0F084B', '#26408B', '#A6CFD5', '#C2E7D9']

function getAllEvents(reservations) {
  const events = []
  reservations.forEach((reservation, i) => {
    events.push(
      ...generateEvents(
        reservation.days,
        reservation.reservation.start_date,
        reservation.reservation.end_date,
        'Reservado',
        backgroundColors[i % 5],
      ),
    )
  })

  return events
}

const SelectedSpot = ({ id, onClose }) => {
  const { data } = useGetSpotQuery({ id })
  const events = getAllEvents(data?.reservations || [])

  return (
    <Box
      sx={{
        backgroundColor: '#f0f5ff',
        borderRadius: '20px',
        border: 'solid rgb(9, 64, 103)',
        paddingY: '20px',
        paddingX: '20px',
        maxWidth: '600px',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Typography variant="h4">Detalles del espacio</Typography>
        <Close
          fontSize="large"
          onClick={() => onClose()}
          sx={{
            marginLeft: '10px',
            cursor: 'pointer',
            borderRadius: '50%',
            backgroundColor: 'rgb(9, 64, 103)',
            color: '#fff',
            '&:hover': { color: '#ff0000' },
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          marginTop: '10px',
        }}
      >
        <Typography>
          <strong>Nombre: </strong>
          {data?.parking.name}
        </Typography>
        <Typography>
          <strong>Sección: </strong>
          {data?.parking.section.slice(0, 1).toUpperCase() +
            data?.parking.section.slice(1)}
        </Typography>
        <Box sx={{ marginTop: '10px' }}>
          <Calendar events={events} />
        </Box>
      </Box>
    </Box>
  )
}

export default SelectedSpot
