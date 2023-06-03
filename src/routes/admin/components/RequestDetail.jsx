import React, { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import {
  reservationsSelector,
  updateStatus,
} from '../../../store/slices/reservations'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BadgeIcon from '@mui/icons-material/Badge'
import DateRangeIcon from '@mui/icons-material/DateRange'
import EventIcon from '@mui/icons-material/Event'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { useNavigate } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel'
import InfoIcon from '@mui/icons-material/Info'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useRejectReservationMutation } from '../../../api/reservations'
import { toast } from 'sonner'

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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, selectedReservation } = useSelector(reservationsSelector)

  const [
    rejectReservation,
    { data: dataAR, isLoading, error, isSuccess, reset, isError },
  ] = useRejectReservationMutation()
  useEffect(() => {
    if (isSuccess) {
      toast.success(`La solicitud fue rechazada.`)
      dispatch(updateStatus(dataAR.status))
    } else if (isError) {
      toast.error(
        `Hubo un error al rechazar la solicitud. ${
          error.data?.detail || error.data
        }`,
      )
    }
    return () => reset()
  }, [dataAR, error])

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
                  <CardContent style={{ padding: 40 }}>
                    <Box marginBottom={'15px'}>
                      <Typography color="black" variant="h5" align="center">
                        <strong>DETALLES</strong>
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
                  </CardContent>
                  <Box>
                    <CardContent
                      style={{ padding: 40 }}
                      sx={{
                        width: 290,
                        height: 385,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#f0f5ff',
                      }}
                    >
                      {isLoading ? (
                        <Typography textAlign="center">
                          Realizando acción...
                        </Typography>
                      ) : (
                        <>
                          {selectedReservation?.status === 'Occupied' && (
                            <>
                              <TaskAltIcon
                                sx={{ fontSize: 100, color: '#00CC00' }}
                              />
                              <Typography
                                color="black"
                                variant="h5"
                                align="center"
                                paddingLeft="10px"
                                paddingTop={'10px'}
                                style={{
                                  fontSize: '1.2rem',
                                  fontWeight: 'bold',
                                }}
                              >
                                La solicitud fue aceptada
                              </Typography>
                            </>
                          )}

                          {selectedReservation?.status === 'Available' && (
                            <>
                              <HighlightOffIcon
                                sx={{ fontSize: 100, color: '#FF3333' }}
                              />
                              <Typography
                                color="black"
                                variant="h6"
                                align="center"
                                paddingLeft="10px"
                                paddingTop={'10px'}
                                style={{
                                  fontSize: '1.2rem',
                                  fontWeight: 'bold',
                                }}
                              >
                                La solitud fue rechazada
                              </Typography>
                            </>
                          )}

                          {selectedReservation?.status === 'Reserved' && (
                            <>
                              <Box marginBottom={'15px'}>
                                <Typography
                                  color="black"
                                  variant="h5"
                                  align="center"
                                >
                                  <strong>SOLICITUD</strong>
                                </Typography>
                              </Box>
                              <Box display="flex">
                                <InfoIcon />
                                <Typography
                                  color="black"
                                  variant="h7"
                                  paddingLeft={'5px'}
                                  marginBottom={'13px'}
                                >
                                  Para aceptar la solicitud, es necesario
                                  verificar el sitio.
                                </Typography>
                              </Box>
                              <Stack
                                justifyContent="center"
                                container
                                spacing={3}
                              >
                                <Button
                                  sx={{
                                    width: '190px',
                                    height: '40px',
                                    paddingTop: '5px',
                                  }}
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => navigate('/check')}
                                  startIcon={
                                    <CheckCircleIcon
                                      style={{ color: 'white' }}
                                    />
                                  }
                                >
                                  Verificar
                                </Button>

                                <Button
                                  sx={{
                                    width: '190px',
                                    height: '40px',
                                    paddingTop: '5px',
                                  }}
                                  variant="contained"
                                  color="secondary"
                                  startIcon={<CancelIcon />}
                                  onClick={() =>
                                    rejectReservation({
                                      id: selectedReservation?.reservations
                                        ?.id_reservation,
                                    })
                                  }
                                >
                                  Rechazar
                                </Button>
                              </Stack>
                            </>
                          )}
                        </>
                      )}
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
