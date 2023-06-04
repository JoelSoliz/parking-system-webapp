import React from 'react'
import { styled } from '@mui/material/styles'

import { Modal, Fade, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { customersSelector } from '../../../store/slices/customers'
import BadgeIcon from '@mui/icons-material/Badge'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import DescriptionIcon from '@mui/icons-material/Description'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import FactCheckIcon from '@mui/icons-material/FactCheck'

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

const ClaimDetail = ({ open, onClose }) => {
  const { loading, selectedCustomer } = useSelector(customersSelector)

  return (
    <>
      <StyledModal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box
            backgroundColor={'#fffffe'}
            container
            spacing={5}
            width={'50%'}
            paddingY={'50px'}
            borderRadius={'20px'}
          >
            <Box marginBottom={'20px'}>
              <Typography color="black" variant="h5" align="center">
                <strong>DETALLES DEL RECLAMO</strong>
              </Typography>
            </Box>
            {loading === 'pending' ? (
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                Cargando detalles...
              </Typography>
            ) : (
              <>
                <Box display={'flex'} flexDirection={'column'} gap={'5px'}>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="50px"
                  >
                    <AccountCircleIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>Nombre(s):</strong> {selectedCustomer?.name}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="50px"
                  >
                    <AccountBoxIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>Apellido(s):</strong>{' '}
                      {selectedCustomer?.last_name}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="50px"
                  >
                    <BadgeIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>CI:</strong> {selectedCustomer?.ci}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="50px"
                  >
                    <PhoneAndroidIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>Celular:</strong> {selectedCustomer?.phone}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="50px"
                  >
                    <WysiwygIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>Asunto del reclamo:</strong>{' '}
                      {selectedCustomer?.phone}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="50px"
                  >
                    <DescriptionIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>
                        Descripción de los hechos que son objeto del reclamo:
                      </strong>{' '}
                      {selectedCustomer?.phone}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="50px"
                  >
                    <FactCheckIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>
                        Sugerencia para la mejora de la funcionalidad:
                      </strong>{' '}
                      {selectedCustomer?.phone}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </StyledModal>
    </>
  )
}

export default ClaimDetail
