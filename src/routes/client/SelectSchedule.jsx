import React from 'react'
import dayjs from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import { FormControl } from '@mui/material'

const sixtAM = dayjs()
  .set('hour', 6)
  .set('minute', 30)
  .startOf('hour' && 'minute')
const tenPM = dayjs().set('hour', 22).startOf('hour')

const SelectSchedule = () => {
  const [selectedTimeStart, setSelectedTimeStart] = React.useState(null)
  const handleTimeChangeStart = (time) => {
    setSelectedTimeStart(time)
  }

  const [selectedTimeEnd, setSelectedTimeEnd] = React.useState(null)
  const handleTimeChangeEnd = (time) => {
    setSelectedTimeEnd(time)
  }
  const handleSetError = (newError) => {
    if (newError) {
      setError(newError)
    } else if (
      selectedTimeEnd &&
      selectedTimeStart &&
      selectedTimeEnd < selectedTimeStart &&
      !error?.includes('end-time-before-start-time')
    ) {
      setError('end-time-before-start-time')
    } else if (
      (selectedTimeEnd == null || selectedTimeStart == null) &&
      !error?.includes('required')
    ) {
      setError('required')
    } else {
      setError(null)
    }
  }
  const [errorI, setErrorI] = React.useState(null)
  const [error, setError] = React.useState(null)

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl error={error}>
        <DemoContainer components={['DesktopTimePicker', 'DesktopTimePicker']}>
          <DemoItem>
            <DesktopTimePicker
              label="Hora de inicio"
              value={selectedTimeStart}
              onChange={handleTimeChangeStart}
              minTime={sixtAM}
              maxTime={tenPM}
              onError={(newError) => setErrorI(newError)}
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
              value={selectedTimeEnd}
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
  )
}

export default SelectSchedule
