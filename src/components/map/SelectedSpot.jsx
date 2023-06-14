import React from 'react'
import { Box, Typography } from '@mui/material'
import { useGetSpotQuery } from '../../api/parking'
import { useGetDaysBySpotQuery } from '../../api/reservations'
import { generateEvents } from '../../utils/events'
import { Close } from '@mui/icons-material'

const SelectedSpot = ({ id, onClose }) => {
  const { data } = useGetSpotQuery({ id })
  const startDate = new Date().toISOString().slice(0, 10)
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  const endDate = date.toISOString().slice(0, 10)
  const { data: spotEvents } = useGetDaysBySpotQuery({
    id,
    startDate,
    endDate,
  })

  console.log(data)
  console.log(spotEvents)
  console.log(
    generateEvents(
      spotEvents?.week_days ?? [],
      startDate,
      endDate,
      'Hola',
      'red',
    ),
  )
  return (
    <Box
      sx={{
        backgroundColor: '#f0f5ff',
        borderRadius: '20px',
        border: 'solid rgb(9, 64, 103)',
        paddingY: '20px',
        paddingX: '20px',
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
      <Box>Hola</Box>
    </Box>
  )
}

export default SelectedSpot
