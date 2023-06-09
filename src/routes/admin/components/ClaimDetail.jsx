import React from 'react'
import { styled } from '@mui/material/styles'

import { Modal, Fade, Typography, Box } from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import DescriptionIcon from '@mui/icons-material/Description'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'

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

const ClaimDetail = ({ open, onClose, claim }) => {
  return (
    <>
      <StyledModal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box backgroundColor={'#fffffe'} spacing={5} borderRadius={'20px'}>
            <>
              <Box
                display={'flex'}
                flexDirection={'row'}
                gap={'5px'}
                minwidth="70px"
              >
                <Box
                  minwidth="70px"
                  margin="0 auto"
                  bgcolor="lightblue"
                  display="flex"
                  borderRadius="20px 0 0 20px"
                  flexDirection={'column'}
                  paddingTop={'1cm'}
                  paddingLeft={'15px'}
                  padding={'1cm 15px'}
                >
                  <Box marginBottom={'30px'}>
                    <Typography color="black" variant="h5" align="center">
                      <strong>USUARIO</strong>
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    marginBottom={'35px'}
                    maxWidth="180px"
                    gap={'10px'}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <AccountCircleIcon sx={{ color: 'navy', fontSize: 35 }} />
                    </Box>
                    <Box
                      sx={{
                        display: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}
                    >
                      <Typography
                        color="black"
                        variant="subtitle1"
                        marginBottom="5px"
                      >
                        <strong>Nombre y apellido:</strong>
                      </Typography>
                      <Typography
                        color="black"
                        sx={{ wordBreak: 'break-word' }}
                      >
                        {`${claim?.customer.name} ${claim?.customer.last_name}`}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    marginBottom={'35px'}
                    maxWidth="190px"
                    gap={'10px'}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BadgeIcon sx={{ color: 'navy', fontSize: 35 }} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Typography
                        color="black"
                        variant="subtitle1"
                        style={{ lineHeight: '1' }}
                      >
                        <strong>CI: </strong>
                        {claim?.customer.ci}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    maxWidth="180px"
                    gap={'10px'}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PhoneAndroidIcon sx={{ color: 'navy', fontSize: 35 }} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Typography
                        color="black"
                        variant="subtitle1"
                        style={{ lineHeight: '1' }}
                      >
                        <strong>Celular: </strong>
                        {claim?.customer.phone}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box padding="1cm" maxWidth={'13cm'} minwidth={'70px'}>
                  <Box marginBottom={'20px'}>
                    <Typography color="black" variant="h5" align="center">
                      <strong>DETALLES DEL RECLAMO</strong>
                    </Typography>
                  </Box>
                  <Box marginBottom={'15px'}>
                    <Box display="flex" alignItems="center">
                      <WysiwygIcon sx={{ color: 'navy' }} />
                      <Typography
                        color="black"
                        variant="subtitle1"
                        paddingTop={'5px'}
                        paddingLeft="5px"
                      >
                        <strong>Asunto del reclamo</strong>
                      </Typography>
                    </Box>
                    <Typography
                      color="black"
                      paddingLeft="28px"
                      sx={{ wordBreak: 'break-word' }}
                    >
                      {claim?.claim.subject}
                    </Typography>
                  </Box>
                  <Box marginBottom={'15px'}>
                    <Box display="flex" alignItems="center">
                      <DescriptionIcon sx={{ color: 'navy' }} />
                      <Typography
                        color="black"
                        variant="subtitle1"
                        paddingTop={'5px'}
                        paddingLeft="5px"
                      >
                        <strong>Descripción de los hechos</strong>
                      </Typography>
                    </Box>
                    <Typography
                      color="black"
                      paddingLeft="28px"
                      sx={{ wordBreak: 'break-word' }}
                    >
                      {claim?.claim.description}
                    </Typography>
                  </Box>
                  <Box marginBottom={'15px'}>
                    <Box display="flex" alignItems="center">
                      <WysiwygIcon sx={{ color: 'navy' }} />
                      <Typography
                        color="black"
                        variant="subtitle1"
                        paddingTop={'5px'}
                        paddingLeft="5px"
                      >
                        <strong>Sugerencias</strong>
                      </Typography>
                    </Box>
                    <Typography
                      color="black"
                      paddingLeft="28px"
                      sx={{ wordBreak: 'break-word' }}
                    >
                      {claim?.claim.request}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          </Box>
        </Fade>
      </StyledModal>
    </>
  )
}

export default ClaimDetail
