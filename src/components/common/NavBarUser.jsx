import React from 'react'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  useMediaQuery,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Menu as MenuIcon } from '@mui/icons-material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/session'

const NavBarUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const isNonMobileDevice = useMediaQuery('(min-width: 1000px)')

  return (
    <AppBar sx={{ p: '0 5%' }} style={{ background: '#094067' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://www.umss.edu.bo/wp-content/uploads/2019/04/escudo-01.png"
            alt="Logo"
            style={{ width: '50px', height: '50px', marginRight: '2px' }}
          />
          <Typography
            variant="h5"
            color="#fffffe"
            style={{ fontWeight: 'bold' }}
          >
            Parqueo San Simón
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {isNonMobileDevice ? (
            <>
              <Link style={{ color: '#fff', textDecoration: 'none' }} to={'/'}>
                Inicio
              </Link>

              <Button
                style={{
                  color: '#fff',
                  textTransform: 'none',
                  zoom: 1.15,
                }}
                onClick={() => {
                  navigate('/')
                  dispatch(logout())
                }}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <IconButton
                sx={{ color: '#fff' }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic.button' }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    style={{ color: '#333', textDecoration: 'none' }}
                    to={'/'}
                  >
                    Inicio
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <Button
                    style={{
                      color: '#333',
                      textTransform: 'none',
                      zoom: 1.15,
                    }}
                    onClick={() => {
                      navigate('/')
                      dispatch(logout())
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default NavBarUser
