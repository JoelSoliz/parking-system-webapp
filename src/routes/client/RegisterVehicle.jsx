import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  FormHelperText,
  Box,
} from '@mui/material'
import Layout from '../../components/Layout/Layout'
import FormControl from '@mui/material/FormControl'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useRegisterVehicleMutation } from '../../api/vehicle'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const ERROR_MESSAGES = {
  maxLength: 'La longitud máxima es',
  minLength: 'La longitud mínima es',
  required: 'Este campo es requerido.',
  letters: 'Solo se admiten letras.',
  espacios: 'Ingrese un número de placa válido.',
  fileExtension:
    'Tipo de archivo invalido. Solo archivos JPG, JPEG y PNG son permitidos.',
}
const RegisterVehicle = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'onChange' })
  const [
    registerVehicle,
    { data, error, isLoading, isError, isSuccess, reset: resetState },
  ] = useRegisterVehicleMutation()
  const [imageSrc, setImageSrc] = useState(null)

  const validateFile = (value) => {
    const validExtensions = ['.jpg', '.jpeg', '.png']
    const fileExtension = value[0].name.split('.').pop()

    if (!validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
      return ERROR_MESSAGES.fileExtension
    }

    return true
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      setImageSrc(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const handleSubmitData = (data) => {
    registerVehicle({ data, image: imageSrc })
  }

  useEffect(() => {
    if (isSuccess) {
      reset({
        color: '',
        photo: [],
        plate: '',
        type: '',
      })
      setImageSrc(null)
      toast.success(
        `Vehiculo ${data?.license_plate} registrado correctamente.`,
        {
          action: {
            label: 'Ir al Inicio',
            onClick: () => navigate('/'),
          },
        },
      )
    } else if (isError) {
      toast.error(`Vehiculo no registrado. ${error.data?.detail || error.data}`)
    }
    resetState()
  }, [data, error])

  return (
    <Layout title="Registrar Vehiculo">
      <Card
        sx={{
          p: 9,
          py: 3,
          minWidth: '40%',
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
              Registrar Vehículo
            </Typography>
          </Box>
        </CardContent>
        <Controller
          control={control}
          name="plate"
          rules={{
            pattern: {
              message: ERROR_MESSAGES.espacios,
              value: /^[a-zA-Z0-9]*$/i,
            },
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 7.`,
              value: 7,
            },
            minLength: { message: `${ERROR_MESSAGES.minLength} 6.`, value: 6 },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.plate?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Número de placa"
                variant="outlined"
                type={'text'}
                helperText={errors.plate?.message}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="type"
          rules={{
            pattern: {
              message: ERROR_MESSAGES.letters,
              value: /^[a-zA-Z\s]*$/i,
            },
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 30.`,
              value: 30,
            },
            minLength: { message: `${ERROR_MESSAGES.minLength} 4.`, value: 4 },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.type?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Tipo de vehículo"
                variant="outlined"
                type={'text'}
                helperText={errors.type?.message}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="color"
          rules={{
            pattern: {
              message: ERROR_MESSAGES.letters,
              value: /^[a-zA-Z\s]*$/i,
            },
            maxLength: {
              message: `${ERROR_MESSAGES.maxLength} 20.`,
              value: 20,
            },
            minLength: { message: `${ERROR_MESSAGES.minLength} 4.`, value: 4 },
            required: { message: ERROR_MESSAGES.required, value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                error={!!errors.color?.message}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                label="Color del vehículo"
                variant="outlined"
                type={'text'}
                helperText={errors.color?.message}
              />
            </>
          )}
        />
        <Controller
          name="photo"
          control={control}
          rules={{ required: true, validate: validateFile }}
          defaultValue={null}
          render={({ field: { onChange } }) => (
            <FormControl variant="outlined" fullWidth>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Subir imagen
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    onChange(e.target.files)
                    handleImageChange(e)
                  }}
                />
              </Button>

              {!!errors.photo?.message && (
                <FormHelperText error>{errors.photo?.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        {!errors.photo?.message && imageSrc && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={imageSrc}
              alt="Preview"
              style={{
                maxWidth: '380px',
                maxHeight: '380px',
                marginTop: 3,
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {isLoading ? (
          <Typography textAlign="center">Registrando Vehiculo...</Typography>
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
              Registrar
            </Button>
          </Stack>
        )}
        <div style={{ marginBottom: '3px' }}></div>
      </Card>
    </Layout>
  )
}

export default RegisterVehicle
