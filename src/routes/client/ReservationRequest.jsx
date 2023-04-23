import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Box,
} from '@mui/material'
import Layout from '../../components/Layout/Layout'

import { useDispatch, useSelector } from 'react-redux'
import { registerUser, sessionSelector } from '../../store/slices/session'
import { useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CalendarPicker from './CalendarPicker'
import SelectSchedule from './SelectSchedule'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'

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

const ReservationRequest = (defaultValue = {}) => {
  const navigate = useNavigate()
  const { loading } = useSelector(sessionSelector)
  const dispatch = useDispatch()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange', defaultValues: defaultValue })
  return (
    <Layout title="Registrar Usuario">
      <Card
        sx={{
          p: 10,
          py: 5,
          maxWidth: '50px auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          borderRadius: '15px',
          marginY: 8,
          border: 5,
        }}
        style={{ borderColor: '#90b4ce' }}
      >
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" align="center">
            Solicitud de reserva
          </Typography>
        </CardContent>
        <Typography color="black" variant="h6" marginTop={-4}>
          <strong>Sitio:</strong>
        </Typography>
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
            minLength: {
              message: `${ERROR_MESSAGES.minLength} 3.`,
              value: 3,
            },
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
          name="last_name"
          rules={{
            pattern: {
              message: ERROR_MESSAGES.letters,
              value: /^[a-zA-Z\s]*$/i,
            },
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 30.`,
              value: 30,
            },
            minLength: {
              message: `${ERROR_MESSAGES.minLength} 3.`,
              value: 3,
            },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.last_name?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Apellido(s)"
                variant="outlined"
                type={'text'}
                helperText={errors.last_name?.message}
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CalendarPicker />
        </LocalizationProvider>
        <Typography gutterBottom variant="h8" component="div">
          Seleccione los días://ocultar componente
        </Typography>

        <FormGroup sx={{ m: -4 }}>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                paddingY={'15px'}
              >
                Lunes
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <SelectSchedule />
                </LocalizationProvider>
              </Box>
            }
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                paddingY={'15px'}
              >
                Martes
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <SelectSchedule />
                </LocalizationProvider>
              </Box>
            }
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                paddingY={'15px'}
              >
                Miércoles
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <SelectSchedule />
                </LocalizationProvider>
              </Box>
            }
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                paddingY={'15px'}
              >
                Jueves
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <SelectSchedule />
                </LocalizationProvider>
              </Box>
            }
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                paddingY={'15px'}
              >
                Viernes
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <SelectSchedule />
                </LocalizationProvider>
              </Box>
            }
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                paddingY={'15px'}
              >
                Sábado
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <SelectSchedule />
                </LocalizationProvider>
              </Box>
            }
          ></FormControlLabel>
        </FormGroup>

        {loading === 'failed' && (
          <Typography color={'error'} textAlign={'center'}>
            Error, verifique los datos ingresados.
          </Typography>
        )}
        {loading === 'pending' ? (
          <Typography>Iniciando sesión...</Typography>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            sx={{ m: 2.5 }}
            justifyContent={'center'}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit((data) => dispatch(registerUser(data)))}
              disabled={!isValid}
            >
              Enviar Solicitud
            </Button>
          </Stack>
        )}
      </Card>
    </Layout>
  )
}

export default ReservationRequest
