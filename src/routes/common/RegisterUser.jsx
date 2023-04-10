import { Controller, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  FormHelperText,
} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Layout from '../../components/Layout/Layout'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const ERROR_MESSAGES = {
  maxLength: 'La longitud máxima es',
  minLength: 'La longitud mínima es',
  required: 'Este campo es requerido.',
  numbers: 'Solo se admiten números.',
  valido: 'Ingrese un número de CI válido.',
  quantityMin: 'Ingrese 7 dígitos como mínimo.',
  quantityMax: 'Solo se admiten 8 dígitos como máximo.',
  email: 'Correo electrónico inválido.',
  letters: 'Solo se admiten letras.',
  celularValido: 'Ingrese un número móvil válido.',
  celularValidoInicia: 'Un número válido inicia con 6 o 7.',
  celularValidoMin: 'El número movil debe tener 8 dígitos.',
  celularValidoMax: 'Solo se admiten 8 dígitos como máximo.',
  espacios: 'No se admiten espacios.',
}
const RegisterUser = () => {
  const {
    control,
    formState: { errors },
    // handleSubmit,
    watch,
  } = useForm({ mode: 'onChange' })
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const [showPasswordC, setShowPasswordC] = useState(false)
  const handleClickShowPasswordC = () => setShowPasswordC((show) => !show)
  return (
    <Layout title="Registrar Usuario">
      {' '}
      <Card
        sx={{
          p: 10,
          py: 5,
          maxWidth: '50px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          borderRadius: '15px',
        }}
      >
        <CardContent sx={{ m: 0 }}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            align="center"
            sx={{ m: 0 }}
          >
            Registrarse
          </Typography>
        </CardContent>
        <Controller
          control={control}
          name="name"
          rules={{
            pattern: {
              message: ERROR_MESSAGES.letters,
              value: /^[a-zA-Z\s]*$/i,
            },
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 30.`,
              value: 30,
            },
            minLength: { message: `${ERROR_MESSAGES.minLength} 3.`, value: 3 },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.name?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Nombre(s)"
                variant="outlined"
                type={'text'}
                helperText={errors.name?.message}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="surname"
          rules={{
            pattern: {
              message: ERROR_MESSAGES.letters,
              value: /^[a-zA-Z\s]*$/i,
            },
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 30.`,
              value: 30,
            },
            minLength: { message: `${ERROR_MESSAGES.minLength} 3.`, value: 3 },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.surname?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Apellido(s)"
                variant="outlined"
                type={'text'}
                helperText={errors.surname?.message}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="ci"
          rules={{
            required: { message: ERROR_MESSAGES.required, value: true },
            validate: (value) => {
              if (isNaN(parseInt(value))) {
                return ERROR_MESSAGES.valido
              }
              if (parseFloat(value) % 1 != 0) {
                return ERROR_MESSAGES.valido
              }
              if (parseInt(value) < 0) {
                return ERROR_MESSAGES.valido
              }
              if (parseInt(value) <= 1000000) {
                return ERROR_MESSAGES.quantityMin
              }
              if (parseInt(value) > 100000000) {
                return ERROR_MESSAGES.quantityMax
              }
              return true
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.ci?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="CI"
                variant="outlined"
                type={'number'}
                helperText={errors.ci?.message}
              />
            </>
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 30.`,
              value: 30,
            },
            minLength: { message: `${ERROR_MESSAGES.minLength} 6.`, value: 6 },
            pattern: {
              message: ERROR_MESSAGES.email,
              value: /^[A-Z0-9._]+@[A-Z0-9.]+\.[com]{2,}$/i,
            },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.email?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Correo electrónico"
                variant="outlined"
                type={'emailAddress'}
                helperText={errors.email?.message}
              />
            </>
          )}
        />

        <Controller
          control={control}
          name="phone"
          rules={{
            required: { message: ERROR_MESSAGES.required, value: true },
            validate: (value) => {
              if (isNaN(parseInt(value))) {
                return ERROR_MESSAGES.celularValido
              }
              if (parseFloat(value) % 1 != 0) {
                return ERROR_MESSAGES.celularValido
              }
              if (parseInt(value) <= 0) {
                return ERROR_MESSAGES.celularValido
              }
              if (parseInt(value) < 60000000) {
                return ERROR_MESSAGES.celularValido
              }
              if (parseInt(value) >= 80000000) {
                return ERROR_MESSAGES.celularValido
              }
              return true
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.phone?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Celular"
                variant="outlined"
                type={'number'}
                helperText={errors.phone?.message}
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
            maxLength: { message: `${ERROR_MESSAGES.maxLength} 8.`, value: 8 },
            minLength: { message: `${ERROR_MESSAGES.minLength} 5.`, value: 5 },
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
        <Controller
          control={control}
          name="passwordConfirmation"
          rules={{
            maxLength: { message: `${ERROR_MESSAGES.maxLength} 8.`, value: 8 },
            minLength: { message: `${ERROR_MESSAGES.minLength} 5.`, value: 5 },
            required: { message: ERROR_MESSAGES.required, value: true },
            validate: (value) =>
              value === watch('password') || 'La contraseña no coincide.',
          }}
          render={({ field: { onChange, value } }) => (
            <>
              {' '}
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirmar contraseña
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPasswordC ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        color="black"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordC}
                        edge="end"
                      >
                        {showPasswordC ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={!!errors.passwordConfirmation?.message}
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                  label="Confirmar contraseña"
                  variant="outlined"
                  helperText={errors.passwordConfirmation?.message}
                />
                {!!errors.passwordConfirmation?.message && (
                  <FormHelperText error>
                    {errors.passwordConfirmation?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          )}
        />

        <Typography gutterBottom variant="h8" component="div" sx={{ m: 0 }}>
          Recibir notificaciones por:
        </Typography>
        <RadioGroup>
          <FormControlLabel value="email" control={<Radio />} label="Email" />
          <FormControlLabel
            value="whatsaap"
            control={<Radio />}
            label="WhatsApp"
          />
        </RadioGroup>

        <Stack direction="row" spacing={2}>
          <Button variant="contained">Cancelar</Button>
          <Button variant="contained">Registrarse</Button>
        </Stack>
      </Card>
    </Layout>
  )
}

export default RegisterUser
