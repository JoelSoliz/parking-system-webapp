import React from 'react'
import { Box, Typography } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import Weekdays from '../../components/weekdays/Weekdays'

const RegisterSchedule = () => {
  return (
    <Layout title="Registrar horario">
      <Box align="center" justifyContent="center" marginY={3} width="100%">
        <Box>
          <Typography
            variant="h3"
            color="black"
            paddingLeft={'165px'}
            align="left"
          >
            Registro de horario
          </Typography>
          <Weekdays isEditable={true} />
        </Box>
      </Box>
    </Layout>
  )
}

export default RegisterSchedule
