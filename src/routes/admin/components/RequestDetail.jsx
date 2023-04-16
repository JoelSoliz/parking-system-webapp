import React from 'react'
import { styled } from '@mui/material/styles'

import { Modal, Fade, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { customersSelector } from '../../../store/slices/customers'

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiPaper-root': {
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 400,
    width: '100%',
    margin: '0 auto',
  },
}))

const RequestDetail = ({ open, onClose }) => {
  const { selectedCustomer } = useSelector(customersSelector)

  return (
    <>
      <StyledModal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box
            backgroundColor={'#fffffe'}
            container
            spacing={5}
            width={'40%'}
            paddingY={'50px'}
            borderRadius={'20px'}
          >
            <Box marginBottom={'20px'}>
              <Typography color="black" variant="h4" align="center">
                Especificaciones de la solicitud
              </Typography>
            </Box>
            <Typography color="black" variant="h5" align="left">
              Datos del solicitante
            </Typography>
            <Typography color="black" variant="subtitle1" paddingLeft="100px">
              <strong>Nombre(s) y Apellido(s): </strong>{' '}
              {selectedCustomer?.name}
            </Typography>

            <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>CI: </strong> {selectedCustomer?.ci}
              </Typography>

              <Typography color="black" variant="h5" align="left">
                Datos del vehículo
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Número de placa: </strong> {selectedCustomer?.last_name}
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Tipo: </strong> {selectedCustomer?.email}
              </Typography>

              <Typography color="black" variant="h5" align="left">
                Detalle de solicitud
              </Typography>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Fecha y hora de la solicitud: </strong>{' '}
                {selectedCustomer?.phone}
              </Typography>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Fecha de inicio y fin de la reserva:</strong>{' '}
                {selectedCustomer?.phone}
              </Typography>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Horario de reserva solicitada: </strong>{' '}
                {selectedCustomer?.phone}
              </Typography>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Sitio del parqueo: </strong> {selectedCustomer?.phone}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </StyledModal>
    </>
  )
}

export default RequestDetail
