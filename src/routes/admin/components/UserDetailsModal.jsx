import React from 'react'
import { styled } from '@mui/material/styles'

import { Modal, Fade, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { customersSelector } from '../../../store/slices/customers'
import BadgeIcon from '@mui/icons-material/Badge'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import EmailIcon from '@mui/icons-material/Email'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'

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

const UserDetailsModal = ({ open, onClose }) => {
  const { loading, selectedCustomer } = useSelector(customersSelector)

  return (
    <>
      <StyledModal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box
            backgroundColor={'#094067'}
            container
            spacing={5}
            width={'35%'}
            //height={'36%'}
            // padding={'15px'}
            borderRadius={'20px'}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
              <Box sx={{ backgroundColor: '#094067', width: '70%', marginTop: '-15px', borderTopLeftRadius: '15px', textAlign: 'center' }}>
                <Typography color="white" variant="h5" align="center" marginTop='15px'>
                  <strong>DATOS DEL USUARIO</strong>
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: '#B0C4DE', width: '30%', marginTop: '-15px', borderStartEndRadius: '15px', textAlign: 'center' }}>
                <EmojiPeopleIcon sx={{ color: 'navy', fontSize: '50px' }} />
              </Box>
            </Box>

            {loading === 'pending' ? (
              <Typography color="white" variant="subtitle1" paddingLeft="100px">
                Cargando detalles...
              </Typography>
            ) : (
              <>
                <Box display={'flex'} flexDirection={'column'} gap={'10px'} sx={{ backgroundColor: '#fffffe', borderEndEndRadius: '15px', borderEndStartRadius: '15px' }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="60px"
                    paddingTop={'15px'}
                  >
                    <BadgeIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"

                    >
                      <strong>CI: </strong> {selectedCustomer?.ci}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="60px"
                  >
                    <AccountCircleIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>Nombre(s): </strong> {selectedCustomer?.name}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="60px"
                  >
                    <AccountBoxIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>Apellido(s): </strong>{' '}
                      {selectedCustomer?.last_name}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'5px'}
                    paddingLeft="60px"
                  >
                    <EmailIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>Correo electrónico: </strong>
                      {selectedCustomer?.email}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    marginBottom={'15px'}
                    paddingLeft="60px"
                  //paddingTop={'5px'}

                  >
                    <PhoneAndroidIcon sx={{ color: 'navy' }} />
                    <Typography
                      color="black"
                      variant="subtitle1"
                      paddingLeft="10px"
                      paddingTop={'5px'}
                    >
                      <strong>Celular: </strong> {selectedCustomer?.phone}
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

export default UserDetailsModal
