import React, { useState } from 'react'
import { styled } from '@mui/material/styles'

import { Button, Modal, Fade, Typography, Box } from '@mui/material'
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

const UserDetailsModal = ({ open, onClose }) => {
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
                Detalles de usuario
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>CI:</strong> {selectedCustomer?.ci}
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Nombre(s):</strong> {selectedCustomer?.name}
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Apellido(s):</strong> {selectedCustomer?.last_name}
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Correo electrónico:</strong> {selectedCustomer?.email}
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Celular:</strong> {selectedCustomer?.phone}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </StyledModal>
    </>
  )
}

export default UserDetailsModal
