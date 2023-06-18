import React, { useState, useEffect } from 'react'
import {
  Card,
  Button,
  Typography,
  Box,
  Stack,
  CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  reservationsSelector,
  updateStatus,
} from '../../store/slices/reservations'
import { useAcceptReservationMutation, useRejectReservationMutation } from '../../api/reservations'
import { toast } from 'sonner'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CheckForm from './components/CheckForm'
import CancelIcon from '@mui/icons-material/Cancel'

const CheckSite = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, selectedReservation } = useSelector(reservationsSelector)
  const [isValid, setIsValid] = useState(true)

  const [rejectReservation, { data, isLoading: isLoadingR, error: errorR, isSuccess: isSucceessR, reset: resetR, isError: isErrorR }]
    = useRejectReservationMutation()

  const [acceptReservation, { data: dataAR, isLoading, error, isSuccess, reset, isError }]
    = useAcceptReservationMutation()

  useEffect(() => {
    if (isSucceessR) {
      toast.success(`La solicitud fue rechazada.`)
      dispatch(updateStatus(data.status))
    } else if (isErrorR) {
      toast.error(
        `Hubo un error al rechazar la solicitud. ${errorR.data?.detail || errorR.data
        }`,
      )
    }
    return () => resetR()
  }, [data, errorR])

  useEffect(() => {
    if (isSuccess) {
      toast.success(`La solicitud fue aceptada.`)
      dispatch(updateStatus(dataAR.status))
    } else if (isError) {
      toast.error(
        `Hubo un error al rechazar la solicitud. ${error.data?.detail || error.data
        }`,
      )
    }
    return () => reset()
  }, [dataAR, error])

  return (
    <Box width="55%" paddingX="60px" margin={'15px'}>
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
          <Card
            sx={{
              p: 9,
              py: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              borderRadius: '15px',
              border: 5,
              marginY: 1,
              marginBottom: '70px',
            }}
            style={{ borderColor: '#90b4ce' }}
          >
            <CheckForm
              reservation={selectedReservation}
              onCollision={(collision) => setIsValid(!collision)}
            />
            {isLoading || isLoadingR ? (
              <Typography textAlign="center">Realizando accion...</Typography>
            ) : (
              <Stack direction="row" spacing={4} justifyContent={'center'}>
                <Button
                  sx={{
                    width: '180px',
                    height: '38px',
                    fontSize: '12px',
                  }}
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    navigate(
                      `/admin/requests?modal=open&reservation-id=${selectedReservation?.reservations?.id_reservation}`,
                    )
                  }
                >
                  Volver a detalle
                </Button>
                {(selectedReservation?.status == 'Reserved') && (
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
                )}
                {(selectedReservation?.status == 'Reserved') && (
                  <Button
                    sx={{
                      width: '180px',
                      height: '38px',
                      fontSize: '12px',
                      marginBottom: '15px',
                    }}
                    variant="contained"
                    color="secondary"
                    disabled={!isValid}
                    onClick={() =>
                      acceptReservation({
                        id: selectedReservation?.reservations?.id_reservation,
                      })
                    }
                    startIcon={
                      <CheckCircleOutlineIcon style={{ color: 'white' }} />
                    }
                  >
                    Aprobar
                  </Button>
                )}
              </Stack>
            )}
          </Card>
        </>
      )}
    </Box>
  )
}

export default CheckSite
