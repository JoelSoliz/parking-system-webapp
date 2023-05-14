import React from 'react'
import { styled } from '@mui/material/styles'

import {
  Modal,
  Fade,
  Typography,
  Box,
  Card,
  Stack,
  Button,
  CardContent,
  CircularProgress,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { reservationsSelector } from '../../../store/slices/reservations'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BadgeIcon from '@mui/icons-material/Badge'
import DateRangeIcon from '@mui/icons-material/DateRange'
import EventIcon from '@mui/icons-material/Event'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { useNavigate } from 'react-router-dom'

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

const RequestDetail = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { loading, selectedReservation } = useSelector(reservationsSelector)

  return (
    <>
      {loading === 'pending' ? (
        <CircularProgress
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : (
        <>
          <StyledModal open={open} onClose={onClose}>
            <Fade in={open}>
              <Card>
                <Box display="flex" flexDirection="row">
                  <CardContent style={{ padding: 40 }} sx={{ height: 430 }}>
                    <Box marginBottom={'10px'}>
                      <Typography color="black" variant="h4" align="center">
                        Detalles
                      </Typography>
                    </Box>

                    <Typography
                      color="black"
                      variant="h6"
                      align="left"
                      marginBottom={'5px'}
                    >
                      <strong>Datos del solicitante</strong>
                    </Typography>

                    <Box
                      display="flex"
                      alignItems="center"
                      marginBottom={'5px'}
                    >
                      <AccountCircleIcon sx={{ color: 'navy' }} />
                      <Typography
                        color="black"
                        variant="subtitle1"
                        paddingLeft="10px"
                        paddingTop={'4.5px'}
                      >
                        <strong>Nombre: </strong>
                        {`${selectedReservation?.reservations.customer.name} ${selectedReservation?.reservations.customer.last_name}`}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      marginBottom={'5px'}
                    >
                      <BadgeIcon sx={{ color: 'navy' }} />
                      <Typography
                        color="black"
                        variant="subtitle1"
                        paddingLeft="10px"
                        paddingTop={'5px'}
                      >
                        <strong>CI: </strong>
                        {`${selectedReservation?.reservations.customer.ci}`}
                      </Typography>
                    </Box>

                    <Typography
                      color="black"
                      variant="h6"
                      align="left"
                      marginBottom={'5px'}
                    >
                      <strong>Datos de la solicitud</strong>
                    </Typography>

                    <Box
                      display="flex"
                      alignItems="center"
                      marginBottom={'5px'}
                    >
                      <DateRangeIcon sx={{ color: 'navy' }} />
                      <Typography
                        color="black"
                        variant="subtitle1"
                        paddingLeft="10px"
                        paddingTop={'5px'}
                      >
                        <strong>Fecha y hora de la solicitud:</strong>
                        {new Date(
                          selectedReservation?.reservations.create_at,
                        ).toLocaleString('es-Es')}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      marginBottom={'5px'}
                    >
                      <EventIcon sx={{ color: 'navy' }} />
                      <Typography
                        color="black"
                        variant="subtitle1"
                        paddingLeft="10px"
                        paddingTop={'5px'}
                      >
                        <strong>Fecha de la reserva: </strong>
                        {`${new Date(
                          selectedReservation?.reservations.start_date + ' EST',
                        ).toLocaleDateString('es-ES')}-${new Date(
                          selectedReservation?.reservations.end_date + ' EST',
                        ).toLocaleDateString('es-ES')}`}
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      marginBottom={'5px'}
                    >
                      <LocationOnRoundedIcon sx={{ color: 'navy' }} />
                      <Typography
                        color="black"
                        variant="subtitle1"
                        paddingLeft="10px"
                        paddingTop={'5px'}
                      >
                        <strong>Sitio del parqueo: </strong>
                        {`${selectedReservation?.parkings_spots?.name}`}
                      </Typography>
                    </Box>
                    <Stack
                      direction="row"
                      sx={{ m: 2.5 }}
                      justifyContent={'center'}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/check')}
                      >
                        Verificar sitio
                      </Button>
                    </Stack>
                  </CardContent>
                  <Box>
                    <CardContent
                      style={{ padding: 20 }}
                      sx={{
                        width: 270,
                        height: 430,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#f0f5ff',
                      }}
                    >
                      <Box marginBottom={'20px'}>
                        <Typography color="black" variant="h5" align="center">
                          ¿Desea aceptar/rechazar la solicitud?
                        </Typography>
                      </Box>
                      <Stack justifyContent="center" container spacing={2}>
                        <Button
                          sx={{ width: '200px', height: '40px' }}
                          variant="contained"
                          color="secondary"
                          onClick={() => alert('Se aceptó la solicitud')}
                        >
                          Aceptar
                        </Button>
                        <Button
                          sx={{ width: '200px', height: '40px' }}
                          variant="contained"
                          color="secondary"
                          onClick={onClose}
                        >
                          Rechazar
                        </Button>
                      </Stack>
                    </CardContent>
                  </Box>
                </Box>
              </Card>
            </Fade>
          </StyledModal>
        </>
      )}
    </>
  )
}

export default RequestDetail
