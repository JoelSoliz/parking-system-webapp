import { Box, Card, Fade, Modal, styled } from '@mui/material'
import React from 'react'
import CheckForm from './CheckForm'

function toLists(schedule) {
  const days = []
  const options = {
    timeZone: 'America/La_Paz',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }
  for (const key in schedule) {
    const day = schedule[key]
    if (day !== null && !!day.day && !!day.start_time && !!day.end_time) {
      days.push({
        day: day.day,
        start_time: new Date(day.start_time).toLocaleString('en-US', options),
        end_time: new Date(day.end_time).toLocaleString('en-US', options),
      })
    }
  }

  return days
}

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiPaper-root': {
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    maxWidth: 670,
    width: '100%',
    borderRadius: 20,
    border: '1px solid gray',
  },
}))

const CheckSiteModal = ({ open, onClose, reservation }) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            maxHeight: '85%',
            borderRadius: '15px',
            overflowY: 'scroll',
          }}
        >
          <Card
            sx={{
              p: 9,
              py: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              marginY: 1,
            }}
          >
            <CheckForm
              reservation={{ ...reservation, days: toLists(reservation?.days) }}
              onCollision={() => {}}
            />
          </Card>
        </Box>
      </Fade>
    </StyledModal>
  )
}

export default CheckSiteModal
