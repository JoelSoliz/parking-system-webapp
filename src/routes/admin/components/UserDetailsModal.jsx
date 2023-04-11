import React, { useState } from 'react'
import { styled } from '@mui/material/styles'

import { Button, Modal, Fade, Typography, Box } from '@mui/material'

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiPaper-root': {
    backgroundColor: 'white', // Change the background color to white
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 400, // Reduce the maximum width to 400 pixels
    width: '100%', // Set the width to 100% to center the modal
    margin: '0 auto', // Set the margin to auto to center the modal
  },
}))

const UserDetailsModal = () => {
  const user = {
    name: 'John Doe',
    surname: 'True',
    ci: '9397790',
    email: 'johndoe@example.com',
    phone: '555-1234',
  }
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button onClick={handleOpen}>View User Info</Button>
      <StyledModal open={open} onClose={handleClose}>
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
                <strong>CI:</strong> {user.ci}
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Nombre(s):</strong> {user.name}
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Apellido(s):</strong> {user.surname}
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Correo electrónico:</strong> {user.email}
              </Typography>

              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                <strong>Celular:</strong> {user.phone}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </StyledModal>
    </>
  )
}

export default UserDetailsModal
