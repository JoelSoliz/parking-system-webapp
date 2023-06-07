import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Modal, Fade, FormControl, Button, Typography, Card, Stack } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import { useRegisterScheduleMutation } from '../../api/schedule'
import { toast } from 'sonner'

const sixtAM = dayjs()
    .set('hour', 6)
    .set('minute', 30)
    .startOf('hour' && 'minute')
const tenPM = dayjs().set('hour', 22).startOf('hour')

function toDay(hours) {

    if (!hours)
        return null

    const time = hours.split(":")
    return dayjs().set('hour', parseInt(time[0])).set('minute', parseInt(time[1])).startOf('hour' && 'minute')
}

const StyledModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiPaper-root': {
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxWidth: 400,
        width: '100%',
        margin: '0 auto',
    },
}))


function convertDayToSpanish(day) {
    switch (day.toLowerCase()) {
        case 'monday':
            return 'Lunes';
        case 'tuesday':
            return 'Martes';
        case 'wednesday':
            return 'Miércoles';
        case 'thursday':
            return 'Jueves';
        case 'friday':
            return 'Viernes';
        case 'saturday':
            return 'Sábado';
        default:
            return 'Invalid day';
    }
}

const RegisterDate = ({ open, onClose, inivalue, onChange }) => {
    const [error, setError] = React.useState(null)
    const [errorI, setErrorI] = React.useState(null)
    const label = convertDayToSpanish(inivalue?.days || '')
    const op = toDay(inivalue?.openning_time)
    const cl = toDay(inivalue?.clousing_time)
    console.log(op)
    const [value, setvalue] = useState(() => ({ openning: op, clousing: cl }))
    console.log(value.openning)
    const handleTimeChangeStart = (time) => {
        setvalue((val) => ({
            ...val,
            openning: time
        }))
        validateDate(time, value?.clousing)
    }
    const handleTimeChangeEnd = (time) => {
        setvalue((val) => ({
            ...val,
            clousing: time
        }))
        validateDate(value?.openning, time)
    }

    const validateDate = (start_time, end_time) => {
        if (end_time && start_time && end_time <= start_time) {
            setError('end-time-before-start-time')
        } else if (!end_time || !start_time) {
            setError('required')
        } else {
            setError(null)
        }
    }
    const handleSetError = (newError) => {
        setError(newError)
    }
    const handleSetErrorI = (newError) => {
        setErrorI(newError)
    }

    const errorMessage = React.useMemo(() => {
        function getError(error) {
            switch (error) {
                case 'maxTime':
                case 'minTime': {
                    return 'Seleccione una hora entre 6:30 am - 10:00 pm.'
                }

                case 'invalidDate': {
                    return 'Ingrese una hora válida.'
                }
                case 'end-time-before-start-time': {
                    return 'La hora final es menor que la hora de inicio.'
                }
                case 'required': {
                    return 'Esta campo es obligatorio.'
                }
                default: {
                    return ''
                }
            }
        }
        return getError
    }, [error])

    const [
        registerSchedule,
        { data, error: errorRR, isLoading, isError, isSuccess, reset },
    ] = useRegisterScheduleMutation()

    const handleSubmit = () => {
        const options = {
            timeZone: 'America/La_Paz',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        }
        registerSchedule({ id: inivalue?.id_hour, cl: new Date(value.clousing).toLocaleString('en-US', options), op: new Date(value.openning).toLocaleString('en-US', options) })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(`El horario fue modificado correctamente.`)
            onChange()
        } else if (isError) {
            toast.error(
                `Horario no modificado. ${errorRR.data?.detail || errorRR.data}`,
            )
        }
        return () => reset()
    }, [data, errorRR])

    return (
        <>
            <StyledModal open={open} onClose={onClose}>
                <Fade in={open}>
                    <Card style={{
                        borderRadius: '10px', alignItems: 'center', height: '40%', align: 'center', backgroundColor: '#fffffe',
                        width: '50%'
                    }}

                    >
                        <Typography style={{ fontSize: 20, fontWeight: 'bold' }} align='center' paddingY={'5px'}>
                            {label}
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <FormControl error={error} style={{ width: '100%' }}>
                                <DemoContainer sx={{ display: 'flex', gap: '20px', flexDirection: 'column !important', '&>div': { marginLeft: '0 !important' } }}
                                    components={['DesktopTimePicker', 'DesktopTimePicker']}
                                >
                                    <DemoItem>
                                        <DesktopTimePicker
                                            label="Hora de inicio"
                                            value={value?.openning}
                                            onChange={handleTimeChangeStart}
                                            minTime={sixtAM}
                                            maxTime={tenPM}
                                            onError={(newError) => handleSetErrorI(newError)}
                                            slotProps={{
                                                textField: {
                                                    helperText: errorMessage(errorI),
                                                },
                                            }}
                                        />
                                    </DemoItem>

                                    <DemoItem>
                                        <DesktopTimePicker
                                            label="Hora fin"
                                            value={value?.clousing}
                                            onChange={handleTimeChangeEnd}
                                            minTime={sixtAM}
                                            maxTime={tenPM}
                                            onError={(newError) => handleSetError(newError)}
                                            slotProps={{
                                                textField: {
                                                    error: !!error,
                                                    helperText: errorMessage(error),
                                                },
                                            }}
                                        />
                                    </DemoItem>

                                    {isLoading ? (
                                        <Typography>Guardando horario...</Typography>
                                    ) : (
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            width={'100%'}
                                            justifyContent='center'
                                        >
                                            <Button
                                                variant="contained"
                                                sx={{ width: '100px', height: '38px', fontSize: '12px' }}
                                                style={{ padding: 5, backgroundColor: '#094067', color: '#fff', borderRadius: '5px' }}
                                                onClick={() => onClose()}
                                            >
                                                Cancelar
                                            </Button>

                                            <Button
                                                variant="contained"
                                                sx={{ width: '100px', height: '38px', fontSize: '12px' }}
                                                style={{ padding: 5, backgroundColor: '#094067', color: '#fff', borderRadius: '5px' }}
                                                onClick={() => handleSubmit()}
                                                disabled={!!error || !!errorI}
                                            >
                                                Guardar
                                            </Button>
                                        </Stack>
                                    )}
                                </DemoContainer>
                            </FormControl>
                        </LocalizationProvider>


                    </Card>
                </Fade>
            </StyledModal >
        </>
    )
}

export default RegisterDate