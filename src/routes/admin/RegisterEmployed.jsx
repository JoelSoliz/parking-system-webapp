import { Controller, useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
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
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useRegisterEmployMutation } from '../../api/employed'

const ERROR_MESSAGES = {
    maxLength: 'La longitud máxima es',
    minLength: 'La longitud mínima es',
    required: 'Este campo es requerido.',
    numbers: 'Solo se admiten números.',
    valido: 'Ingrese un número de CI válido.',
    quantityMin: 'Ingrese 7 dígitos como mínimo.',
    quantityMax: 'Ingrese 8 dígitos como máximo.',
    email: 'Correo electrónico inválido.',
    letters: 'Solo se admiten letras.',
    celularValido: 'Ingrese un número móvil válido.',
    celularValidoInicia: 'Un número válido inicia con 6 o 7.',
    celularValidoMin: 'El número movil debe tener 8 dígitos.',
    celularValidoMax: 'Solo se admiten 8 dígitos como máximo.',
    espacios: 'No se admiten espacios.',
    salario: 'Ingresa una cantidad valida',
    salarioMin: 'El salario minimo es de 1500 bs',
    salarioMax: 'El salario maximo es de 3000 bs,'
}
const validarNumero = (value) => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(value);
};

const RegisterEmployed = () => {
    const navigate = useNavigate()
    const [registerEmploy, { isLoading, isError, isSuccess, data, error, reset }] =
        useRegisterEmployMutation()
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        watch,
    } = useForm({ mode: 'onChange' })
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const [showPasswordC, setShowPasswordC] = useState(false)
    const handleClickShowPasswordC = () => setShowPasswordC((show) => !show)

    useEffect(() => {
        if (isSuccess) {
            toast.success(`Se registro correctamente ${data?.name}.`)
            navigate('/login')
        } else if (isError) {
            toast.error(
                `No se registro correctamente: ${error.data?.detail || error.data
                }`,
            )
        }
        reset()
    }, [data, error])

    return (
        <Layout title="Registrar Guardia">
            <Box
                marginY={1}
                width="100%"
                marginX={1}
                align="center">
                <CardContent sx={{ m: 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            paddingLeft: '39px',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h3" color={'black'}>
                            Registrar Empleados
                        </Typography>
                    </Box>
                </CardContent>

                <Card
                    sx={{
                        p: 5,
                        py: 5,
                        width: '65%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        borderRadius: '15px',
                        border: 2,
                        marginY: 2,
                        marginBottom: '40px',
                    }}
                    style={{ borderColor: '#90b4ce' }}
                >
                    <Box display="flex" direction="row" letterSpacing={1}>
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
                                        style={{ flexGrow: 1, flexShrink: 1, marginRight: '18px' }}
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
                                        style={{ flexGrow: 1, flexShrink: 1 }}
                                        helperText={errors.last_name?.message}
                                    />
                                </>
                            )}
                        />
                    </Box>
                    <Box display="flex" direction="row" letterSpacing={1}>
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
                                        style={{ flexGrow: 1, flexShrink: 1, marginRight: '18px' }}
                                        helperText={errors.ci?.message}
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
                                        style={{ flexGrow: 1, flexShrink: 1 }}
                                        helperText={errors.phone?.message}
                                    />
                                </>
                            )}
                        />
                    </Box>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            maxLength: {
                                message: `${ERROR_MESSAGES.maxLength} 30.`,
                                value: 30,
                            },
                            minLength: {
                                message: `${ERROR_MESSAGES.minLength} 6.`,
                                value: 6,
                            },
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
                                    style={{ letterSpacing: 1 }}
                                    helperText={errors.email?.message}
                                />
                            </>
                        )}
                    />
                    <Box display="flex" direction="row" letterSpacing={1}>
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
                                    <FormControl
                                        variant="outlined"
                                        style={{
                                            width: '100%',
                                            marginRight: '18px',
                                        }}
                                    >
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
                                maxLength: {
                                    message: `${ERROR_MESSAGES.maxLength} 8.`,
                                    value: 8,
                                },
                                minLength: {
                                    message: `${ERROR_MESSAGES.minLength} 5.`,
                                    value: 5,
                                },
                                required: { message: ERROR_MESSAGES.required, value: true },
                                validate: (value) =>
                                    value === watch('password') || 'La contraseña no coincide.',
                            }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <FormControl variant="outlined" sx={{ width: '100%' }}>
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
                    </Box>
                    <Box display="flex" direction="row" letterSpacing={1}>
                        <Controller
                            control={control}
                            name="salary"
                            rules={{
                                required: { message: ERROR_MESSAGES.required, value: true },
                                validate: (value) => {
                                    if (!validarNumero(parseFloat(value))) {
                                        return ERROR_MESSAGES.salario
                                    }
                                    if (parseInt(value) < 1500) {
                                        return ERROR_MESSAGES.salarioMin
                                    }
                                    if (parseInt(value) <= 0) {
                                        return ERROR_MESSAGES.salarioMin
                                    }
                                    if (parseInt(value) > 3000) {
                                        return ERROR_MESSAGES.salarioMax
                                    }
                                    return true
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <TextField
                                        error={!!errors.salary?.message}
                                        value={value}
                                        onChange={(event) => onChange(event.target.value)}
                                        label="Salario (Bs)"
                                        variant="outlined"
                                        type={'number'}
                                        style={{ flexGrow: 1, flexShrink: 1 }}
                                        helperText={errors.salary?.message}
                                    />
                                </>
                            )}
                        />
                    </Box>
                    {isLoading ? (
                        <Typography>Registrando...</Typography>
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
                                onClick={handleSubmit((data) =>
                                    registerEmploy({ ...data, user_type: '', hire_date: new Date().toISOString(), }),
                                )}
                                disabled={!isValid}
                            >
                                Registrar
                            </Button>
                        </Stack>
                    )}
                </Card>
            </Box>

        </Layout>
    )
}

export default RegisterEmployed
