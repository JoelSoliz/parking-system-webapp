import { Controller, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import {
  Button,
  Card,
  TextField,
  Typography,
  Box,
  FormHelperText,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { login, sessionSelector } from '../../store/slices/session'
import { Navigate } from 'react-router-dom'

const ERROR_MESSAGES = {
  email: 'Correo electrónico inválido.',
  required: 'Este campo es requerido.',
  password: 'Correo electrónico y/o Contraseña incorrectos.',
  espacios: 'No se admiten espacios.',
  maxLength: 'La longitud máxima es',
  minLength: 'La longitud mínima es',
}

const Login = () => {
  const { isAuthenticate, loading, user } = useSelector(sessionSelector)
  const dispatch = useDispatch()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' })
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <Layout title="Login">
      {isAuthenticate ? (
        user?.role === 'CUST' ? (
          <Navigate to={'/'} />
        ) : user?.role === 'ADMN' ? (
          <Navigate to={'/admin'} />
        ) : (
          <Navigate to={'/admin/requests'} />
        )
      ) : (
        <Box alignItems="center" justifyContent="center" marginY={8}>
          <Card
            sx={{
              p: 6,
              py: 4,
              width: '110%',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              borderRadius: '15px',
              border: 5,
              marginY: -2,
            }}
            style={{ borderColor: '#90b4ce' }}
          >
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              align="center"
              sx={{ m: 0 }}
            >
              Bienvenido
            </Typography>

            <Controller
              control={control}
              name="email"
              rules={{
                pattern: {
                  message: ERROR_MESSAGES.email,
                  value: /^[A-Z0-9._]+@[A-Z0-9.]+\.[com]{2,}$/i,
                },
                required: { message: ERROR_MESSAGES.required, value: true },
              }}
              render={({ field: { onBlur, onChange, value } }) => (
                <>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Correo electrónico"
                    type="emailAddress"
                    value={value}
                    onBlur={onBlur}
                    onChange={(event) => onChange(event.target.value)}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                pattern: {
                  message: ERROR_MESSAGES.espacios,
                  value: /^[a-zA-Z0-9,.\-_!"#$%&/=?¡¿+~*{}()|°^¨]*$/i,
                },
                maxLength: {
                  message: `${ERROR_MESSAGES.maxLength} 8.`,
                  value: 8,
                },
                minLength: {
                  message: `${ERROR_MESSAGES.minLength} 5.`,
                  value: 5,
                },
                required: { message: ERROR_MESSAGES.required, value: true },
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Contraseña
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            color="black"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      error={!!errors.password?.message}
                      value={value}
                      onChange={(event) => onChange(event.target.value)}
                      label="Contraseña"
                      variant="outlined"
                      helperText={errors.password?.message}
                    />
                    {!!errors.password?.message && (
                      <FormHelperText error>
                        {errors.password?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </>
              )}
            />
            {loading === 'failed' && (
              <Typography color={'error'} textAlign={'center'}>
                Credenciales inválidas
              </Typography>
            )}
            {loading === 'pending' ? (
              <Typography textAlign={'center'}>Iniciando sesión...</Typography>
            ) : (
              <Button
                sx={{
                  height: '38px',
                  fontSize: '13px',
                }}
                variant="contained"
                color="secondary"
                onClick={handleSubmit((data) => dispatch(login(data)))}
                disabled={!isValid}
              >
                Iniciar Sesión
              </Button>
            )}
            <div style={{ marginBottom: '1px' }}></div>
          </Card>
        </Box>
      )}
    </Layout>
  )
}

export default Login
