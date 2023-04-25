import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    Typography,
    Box, Button
} from '@mui/material'
import Layout from '../../components/Layout/Layout'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SelectSchedule from '../client/SelectSchedule';
import FormGroup from '@mui/material/FormGroup'
import { useRegisterScheduleMutation } from '../../api/schedule';
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
hoy.toISOString();
console.log(hoy);

const RegisterSchedule = () => {
    const navigate = useNavigate()

    const [
        registerSchedule,
        { data, error, isError, isSuccess, reset: resetState },
    ] = useRegisterScheduleMutation()
    const handleSubmitData = (data) => {
        registerSchedule({ data })
    }
    const {
        handleSubmit,
        reset,
    } = useForm({ mode: 'onChange' })

    useEffect(() => {
        if (isSuccess) {
            reset({
                color: '',
                photo: [],
                plate: '',
                type: '',
            })
            toast.success(
                `Horario ${data?.license_plate} registrado correctamente.`,
                {
                    action: {
                        label: 'Ir al Inicio',
                        onClick: () => navigate('/'),
                    },
                },
            )
        } else if (isError) {
            toast.error(`Horario no registrado. ${error.data?.detail || error.data}`)
        }
        resetState()
    }, [data, error])

    const [isCheckedMonday, setIsCheckedMonday] = useState(false)
    const [isCheckedTuesday, setIsCheckedTuesday] = useState(false)
    const [isCheckedWednesday, setIsCheckedWednesday] = useState(false)
    const [isCheckedThursday, setIsCheckedThrusday] = useState(false)
    const [isCheckedFriday, setIsCheckedFriday] = useState(false)
    const [isCheckedSaturday, setIsCheckedSaturday] = useState(false)
    const [setIsChecked] = useState(false)
    const handleCheckboxChangeMonday = (event) => {
        setIsCheckedMonday(event.target.checked)
        setIsChecked(event.target.checked)
    }
    const handleCheckboxChangeTuesday = (event) => {
        setIsCheckedTuesday(event.target.checked)
        setIsChecked(event.target.checked)
    }
    const handleCheckboxChangeWednesday = (event) => {
        setIsCheckedWednesday(event.target.checked)
        setIsChecked(event.target.checked)
    }
    const handleCheckboxChangeThrusday = (event) => {
        setIsCheckedThrusday(event.target.checked)
        setIsChecked(event.target.checked)
    }
    const handleCheckboxChangeFriday = (event) => {
        setIsCheckedFriday(event.target.checked)
        setIsChecked(event.target.checked)
    }
    const handleCheckboxChangeSaturday = (event) => {
        setIsCheckedSaturday(event.target.checked)
        setIsChecked(event.target.checked)
    }

    return (
        <Layout title="schedule">

            <Box alignItems="center" justifyContent="center" marginY={8} width="90 %">

                <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    align="center"
                    sx={{ m: 0 }}
                >
                    Registro de horario de atención
                </Typography>
                <Box paddingLeft="-10px" marginTop={8} align='center'>
                    <FormGroup sx={{ m: 3 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    type="checkbox"
                                    checked={isCheckedMonday}
                                    onChange={handleCheckboxChangeMonday}
                                />
                            }
                            label={
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="12px"
                                    paddingY={'12px'}
                                >
                                    Lunes
                                    <Box align="center" paddingLeft="17px">
                                        <Typography sx={{
                                            display: 'inline',
                                            p: 1,
                                            m: 1,
                                            border: '1px solid',
                                            borderColor: (theme) =>
                                                theme.palette.mode === 'dark' ? 'grey.800' : '#7e7e7e',
                                            borderRadius: 1,
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                        }} >
                                            24/04/2023
                                        </Typography>
                                    </Box>
                                    <Box paddingLeft="10px">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            {isCheckedMonday && <SelectSchedule />}
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            }
                        ></FormControlLabel>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    type="checkbox"
                                    checked={isCheckedTuesday}
                                    onChange={handleCheckboxChangeTuesday}
                                />
                            }
                            label={
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="12px"
                                    paddingY={'12px'}
                                >
                                    Martes
                                    <Box align="center" paddingLeft="15px">
                                        <Typography sx={{
                                            display: 'inline',
                                            p: 1,
                                            m: 1,
                                            border: '1px solid',
                                            borderColor: (theme) =>
                                                theme.palette.mode === 'dark' ? 'grey.800' : '#7e7e7e',
                                            borderRadius: 1,
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                        }} >
                                            25/04/2023
                                        </Typography>
                                    </Box>
                                    <Box paddingLeft="10px">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            {isCheckedTuesday && <SelectSchedule />}
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            }
                        ></FormControlLabel>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    type="checkbox"
                                    checked={isCheckedWednesday}
                                    onChange={handleCheckboxChangeWednesday}
                                />
                            }
                            label={
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="12px"
                                    paddingY={'12px'}
                                >
                                    Miércoles
                                    <Box align="center" paddingLeft="0px">
                                        <Typography sx={{
                                            display: 'inline',
                                            p: 1,
                                            m: 1,
                                            border: '1px solid',
                                            borderColor: (theme) =>
                                                theme.palette.mode === 'dark' ? 'grey.800' : '#7e7e7e',
                                            borderRadius: 1,
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                        }} >
                                            26/04/2023
                                        </Typography>
                                    </Box>
                                    <Box paddingLeft="8px">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            {isCheckedWednesday && <SelectSchedule />}
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            }
                        ></FormControlLabel>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    type="checkbox"
                                    checked={isCheckedThursday}
                                    onChange={handleCheckboxChangeThrusday}
                                />
                            }
                            label={
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="12px"
                                    paddingY={'12px'}
                                >
                                    Jueves
                                    <Box align="center" paddingLeft="16px">
                                        <Typography sx={{
                                            display: 'inline',
                                            p: 1,
                                            m: 1,
                                            border: '1px solid',
                                            borderColor: (theme) =>
                                                theme.palette.mode === 'dark' ? 'grey.800' : '#7e7e7e',
                                            borderRadius: 1,
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                        }} >
                                            27/04/2023
                                        </Typography>
                                    </Box>
                                    <Box paddingLeft="10px">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            {isCheckedThursday && <SelectSchedule />}
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            }
                        ></FormControlLabel>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    type="checkbox"
                                    checked={isCheckedFriday}
                                    onChange={handleCheckboxChangeFriday}
                                />
                            }
                            label={
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="12px"
                                    paddingY={'12px'}
                                >
                                    Viernes
                                    <Box align="center" paddingLeft="13px">
                                        <Typography sx={{
                                            display: 'inline',
                                            p: 1,
                                            m: 1,
                                            border: '1px solid',
                                            borderColor: (theme) =>
                                                theme.palette.mode === 'dark' ? 'grey.800' : '#7e7e7e',
                                            borderRadius: 1,
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                        }} >
                                            28/04/2023
                                        </Typography>
                                    </Box>
                                    <Box paddingLeft="10px">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            {isCheckedFriday && <SelectSchedule />}
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            }
                        ></FormControlLabel>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    type="checkbox"
                                    checked={isCheckedSaturday}
                                    onChange={handleCheckboxChangeSaturday}
                                />
                            }
                            label={
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="12px"
                                    paddingY={'12px'}
                                >
                                    Sábado
                                    <Box align="center" paddingLeft="11px">
                                        <Typography sx={{
                                            display: 'inline',
                                            p: 1,
                                            m: 1,
                                            border: '1px solid',
                                            borderColor: (theme) =>
                                                theme.palette.mode === 'dark' ? 'grey.800' : '#7e7e7e',
                                            borderRadius: 1,
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                        }} >
                                            29/04/2023
                                        </Typography>
                                    </Box>
                                    <Box paddingLeft="12px">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            {isCheckedSaturday && <SelectSchedule />}
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            }
                        ></FormControlLabel>
                    </FormGroup>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ marginY: 5 }}
                        onClick={handleSubmit((data) => handleSubmitData(data))}
                    >
                        Guardar cambios
                    </Button>
                </Box>
            </Box>
        </Layout>
    )
}

export default RegisterSchedule
