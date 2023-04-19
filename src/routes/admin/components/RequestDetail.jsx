import React from 'react'
import { styled } from '@mui/material/styles'

import { Modal, Fade, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { reservationsSelector } from '../../../store/slices/reservations'

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
  const { loading, selectedReservation } = useSelector(reservationsSelector)

  return (
    <>
      <StyledModal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box
            backgroundColor={'#fffffe'}
            container
            spacing={4}
            width={'40%'}
            padding={'50px'}
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
            {loading === 'pending' ? (
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                Cargando detalles...
              </Typography>
            ) : (
              <>
                <Typography color="black" variant="h5" align="left">
                  Datos del solicitante
                </Typography>
                <Typography
                  color="black"
                  variant="subtitle1"
                  paddingLeft="100px"
                >
                  <strong>Nombre(s) y Apellido(s): </strong>{' '}
                  {`${selectedReservation?.customer.name} ${selectedReservation?.customer.last_name}`}
                </Typography>

                <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                  <Typography
                    color="black"
                    variant="subtitle1"
                    paddingLeft="100px"
                  >
                    <strong>CI: </strong> {selectedReservation?.customer.ci}
                  </Typography>

                  <Typography color="black" variant="h5" align="left">
                    Detalle de solicitud
                  </Typography>
                  <Typography
                    color="black"
                    variant="subtitle1"
                    paddingLeft="100px"
                  >
                    <strong>Fecha y hora de la solicitud: </strong>{' '}
                    {new Date(selectedReservation?.create_at).toLocaleString(
                      'es-Es',
                    )}
                  </Typography>
                  <Typography
                    color="black"
                    variant="subtitle1"
                    paddingLeft="100px"
                  >
                    <strong>Fecha de inicio y fin de la reserva:</strong>{' '}
                    {`${new Date(
                      selectedReservation?.start_date,
                    ).toLocaleDateString('es-ES')}-${new Date(
                      selectedReservation?.end_date,
                    ).toLocaleDateString('es-ES')}`}
                  </Typography>
                  <Typography
                    color="black"
                    variant="subtitle1"
                    paddingLeft="100px"
                  >
                    <strong>Sitio del parqueo: </strong>{' '}
                    {selectedReservation?.parking_spot?.name}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </StyledModal>
    </>
  )
}

export default RequestDetail
