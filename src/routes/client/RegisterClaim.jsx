import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { sessionSelector } from '../../store/slices/session'
import { useSelector } from 'react-redux'
import { useRegisterClaimMutation } from '../../api/claim'

const ERROR_MESSAGES = {
  maxLength: 'La longitud máxima es',
  minLength: 'La longitud mínima es',
  required: 'Este campo es requerido.',
  numbers: 'No se permiten números, símbolos o caracteres especiales.',
  symbols: 'No se permiten símbolos o caracteres especiales.',
}
const RegisterClaim = () => {
  const { user } = useSelector(sessionSelector)
  const navigate = useNavigate()
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({ mode: 'onChange' })
  const [
    registerClaim,
    { data, error, isLoading, isError, isSuccess, reset: resetState },
  ] = useRegisterClaimMutation()
  const handleSubmitData = (data) => {
    registerClaim({
      subject: data.subject,
      description: data.description,
      request: data.request,
      registration_date: new Date().toISOString(),
    })
  }
  useEffect(() => {
    if (isSuccess) {
      reset({
        subject: '',
        description: '',
        request: '',
      })
      toast.success(`Se registró su reclamo exitosamente.`)
      navigate('/')
    } else if (isError) {
      toast.error(`Reclamo no registrado. ${error.data?.detail || error.data}`)
    }
    return () => resetState()
  }, [data, error])

  return (
    <Layout title="Presentar Reclamo">
      <Card
        sx={{
          p: 9,
          py: 3,
          minWidth: '48%',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          borderRadius: '15px',
          border: 5,
          marginY: 1,
          marginBottom: '70px',
        }}
        style={{ borderColor: '#90b4ce' }}
      >
        <CardContent sx={{ m: 0 }}>
          <Box
            sx={{
              marginBottom: '-15px',
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              align="center"
              sx={{ m: 0 }}
            >
              Formulario de reclamo
            </Typography>
          </Box>
        </CardContent>
        <Box display="flex" direction="row" letterSpacing={1}>
          <TextField
            value={user?.name}
            label="Nombre(s)"
            variant="outlined"
            type={'text'}
            disabled={true}
            style={{ flexGrow: 1, flexShrink: 1, marginRight: '15px' }}
          />
          <TextField
            value={user?.last_name}
            label="Apellido(s)"
            variant="outlined"
            type={'text'}
            disabled={true}
            style={{ flexGrow: 1, flexShrink: 1 }}
          />
        </Box>
        <Box display="flex" direction="row" letterSpacing={1}>
          <TextField
            value={user?.ci}
            label="CI"
            variant="outlined"
            type={'number'}
            disabled={true}
            style={{ flexGrow: 1, flexShrink: 1, marginRight: '15px' }}
          />
          <TextField
            value={user?.phone}
            label="Número de celular"
            variant="outlined"
            type={'text'}
            disabled={true}
            style={{ flexGrow: 1, flexShrink: 1 }}
          />
        </Box>
        <Controller
          control={control}
          name="subject"
          rules={{
            pattern: {
              message: ERROR_MESSAGES.numbers,
              value: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s.,¡!¿?-]+$/,
            },
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 30.`,
              value: 30,
            },
            minLength: {
              message: `${ERROR_MESSAGES.minLength} 10.`,
              value: 10,
            },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.subject?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Asunto"
                placeholder='Asunto del reclamo'
                variant="outlined"
                type={'text'}
                helperText={errors.subject?.message}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{
            pattern: {
              message: ERROR_MESSAGES.symbols,
              value: /^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s.,:¡!¿?()-]*$/,
            },
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 200.`,
              value: 200,
            },
            minLength: {
              message: `${ERROR_MESSAGES.minLength} 15.`,
              value: 15,
            },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.description?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Descripción"
                placeholder='Descripción de los hechos que son objeto del reclamo'
                variant="outlined"
                multiline
                rows={3}
                type={'text'}
                helperText={errors.description?.message}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="request"
          rules={{
            pattern: {
              message: ERROR_MESSAGES.symbols,
              value: /^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s.,:¡!¿?()]*$/,
            },
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 125.`,
              value: 125,
            },
            minLength: {
              message: `${ERROR_MESSAGES.minLength} 10.`,
              value: 10,
            },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.request?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Sugerencias"
                placeholder='Sugerencias para la mejora de la funcionalidad'
                variant="outlined"
                multiline
                rows={3}
                type={'text'}
                helperText={errors.request?.message}
              />
            </>
          )}
        />
        {isLoading ? (
          <Typography textAlign="center">Registrando Reclamo...</Typography>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            width={'100%'}
            display="flex"
            justifyContent={'center'}
            gap={'20px'}
          >
            <Button
              sx={{
                width: '180px',
                height: '38px',
                fontSize: '12px',
              }}
              variant="contained"
              color="secondary"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
            <Button
              sx={{
                width: '180px',
                height: '38px',
                fontSize: '12px',
              }}
              variant="contained"
              color="secondary"
              disabled={!isValid}
              onClick={handleSubmit((data) => handleSubmitData(data))}
            >
              Enviar
            </Button>
          </Stack>
        )}
        <div style={{ marginBottom: '2px' }}></div>
      </Card>
    </Layout>
  )
}

export default RegisterClaim
