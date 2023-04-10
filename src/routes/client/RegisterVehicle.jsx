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
import Layout from '../../components/Layout/Layout'
import FormControl from '@mui/material/FormControl'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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
  const {
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
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

  return (
    <Layout title="Registrar Vehiculo">
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
            Registrar Vehículo
          </Typography>
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
          <img
            src={imageSrc}
            alt="Preview"
            style={{ maxWidth: '100%', marginTop: 10 }}
          />
        )}
        <Stack
          direction="row"
          spacing={3}
          width={'100%'}
          display="flex"
          justifyContent={'center'}
          gap={'20px'}
        >
          <Button variant="contained"> Cancelar </Button>
          <Button variant="contained"> Registrar </Button>
        </Stack>
      </Card>
    </Layout>
  )
}

export default RegisterVehicle
