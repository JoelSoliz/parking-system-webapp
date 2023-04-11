import React, { useState } from 'react'
import { styled } from '@mui/material/styles'

import { Button, Modal, Fade, Typography, Avatar, Grid } from '@mui/material'

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

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: 'auto',
}))
const UserDetailsModal = () => {
  const user = {
    name: 'John Doe',
    surname: 'True',
    ci: '9397790',
    email: 'johndoe@example.com',
    phone: '555-1234',
    avatarUrl: 'https://randomuser.me/api/portraits/men/83.jpg',
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
          <Grid backgroundColor={'#fffffe'} container spacing={2}>
            <Grid item xs={12}>
              <StyledAvatar alt={user.name} src={user.avatarUrl} />
            </Grid>
            <Grid item xs={12}>
              <Typography color="black" variant="h4" align="center">
                Detalles del usuario
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                CI: {user.ci}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                Nombre(s): {user.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                Apellido(s): {user.surname}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                Correo electrónico: {user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="black" variant="subtitle1" paddingLeft="100px">
                Celular: {user.phone}
              </Typography>
            </Grid>
          </Grid>
        </Fade>
      </StyledModal>
    </>
  )
}

export default UserDetailsModal
