import React from 'react'
import {
  Button,
  AppBar,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { Menu as MenuIcon } from '@mui/icons-material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { logout, sessionSelector } from '../../store/slices/session'

const NavBar = () => {
  const { isAuthenticate, user } = useSelector(sessionSelector)
  const dispatch = useDispatch()
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
              {!isAuthenticate ? (
                <>
                  <Link
                    style={{ color: '#fff', textDecoration: 'none' }}
                    to={'/login'}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    style={{ color: '#fff', textDecoration: 'none' }}
                    to={'/register-user'}
                  >
                    Regístrarse
                  </Link>
                </>
              ) : (
                <>
                  {user?.role === 'CUST' && (
                    <>
                      <Link
                        style={{ color: '#fff', textDecoration: 'none' }}
                        to={'/register-vehicle'}
                      >
                        Registrar Vehículo
                      </Link>
                      <Link
                        style={{ color: '#fff', textDecoration: 'none' }}
                        to={'/register-claim'}
                      >
                        Presentar Reclamo
                      </Link>
                    </>
                  )}
                  {['ADMN', 'EMPL'].includes(user?.role) && (
                    <Link
                      style={{ color: '#fff', textDecoration: 'none' }}
                      to={'/admin'}
                    >
                      Administración
                    </Link>
                  )}
                  <Button
                    style={{
                      color: '#fff',
                      textTransform: 'none',
                      zoom: 1.15,
                    }}
                    onClick={() => dispatch(logout())}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              )}
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
                {!isAuthenticate ? (
                  <>
                    <MenuItem onClick={handleClose}>
                      <Link
                        style={{ color: '#333', textDecoration: 'none' }}
                        to={'/'}
                      >
                        Inicio
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        style={{ color: '#333', textDecoration: 'none' }}
                        to={'/login'}
                      >
                        Iniciar Sesión
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        style={{ color: '#333', textDecoration: 'none' }}
                        to={'/register-user'}
                      >
                        Regístrarse
                      </Link>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    {['ADMN', 'EMPL'].includes(user?.role) && (
                      <>
                        <MenuItem onClick={handleClose}>
                          <Link
                            style={{ color: '#333', textDecoration: 'none' }}
                            to={'/register-vehicle'}
                          >
                            Registrar Vehículo
                          </Link>
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                          <Link
                            style={{ color: '#333', textDecoration: 'none' }}
                            to={'/register-claim'}
                          >
                            Presentar Reclamo
                          </Link>
                        </MenuItem>
                      </>
                    )}
                    {user?.role === 'CUST' && (
                      <MenuItem onClick={handleClose}>
                        <Link
                          style={{ color: '#333', textDecoration: 'none' }}
                          to={'/admin'}
                        >
                          Adminitración
                        </Link>
                      </MenuItem>
                    )}

                    <MenuItem onClick={handleClose}>
                      <Button
                        style={{
                          color: '#333',
                          textTransform: 'none',
                          zoom: 1.15,
                        }}
                        onClick={() => dispatch(logout())}
                      >
                        Cerrar Sesión
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
