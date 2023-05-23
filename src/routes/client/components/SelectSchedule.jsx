import React from 'react'
import dayjs from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material'

const sixtAM = dayjs()
  .set('hour', 6)
  .set('minute', 30)
  .startOf('hour' && 'minute')
const tenPM = dayjs().set('hour', 22).startOf('hour')

const SelectSchedule = ({ id, label, value, onChange, onError }) => {
  const [errorI, setErrorI] = React.useState(null)
  const [error, setError] = React.useState(null)
  const handleTimeChangeStart = (time) => {
    onChange((val) => ({
      ...val,
      [id]: {
        ...val[id],
        start_time: time,
      },
    }))
    validateDate(time, value?.end_time)
  }
  const handleTimeChangeEnd = (time) => {
    onChange((val) => ({
      ...val,
      [id]: {
        ...val[id],
        end_time: time,
      },
    }))
    validateDate(value?.start_time, time)
  }
  const validateDate = (start_time, end_time) => {
    if (end_time && start_time && end_time <= start_time) {
      setError('end-time-before-start-time')
      onError((value) => ({ ...value, [id]: 'end-time-before-start-time' }))
    } else if (!end_time || !start_time) {
      setError('required')
      onError((value) => ({ ...value, [id]: 'required' }))
    } else {
      setError(null)
      onError((value) => ({ ...value, [id]: null }))
    }
  }
  const handleSetError = (newError) => {
    setError(newError)
    onError((value) => ({ ...value, [id]: newError }))
  }
  const handleSetErrorI = (newError) => {
    onError((value) => ({ ...value, [id]: newError }))
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

  const handleOnSelect = (event) => {
    if (!event.target.checked) onChange((val) => ({ ...val, [id]: null }))
    else
      onChange((val) => ({
        ...val,
        [id]: {
          ...val[id],
          selected: true,
          day: id.charAt(0).toUpperCase() + id.slice(1),
        },
      }))
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          type="checkbox"
          checked={!!value?.selected}
          onChange={handleOnSelect}
        />
      }
      label={
        <Box display="flex" alignItems="center" gap="12px" paddingY={'12px'}>
          {label}
          {!!value?.selected && (
            <Box paddingLeft="10px">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl error={error}>
                  <DemoContainer
                    components={['DesktopTimePicker', 'DesktopTimePicker']}
                  >
                    <DemoItem>
                      <DesktopTimePicker
                        label="Hora de inicio"
                        value={value?.start_time}
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
                        value={value?.end_time}
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
                  </DemoContainer>
                </FormControl>
              </LocalizationProvider>
            </Box>
          )}
        </Box>
      }
    />
  )
}

export default SelectSchedule
