import React from 'react'
import { Box, Typography } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import Weekdays from '../../components/weekdays/Weekdays'
import ProtectComponent from '../../components/common/ProtectComponent'

const RegisterSchedule = () => {
  return (
    <Layout title="Registrar horario">
      <Box align="center" justifyContent="center" marginY={3} width="100%" paddingX={'63px'}>
        <Box>
          <Typography
            variant="h3"
            color="black"
            //paddingLeft={'165px'}
            align="left"
          >
            Registro de horario
          </Typography>
          <ProtectComponent needed_permission={['ADMN']}>
            <Weekdays isEditable={true} />
          </ProtectComponent>
          <ProtectComponent needed_permission={['EMPL']}>
            <Weekdays />
          </ProtectComponent>
        </Box>
      </Box>
    </Layout>
  )
}

export default RegisterSchedule
