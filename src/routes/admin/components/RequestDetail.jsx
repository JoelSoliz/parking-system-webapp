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
            spacing={4}
            width={'40%'}
            padding={'2rem'}
            borderRadius={'20px'}
            overflow-y={'auto'}
          >
            <Box marginBottom={'5px'}>
              <button>
                <span aria-hidden="true">&times;</span>
              </button>
              <Typography variant="h5" align="center" color="#094067">
                <strong>Especificaciones de la solicitud</strong>
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
              <Typography color="black" variant="h6" align="center">
                <strong>Datos del solicitante </strong>
              </Typography>

              <Typography color="black" variant="subtitle1">
                <strong>Nombre(s): </strong>
                {selectedCustomer?.name}
              </Typography>

              <Typography color="black" variant="subtitle1">
                <strong>Apellido(s): </strong>
                {selectedCustomer?.surname}
              </Typography>

              <Typography color="black" variant="subtitle1">
                <strong>CI: </strong> {selectedCustomer?.ci}
              </Typography>

              <Typography color="black" variant="h6" align="center">
                <strong>Datos del vehículo </strong>
              </Typography>

              <Typography color="black" variant="subtitle1">
                <strong>Número de placa: </strong> {selectedCustomer?.last_name}
              </Typography>

              <Typography color="black" variant="subtitle1">
                <strong>Tipo: </strong> {selectedCustomer?.email}
              </Typography>

              <Typography color="black" variant="h6" align="center">
                <strong>Detalles de solicitud </strong>
              </Typography>
              <Typography color="black" variant="subtitle1">
                <strong>Fecha y hora de la solicitud: </strong>
                {selectedCustomer?.phone}
              </Typography>
              <Typography color="black" variant="subtitle1">
                <strong>Fecha de inicio y fin de la reserva:</strong>
                {selectedCustomer?.phone}
              </Typography>
              <Typography color="black" variant="subtitle1">
                <strong>Horario de reserva solicitada: </strong>
                {selectedCustomer?.phone}
              </Typography>
              <Typography color="black" variant="subtitle1">
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
