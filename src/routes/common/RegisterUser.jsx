import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import Layout from '../../components/Layout/Layout'
import { RadioButtonChecked } from '@mui/icons-material'

const ERROR_MESSAGES = {
  maxLength: 'La longitud máxima es',
  minLength: 'La longitud mínima es',
  required: 'Este campo es requerido.',
  numbers: 'Solo se admiten números.',
  valido: 'Ingrese un número de CI válido.',
  quantityMin: 'Ingrese 7 dígitos.',
  quantityMax: 'La cantidad máxima es de 7 dígitos.',
  email: 'Correo electrónico inválido.',
  letters: 'Solo se admiten letras.',
}
const RegisterUser = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onChange' })
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
          <Typography gutterBottom variant="h4" component="div" sx={{ m: 0 }}>
            Sign up
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
              if (parseInt(value) > 10000000) {
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
              value: /^[A-Z0-9._]+@[A-Z0-9.]+\.[A-Z]{2,}$/i,
            },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onBlur, onChange, value } }) => (
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
          name="password"
          rules={{
            maxLength: { message: `${ERROR_MESSAGES.maxLength} 8.`, value: 8 },
            minLength: { message: `${ERROR_MESSAGES.minLength} 5.`, value: 5 },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <>
              <TextField
                error={!!errors.password?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Contraseña"
                variant="outlined"
                type={'password'}
                helperText={errors.password?.message}
              />
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
          render={({ field: { onBlur, onChange, value } }) => (
            <>
              <TextField
                error={!!errors.passwordConfirmation?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Confirmar contraseña"
                variant="outlined"
                type={'password'}
                helperText={errors.passwordConfirmation?.message}
              />
            </>
          )}
        />

        <Typography gutterBottom variant="h8" component="div" sx={{ m: 0 }}>
          Recibir notificaciones por:
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Email"
          />
          <FormControlLabel control={<Checkbox />} label="WhatsApp" />
        </FormGroup>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Cancelar</Button>
          <Button variant="contained">Registrarse</Button>
        </Stack>
      </Card>
    </Layout>
  )
}

export default RegisterUser
